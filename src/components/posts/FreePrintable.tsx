"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Download, FileText } from "lucide-react";

type FreePrintableProps = {
  /** Key in src/data/printables.ts */
  pdf: string;
  title: string;
  blurb?: string;
  buttonLabel?: string;
  /** Path of the post the box sits on, stored with the signup. */
  postUrl: string;
};

type Unlocked = { token: string; repeat: boolean };
type Status = "idle" | "loading" | "done";

const EVENT = "printable-unlocked";
const storageKey = (pdf: string) => `printable:${pdf}`;

/**
 * Email-gated printable download.
 *
 * Drop one into any post with the printable's ID. The PDF is never linked
 * from the page; the browser only gets a signed download token after the
 * server has validated and recorded the email. A post can show the box twice
 * (top and bottom), and the two copies stay in sync through a window event
 * plus sessionStorage, so unlocking one unlocks the other.
 */
export function FreePrintable({ pdf, title, blurb, buttonLabel = "Send me the printable", postUrl }: FreePrintableProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState<Unlocked | null>(null);
  const renderedAt = useRef<number>(0);
  const headingId = useId();

  useEffect(() => {
    renderedAt.current = performance.now();
    try {
      const saved = sessionStorage.getItem(storageKey(pdf));
      if (saved) setUnlocked(JSON.parse(saved) as Unlocked);
    } catch {
      // Storage unavailable: the box simply starts locked.
    }
    const onUnlock = (event: Event) => {
      const detail = (event as CustomEvent<{ pdf: string } & Unlocked>).detail;
      if (detail?.pdf === pdf) setUnlocked({ token: detail.token, repeat: detail.repeat });
    };
    window.addEventListener(EVENT, onUnlock);
    return () => window.removeEventListener(EVENT, onUnlock);
  }, [pdf]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/printables/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          pdf,
          postUrl,
          website,
          formAgeMs: Math.round(performance.now() - renderedAt.current),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; token?: string; repeat?: boolean };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      const result: Unlocked = { token: data.token ?? "", repeat: Boolean(data.repeat) };
      setUnlocked(result);
      setStatus("done");
      try {
        sessionStorage.setItem(storageKey(pdf), JSON.stringify(result));
      } catch {
        // Fine without it.
      }
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { pdf, ...result } }));
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  const downloadHref = unlocked?.token ? `/api/printables/download?t=${encodeURIComponent(unlocked.token)}` : "";

  return (
    <aside
      className="my-8 rounded-2xl p-5 sm:p-6"
      style={{ background: "var(--accent-light)", border: "1px solid var(--accent-surface)" }}
      aria-labelledby={headingId}
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "var(--accent-surface)", color: "var(--accent)" }}
        >
          <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 id={headingId} className="text-lg font-semibold leading-snug" style={{ color: "var(--text)" }}>
            {title}
          </h3>
          {blurb && (
            <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {blurb}
            </p>
          )}

          {unlocked ? (
            <div className="mt-4">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }} role="status">
                {unlocked.repeat
                  ? "You already have this one. Here it is again."
                  : "Thanks! Your download is ready."}
              </p>
              {unlocked.token ? (
                <a
                  href={downloadHref}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download the PDF
                </a>
              ) : (
                <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  Thanks, you are on the list.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-4" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor={`${headingId}-email`} className="sr-only">
                  Email address
                </label>
                <input
                  id={`${headingId}-email`}
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-teal-500/30"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${headingId}-error` : undefined}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-[0.98] disabled:opacity-60 sm:min-w-[180px]"
                >
                  {status === "loading" ? "Sending..." : buttonLabel}
                </button>
              </div>

              {/* Honeypot. People never see this field; bots fill in everything. */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor={`${headingId}-website`}>Website</label>
                <input
                  id={`${headingId}-website`}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {error ? (
                <p id={`${headingId}-error`} className="mt-2 text-sm text-red-700 dark:text-red-300" role="alert">
                  {error}
                </p>
              ) : (
                <p className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                  No spam. Your email stays with TryCleaningHacks.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </aside>
  );
}
