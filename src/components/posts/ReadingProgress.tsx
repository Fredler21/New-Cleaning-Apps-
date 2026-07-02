"use client";

import { useEffect, useState } from "react";

/**
 * A thin gradient bar pinned to the very top of the window that fills as the
 * reader scrolls through an article. Small touch, but it makes long guides
 * feel more app-like on a phone.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-1"
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <div
        className="h-full origin-left transition-transform duration-150 ease-out"
        style={{
          width: "100%",
          transform: `scaleX(${progress / 100})`,
          background: "linear-gradient(90deg, #14b8a6 0%, #10b981 100%)",
        }}
      />
    </div>
  );
}
