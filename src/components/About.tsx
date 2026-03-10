"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  const t = useTranslations("about");
  const regions: string[] = t.raw("regions");

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden topo-texture"
      style={{ background: "var(--off-white)" }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <SectionLabel text={t("label")} light />
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2
                className="text-[clamp(28px,4vw,42px)] mb-6"
                style={{ color: "var(--midnight)" }}
              >
                {t("title")}
                <span
                  className="italic"
                  style={{ color: "var(--spruce)" }}
                >
                  {t("titleAccent")}
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p
                className="text-[15px] leading-[1.8] mb-6"
                style={{ color: "var(--dark-gray)" }}
              >
                {t("p1")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p
                className="text-[15px] leading-[1.8] mb-8"
                style={{ color: "var(--dark-gray)" }}
              >
                {t("p2")}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="flex flex-wrap gap-3">
                {regions.map((region: string) => (
                  <span
                    key={region}
                    className="px-4 py-1.5 text-[10px] font-bold tracking-[1px] uppercase"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--spruce)",
                      background: "var(--spruce-pale)",
                      borderRadius: "var(--radius-badge)",
                    }}
                  >
                    {region}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Photo + accent card stack */}
          <div className="space-y-6">
            {/* Team photo */}
            <ScrollReveal delay={2} variant="fadeRight">
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "var(--radius-section)" }}
              >
                <Image
                  src="/images/team-collab.jpg"
                  alt="Alopex Digital team"
                  width={1200}
                  height={669}
                  className="w-full h-[220px] md:h-[260px] object-cover"
                  style={{ filter: "brightness(0.9)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(22, 25, 41, 0.4) 0%, transparent 60%)",
                  }}
                />
              </div>
            </ScrollReveal>

            {/* Purpose card */}
            <ScrollReveal delay={3} variant="fadeRight">
              <div
                className="relative p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, var(--midnight), var(--dark-navy))",
                  borderRadius: "var(--radius-section)",
                  boxShadow: "0 2px 40px rgba(0,0,0,0.1)",
                }}
              >
                <div className="frost-noise absolute inset-0 rounded-[16px] overflow-hidden" />
                <div className="relative z-10">
                  <p
                    className="text-[11px] font-bold tracking-[2px] uppercase mb-4"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--amber-light)",
                    }}
                  >
                    {t("purposeLabel")}
                  </p>
                  <blockquote
                    className="text-[clamp(20px,2.5vw,26px)] italic leading-[1.4] mb-6"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--frost)",
                    }}
                  >
                    {t("purposeQuote")}
                  </blockquote>
                  <div
                    className="h-[1px] mb-6"
                    style={{ background: "var(--dark-border)" }}
                  />
                  <p
                    className="text-[13px] leading-[1.7]"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    {t("purposeDescription")}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
