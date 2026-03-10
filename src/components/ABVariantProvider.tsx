"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Variant = "1" | "2";

const ABContext = createContext<Variant>("1");

export function useABVariant() {
  return useContext(ABContext);
}

const COOKIE_NAME = "ab_hero";
const COOKIE_DAYS = 30;

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

interface Props {
  children: ReactNode;
  urlVariant?: string;
}

export function ABVariantProvider({ children, urlVariant }: Props) {
  const [variant, setVariant] = useState<Variant>("1");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // URL param overrides everything (campaign links)
    if (urlVariant === "2" || urlVariant === "1") {
      setCookie(COOKIE_NAME, urlVariant, COOKIE_DAYS);
      setVariant(urlVariant);
      setReady(true);
      return;
    }

    // Check existing cookie
    const existing = getCookie(COOKIE_NAME);
    if (existing === "1" || existing === "2") {
      setVariant(existing);
      setReady(true);
      return;
    }

    // Random 50/50 split for new visitors
    const assigned: Variant = Math.random() < 0.5 ? "1" : "2";
    setCookie(COOKIE_NAME, assigned, COOKIE_DAYS);
    setVariant(assigned);
    setReady(true);
  }, [urlVariant]);

  // Fire Meta Pixel event with variant
  useEffect(() => {
    if (!ready) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w !== "undefined" && typeof w.fbq === "function") {
      w.fbq("trackCustom", "ABVariant", {
        variant: `hero_v${variant}`,
        page: "home",
      });
    }
  }, [ready, variant]);

  return (
    <ABContext.Provider value={variant}>
      {children}
    </ABContext.Provider>
  );
}
