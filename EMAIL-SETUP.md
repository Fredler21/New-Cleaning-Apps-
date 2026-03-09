# Email Deliverability Setup Guide — TryCleaningHacks

## 1. What Was Causing the 550 Bounce Errors

The `550 5.1.1 The email account does not exist` errors were caused by:

1. **No email sanitisation** — Subscriber emails from Firestore were sent as-is, with possible hidden Unicode characters, whitespace, or mixed case that SMTP servers reject.
2. **No format validation before sending** — Invalid addresses like `pinterestbusinnes@gmail.com` (misspelled) were attempted and rejected.
3. **No bounce tracking** — Failed addresses were retried on every cron run, creating a loop of 550 errors.
4. **Sending to ALL subscribers** — Including unsubscribed and previously bounced addresses.
5. **Weak email validation** — The old regex (`/\S+@\S+\.\S+/`) accepted clearly invalid patterns.

## 2. What Was Fixed

| Area | Before | After |
|------|--------|-------|
| Email validation | Basic regex | RFC 5322 regex + sanitisation pipeline |
| Invisible chars | Not handled | Stripped (zero-width spaces, BOM, NBSP) |
| Domain typos | Not handled | Auto-corrected (gmial.com → gmail.com) |
| Subscriber status | None | `active` / `unsubscribed` / `bounced` |
| Bounce handling | None | Auto-detected from SMTP errors + webhook |
| Retry logic | None | Up to 2 retries with exponential backoff |
| Email provider | Zoho SMTP only | Resend (primary) + Zoho (fallback) |
| Email template | Basic `<p>` tags | Professional responsive HTML + plain text |
| Unsubscribe | Hard-deletes record | Soft-delete (status change) |
| Logging | Minimal | Per-email structured logging |

---

## 3. Environment Variables

Add these to your Vercel project settings → Environment Variables:

```env
# Primary email provider (recommended)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Resend webhook signature verification
RESEND_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx

# Fallback email provider (existing)
ZOHO_EMAIL=support@trycleaninghacks.com
ZOHO_APP_PASSWORD=xxxxxxxxxxxxxxxxxxxx

# Notification secrets (existing)
CRON_SECRET=your-cron-secret
NOTIFY_SECRET=your-notify-secret

# Firebase Admin (existing)
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

---

## 4. Resend Setup (Recommended)

Resend gives you better deliverability, built-in bounce/complaint handling, and a modern API.

### Steps:
1. Sign up at [resend.com](https://resend.com)
2. Go to **Domains** → **Add Domain** → Enter `trycleaninghacks.com`
3. Resend will give you DNS records to add (see Section 5 below)
4. Once verified, create an **API Key** and add it as `RESEND_API_KEY`
5. Go to **Webhooks** → Add endpoint:
   - URL: `https://trycleaninghacks.com/api/webhooks/resend`
   - Events: `email.bounced`, `email.complained`

---

## 5. DNS Records for Email Authentication

Add these DNS records to your domain registrar (e.g., Cloudflare, Namecheap, GoDaddy):

### SPF Record
Authorises Resend (and Zoho as backup) to send email on behalf of your domain.

| Type | Name | Value |
|------|------|-------|
| TXT | `@` | `v=spf1 include:send.resend.com include:zoho.com ~all` |

### DKIM Record
Resend will provide this when you add your domain. It looks like:

| Type | Name | Value |
|------|------|-------|
| CNAME | `resend._domainkey` | _(provided by Resend dashboard)_ |

### DMARC Record
Tells receiving servers to quarantine emails that fail SPF/DKIM.

| Type | Name | Value |
|------|------|-------|
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:support@trycleaninghacks.com; pct=100; adkim=s; aspf=s` |

### Return-Path / MX (for bounce handling)
Resend sets this up automatically when you verify your domain.

### Verification
After adding records, verify with:
- [MXToolbox SPF Check](https://mxtoolbox.com/spf.aspx)
- [MXToolbox DKIM Check](https://mxtoolbox.com/dkim.aspx)
- [MXToolbox DMARC Check](https://mxtoolbox.com/dmarc.aspx)
- [mail-tester.com](https://www.mail-tester.com/) — send a test email and get a spam score

---

## 6. Firestore Index Requirements

The `getActiveSubscribers()` function uses a compound query (`status == "active"` + `orderBy subscribedAt`).

Create a composite index in Firestore:
1. Go to Firebase Console → Firestore → Indexes
2. Add composite index:
   - Collection: `subscribers`
   - Fields: `status` (Ascending), `subscribedAt` (Descending)

Or run the first query and click the link in the error message — Firebase will auto-generate the index.

---

## 7. Migrate Existing Subscribers

Existing subscriber documents don't have a `status` field. Run this one-time migration:

```js
// Run from Firebase Console → Extensions → Cloud Shell, or as a script
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const snap = await db.collection('subscribers').get();
const batch = db.batch();

snap.docs.forEach(doc => {
  if (!doc.data().status) {
    batch.update(doc.ref, { status: 'active' });
  }
});

await batch.commit();
console.log(`Updated ${snap.size} subscribers with status: "active"`);
```

---

## 8. Testing Checklist

### Pre-deployment
- [ ] All TypeScript compiles cleanly (`npx tsc --noEmit`)
- [ ] `RESEND_API_KEY` is set in Vercel env vars
- [ ] Domain verified in Resend dashboard
- [ ] SPF, DKIM, DMARC DNS records added
- [ ] Firestore composite index created
- [ ] Existing subscribers migrated with `status: "active"`
- [ ] Webhook endpoint added in Resend dashboard

### Email delivery tests

#### Gmail
- [ ] Subscribe with a Gmail address via the website form
- [ ] Verify welcome email arrives in **Primary** inbox (not Spam/Promotions)
- [ ] Check email headers: `List-Unsubscribe` header present
- [ ] Click "Read the Post" button — correct link
- [ ] Click unsubscribe link — confirmation page works
- [ ] Trigger a post notification (manual or cron)
- [ ] Verify notification email arrives
- [ ] Check sender shows as "TryCleaningHacks"

#### Outlook / Hotmail
- [ ] Subscribe with an Outlook address
- [ ] Verify welcome email arrives in inbox
- [ ] Verify notification email arrives
- [ ] Check no "unknown sender" warning

#### Yahoo Mail
- [ ] Subscribe with a Yahoo address
- [ ] Verify welcome email arrives
- [ ] Verify one-click unsubscribe works

### Bounce handling tests
- [ ] Add a fake subscriber email (e.g., `fakefake123@gmail.com`) directly in Firestore with `status: "active"`
- [ ] Trigger a notification
- [ ] Verify the address is auto-marked as `status: "bounced"` in Firestore
- [ ] Trigger another notification — verify the bounced address is skipped
- [ ] Check Vercel Function logs for `[CRON] BOUNCE` log entry

### Unsubscribe tests
- [ ] Click unsubscribe link in email
- [ ] Verify subscriber status changes to `unsubscribed` in Firestore (not deleted)
- [ ] Re-subscribe the same email — verify status changes back to `active`
- [ ] Verify unsubscribed addresses don't receive future notifications

### Cron job tests
- [ ] Add a new post to `src/data/posts.ts`
- [ ] Wait for cron (8am UTC) or manually call: `curl -H "Authorization: Bearer $CRON_SECRET" https://trycleaninghacks.com/api/cron/notify-new-posts`
- [ ] Check response JSON for `sent`, `failed`, `bounced` counts
- [ ] Verify post slug appears in Firestore `notifiedPosts` collection
- [ ] Verify the same post doesn't trigger notifications again

### Spam score check
- [ ] Go to [mail-tester.com](https://www.mail-tester.com/)
- [ ] Send a notification email to the provided address
- [ ] Verify score is 8/10 or higher
- [ ] Fix any issues flagged (usually DNS-related)

---

## 9. Architecture Overview

```
    User subscribes via NewsletterForm
              │
              ▼
    POST /api/subscribe
    ├── sanitiseEmail() — clean & lowercase
    ├── isValidEmail() — reject bad format
    ├── addSubscriber() — Firestore (status: "active")
    └── sendMailWithRetry() — welcome email
              │
    ┌─────────┴──────────┐
    │                    │
    ▼                    ▼
  Resend API       Zoho SMTP
  (primary)        (fallback)
              │
    Vercel Cron (daily 8am UTC)
              │
              ▼
    GET /api/cron/notify-new-posts
    ├── getNotifiedSlugs() — skip already-sent posts
    ├── getActiveSubscribers() — only status="active"
    ├── For each subscriber:
    │   ├── sanitiseEmail()
    │   ├── sendMailWithRetry() — 2 retries, backoff
    │   ├── On success → log
    │   ├── On bounce → markSubscriberBounced()
    │   └── On fail → log
    └── markPostNotified()
              │
    Resend Webhook (async)
              │
              ▼
    POST /api/webhooks/resend
    ├── email.bounced → markSubscriberBounced()
    └── email.complained → markSubscriberBounced()
```

---

## 10. Monitoring

Check Vercel Function logs for these log prefixes:
- `[SUBSCRIBE]` — new subscriber events
- `[UNSUBSCRIBE]` — unsubscribe events
- `[CRON]` — daily notification job
- `[NOTIFY]` — manual notification trigger
- `[WEBHOOK]` — Resend bounce/complaint events

All logs include the email address and result (sent/failed/bounced) for debugging.
