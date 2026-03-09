"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  logo: string;
  website?: string;
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 16H7.5C7.5 11.86 10.86 8.5 15 8.5V11C12.24 11 10 13.24 10 16V16.5H12.5C13.88 16.5 15 17.62 15 19V22C15 23.38 13.88 24.5 12.5 24.5H10C8.62 24.5 7.5 23.38 7.5 22V16H12.5ZM25 16H20C20 11.86 23.36 8.5 27.5 8.5V11C24.74 11 22.5 13.24 22.5 16V16.5H25C26.38 16.5 27.5 17.62 27.5 19V22C27.5 23.38 26.38 24.5 25 24.5H22.5C21.12 24.5 20 23.38 20 22V16H25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const isGemoss = testimonial.logo.includes("gemoss");
  const isOvision = testimonial.logo.includes("ovision");
  const isChanet = testimonial.logo.includes("chanet");

  return (
    <ScrollReveal delay={index + 2}>
      <div
        className="group relative h-full p-6 md:p-8 transition-all duration-500 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "var(--radius-card)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Quote icon */}
        <div
          className="absolute -top-3 -left-1 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
          style={{ color: "var(--spruce-light)" }}
        >
          <QuoteIcon className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        {/* Quote */}
        <blockquote
          className="relative z-10 text-[15px] md:text-[17px] leading-[1.7] mb-6 italic"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--frost)",
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Attribution */}
        <a
          href={testimonial.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 pt-4 border-t border-white/5 transition-opacity hover:opacity-80"
        >
          {/* Logo container */}
          <div
            className="relative flex-shrink-0 flex items-center justify-center"
            style={{
              width: isChanet ? "36px" : "48px",
              height: isChanet ? "36px" : "32px",
            }}
          >
            {isChanet ? (
              <Image
                src={testimonial.logo}
                alt={testimonial.name}
                width={32}
                height={32}
                className="object-contain"
              />
            ) : isGemoss ? (
              <Image
                src={testimonial.logo}
                alt={testimonial.name}
                width={100}
                height={20}
                className="object-contain brightness-0 invert opacity-80"
              />
            ) : isOvision ? (
              <Image
                src={testimonial.logo}
                alt={testimonial.name}
                width={100}
                height={26}
                className="object-contain"
              />
            ) : (
              <Image
                src={testimonial.logo}
                alt={testimonial.name}
                width={48}
                height={32}
                className="object-contain"
              />
            )}
          </div>

          {/* Name and title */}
          <div>
            <p
              className="text-[14px] font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--frost)",
              }}
            >
              {testimonial.name}
            </p>
            <p
              className="text-[12px]"
              style={{ color: "var(--text-dark-muted)" }}
            >
              {testimonial.title}
            </p>
          </div>
        </a>

        {/* Subtle glow on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(82,183,136,0.05) 0%, transparent 70%)",
            borderRadius: "var(--radius-card)",
          }}
        />
      </div>
    </ScrollReveal>
  );
}

export function SocialProof() {
  const t = useTranslations("socialProof");

  // Get testimonials array with website links
  const testimonials: Testimonial[] = [
    {
      quote: t("testimonials.0.quote"),
      name: t("testimonials.0.name"),
      title: t("testimonials.0.title"),
      logo: t("testimonials.0.logo"),
      website: "https://weq.ee/",
    },
    {
      quote: t("testimonials.1.quote"),
      name: t("testimonials.1.name"),
      title: t("testimonials.1.title"),
      logo: t("testimonials.1.logo"),
      website: "https://gemoss.ee/",
    },
    {
      quote: t("testimonials.2.quote"),
      name: t("testimonials.2.name"),
      title: t("testimonials.2.title"),
      logo: t("testimonials.2.logo"),
      website: "https://ovision.ee/",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--midnight) 0%, var(--dark-surface) 100%)",
      }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
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
              <span
                className="italic"
                style={{ color: "var(--spruce-light)" }}
              >
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Case study card */}
        <ScrollReveal delay={5}>
          <div className="max-w-[800px] mx-auto">
            <div className="flex justify-center mb-6">
              <span
                className="px-4 py-1.5 text-[11px] font-bold tracking-[2px] uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--amber)",
                  background: "rgba(212,135,63,0.1)",
                  borderRadius: "var(--radius-badge)",
                }}
              >
                {t("caseStudyLabel")}
              </span>
            </div>

            <div
              className="border-l-4 p-8 md:p-10"
              style={{
                borderColor: "var(--spruce-light)",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <a
                  href="https://www.koduaken.ee/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[20px] font-semibold transition-colors hover:text-[var(--spruce-light)]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--frost)",
                  }}
                >
                  {t("caseStudy.client")}
                </a>
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
