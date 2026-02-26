"use client";

import { useEffect } from "react";

/**
 * Fire-and-forget page view tracker.
 * Call once in the post detail page component.
 */
export function useTrackView(slug: string) {
  useEffect(() => {
    if (!slug) return;

    const payload = JSON.stringify({ slug });

    // sendBeacon needs a Blob with correct content-type for JSON parsing
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
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
