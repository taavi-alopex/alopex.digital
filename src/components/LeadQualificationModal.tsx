"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Script from "next/script";
import { MetaEvents } from "./MetaPixel";

const CALENDAR_IDS: Record<string, string> = {
  et: "Wt3A4KaUfmwZzFwGMirM",
  pl: "anlzXzfzVMRmXFsp7Kao",
  en: "YFpWDPuPHUrGFkubfnlX",
};

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  email: string;
  budget: string;
  businessType: string;
  challenge: string;
  timeline: string;
};

export function LeadQualificationModal({ isOpen, onClose }: Props) {
  const t = useTranslations("qualification");
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    budget: "",
    businessType: "",
    challenge: "",
    timeline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const calendarId = CALENDAR_IDS[locale] || CALENDAR_IDS.en;
  const ghlUrl = `https://api.leadconnectorhq.com/widget/booking/${calendarId}`;

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({ email: "", budget: "", businessType: "", challenge: "", timeline: "" });
      setRecaptchaToken(null);
      setEmailSent(false);
      setSubmitting(false);
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

  // Render reCAPTCHA when step 3
  useEffect(() => {
    if (step === 3 && recaptchaLoaded && recaptchaRef.current && !recaptchaToken) {
      // Clear previous instance
      recaptchaRef.current.innerHTML = "";

      // Render new instance
      if (window.grecaptcha && window.grecaptcha.render) {
        try {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            callback: (token: string) => setRecaptchaToken(token),
            "expired-callback": () => setRecaptchaToken(null),
          });
        } catch {
          // Already rendered
        }
      }
    }
  }, [step, recaptchaLoaded, recaptchaToken]);

  // Send email to webhook (step 1 -> step 2)
  const captureEmail = useCallback(async () => {
    if (!formData.email || emailSent) return;

    const webhookUrl = process.env.NEXT_PUBLIC_GHL_QUALIFICATION_WEBHOOK;
    if (!webhookUrl) return;

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          locale,
          timestamp: new Date().toISOString(),
          step: "email_capture",
        }),
      });
      setEmailSent(true);
    } catch {
      // Continue anyway
    }
  }, [formData.email, locale, emailSent]);

  // Send full data to webhook (step 3 -> step 4)
  const submitFullData = useCallback(async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_QUALIFICATION_WEBHOOK;
    if (!webhookUrl) return;

    setSubmitting(true);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale,
          timestamp: new Date().toISOString(),
          step: "full_submission",
          recaptchaToken,
        }),
      });
    } catch {
      // Continue anyway
    }
    setSubmitting(false);
  }, [formData, locale, recaptchaToken]);

  const handleNext = async () => {
    if (step === 1) {
      await captureEmail();
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3 && recaptchaToken) {
      await submitFullData();
      // Track Meta events
      MetaEvents.lead({ content_name: "Qualification Flow", value: 0, currency: "EUR" });
      MetaEvents.schedule({ content_name: "Discovery Call" });
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 4) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.email && formData.email.includes("@");
    if (step === 2) return formData.budget && formData.businessType && formData.challenge && formData.timeline;
    if (step === 3) return !!recaptchaToken;
    return true;
  };

  if (!isOpen) return null;

  const budgetOptions = [
    { value: "under_2500", label: t("budgetOptions.under2500") },
    { value: "2500_5000", label: t("budgetOptions.2500to5000") },
    { value: "5000_10000", label: t("budgetOptions.5000to10000") },
    { value: "over_10000", label: t("budgetOptions.over10000") },
  ];

  const timelineOptions = [
    { value: "asap", label: t("timelineOptions.asap") },
    { value: "1_month", label: t("timelineOptions.1month") },
    { value: "3_months", label: t("timelineOptions.3months") },
    { value: "exploring", label: t("timelineOptions.exploring") },
  ];

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
      {/* reCAPTCHA Script */}
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        onLoad={() => setRecaptchaLoaded(true)}
      />

      <div
        className="relative w-full max-w-[700px] mx-4"
        style={{
          height: step === 4 ? "min(85vh, 800px)" : "auto",
          maxHeight: "90vh",
          animation: "bookingSlideUp 0.3s var(--fox-ease, ease-out) forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--midnight,#161929)] border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        {step < 4 ? (
          <div
            className="w-full rounded-xl overflow-hidden overflow-y-auto"
            style={{
              background: "var(--midnight, #161929)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              maxHeight: "90vh",
            }}
          >
            <div className="p-8 md:p-10">
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: s === step ? "32px" : "12px",
                      background: s <= step ? "var(--amber, #D4873F)" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* Step 1: Email Capture */}
              {step === 1 && (
                <div className="text-center">
                  <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--spruce-light, #52B788)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                  </div>
                  <h2 className="text-[24px] mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--frost, #E8EDF2)" }}>
                    {t("step1.title")}
                  </h2>
                  <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--mist, #C4CED8)" }}>
                    {t("step1.subtitle")}
                  </p>

                  <div className="max-w-sm mx-auto">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("step1.placeholder")}
                      className="w-full px-5 py-4 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "var(--frost)",
                      }}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Qualifying Questions */}
              {step === 2 && (
                <div>
                  <h2 className="text-[22px] mb-2 text-center" style={{ fontFamily: "var(--font-serif)", color: "var(--frost)" }}>
                    {t("step2.title")}
                  </h2>
                  <p className="text-[14px] leading-relaxed mb-8 text-center" style={{ color: "var(--mist)" }}>
                    {t("step2.subtitle")}
                  </p>

                  <div className="space-y-6">
                    {/* Budget */}
                    <div>
                      <label className="block text-[12px] font-semibold tracking-[1px] uppercase mb-3" style={{ color: "var(--mist)" }}>
                        {t("step2.budget")}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: opt.value })}
                            className="px-4 py-3 text-[13px] rounded-lg border transition-all duration-200 cursor-pointer text-left"
                            style={{
                              background: formData.budget === opt.value ? "rgba(212,135,63,0.15)" : "rgba(255,255,255,0.03)",
                              borderColor: formData.budget === opt.value ? "var(--amber)" : "rgba(255,255,255,0.08)",
                              color: formData.budget === opt.value ? "var(--amber)" : "var(--frost)",
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="block text-[12px] font-semibold tracking-[1px] uppercase mb-3" style={{ color: "var(--mist)" }}>
                        {t("step2.businessType")}
                      </label>
                      <input
                        type="text"
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        placeholder={t("step2.businessTypePlaceholder")}
                        className="w-full px-4 py-3 text-[14px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          borderColor: "rgba(255,255,255,0.08)",
                          borderRadius: "10px",
                          color: "var(--frost)",
                        }}
                      />
                    </div>

                    {/* Challenge */}
                    <div>
                      <label className="block text-[12px] font-semibold tracking-[1px] uppercase mb-3" style={{ color: "var(--mist)" }}>
                        {t("step2.challenge")}
                      </label>
                      <textarea
                        value={formData.challenge}
                        onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                        placeholder={t("step2.challengePlaceholder")}
                        rows={2}
                        className="w-full px-4 py-3 text-[14px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)] resize-none"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          borderColor: "rgba(255,255,255,0.08)",
                          borderRadius: "10px",
                          color: "var(--frost)",
                        }}
                      />
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-[12px] font-semibold tracking-[1px] uppercase mb-3" style={{ color: "var(--mist)" }}>
                        {t("step2.timeline")}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timelineOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: opt.value })}
                            className="px-4 py-3 text-[13px] rounded-lg border transition-all duration-200 cursor-pointer text-left"
                            style={{
                              background: formData.timeline === opt.value ? "rgba(212,135,63,0.15)" : "rgba(255,255,255,0.03)",
                              borderColor: formData.timeline === opt.value ? "var(--amber)" : "rgba(255,255,255,0.08)",
                              color: formData.timeline === opt.value ? "var(--amber)" : "var(--frost)",
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: reCAPTCHA */}
              {step === 3 && (
                <div className="text-center">
                  <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--spruce-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <h2 className="text-[22px] mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--frost)" }}>
                    {t("step3.title")}
                  </h2>
                  <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--mist)" }}>
                    {t("step3.subtitle")}
                  </p>

                  <div className="flex justify-center mb-4">
                    <div ref={recaptchaRef} />
                  </div>

                  {recaptchaToken && (
                    <p className="text-[13px] flex items-center justify-center gap-2" style={{ color: "var(--spruce-light)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      {t("step3.verified")}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-5 py-2.5 text-[13px] font-medium rounded-lg transition-colors cursor-pointer"
                    style={{ color: "var(--mist)" }}
                  >
                    {t("back")}
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  disabled={!isStepValid() || submitting}
                  className="px-8 py-3 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    background: "var(--amber)",
                    boxShadow: isStepValid() ? "0 4px 16px rgba(212,135,63,0.3)" : "none",
                  }}
                >
                  {submitting ? t("submitting") : step === 3 ? t("showCalendar") : t("continue")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Step 4: Calendar */
          <div
            className="w-full h-full rounded-xl overflow-hidden"
            style={{
              background: "var(--midnight, #161929)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            <iframe
              src={ghlUrl}
              className="w-full h-full border-0"
              title="Book a Discovery Call"
              allow="payment"
            />
          </div>
        )}
      </div>

      {/* GHL embed script */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />

      <style jsx global>{`
        @keyframes bookingFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bookingSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// Extend Window interface for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}
