"use client";

import { useSavedHacks } from "@/context/SavedHacksContext";

type SaveHackButtonProps = {
  slug: string;
  variant?: "icon" | "full";
};

export function SaveHackButton({ slug, variant = "icon" }: SaveHackButtonProps) {
  const { isSaved, toggleSave } = useSavedHacks();
  const saved = isSaved(slug);

  // Icon-only button (for PostCard)
  if (variant === "icon") {
    return (
      <button
        onClick={() => toggleSave(slug)}
        className="rounded-lg p-1.5 transition-all duration-200"
        style={{ color: saved ? "#0d9488" : "var(--muted)" }}
        aria-label={saved ? "Unsave hack" : "Save hack"}
        aria-pressed={saved}
      >
        <svg className="h-4 w-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    );
  }

  // Full button (for post detail page)
  return (
    <button
      onClick={() => toggleSave(slug)}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.97] ${
        saved
          ? "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300"
          : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
      }`}
      aria-label={saved ? "Unsave hack" : "Save hack"}
      aria-pressed={saved}
    >
      <svg className="h-4 w-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {saved ? "Saved ✓" : "Save Hack"}
    </button>
  );
}
