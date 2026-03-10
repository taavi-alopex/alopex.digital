"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const guaranteeIcons = [
  <svg key="adoption" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="credit" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>,
];

export function Guarantee() {
  const t = useTranslations("guarantee");
  const items: { title: string; description: string; highlight: string }[] = t.raw("items");

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, var(--midnight) 0%, #1a1f35 50%, #1b2a3a 100%)",
      }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 frost-noise pointer-events-none" style={{ opacity: 0.04 }} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(82,183,136,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
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
              <span className="italic" style={{ color: "var(--amber-light)" }}>
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Guarantee cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i + 1} variant={i === 0 ? "fadeLeft" : "fadeRight"}>
              <div
                className="p-8 md:p-10 h-full tilt-card card-hover-glow-dark"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-6"
                  style={{
                    background: i === 0 ? "var(--spruce)" : "var(--amber)",
                    borderRadius: "var(--radius-icon)",
                    color: "white",
                    boxShadow: i === 0
                      ? "0 4px 20px rgba(45, 106, 79, 0.3)"
                      : "0 4px 20px rgba(212, 135, 63, 0.3)",
                  }}
                >
                  {guaranteeIcons[i]}
                </div>

                <h3
                  className="text-[22px] font-semibold mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--frost)",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-[15px] leading-[1.8] mb-6"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  {item.description}
                </p>

                {/* Highlight badge */}
                <span
                  className="inline-block px-4 py-2 text-[11px] font-bold tracking-[1px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: i === 0 ? "var(--spruce-light)" : "var(--amber-light)",
                    background: i === 0
                      ? "rgba(45, 106, 79, 0.15)"
                      : "rgba(212, 135, 63, 0.15)",
                    borderRadius: "var(--radius-badge)",
                    border: i === 0
                      ? "1px solid rgba(82, 183, 136, 0.2)"
                      : "1px solid rgba(212, 135, 63, 0.2)",
                  }}
                >
                  {item.highlight}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
