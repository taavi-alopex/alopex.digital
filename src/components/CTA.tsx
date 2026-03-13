"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { FoxLogo } from "./FoxLogo";
import { useBooking } from "./BookingProvider";

export function CTA() {
  const t = useTranslations("cta");
  const { openBooking } = useBooking();

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-hidden frost-noise film-grain"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(45, 106, 79, 0.12), transparent 60%), linear-gradient(160deg, var(--midnight), var(--dark-navy))",
      }}
    >
      {/* Background photo with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/strategy-call.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(22, 25, 41, 0.85), rgba(40, 44, 62, 0.75))",
          }}
        />
      </div>

      {/* Fox watermark on top of photo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <FoxLogo size={400} className="opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-[640px] mx-auto px-5 md:px-8 text-center">
        <ScrollReveal variant="scale">
          <h2
            className="text-[clamp(30px,4.5vw,48px)] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--frost)",
            }}
          >
            {t("title")}{" "}
            <span className="italic shimmer-text">
              {t("titleAccent")}
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p
            className="text-[16px] leading-[1.8] mb-10"
            style={{ color: "var(--mist)" }}
          >
            {t("description")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <button
            onClick={openBooking}
            className="inline-flex items-center justify-center px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase text-white border-2 border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 pulse-glow"
            style={{
              fontFamily: "var(--font-heading)",
              background: "var(--amber)",
              borderRadius: "var(--radius-button)",
              transitionTimingFunction: "var(--fox-ease)",
            }}
          >
            {t("button")}
          </button>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p
            className="mt-6 text-[13px]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            {t("emailPrefix")}{" "}
            <a
              href="mailto:info@alopex.digital"
              className="underline hover:text-[var(--spruce-light)] transition-colors"
              style={{ color: "var(--mist)" }}
            >
              info@alopex.digital
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
