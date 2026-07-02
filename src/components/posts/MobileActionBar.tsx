"use client";

import { useState } from "react";
import { SaveHackButton } from "@/components/posts/SaveHackButton";

type MobileActionBarProps = {
  title: string;
  slug: string;
};

/**
 * A sticky bottom bar shown only on phones (hidden from `lg` up) so the two
 * things people want on an article, saving it and sharing it, are always a
 * thumb away. Respects the device safe-area inset.
 */
export function MobileActionBar({ title, slug }: MobileActionBarProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/cleaning-hacks/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user dismissed the share sheet; fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; nothing else to do */
    }
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md lg:hidden"
      style={{
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        borderColor: "var(--border)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-4 py-2.5">
        <div className="flex-1 [&>button]:w-full [&>button]:justify-center">
          <SaveHackButton slug={slug} variant="full" />
        </div>

        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.97]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          aria-label="Share this hack"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              Share
            </>
          )}
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all active:scale-[0.97]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          aria-label="Back to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
