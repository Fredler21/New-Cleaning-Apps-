"use client";

import { useEffect } from "react";

type EzoicAdProps = {
  /**
   * The Ezoic placement ID assigned in your Ezoic dashboard
   * (e.g. 101, 102, 103). Each unique location on a page must
   * use a different ID.
   */
  id: number;
  /**
   * Optional wrapper className for spacing/centering. Do NOT
   * apply styles to the inner placeholder div itself, Ezoic
   * forbids reserving size for ad slots (causes white space
   * when no ad fills).
   */
  className?: string;
};

declare global {
  interface Window {
    ezstandalone?: {
      cmd: Array<() => void>;
      showAds: (...ids: number[]) => void;
    };
  }
}

/**
 * Ezoic ad placeholder.
 *
 * Renders the required `ezoic-pub-ad-placeholder-{id}` div and
 * queues a `showAds(id)` call via `ezstandalone.cmd`. Safe to
 * use multiple times on a page, each call is queued and
 * processed by the Ezoic header script loaded in the root
 * layout.
 */
export function EzoicAd({ id, className }: EzoicAdProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.ezstandalone = window.ezstandalone || { cmd: [], showAds: () => {} };
    window.ezstandalone.cmd = window.ezstandalone.cmd || [];
    window.ezstandalone.cmd.push(() => {
      window.ezstandalone?.showAds(id);
    });
  }, [id]);

  return (
    <div className={className}>
      {/* Per Ezoic docs: do NOT apply styles to this placeholder div. */}
      <div id={`ezoic-pub-ad-placeholder-${id}`} />
    </div>
  );
}
