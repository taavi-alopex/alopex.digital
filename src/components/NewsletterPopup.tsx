"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MetaEvents } from "./MetaPixel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
};

const WEBHOOK_URL = process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK || "";

// Basic email validation: must have @, domain, and TLD with dot
function isValidEmail(email: string): boolean {
  const trimmed = email.trim().toLowerCase();
  // Check basic structure: something@something.something
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(trimmed);
}

export function NewsletterPopup({ isOpen, onClose, onSubscribe }: Props) {
  const t = useTranslations("newsletter");
  const overlayRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "invalid">("idle");

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  // Reset state when reopened
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setStatus("idle");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !WEBHOOK_URL) return;

    // Validate email format
    if (!isValidEmail(email)) {
      setStatus("invalid");
      return;
    }

    setStatus("idle");
    setSubmitting(true);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        MetaEvents.lead({ content_name: "Newsletter Signup" });
        onSubscribe();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "bookingFadeIn 0.3s var(--fox-ease, ease-out) forwards",
      }}
    >
      <div
        className="relative w-full max-w-[480px] mx-4"
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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect
                x="6"
                y="12"
                width="36"
                height="24"
                rx="3"
                stroke="var(--spruce-light)"
                strokeWidth="2.5"
                fill="rgba(82,183,136,0.15)"
              />
              <path
                d="M6 15l18 12 18-12"
                stroke="var(--spruce-light)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {status === "success" ? (
            <>
              <h2
                className="text-[28px] mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t("success.title")}
              </h2>
              <p
                className="text-[15px] leading-relaxed max-w-[360px] mx-auto"
                style={{ color: "var(--mist)" }}
              >
                {t("success.message")}
              </p>
            </>
          ) : (
            <>
              <h2
                className="text-[28px] mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="text-[15px] leading-relaxed max-w-[360px] mx-auto mb-8"
                style={{ color: "var(--mist)" }}
              >
                {t("subtitle")}
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder={t("placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 text-[15px] border outline-none transition-colors duration-200 focus:border-[var(--spruce-light)] mb-4"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "var(--dark-border)",
                    borderRadius: "var(--radius-card, 12px)",
                    color: "var(--frost)",
                  }}
                />

                <button
                  type="submit"
                  disabled={submitting || !email}
                  className="w-full px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "var(--amber)",
                    borderRadius: "var(--radius-button)",
                    transitionTimingFunction: "var(--fox-ease)",
                  }}
                >
                  {submitting ? "..." : t("button")}
                </button>

                {(status === "error" || status === "invalid") && (
                  <p
                    className="mt-4 text-[13px]"
                    style={{ color: "#e74c3c" }}
                  >
                    {status === "invalid" ? t("invalidEmail") : t("error")}
                  </p>
                )}
              </form>

              <p
                className="mt-4 text-[12px]"
                style={{ color: "var(--text-dark-muted)" }}
              >
                {t("privacy")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
