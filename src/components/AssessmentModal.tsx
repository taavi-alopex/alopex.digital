"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useBooking } from "./BookingProvider";
import { MetaEvents } from "./MetaPixel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SCORING: number[][] = [
  [5, 10, 20, 0],   // Q1: Spreadsheets=5, Basic CRM=10, GHL=20, Don't track=0
  [5, 10, 20, 0],   // Q2: Manual=5, Some automation=10, Fully automated=20, Depends=0
  [20, 15, 10, 0],  // Q3: 5 min=20, 1 hour=15, Same day=10, Next day+=0
  [0, 5, 10, 20],   // Q4: Don't have=0, Spreadsheet=5, Messy CRM=10, Clean=20
  [20, 15, 5, 0],   // Q5: None=20, A few=15, 10-20%=5, No idea=0
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

export function AssessmentModal({ isOpen, onClose }: Props) {
  const t = useTranslations("assessment");
  const locale = useLocale();
  const { openBooking } = useBooking();
  const overlayRef = useRef<HTMLDivElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [otherTexts, setOtherTexts] = useState<string[]>(["", "", "", "", ""]);
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setAnswers([null, null, null, null, null]);
      setOtherTexts(["", "", "", "", ""]);
      setContact({ name: "", email: "", company: "" });
      setSubmitting(false);
      setSubmitted(false);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

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
    if (!webhookUrl || !contact.name || !contact.email) return;

    setSubmitting(true);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      setSubmitted(true);
    } catch {
      // Still show results on failure
    }
    // Track Meta event
    MetaEvents.lead({ content_name: "RevOps Assessment" });
    setSubmitting(false);
    setStep(7);
  };

  const score = computeScore(answers);
  const scoreRange: "critical" | "needsWork" | "strong" =
    score <= 40 ? "critical" : score <= 70 ? "needsWork" : "strong";
  const scoreColor =
    score <= 40 ? "#e74c3c" : score <= 70 ? "var(--amber)" : "var(--spruce-light)";

  if (!isOpen) return null;

  const options: string[] = step >= 1 && step <= 5
    ? (t.raw(`questions.${questionIndex}.options`) as string[])
    : [];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "bookingFadeIn 0.3s var(--fox-ease, ease-out) forwards",
      }}
    >
      <div
        className="relative w-full max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto"
        style={{
          background: "var(--midnight, #161929)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--radius-card, 16px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          animation: "bookingSlideUp 0.3s var(--fox-ease, ease-out) forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-transparent border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {/* Step 0 — Welcome */}
          {step === 0 && (
            <div className="text-center py-8">
              {/* Health check icon */}
              <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 42s-16-10.4-16-22a10 10 0 0 1 16-8 10 10 0 0 1 16 8c0 11.6-16 22-16 22z" stroke="var(--spruce-light)" strokeWidth="2.5" fill="rgba(82,183,136,0.15)" />
                  <path d="M16 22h6l3-5 4 10 3-5h6" stroke="var(--spruce-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h2
                className="text-[28px] mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t("welcome.title")}
              </h2>
              <p
                className="text-[15px] leading-relaxed max-w-[420px] mx-auto mb-8"
                style={{ color: "var(--mist)" }}
              >
                {t("welcome.subtitle")}
              </p>
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "var(--amber)",
                  borderRadius: "var(--radius-button)",
                  transitionTimingFunction: "var(--fox-ease)",
                }}
              >
                {t("welcome.start")}
              </button>
            </div>
          )}

          {/* Steps 1–5 — Questions */}
          {step >= 1 && step <= 5 && (
            <div>
              {/* Progress bar */}
              <div className="flex gap-1.5 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full transition-colors duration-300"
                    style={{
                      background:
                        i < step
                          ? "var(--spruce-light)"
                          : "var(--dark-border)",
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

              <h3
                className="text-[20px] mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t(`questions.${questionIndex}.question`)}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(i)}
                    className="w-full text-left px-5 py-4 border transition-all duration-200 cursor-pointer"
                    style={{
                      background:
                        answers[questionIndex] === i
                          ? "rgba(82,183,136,0.1)"
                          : "rgba(255,255,255,0.03)",
                      borderColor:
                        answers[questionIndex] === i
                          ? "var(--spruce-light)"
                          : "var(--dark-border)",
                      borderRadius: "var(--radius-card, 12px)",
                      color: "var(--frost)",
                      fontSize: "15px",
                    }}
                  >
                    {option}
                  </button>
                ))}

                {/* Other option */}
                <button
                  onClick={() => selectOption(4)}
                  className="w-full text-left px-5 py-4 border transition-all duration-200 cursor-pointer"
                  style={{
                    background:
                      answers[questionIndex] === 4
                        ? "rgba(82,183,136,0.1)"
                        : "rgba(255,255,255,0.03)",
                    borderColor:
                      answers[questionIndex] === 4
                        ? "var(--spruce-light)"
                        : "var(--dark-border)",
                    borderRadius: "var(--radius-card, 12px)",
                    color: "var(--frost)",
                    fontSize: "15px",
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
                      className="w-full bg-transparent border-0 outline-none text-[15px]"
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
                  className="text-[13px] bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--mist)" }}
                >
                  {t("back")}
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={answers[questionIndex] === null}
                  className="px-6 py-3 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
          )}

          {/* Step 6 — Contact capture */}
          {step === 6 && (
            <div className="py-4">
              <h3
                className="text-[24px] mb-2 text-center"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t("contact.title")}
              </h3>
              <p
                className="text-[14px] leading-relaxed text-center mb-8"
                style={{ color: "var(--mist)" }}
              >
                {t("contact.subtitle")}
              </p>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder={t("contact.name")}
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full px-5 py-4 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "var(--dark-border)",
                    borderRadius: "var(--radius-card, 12px)",
                    color: "var(--frost)",
                  }}
                />
                <input
                  type="email"
                  placeholder={t("contact.email")}
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-5 py-4 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "var(--dark-border)",
                    borderRadius: "var(--radius-card, 12px)",
                    color: "var(--frost)",
                  }}
                />
                <input
                  type="text"
                  placeholder={t("contact.company")}
                  value={contact.company}
                  onChange={(e) => setContact({ ...contact, company: e.target.value })}
                  className="w-full px-5 py-4 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "var(--dark-border)",
                    borderRadius: "var(--radius-card, 12px)",
                    color: "var(--frost)",
                  }}
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !contact.name || !contact.email}
                  className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 mb-4"
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
                  className="text-[13px] bg-transparent border-0 cursor-pointer underline underline-offset-4 transition-colors duration-200 hover:opacity-80"
                  style={{ color: "var(--mist)" }}
                >
                  {t("contact.skip")}
                </button>
              </div>
            </div>
          )}

          {/* Step 7 — Results */}
          {step === 7 && (
            <div className="text-center py-4">
              {/* Score circle */}
              <div className="relative w-36 h-36 mx-auto mb-6">
                <svg width="144" height="144" viewBox="0 0 144 144" className="rotate-[-90deg]">
                  <circle
                    cx="72"
                    cy="72"
                    r="62"
                    fill="none"
                    stroke="var(--dark-border)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="62"
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * 2 * Math.PI * 62} ${2 * Math.PI * 62}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[40px] font-bold"
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
                className="text-[16px] font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: scoreColor,
                }}
              >
                {t(`results.${scoreRange}.label`)}
              </p>

              {/* Diagnosis */}
              <p
                className="text-[15px] leading-relaxed max-w-[440px] mx-auto mb-8"
                style={{ color: "var(--mist)" }}
              >
                {t(`results.${scoreRange}.message`)}
              </p>

              {/* CTA */}
              <button
                onClick={() => {
                  onClose();
                  setTimeout(openBooking, 300);
                }}
                className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
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
                className="mt-3 text-[12px]"
                style={{ color: "var(--text-dark-muted)" }}
              >
                {t("results.ctaMicro")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
