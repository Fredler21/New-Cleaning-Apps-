"use client";

import { useTrackView } from "@/lib/firebase/useTrackView";

export function ViewTracker({ slug }: { slug: string }) {
  useTrackView(slug);
  return null;
}
