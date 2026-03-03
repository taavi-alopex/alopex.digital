"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function RecruitmentModal({ isOpen, onClose }: Props) {
  const t = useTranslations("recruitment");
  const locale = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setForm({ name: "", email: "", role: "", message: "" });
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

  const handleSubmit = async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_GHL_RECRUITMENT_WEBHOOK;
    if (!webhookUrl || !form.name || !form.email) return;

    setSubmitting(true);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          message: form.message,
          locale,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Show success anyway — webhook failure shouldn't block UX
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

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
        className="relative w-full max-w-[560px] mx-4 max-h-[90vh] overflow-y-auto"
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
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                {/* Briefcase icon */}
                <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--spruce-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <line x1="12" y1="12" x2="12" y2="12.01" />
                  </svg>
                </div>
                <h2
                  className="text-[24px] mb-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--frost)",
                  }}
                >
                  {t("title")}
                </h2>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "var(--mist)" }}
                >
                  {t("subtitle")}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4 mb-8">
                <div>
                  <label
                    className="block text-[12px] font-semibold tracking-[1px] uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-dark-muted)",
                    }}
                  >
                    {t("name")} *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-3.5 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card, 12px)",
                      color: "var(--frost)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[12px] font-semibold tracking-[1px] uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-dark-muted)",
                    }}
                  >
                    {t("email")} *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-5 py-3.5 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card, 12px)",
                      color: "var(--frost)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[12px] font-semibold tracking-[1px] uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-dark-muted)",
                    }}
                  >
                    {t("role")}
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder={t("rolePlaceholder")}
                    className="w-full px-5 py-3.5 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card, 12px)",
                      color: "var(--frost)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[12px] font-semibold tracking-[1px] uppercase mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-dark-muted)",
                    }}
                  >
                    {t("message")}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("messagePlaceholder")}
                    rows={4}
                    className="w-full px-5 py-3.5 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)] resize-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "var(--dark-border)",
                      borderRadius: "var(--radius-card, 12px)",
                      color: "var(--frost)",
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !form.name || !form.email}
                  className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "var(--amber)",
                    borderRadius: "var(--radius-button)",
                    transitionTimingFunction: "var(--fox-ease)",
                  }}
                >
                  {submitting ? t("submitting") : t("submit")}
                </button>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full" style={{ background: "rgba(82,183,136,0.15)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--spruce-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3
                className="text-[24px] mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t("success")}
              </h3>
              <p
                className="text-[15px] leading-relaxed max-w-[380px] mx-auto"
                style={{ color: "var(--mist)" }}
              >
                {t("successMessage")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
