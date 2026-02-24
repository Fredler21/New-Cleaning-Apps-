"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type SavedHacksContextType = {
  subscriberEmail: string | null;
  savedSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggleSave: (slug: string) => void;
  subscribe: (email: string) => void;
  isSubscribed: boolean;
};

const SavedHacksContext = createContext<SavedHacksContextType | null>(null);

const STORAGE_KEY_EMAIL = "saved_hacks_email";
const STORAGE_KEY_SLUGS = "saved_hacks_slugs";

export function SavedHacksProvider({ children }: { children: ReactNode }) {
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const email = localStorage.getItem(STORAGE_KEY_EMAIL);
    const slugs = localStorage.getItem(STORAGE_KEY_SLUGS);
    if (email) setSubscriberEmail(email);
    if (slugs) {
      try {
        setSavedSlugs(JSON.parse(slugs));
      } catch {
        setSavedSlugs([]);
      }
    }
  }, []);

  // Persist saved slugs
  useEffect(() => {
    if (subscriberEmail) {
      localStorage.setItem(STORAGE_KEY_SLUGS, JSON.stringify(savedSlugs));
    }
  }, [savedSlugs, subscriberEmail]);

  const subscribe = useCallback((email: string) => {
    localStorage.setItem(STORAGE_KEY_EMAIL, email);
    setSubscriberEmail(email);
  }, []);

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
        subscriberEmail,
        savedSlugs,
        isSaved,
        toggleSave,
        subscribe,
        isSubscribed: !!subscriberEmail,
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
