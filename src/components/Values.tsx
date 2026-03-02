"use client";

import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const values = [
  {
    title: "Ownership Mindset",
    subtitle: "Responsibility and Reward",
    description:
      "We treat our clients' businesses as our own. Proactive, fiduciary, and never saying 'that's not my job.' We bring positive change and reward results.",
  },
  {
    title: "Responsible Freedom",
    subtitle: "Disciplined Autonomy",
    description:
      "We work from anywhere, but we never leave the team hanging. Output over hours. Autonomy earned through reliability and high performance.",
  },
  {
    title: "Everything is Figureoutable",
    subtitle: "Technical Resourcefulness",
    description:
      "A relentless problem-solving mentality. We leverage collective intelligence — AI, documentation, community — to overcome every wall. 'I don't know' is never a final answer.",
  },
  {
    title: "Truth Over Ego",
    subtitle: "Meritocracy & Transparency",
    description:
      "Radical transparency with our team and clients. The best idea wins, regardless of title or tenure. We build trust through vulnerability and honesty.",
  },
  {
    title: "Have Heart",
    subtitle: "Empathy & Human Connection",
    description:
      "Behind every ticket and API call is a human being. We support each other's growth, well-being, and success. High performance requires high care.",
  },
];

export function Values() {
  return (
    <section
      id="values"
      className="relative py-24 md:py-32 overflow-hidden frost-noise"
      style={{ background: "var(--midnight)" }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text="Our Values" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--frost)" }}
            >
              What drives{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                everything we do
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Values list — editorial layout */}
        <div className="space-y-0">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i}>
              <div
                className={`py-10 ${
                  i < values.length - 1 ? "border-b" : ""
                }`}
                style={{
                  borderColor: "var(--dark-border)",
                }}
              >
                <div
                  className={`md:grid md:grid-cols-[1fr_1.5fr] md:gap-12 items-start ${
                    i % 2 !== 0 ? "md:text-right" : ""
                  }`}
                >
                  {/* Title side */}
                  <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                    <span
                      className="text-[11px] font-bold tracking-[2px] uppercase block mb-2"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--amber-light)",
                      }}
                    >
                      {value.subtitle}
                    </span>
                    <h3
                      className="text-[clamp(22px,3vw,30px)] italic mb-4 md:mb-0"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--frost)",
                      }}
                    >
                      {value.title}
                    </h3>
                  </div>

                  {/* Description side */}
                  <div className={i % 2 !== 0 ? "md:order-1" : ""}>
                    <p
                      className="text-[15px] leading-[1.8]"
                      style={{ color: "var(--text-dark-body)" }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
