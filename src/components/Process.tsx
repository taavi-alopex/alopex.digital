"use client";

import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const steps = [
  {
    number: "01",
    title: "The Systems Audit",
    phase: "Discovery",
    description:
      "We understand the problem before we prescribe the cure. In 1-2 meetings, we assess your current pains, processes, and bottlenecks to identify exactly where revenue is leaking.",
    detail: "1-2 meetings",
  },
  {
    number: "02",
    title: "The Strategic Blueprint",
    phase: "Planning",
    description:
      "A clear roadmap with no surprises. We map the full solution architecture, scope the timeline, and define every integration. This standalone deliverable is yours to keep.",
    detail: "Standalone paid deliverable",
  },
  {
    number: "03",
    title: "The Architecture Build",
    phase: "Implementation",
    description:
      "Transparent progress and technical excellence. We build your HighLevel infrastructure, integrate custom APIs, and configure automation — with weekly reporting via ClickUp.",
    detail: "Weekly progress reports",
  },
  {
    number: "04",
    title: "The Frictionless Launch",
    phase: "Onboarding",
    description:
      "We don't leave until your team is comfortable using the system. Hands-on training, UI tweaks, and adoption support — because delivery isn't done until your team is using it.",
    detail: "Hands-on training included",
  },
  {
    number: "05",
    title: "The Growth Loop",
    phase: "Ongoing",
    description:
      "We ensure the system evolves with your business. Bi-weekly stabilization calls transition to quarterly strategy reviews, keeping your infrastructure ahead of your growth.",
    detail: "Continuous evolution",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative py-24 md:py-32 overflow-hidden topo-texture"
      style={{ background: "var(--off-white)" }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-16 md:mb-20">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text="Our Process" light />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--midnight)" }}
            >
              The Systems{" "}
              <span className="italic" style={{ color: "var(--spruce)" }}>
                Orchestration Method
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, var(--spruce), var(--spruce-light), var(--amber))",
            }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="relative md:grid md:grid-cols-2 md:gap-12 md:py-8"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        background:
                          i === steps.length - 1
                            ? "var(--amber)"
                            : "var(--spruce)",
                        color: "white",
                        boxShadow: "0 0 0 6px var(--off-white)",
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content card */}
                  <ScrollReveal
                    delay={i}
                    className={`${
                      isEven
                        ? "md:col-start-1 md:text-right md:pr-16"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div
                      className="p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: "var(--white)",
                        borderRadius: "var(--radius-card)",
                        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                        border: "1px solid var(--frost)",
                        transitionTimingFunction: "var(--fox-ease)",
                      }}
                    >
                      {/* Mobile number */}
                      <div className="md:hidden flex items-center gap-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{
                            fontFamily: "var(--font-heading)",
                            background:
                              i === steps.length - 1
                                ? "var(--amber)"
                                : "var(--spruce)",
                            color: "white",
                          }}
                        >
                          {step.number}
                        </div>
                        <span
                          className="text-[10px] font-bold tracking-[2px] uppercase"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--spruce)",
                          }}
                        >
                          {step.phase}
                        </span>
                      </div>

                      {/* Desktop phase label */}
                      <span
                        className="hidden md:inline-block text-[10px] font-bold tracking-[2px] uppercase mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color:
                            i === steps.length - 1
                              ? "var(--amber)"
                              : "var(--spruce)",
                        }}
                      >
                        {step.phase}
                      </span>

                      <h3
                        className="text-[20px] font-semibold mb-3"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--midnight)",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-[14px] leading-[1.7] mb-4"
                        style={{ color: "var(--dark-gray)" }}
                      >
                        {step.description}
                      </p>

                      <span
                        className="inline-block px-3 py-1 text-[10px] font-bold tracking-[1px] uppercase"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color:
                            i === steps.length - 1
                              ? "var(--amber)"
                              : "var(--spruce)",
                          background:
                            i === steps.length - 1
                              ? "var(--amber-pale)"
                              : "var(--spruce-pale)",
                          borderRadius: "var(--radius-badge)",
                        }}
                      >
                        {step.detail}
                      </span>
                    </div>
                  </ScrollReveal>

                  {/* Empty column for alternating */}
                  {isEven && <div className="hidden md:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
