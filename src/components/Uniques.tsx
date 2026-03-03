"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const uniqueIcons = [
  <svg key="blueprint" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 3v18" />
  </svg>,
  <svg key="api" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>,
  <svg key="regional" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10" />
  </svg>,
];

const numbers = ["01", "02", "03"];
const accents = [false, false, true];

export function Uniques() {
  const t = useTranslations("uniques");
  const items: { title: string; subtitle: string; description: string }[] = t.raw("items");

  return (
    <section
      id="uniques"
      className="relative py-24 md:py-32 overflow-hidden frost-noise"
      style={{ background: "var(--midnight)" }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-16">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text={t("label")} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--frost)" }}
            >
              {t("title")}{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <ScrollReveal key={numbers[i]} delay={i + 1}>
              <div
                className="group relative p-7 md:p-8 h-full transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--dark-elevated)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--dark-border)",
                  transitionTimingFunction: "var(--fox-ease)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-[52px] h-[52px] flex items-center justify-center mb-6"
                  style={{
                    background: accents[i] ? "var(--amber)" : "var(--spruce)",
                    borderRadius: "var(--radius-icon)",
                    color: "white",
                  }}
                >
                  {uniqueIcons[i]}
                </div>

                {/* Number */}
                <span
                  className="text-[11px] font-bold tracking-[2px]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: accents[i]
                      ? "var(--amber-light)"
                      : "var(--spruce-light)",
                  }}
                >
                  {numbers[i]}
                </span>

                {/* Title */}
                <h3
                  className="text-[18px] font-semibold mt-2 mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--frost)",
                  }}
                >
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p
                  className="text-[12px] font-medium italic mb-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-dark-muted)",
                  }}
                >
                  {item.subtitle}
                </p>

                {/* Description */}
                <p
                  className="text-[14px] leading-[1.7]"
                  style={{ color: "var(--text-dark-body)" }}
                >
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: accents[i]
                      ? "var(--amber)"
                      : "var(--spruce)",
                    borderRadius: "1px",
                  }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
