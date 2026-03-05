"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useBooking } from "./BookingProvider";
import { ScrollReveal } from "./ScrollReveal";

const SCORING: number[][] = [
  [5, 10, 20, 0],
  [5, 10, 20, 0],
  [20, 15, 10, 0],
  [0, 5, 10, 20],
  [20, 15, 5, 0],
];

const OTHER_SCORE = 10;

function computeScore(answers: (number | null)[]): number {
  let total = 0;
  for (let i = 0; i < 5; i++) {
    const a = answers[i];
    if (a === null) continue;
    if (a === 4) {
      total += OTHER_SCORE;
    } else {
      total += SCORING[i][a] ?? 0;
    }
  }
  return total;
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M24 42s-16-10.4-16-22a10 10 0 0 1 16-8 10 10 0 0 1 16 8c0 11.6-16 22-16 22z"
        stroke="currentColor"
        strokeWidth="2"
        fill="rgba(82,183,136,0.15)"
      />
      <path
        d="M14 22h7l3-6 4 12 3-6h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function HealthCheckPage() {
  const t = useTranslations("assessment");
  const locale = useLocale();
  const { openBooking } = useBooking();
  const otherInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [otherTexts, setOtherTexts] = useState<string[]>(["", "", "", "", ""]);
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitting, setSubmitting] = useState(false);

  const questionIndex = step - 1;

  const selectOption = useCallback((optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
    if (optionIndex === 4) {
      setTimeout(() => otherInputRef.current?.focus(), 50);
    }
  }, [questionIndex]);

  const setOtherText = useCallback((text: string) => {
    setOtherTexts((prev) => {
      const next = [...prev];
      next[questionIndex] = text;
      return next;
    });
  }, [questionIndex]);

  const buildPayload = () => {
    const questions: { question: string; answer: string }[] = [];
    for (let i = 0; i < 5; i++) {
      const a = answers[i];
      const q = t(`questions.${i}.question`);
      let ans = "";
      if (a === null) {
        ans = "Skipped";
      } else if (a === 4) {
        ans = otherTexts[i] || "Other";
      } else {
        ans = t(`questions.${i}.options.${a}`);
      }
      questions.push({ question: q, answer: ans });
    }

    return {
      name: contact.name,
      email: contact.email,
      company: contact.company,
      score: computeScore(answers),
      answers: questions,
      locale,
      timestamp: new Date().toISOString(),
    };
  };

  const handleSubmit = async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_ASSESSMENT_WEBHOOK;

    // Only send to webhook if we have URL and contact info
    if (webhookUrl && contact.name && contact.email) {
      setSubmitting(true);
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPayload()),
        });
      } catch {
        // Continue to results on failure
      }
      setSubmitting(false);
    }

    // Always show results
    setStep(7);
  };

  const score = computeScore(answers);
  const scoreRange: "critical" | "needsWork" | "strong" =
    score <= 40 ? "critical" : score <= 70 ? "needsWork" : "strong";
  const scoreColor =
    score <= 40 ? "#e74c3c" : score <= 70 ? "var(--amber)" : "var(--spruce-light)";

  const options: string[] = step >= 1 && step <= 5
    ? (t.raw(`questions.${questionIndex}.options`) as string[])
    : [];

  const assessmentTopics = [
    "Lead tracking systems",
    "Follow-up automation",
    "Response time",
    "Data quality",
    "Deal tracking"
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--midnight)" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Frost noise overlay */}
      <div className="frost-noise absolute inset-0" />

      {/* Step 0 — Welcome */}
      {step === 0 && (
        <div className="relative z-10 min-h-screen flex items-center py-24 md:py-32">
          <div className="w-full max-w-[1100px] mx-auto px-5 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left side - Main content */}
              <ScrollReveal>
                <div>
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8"
                    style={{
                      background: "rgba(82,183,136,0.1)",
                      borderRadius: "var(--radius-badge)",
                      border: "1px solid rgba(82,183,136,0.2)",
                    }}
                  >
                    <ClockIcon className="text-[var(--spruce-light)]" />
                    <span
                      className="text-[12px] font-semibold tracking-[1px] uppercase"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--spruce-light)",
                      }}
                    >
                      2 min assessment
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className="text-[clamp(36px,5vw,56px)] leading-[1.1] mb-6"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--frost)",
                    }}
                  >
                    {t("welcome.title")}
                  </h1>

                  {/* Subtitle */}
                  <p
                    className="text-[18px] leading-[1.7] mb-10"
                    style={{ color: "var(--mist)" }}
                  >
                    {t("welcome.subtitle")}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => setStep(1)}
                    className="group px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,135,63,0.35)]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: "var(--amber)",
                      borderRadius: "var(--radius-button)",
                      transitionTimingFunction: "var(--fox-ease)",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      {t("welcome.start")}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </ScrollReveal>

              {/* Right side - Info card */}
              <ScrollReveal delay={1}>
                <div
                  className="relative p-8 md:p-10"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(82,183,136,0.1)",
                      borderRadius: "12px",
                    }}
                  >
                    <HeartPulseIcon className="text-[var(--spruce-light)]" />
                  </div>

                  {/* Card title */}
                  <h3
                    className="text-[20px] font-semibold mb-4"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--frost)",
                    }}
                  >
                    What we&apos;ll assess
                  </h3>

                  {/* Topics list */}
                  <ul className="space-y-3 mb-8">
                    {assessmentTopics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircleIcon className="text-[var(--spruce-light)] flex-shrink-0" />
                        <span
                          className="text-[15px]"
                          style={{ color: "var(--mist)" }}
                        >
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom note */}
                  <div
                    className="pt-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "var(--text-dark-muted)" }}
                    >
                      Get a personalized score and actionable recommendations based on your answers.
                    </p>
                  </div>

                  {/* Decorative gradient */}
                  <div
                    className="absolute -bottom-px -right-px w-32 h-32 opacity-50 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at bottom right, rgba(82,183,136,0.15) 0%, transparent 70%)",
                      borderRadius: "var(--radius-card)",
                    }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      )}

      {/* Steps 1–5 — Questions */}
      {step >= 1 && step <= 5 && (
        <div className="relative z-10 min-h-screen flex items-center py-24 md:py-32">
          <div className="w-full max-w-[700px] mx-auto px-5 md:px-8">
            <ScrollReveal>
              <div
                className="p-8 md:p-12"
                style={{
                  background: "var(--dark-surface)",
                  border: "1px solid var(--dark-border)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                {/* Progress bar */}
                <div className="flex gap-2 mb-10">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-2 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        background: i < step ? "var(--spruce-light)" : "var(--dark-border)",
                      }}
                    />
                  ))}
                </div>

                <p
                  className="text-[12px] font-semibold tracking-[1px] uppercase mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-dark-muted)",
                  }}
                >
                  {t("progress", { current: step, total: 5 })}
                </p>

                <h2
                  className="text-[24px] mb-8"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--frost)",
                  }}
                >
                  {t(`questions.${questionIndex}.question`)}
                </h2>

                {/* Options */}
                <div className="space-y-4 mb-10">
                  {options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => selectOption(i)}
                      className="w-full text-left px-6 py-5 border transition-all duration-200 cursor-pointer hover:border-[var(--spruce-light)]/50"
                      style={{
                        background:
                          answers[questionIndex] === i
                            ? "rgba(82,183,136,0.1)"
                            : "rgba(255,255,255,0.03)",
                        borderColor:
                          answers[questionIndex] === i
                            ? "var(--spruce-light)"
                            : "var(--dark-border)",
                        borderRadius: "var(--radius-card)",
                        color: "var(--frost)",
                        fontSize: "16px",
                      }}
                    >
                      {option}
                    </button>
                  ))}

                  {/* Other option */}
                  <button
                    onClick={() => selectOption(4)}
                    className="w-full text-left px-6 py-5 border transition-all duration-200 cursor-pointer hover:border-[var(--spruce-light)]/50"
                    style={{
                      background:
                        answers[questionIndex] === 4
                          ? "rgba(82,183,136,0.1)"
                          : "rgba(255,255,255,0.03)",
                      borderColor:
                        answers[questionIndex] === 4
                          ? "var(--spruce-light)"
                          : "var(--dark-border)",
                      borderRadius: "var(--radius-card)",
                      color: "var(--frost)",
                      fontSize: "16px",
                    }}
                  >
                    {answers[questionIndex] === 4 ? (
                      <input
                        ref={otherInputRef}
                        type="text"
                        value={otherTexts[questionIndex]}
                        onChange={(e) => setOtherText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder={t("other")}
                        className="w-full bg-transparent border-0 outline-none text-[16px]"
                        style={{ color: "var(--frost)" }}
                      />
                    ) : (
                      t("other")
                    )}
                  </button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-[14px] bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:opacity-80"
                    style={{ color: "var(--mist)" }}
                  >
                    {t("back")}
                  </button>
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={answers[questionIndex] === null}
                    className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: "var(--amber)",
                      borderRadius: "var(--radius-button)",
                      transitionTimingFunction: "var(--fox-ease)",
                    }}
                  >
                    {t("next")}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* Step 6 — Contact capture */}
      {step === 6 && (
        <div className="relative z-10 min-h-screen flex items-center py-24 md:py-32">
          <div className="w-full max-w-[700px] mx-auto px-5 md:px-8">
            <ScrollReveal>
              <div
                className="p-8 md:p-12"
                style={{
                  background: "var(--dark-surface)",
                  border: "1px solid var(--dark-border)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <h2
                  className="text-[28px] mb-3 text-center"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--frost)",
                  }}
                >
                  {t("contact.title")}
                </h2>
                <p
                  className="text-[15px] leading-relaxed text-center mb-10"
                  style={{ color: "var(--mist)" }}
                >
                  {t("contact.subtitle")}
                </p>

                <div className="space-y-5 mb-10">
                  <input
                    type="text"
                    placeholder={t("contact.name")}
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-6 py-5 text-[16px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card)",
                      color: "var(--frost)",
                    }}
                  />
                  <input
                    type="email"
                    placeholder={t("contact.email")}
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-6 py-5 text-[16px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card)",
                      color: "var(--frost)",
                    }}
                  />
                  <input
                    type="text"
                    placeholder={t("contact.company")}
                    value={contact.company}
                    onChange={(e) => setContact({ ...contact, company: e.target.value })}
                    className="w-full px-6 py-5 text-[16px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card)",
                      color: "var(--frost)",
                    }}
                  />
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !contact.name || !isValidEmail(contact.email)}
                    className="px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 mb-5"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: "var(--amber)",
                      borderRadius: "var(--radius-button)",
                      transitionTimingFunction: "var(--fox-ease)",
                    }}
                  >
                    {submitting ? "..." : t("contact.submit")}
                  </button>
                  <br />
                  <button
                    onClick={() => setStep(7)}
                    className="text-[14px] bg-transparent border-0 cursor-pointer underline underline-offset-4 transition-colors duration-200 hover:opacity-80"
                    style={{ color: "var(--mist)" }}
                  >
                    {t("contact.skip")}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* Step 7 — Results */}
      {step === 7 && (
        <div className="relative z-10 min-h-screen flex items-center py-24 md:py-32">
          <div className="w-full max-w-[700px] mx-auto px-5 md:px-8">
            <ScrollReveal>
              <div
                className="p-8 md:p-12 text-center"
                style={{
                  background: "var(--dark-surface)",
                  border: "1px solid var(--dark-border)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                {/* Score circle */}
                <div className="relative w-44 h-44 mx-auto mb-8">
                  <svg width="176" height="176" viewBox="0 0 176 176" className="rotate-[-90deg]">
                    <circle
                      cx="88"
                      cy="88"
                      r="78"
                      fill="none"
                      stroke="var(--dark-border)"
                      strokeWidth="10"
                    />
                    <circle
                      cx="88"
                      cy="88"
                      r="78"
                      fill="none"
                      stroke={scoreColor}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(score / 100) * 2 * Math.PI * 78} ${2 * Math.PI * 78}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[52px] font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: scoreColor,
                      }}
                    >
                      {score}
                    </span>
                  </div>
                </div>

                {/* Score label */}
                <p
                  className="text-[18px] font-semibold mb-5"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: scoreColor,
                  }}
                >
                  {t(`results.${scoreRange}.label`)}
                </p>

                {/* Diagnosis */}
                <p
                  className="text-[16px] leading-relaxed max-w-[480px] mx-auto mb-10"
                  style={{ color: "var(--mist)" }}
                >
                  {t(`results.${scoreRange}.message`)}
                </p>

                {/* CTA */}
                <button
                  onClick={openBooking}
                  className="px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "var(--amber)",
                    borderRadius: "var(--radius-button)",
                    transitionTimingFunction: "var(--fox-ease)",
                  }}
                >
                  {t("results.cta")}
                </button>
                <p
                  className="mt-4 text-[13px]"
                  style={{ color: "var(--text-dark-muted)" }}
                >
                  {t("results.ctaMicro")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </section>
  );
}
