"use client";

import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
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
              <SectionLabel text="Who We Are" light />
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <h2
                className="text-[clamp(28px,4vw,42px)] mb-6"
                style={{ color: "var(--midnight)" }}
              >
                The bridge between world-class tech
                <span
                  className="italic"
                  style={{ color: "var(--spruce)" }}
                >
                  {" "}and your market
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <p
                className="text-[15px] leading-[1.8] mb-6"
                style={{ color: "var(--dark-gray)" }}
              >
                Alopex Digital is the elite, lean &ldquo;Maaletooja&rdquo; of HighLevel
                infrastructure — bringing world-class US revenue operations
                technology to sales-led service businesses across Estonia, Poland,
                Scandinavia, and CEE.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <p
                className="text-[15px] leading-[1.8] mb-8"
                style={{ color: "var(--dark-gray)" }}
              >
                We don&apos;t just build systems. We architect clarity — mapping
                your entire business process before writing a single workflow.
                Then we build it, launch it, and make sure your team actually
                uses it. That&apos;s the difference.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={4}>
              <div className="flex flex-wrap gap-3">
                {["Estonia", "Poland", "Scandinavia", "CEE"].map((region) => (
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

          {/* Right: Visual accent card */}
          <ScrollReveal delay={2}>
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
                  Our Purpose
                </p>
                <blockquote
                  className="text-[clamp(20px,2.5vw,26px)] italic leading-[1.4] mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--frost)",
                  }}
                >
                  &ldquo;To orchestrate clarity and flow for ambitious
                  businesses.&rdquo;
                </blockquote>
                <div
                  className="h-[1px] mb-6"
                  style={{ background: "var(--dark-border)" }}
                />
                <p
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  We build freedom machines — automated systems that free up
                  your time so you can focus on growth.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
