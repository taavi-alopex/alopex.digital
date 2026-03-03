"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

function OvisionLogo() {
  return (
    <svg
      width="120"
      height="31"
      viewBox="0 0 154 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ovision"
    >
      <defs>
        <linearGradient id="ov-a" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <circle cx="19" cy="19" r="16" fill="url(#ov-a)" opacity="0.9" />
      <circle cx="19" cy="19" r="8" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="19" cy="19" r="3" fill="#fff" />
      <text
        x="46"
        y="26"
        fontFamily="var(--font-heading), sans-serif"
        fontSize="22"
        fontWeight="600"
        letterSpacing="3"
        fill="currentColor"
      >
        OVISION
      </text>
    </svg>
  );
}

export function SocialProof() {
  const t = useTranslations("socialProof");

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--midnight) 0%, var(--dark-surface) 100%)",
      }}
    >
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
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Partners row */}
        <ScrollReveal delay={2}>
          <div className="flex items-center justify-center gap-12 mb-14">
            <div
              className="transition-all duration-300 opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
              style={{ color: "var(--frost)" }}
            >
              <OvisionLogo />
            </div>
            <span
              className="text-[20px] font-bold tracking-[4px] uppercase transition-all duration-300 opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--frost)",
              }}
            >
              GEMOSS
            </span>
          </div>
        </ScrollReveal>

        {/* Case study card */}
        <ScrollReveal delay={3}>
          <div
            className="border-l-4 p-8 md:p-10"
            style={{
              borderColor: "var(--spruce-light)",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "var(--radius-card)",
            }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3
                className="text-[20px] font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("caseStudy.client")}
              </h3>
              <span
                className="px-3 py-1 text-[11px] font-bold tracking-[1px] uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--spruce-light)",
                  background: "rgba(82,183,136,0.1)",
                  borderRadius: "var(--radius-badge)",
                }}
              >
                {t("caseStudy.industry")}
              </span>
            </div>

            <p
              className="text-[14px] leading-[1.7] mb-2"
              style={{ color: "var(--text-dark-muted)" }}
            >
              <strong style={{ color: "var(--frost)" }}>Challenge:</strong>{" "}
              {t("caseStudy.challenge")}
            </p>
            <p
              className="text-[14px] leading-[1.7] mb-6"
              style={{ color: "var(--text-dark-muted)" }}
            >
              <strong style={{ color: "var(--frost)" }}>Solution:</strong>{" "}
              {t("caseStudy.solution")}
            </p>

            <div className="flex flex-wrap items-end gap-4">
              <span
                className="text-[48px] font-bold leading-none"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--spruce-light)",
                }}
              >
                {t("caseStudy.result")}
              </span>
              <div className="pb-2">
                <p
                  className="text-[16px] font-semibold"
                  style={{ color: "var(--frost)" }}
                >
                  {t("caseStudy.resultLabel")}
                </p>
                <p
                  className="text-[13px]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  {t("caseStudy.resultDetail")}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
