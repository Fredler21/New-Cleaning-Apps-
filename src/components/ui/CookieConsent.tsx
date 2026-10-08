"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "cookie_consent";

type Choice = "accepted" | "declined";

/**
 * Tell Google Consent Mode about the choice for the current page. The root
 * layout's consent bootstrap reads the same localStorage key on later loads,
 * so GTM, GA4, AdSense and the Pinterest tag all honor it from then on.
 */
function applyConsent(choice: Choice) {
  const state = choice === "accepted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem(CONSENT_KEY);
    } catch {
      // Storage blocked (private mode, strict settings): show the banner, never crash.
    }
    if (!consent) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function choose(choice: Choice) {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Storage blocked: the choice still applies to this page.
    }
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl p-5 shadow-2xl backdrop-blur-md sm:flex sm:items-center sm:gap-5 sm:p-6"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Icon + Text */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <svg className="h-5 w-5 flex-shrink-0 text-teal-700 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              We value your privacy
            </h3>
          </div>
          <p className="text-xs leading-5 sm:text-sm" style={{ color: "var(--text-secondary)" }}>
            We use cookies to improve your experience, analyze traffic, and serve personalized ads
            via Google AdSense. By clicking &ldquo;Accept All,&rdquo; you consent to our use of cookies.
            Read our{" "}
            <Link href="/privacy" className="font-medium underline" style={{ color: "var(--accent)" }}>
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:flex-shrink-0">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200"
            style={{
              background: "var(--surface)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-[0.98]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
