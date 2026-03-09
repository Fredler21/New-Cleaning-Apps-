/**
 * Email validation & sanitization utilities.
 *
 * Prevents 550 bounce errors caused by:
 *  - Leading/trailing whitespace
 *  - Mixed case (some SMTP servers are case-sensitive)
 *  - Invisible Unicode characters (zero-width spaces, BOM, etc.)
 *  - Obviously invalid formats
 */

/**
 * RFC 5322 simplified email regex.
 * Rejects clearly invalid addresses while accepting all reasonable real ones.
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/** Well-known disposable / typo domains to warn about (not blocked, just logged). */
const SUSPICIOUS_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
]);

/** Common domain typos → corrections */
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "hotmal.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "outloo.com": "outlook.com",
  "outlok.com": "outlook.com",
  "outlook.co": "outlook.com",
};

/**
 * Strip invisible Unicode characters that can slip in from copy-paste.
 */
function stripInvisibleChars(str: string): string {
  return str
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "") // zero-width spaces, BOM, NBSP
    .replace(/[\u2000-\u200A]/g, "")               // various Unicode spaces
    .replace(/[\r\n\t]/g, "");                      // newlines, tabs
}

/**
 * Sanitise an email address:
 *  1. Strip invisible chars
 *  2. Trim whitespace
 *  3. Lowercase
 *  4. Fix known domain typos
 */
export function sanitiseEmail(raw: string): string {
  let email = stripInvisibleChars(raw).trim().toLowerCase();

  // Fix common domain typos
  const atIdx = email.lastIndexOf("@");
  if (atIdx > 0) {
    const domain = email.slice(atIdx + 1);
    const fix = DOMAIN_TYPOS[domain];
    if (fix) {
      email = email.slice(0, atIdx + 1) + fix;
    }
  }

  return email;
}

/**
 * Validate an email address format.
 * Returns `true` if the address looks syntactically valid.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

/**
 * Check whether the domain is suspicious (disposable).
 * Does NOT block — callers can decide policy.
 */
export function isSuspiciousDomain(email: string): boolean {
  const domain = email.split("@")[1];
  return domain ? SUSPICIOUS_DOMAINS.has(domain) : false;
}

export interface EmailValidationResult {
  original: string;
  sanitised: string;
  valid: boolean;
  suspicious: boolean;
}

/**
 * Full pipeline: sanitise → validate → check domain.
 */
export function validateEmail(raw: string): EmailValidationResult {
  const sanitised = sanitiseEmail(raw);
  return {
    original: raw,
    sanitised,
    valid: isValidEmail(sanitised),
    suspicious: isSuspiciousDomain(sanitised),
  };
}
