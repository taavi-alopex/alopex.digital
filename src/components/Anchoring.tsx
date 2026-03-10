"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";
import { MagneticButton } from "./MagneticButton";
import { useBooking } from "./BookingProvider";

export function Anchoring() {
  const t = useTranslations("anchoring");
  const { openBooking } = useBooking();
  const inHouseItems: string[] = t.raw("inHouse.items");
  const alopexItems: string[] = t.raw("alopex.items");

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--frost)" }}
    >
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text={t("label")} light />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--midnight)" }}
            >
              {t("title")}{" "}
              <span className="italic" style={{ color: "var(--amber)" }}>
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Comparison grid — slide from opposite sides */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left card — Hire In-House */}
          <ScrollReveal delay={1} variant="fadeLeft">
            <div
              className="p-8 md:p-10 h-full border-t-4 card-hover-glow"
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                borderColor: "#c0392b",
              }}
            >
              <h3
                className="text-[20px] font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--midnight)",
                }}
              >
                {t("inHouse.title")}
              </h3>

              <p
                className="text-[28px] font-bold mb-6 line-through opacity-60"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--midnight)",
                }}
              >
                {t("inHouse.salary")}
              </p>

              <ul className="space-y-3">
                {inHouseItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px]"
                    style={{ color: "var(--dark-gray)" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="shrink-0 mt-0.5"
                    >
                      <path
                        d="M4 4l10 10M14 4L4 14"
                        stroke="#c0392b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Right card — Work with Alopex */}
          <ScrollReveal delay={2} variant="fadeRight">
            <div
              className="p-8 md:p-10 h-full border-t-4 card-hover-glow"
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                borderColor: "var(--spruce)",
              }}
            >
              <h3
                className="text-[20px] font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--midnight)",
                }}
              >
                {t("alopex.title")}
              </h3>

              {/* Highlight badge */}
              <span
                className="inline-block px-4 py-2 text-[11px] font-bold tracking-[1px] uppercase mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--spruce)",
                  background: "var(--spruce-pale)",
                  borderRadius: "var(--radius-badge)",
                }}
              >
                {t("alopex.highlight")}
              </span>

              <ul className="space-y-3">
                {alopexItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px]"
                    style={{ color: "var(--dark-gray)" }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="shrink-0 mt-0.5"
                    >
                      <path
                        d="M3 9.5l4 4 8-8"
                        stroke="var(--spruce)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={3}>
          <div className="text-center mt-12">
            <MagneticButton
              onClick={openBooking}
              className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-2 border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--amber)",
                borderRadius: "var(--radius-button)",
              }}
            >
              {t("cta")}
            </MagneticButton>
            <p
              className="mt-3 text-[12px]"
              style={{ color: "var(--dark-gray)" }}
            >
              {t("ctaMicro")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
