"use client";

import { ScrollReveal } from "./ScrollReveal";
import { FoxLogo } from "./FoxLogo";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-hidden frost-noise film-grain"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(45, 106, 79, 0.12), transparent 60%), linear-gradient(160deg, var(--midnight), var(--dark-navy))",
      }}
    >
      {/* Background fox watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <FoxLogo size={400} className="opacity-[0.02]" />
      </div>

      <div className="relative z-10 max-w-[640px] mx-auto px-5 md:px-8 text-center">
        <ScrollReveal>
          <h2
            className="text-[clamp(30px,4.5vw,48px)] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--frost)",
            }}
          >
            Ready to stop{" "}
            <span className="italic" style={{ color: "var(--amber-light)" }}>
              leaking revenue?
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <p
            className="text-[16px] leading-[1.8] mb-10"
            style={{ color: "var(--mist)" }}
          >
            Book a free discovery call. We&apos;ll map your current pains and
            show you exactly where the opportunities are — no obligation,
            no sales pitch.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <a
            href="mailto:taavi@alopex.digital"
            className="inline-flex items-center justify-center px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase text-white border-2 border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 pulse-glow"
            style={{
              fontFamily: "var(--font-heading)",
              background: "var(--amber)",
              borderRadius: "var(--radius-button)",
              transitionTimingFunction: "var(--fox-ease)",
            }}
          >
            Book a Discovery Call
          </a>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p
            className="mt-6 text-[13px]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            Or email us directly at{" "}
            <a
              href="mailto:taavi@alopex.digital"
              className="underline hover:text-[var(--spruce-light)] transition-colors"
              style={{ color: "var(--mist)" }}
            >
              taavi@alopex.digital
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
