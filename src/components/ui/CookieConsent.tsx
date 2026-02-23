"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
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
          <div className="flex items-center gap-2 mb-2">
            <svg className="h-5 w-5 flex-shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            <Link href="/privacy" className="underline font-medium" style={{ color: "var(--accent)" }}>
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:flex-shrink-0">
          <button
            onClick={decline}
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
            onClick={accept}
            className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
