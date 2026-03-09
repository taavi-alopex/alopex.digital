"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NewsletterPopup } from "./NewsletterPopup";

const STORAGE_KEY = "newsletter_popup";
const SHOW_DELAY_MS = 8000; // 8 seconds
const DISMISS_DAYS = 7; // Show again after 7 days if dismissed

type NewsletterContextValue = {
  isOpen: boolean;
  openNewsletter: () => void;
  closeNewsletter: () => void;
};

const NewsletterContext = createContext<NewsletterContextValue | null>(null);

export function useNewsletter() {
  const ctx = useContext(NewsletterContext);
  if (!ctx) throw new Error("useNewsletter must be used within NewsletterProvider");
  return ctx;
}

type StoredData = {
  status: "subscribed" | "dismissed";
  timestamp: number;
};

function shouldShowPopup(): boolean {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return true;

  try {
    const data: StoredData = JSON.parse(stored);

    // Never show if subscribed
    if (data.status === "subscribed") return false;

    // Show again after DISMISS_DAYS if dismissed
    if (data.status === "dismissed") {
      const daysSince = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
      return daysSince > DISMISS_DAYS;
    }
  } catch {
    return true;
  }

  return true;
}

function setDismissed() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ status: "dismissed", timestamp: Date.now() })
  );
}

function setSubscribed() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ status: "subscribed", timestamp: Date.now() })
  );
}

export function NewsletterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const pathname = usePathname();

  const openNewsletter = useCallback(() => setIsOpen(true), []);
  const closeNewsletter = useCallback(() => {
    setIsOpen(false);
    setDismissed();
  }, []);

  const handleSubscribe = useCallback(() => {
    setSubscribed();
  }, []);

  // Auto-trigger popup after delay (only on homepage)
  useEffect(() => {
    // Only trigger on homepage (any locale)
    const isHomepage = pathname === "/" || /^\/[a-z]{2}\/?$/.test(pathname);
    if (!isHomepage) return;

    // Don't trigger if already shown this session
    if (hasTriggered) return;

    // Check if should show based on localStorage
    if (!shouldShowPopup()) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasTriggered(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname, hasTriggered]);

  return (
    <NewsletterContext.Provider value={{ isOpen, openNewsletter, closeNewsletter }}>
      {children}
      <NewsletterPopup
        isOpen={isOpen}
        onClose={closeNewsletter}
        onSubscribe={handleSubscribe}
      />
    </NewsletterContext.Provider>
  );
}
