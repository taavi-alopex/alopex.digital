"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

interface ProcessStep {
  title: string;
  phase: string;
  duration: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

export function Process() {
  const t = useTranslations("process");
  const steps: ProcessStep[] = t.raw("steps");
  const numbers = ["00", "01", "02", "03", "04", "05"];

  return (
    <section
      id="process"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--midnight)" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 10% 100%, rgba(45,106,79,0.12) 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 90% 0%, rgba(212,135,63,0.06) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16 md:mb-20">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text={t("label")} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)] mb-4"
              style={{ color: "var(--white)" }}
            >
              {t("title")}{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                {t("titleAccent")}
              </span>
            </h2>
            <p
              className="text-[16px] leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Process Steps */}
        <div className="space-y-8 md:space-y-12">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;

            return (
              <ScrollReveal key={numbers[i]} delay={i}>
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Header bar */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 md:p-6"
                    style={{
                      background: isLast
                        ? "linear-gradient(135deg, rgba(212,135,63,0.15) 0%, rgba(212,135,63,0.05) 100%)"
                        : "linear-gradient(135deg, rgba(45,106,79,0.15) 0%, rgba(45,106,79,0.05) 100%)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number badge */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold flex-shrink-0"
                        style={{
                          fontFamily: "var(--font-heading)",
                          background: isLast ? "var(--amber)" : "var(--spruce)",
                          color: "white",
                        }}
                      >
                        {numbers[i]}
                      </div>

                      <div>
                        {/* Phase label */}
                        <span
                          className="text-[10px] font-bold tracking-[2px] uppercase block mb-1"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: isLast
                              ? "var(--amber-light)"
                              : "var(--spruce-light)",
                          }}
                        >
                          {step.phase}
                        </span>

                        {/* Title */}
                        <h3
                          className="text-[20px] md:text-[24px] font-semibold"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: "var(--white)",
                          }}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div
                      className="sm:ml-auto px-4 py-2 rounded-full text-[12px] font-semibold w-fit"
                      style={{
                        fontFamily: "var(--font-heading)",
                        background: isLast
                          ? "rgba(212,135,63,0.2)"
                          : "rgba(45,106,79,0.2)",
                        color: isLast
                          ? "var(--amber-light)"
                          : "var(--spruce-light)",
                      }}
                    >
                      {step.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6">
                    {/* Description */}
                    <p
                      className="text-[15px] leading-[1.8] mb-6"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {step.description}
                    </p>

                    {/* Inputs and Outputs */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Inputs */}
                      <div
                        className="p-4 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ color: "var(--amber)" }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14"
                            />
                          </svg>
                          <span
                            className="text-[11px] font-bold tracking-[1.5px] uppercase"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: "var(--amber)",
                            }}
                          >
                            {t("inputLabel")}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {step.inputs.map((input, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-[13px]"
                              style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0"
                                style={{ background: "var(--amber-light)" }}
                              />
                              {input}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outputs */}
                      <div
                        className="p-4 rounded-xl"
                        style={{
                          background: isLast
                            ? "rgba(212,135,63,0.08)"
                            : "rgba(45,106,79,0.08)",
                          border: `1px solid ${isLast ? "rgba(212,135,63,0.2)" : "rgba(45,106,79,0.2)"}`,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{
                              color: isLast
                                ? "var(--amber)"
                                : "var(--spruce-light)",
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                          <span
                            className="text-[11px] font-bold tracking-[1.5px] uppercase"
                            style={{
                              fontFamily: "var(--font-heading)",
                              color: isLast
                                ? "var(--amber)"
                                : "var(--spruce-light)",
                            }}
                          >
                            {t("outputLabel")}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {step.outputs.map((output, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-[13px]"
                              style={{
                                color: isLast
                                  ? "var(--amber-light)"
                                  : "rgba(255,255,255,0.75)",
                              }}
                            >
                              <svg
                                className="w-4 h-4 mt-[1px] flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{
                                  color: isLast
                                    ? "var(--amber)"
                                    : "var(--spruce-light)",
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {output}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Timeline summary */}
        <ScrollReveal delay={5}>
          <div
            className="mt-16 p-6 md:p-8 rounded-2xl text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(45,106,79,0.1) 0%, rgba(212,135,63,0.1) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <p
              className="text-[14px] mb-2"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Total implementation timeline
            </p>
            <p
              className="text-[28px] md:text-[32px] font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--white)",
              }}
            >
              10-12 weeks{" "}
              <span style={{ color: "var(--spruce-light)" }}>
                from kickoff to live system
              </span>
            </p>
            <p
              className="text-[13px] mt-2"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Timelines vary based on scope and complexity
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
