"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let result: { message?: string; error?: string };
      try {
        result = (await response.json()) as { message?: string; error?: string };
      } catch {
        setLoading(false);
        setStatusType("error");
        setStatus("Server error. Please try again later.");
        return;
      }

      setLoading(false);

      if (!response.ok) {
        setStatusType("error");
        setStatus(result.error ?? "Unable to subscribe.");
        return;
      }

      setStatusType("success");
      form.reset();
      setStatus(result.message ?? "Subscribed!");
    } catch {
      setLoading(false);
      setStatusType("error");
      setStatus("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row" aria-label="Email capture form">
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-xl py-3 px-4 text-sm outline-none transition-colors"
          style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
          aria-label="Email address"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 sm:min-w-[140px] rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status ? (
        <p
          className={`mt-3 rounded-lg px-3 py-2 text-sm ${
            statusType === "success"
              ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
          }`}
          role="status"
        >
          {status}
        </p>
      ) : null}
    </>
  );
}
