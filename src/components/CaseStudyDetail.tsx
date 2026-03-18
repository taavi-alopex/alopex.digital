"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";
import { useBooking } from "./BookingProvider";

const clientLogos: Record<string, string> = {
  Ovision: "/ovision-logo.svg",
  Gemoss: "/gemoss-logo.svg",
};

function SectionBlock({
  label,
  text,
  items,
  highlight,
  color,
  delay,
}: {
  label: string;
  text: string;
  items: string[];
  highlight?: string;
  color: string;
  delay: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <div className="mb-12 md:mb-16">
        <span
          className="inline-block px-4 py-1.5 text-[11px] font-bold tracking-[2px] uppercase mb-5"
          style={{
            fontFamily: "var(--font-heading)",
            color,
            background: `${color}18`,
            borderRadius: "var(--radius-badge)",
          }}
        >
          {label}
        </span>
        <p
          className="text-[15px] md:text-[16px] leading-[1.8] mb-4"
          style={{ color: "var(--text-dark-muted)" }}
        >
          {text}
        </p>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[14px] leading-[1.7]"
              style={{ color: "var(--frost)" }}
            >
              <span
                className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: color }}
              />
              {item}
            </li>
          ))}
        </ul>
        {highlight && (
          <div
            className="mt-6 px-5 py-3 inline-block"
            style={{
              background: `${color}12`,
              borderLeft: `3px solid ${color}`,
              borderRadius: "0 var(--radius-badge) var(--radius-badge) 0",
            }}
          >
            <span
              className="text-[16px] font-bold"
              style={{ fontFamily: "var(--font-heading)", color }}
            >
              {highlight}
            </span>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

export function CaseStudyDetail({ slug }: { slug: string }) {
  const t = useTranslations("caseStudies");
  const { openBooking } = useBooking();

  const client = t(`items.${slug}.client`);
  const tag = t(`items.${slug}.tag`);
  const title = t(`items.${slug}.title`);
  const logo = clientLogos[client];

  const beforeText = t(`items.${slug}.before.text`);
  const beforeItems: string[] = t.raw(`items.${slug}.before.items`);
  const solutionText = t(`items.${slug}.solution.text`);
  const solutionItems: string[] = t.raw(`items.${slug}.solution.items`);
  const resultsText = t(`items.${slug}.results.text`);
  const resultsItems: string[] = t.raw(`items.${slug}.results.items`);
  const resultsHighlight = t(`items.${slug}.results.highlight`);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--midnight) 0%, var(--dark-surface) 100%)",
      }}
    >
      <div className="relative z-10 max-w-[800px] mx-auto px-5 md:px-8">
        {/* Back link */}
        <ScrollReveal>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[13px] font-medium mb-10 hover:text-[var(--spruce-light)] transition-colors duration-200"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--mist)",
            }}
          >
            &larr; {t("backLink")}
          </Link>
        </ScrollReveal>

        {/* Hero */}
        <ScrollReveal delay={1}>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-4 mb-5">
              {logo ? (
                <Image
                  src={logo}
                  alt={client}
                  width={100}
                  height={26}
                  className={`object-contain ${client === "Gemoss" ? "brightness-0 invert opacity-80" : ""}`}
                />
              ) : (
                <span
                  className="text-[16px] font-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--frost)",
                  }}
                >
                  {client}
                </span>
              )}
              <span
                className="px-3 py-1 text-[10px] font-bold tracking-[1px] uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--spruce-light)",
                  background: "rgba(82,183,136,0.1)",
                  borderRadius: "var(--radius-badge)",
                }}
              >
                {tag}
              </span>
            </div>
            <h1
              className="text-[clamp(28px,4vw,42px)] leading-[1.2]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--frost)",
              }}
            >
              {title}
            </h1>
          </div>
        </ScrollReveal>

        {/* Before */}
        <SectionBlock
          label={t("beforeLabel")}
          text={beforeText}
          items={beforeItems}
          color="var(--amber)"
          delay={2}
        />

        {/* Solution */}
        <SectionBlock
          label={t("solutionLabel")}
          text={solutionText}
          items={solutionItems}
          color="var(--spruce-light)"
          delay={3}
        />

        {/* Results */}
        <SectionBlock
          label={t("resultsLabel")}
          text={resultsText}
          items={resultsItems}
          highlight={resultsHighlight}
          color="var(--spruce-light)"
          delay={4}
        />

        {/* CTA */}
        <ScrollReveal delay={5}>
          <div
            className="mt-8 p-8 md:p-10 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "var(--radius-card)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="text-[22px] md:text-[26px] mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--frost)",
              }}
            >
              {t("ctaTitle")}
            </h3>
            <p
              className="text-[14px] leading-[1.7] mb-6 max-w-[500px] mx-auto"
              style={{ color: "var(--text-dark-muted)" }}
            >
              {t("ctaDescription")}
            </p>
            <button
              onClick={openBooking}
              className="px-8 py-3.5 text-[13px] font-semibold tracking-wide border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--amber)",
                color: "var(--midnight)",
                borderRadius: "8px",
                transitionTimingFunction: "var(--fox-ease)",
              }}
            >
              {t("ctaButton")}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
