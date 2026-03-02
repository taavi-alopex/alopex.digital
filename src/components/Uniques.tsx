"use client";

import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const uniques = [
  {
    number: "01",
    title: "Strategic Blueprinting",
    subtitle: "We architect before we build",
    description:
      "We don't guess; we map your entire business process before building a single workflow. Most agencies skip straight to building. We mitigate risk by thinking like an owner first.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    accent: false,
  },
  {
    number: "02",
    title: "Advanced API Ecosystems",
    subtitle: "Beyond basic integrations",
    description:
      "We build custom API bridges that connect HighLevel to any legacy or local system. Your CRM becomes the central brain of your company, not just another tool.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    accent: false,
  },
  {
    number: "03",
    title: "Regional RevOps Fluency",
    subtitle: 'The "Maaletooja" factor',
    description:
      "We know the culture, the language, and the laws. GDPR, local payment gateways, regional tax logic — we're the bridge between world-class US tech and your specific market.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10" />
      </svg>
    ),
    accent: true,
  },
];

export function Uniques() {
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
              <SectionLabel text="Why Alopex" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--frost)" }}
            >
              Three things we do{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                differently
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {uniques.map((item, i) => (
            <ScrollReveal key={item.number} delay={i + 1}>
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
                    background: item.accent ? "var(--amber)" : "var(--spruce)",
                    borderRadius: "var(--radius-icon)",
                    color: "white",
                  }}
                >
                  {item.icon}
                </div>

                {/* Number */}
                <span
                  className="text-[11px] font-bold tracking-[2px]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: item.accent
                      ? "var(--amber-light)"
                      : "var(--spruce-light)",
                  }}
                >
                  {item.number}
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
                    background: item.accent
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
