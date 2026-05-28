# Auto-Post Agent

A scheduled agent that:

1. Pulls **trending cleaning-niche topics** from Pinterest Trends + Google Trends
2. Merges the signals, dedupes against posts you already have
3. Rewrites the topic into a fresh `Post` (Claude) in **your voice**
4. Generates an original cover image (Gemini, via existing pipeline)
5. Appends it to `src/data/posts.ts`
6. Opens a PR (never pushes directly to `main`)

Designed to run **3x/week via GitHub Actions cron** — no server needed.

## Cost

| Component | Cost |
| --- | --- |
| Pinterest Trends API | Free (trial token) |
| Google Trends | Free (no key) |
| Claude (post writing) | ~$0.20/post → ~$2-3/month |
| Gemini (cover image) | You're already paying for this |
| GitHub Actions cron | Free tier |

**Total: ~$3-5/month** for 3 posts/week.

## Setup

### 1. Required env vars (GitHub repo secrets)

| Secret                    | Required | Purpose                                                |
| ------------------------- | -------- | ------------------------------------------------------ |
| `ANTHROPIC_API_KEY`       | Yes      | Claude — post writing                                  |
| `GEMINI_API_KEY`          | Yes      | Gemini — cover image                                   |
| `PINTEREST_ACCESS_TOKEN`  | Optional | Pinterest Trends. Falls back to Google-only if absent. |

For local testing, drop them in `.env.local` (already gitignored).

### 2. Get a Pinterest trial token (optional but recommended)

1. Convert your Pinterest account to **Business** (free): https://www.pinterest.com/business/convert/
2. Create a dev app: https://developers.pinterest.com/apps/
3. Click **"Generate trial access token"** on your app page
4. Scopes: `pins:read`, `user_accounts:read`
5. Copy the `pina_...` token into `.env.local`

### 3. Local commands

```bash
# Safe — fetches trends, prints top 5 candidates, no LLM cost
npm run agent:dry

# Real run, generates a post + image locally, but does NOT open a PR
npm run agent:local

# Full run (used by the cron)
npm run agent:run

# Force a specific topic, skip trend discovery
node scripts/agent/run.mjs --topic="how to clean baseboards fast" --no-pr
```

### 4. Flags

| Flag             | Default | Effect                                                       |
| ---------------- | ------- | ------------------------------------------------------------ |
| `--dry-run`      | off     | Trend discovery only. No files written, no LLM spend.        |
| `--no-pr`        | off     | Writes files locally but doesn't commit/push/open PR.        |
| `--topic="x"`    | —       | Skip trend discovery, force a specific topic.                |
| `--max=1`        | `1`     | Max posts to generate this run.                              |

## How topic picking works

```
Pinterest Trends (growing keywords, "Cleaning" interest)
        +
Google Trends (rising related queries for 4 seed terms)
        |
        v
Merge -> dedupe by lowercase keyword
        |
        v
Score = pinterestScore + googleScore + (10 if both sources)
        |
        v
Filter out:
  - exact slug matches against state.publishedSlugs
  - queued topics from state.queuedTopics
  - >= 50% Jaccard similarity to existing post titles
    (niche stopwords like "cleaning", "hacks", "tips" excluded)
        |
        v
Top remaining candidate -> Claude
```

## Files

| File | Purpose |
| --- | --- |
| `run.mjs` | Orchestrator |
| `topic-picker.mjs` | Merges + dedupes trend signals |
| `pinterest.mjs` | Pinterest Trends API client |
| `google-trends.mjs` | Google Trends rising queries |
| `writer.mjs` | Claude prompt + `Post` JSON generator |
| `state.json` | Ledger (lastRun, publishedSlugs, runs[]) |

## Safety rails

- **Always opens a PR**, never commits to `main` directly
- **Max 1 post per run** by default
- **Typecheck must pass** before PR is opened
- **Slug collision check** against existing `src/data/posts.ts`
- **Topic dedup** via ledger + Jaccard title similarity
- **Graceful fallback** if Pinterest token missing (Google-only mode)
- **Graceful fallback** if Google Trends unreachable (Pinterest-only mode)

## Cron schedule

`.github/workflows/auto-post.yml` runs **Mon / Wed / Fri at 14:00 UTC** (09:00 ET).
Trigger it manually from the **Actions** tab → "Auto-Post Agent" → **Run workflow**, with optional `topic` and `dry_run` inputs.
