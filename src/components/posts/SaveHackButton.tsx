"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { useSavedHacks } from "@/context/SavedHacksContext";

type SaveHackButtonProps = {
  slug: string;
  variant?: "icon" | "full";
};

export function SaveHackButton({ slug, variant = "icon" }: SaveHackButtonProps) {
  const { isSubscribed, isSaved, toggleSave, subscribe } = useSavedHacks();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saved = isSaved(slug);

  function handleClick() {
    if (!isSubscribed) {
      setShowModal(true);
      return;
    }
    toggleSave(slug);
  }

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !/\S+@\S+\.\S+/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      // Subscription notification failed, but we still allow saving locally
    }

    subscribe(trimmed);
    toggleSave(slug);
    setShowModal(false);
    setLoading(false);
    setEmail("");
  }

  // Icon-only button (for PostCard)
  if (variant === "icon") {
    return (
      <>
        <button
          onClick={handleClick}
          className="rounded-lg p-1.5 transition-all duration-200"
          style={{ color: saved ? "#0d9488" : "var(--muted)" }}
          aria-label={saved ? "Unsave hack" : "Save hack"}
        >
          <svg className="h-4 w-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <SubscribeModal
          open={showModal}
          onClose={() => setShowModal(false)}
          email={email}
          setEmail={setEmail}
          onSubmit={handleSubscribe}
          loading={loading}
          error={error}
        />
      </>
    );
  }

  // Full button (for post detail page)
  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.97] ${
          saved
            ? "bg-teal-600 text-white"
            : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
        }`}
      >
        <svg className="h-4 w-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        {saved ? "Saved ✓" : "Save Hack"}
      </button>
      <SubscribeModal
        open={showModal}
        onClose={() => setShowModal(false)}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubscribe}
        loading={loading}
        error={error}
      />
    </>
  );
}

/* ── Subscribe Modal ────────────────────────────── */
function SubscribeModal({
  open,
  onClose,
  email,
  setEmail,
  onSubmit,
  loading,
  error,
}: {
  open: boolean;
  onClose: () => void;
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  error: string;
}) {
  return (
    <Modal open={open} title="Subscribe to Save Hacks" onClose={onClose}>
      <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        Enter your email to unlock saving. You&rsquo;ll also get our free weekly cleaning
        tips — unsubscribe anytime.
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "var(--muted)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-colors"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              color: "var(--text)",
            }}
            aria-label="Email address"
            required
          />
        </div>

        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Subscribing…" : "Subscribe & Save"}
        </button>
      </form>

      <p className="mt-3 text-center text-xs" style={{ color: "var(--muted)" }}>
        No spam. Unsubscribe anytime. See our{" "}
        <a href="/privacy" className="underline" style={{ color: "var(--accent)" }}>
          Privacy Policy
        </a>
        .
      </p>
    </Modal>
  );
}
