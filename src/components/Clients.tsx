"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const clientIcons = [
  <svg key="install" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" />
  </svg>,
  <svg key="pipeline" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="marketplace" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>,
];

export function Clients() {
  const t = useTranslations("clients");
  const items: { industry: string; examples: string; pain: string }[] = t.raw("items");

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--midnight) 0%, var(--dark-surface) 100%)",
      }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text={t("label")} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(24px,3.5vw,36px)]"
              style={{ color: "var(--frost)" }}
            >
              {t("title")}{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Client type cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((client, i) => (
            <ScrollReveal key={client.industry} delay={i + 1}>
              <div
                className="group p-6 h-full transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--dark-border)",
                  transitionTimingFunction: "var(--fox-ease)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{
                    color: "var(--spruce-light)",
                  }}
                >
                  {clientIcons[i]}
                </div>

                <h3
                  className="text-[16px] font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--frost)",
                  }}
                >
                  {client.industry}
                </h3>

                <p
                  className="text-[12px] font-medium mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--spruce-light)",
                  }}
                >
                  {client.examples}
                </p>

                <p
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  {client.pain}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
