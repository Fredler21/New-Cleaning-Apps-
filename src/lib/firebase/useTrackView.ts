"use client";

import { useEffect } from "react";

/**
 * Fire-and-forget page view tracker.
 * Call once in the post detail page component.
 */
export function useTrackView(slug: string) {
  useEffect(() => {
    if (!slug) return;

    // Use sendBeacon for reliability, fall back to fetch
    const payload = JSON.stringify({ slug });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", payload);
    } else {
      fetch("/api/analytics", {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {
        /* swallow – analytics should never break UX */
      });
    }
  }, [slug]);
}
