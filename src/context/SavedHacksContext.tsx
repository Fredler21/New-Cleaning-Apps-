"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type SavedHacksContextType = {
  savedSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggleSave: (slug: string) => void;
};

const SavedHacksContext = createContext<SavedHacksContextType | null>(null);

const STORAGE_KEY_SLUGS = "saved_hacks_slugs";

export function SavedHacksProvider({ children }: { children: ReactNode }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const slugs = localStorage.getItem(STORAGE_KEY_SLUGS);
    if (slugs) {
      try {
        setSavedSlugs(JSON.parse(slugs));
      } catch {
        setSavedSlugs([]);
      }
    }
  }, []);

  // Persist saved slugs whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SLUGS, JSON.stringify(savedSlugs));
  }, [savedSlugs]);

  const isSaved = useCallback(
    (slug: string) => savedSlugs.includes(slug),
    [savedSlugs]
  );

  const toggleSave = useCallback((slug: string) => {
    setSavedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  return (
    <SavedHacksContext.Provider
      value={{
        savedSlugs,
        isSaved,
        toggleSave,
      }}
    >
      {children}
    </SavedHacksContext.Provider>
  );
}

export function useSavedHacks() {
  const ctx = useContext(SavedHacksContext);
  if (!ctx) throw new Error("useSavedHacks must be used within SavedHacksProvider");
  return ctx;
}
