"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  en: "EN",
  et: "ET",
  pl: "PL",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const otherLocales = routing.locales.filter((l) => l !== locale);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold tracking-[1.5px] uppercase text-white cursor-pointer transition-all duration-200 hover:bg-[rgba(255,255,255,0.12)]"
        style={{
          fontFamily: "var(--font-heading)",
          background: open ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {localeLabels[locale]}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4L5 6.5L7.5 4" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full right-0 mt-2 py-1 min-w-[64px] rounded-md overflow-hidden"
          style={{
            background: "var(--dark-elevated)",
            border: "1px solid var(--dark-border)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {otherLocales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-[11px] font-semibold tracking-[1.5px] uppercase text-center transition-colors duration-150 hover:bg-[rgba(255,255,255,0.08)]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--mist)",
              }}
            >
              {localeLabels[loc]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
