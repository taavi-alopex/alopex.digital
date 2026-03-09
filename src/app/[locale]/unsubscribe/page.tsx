"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FoxLogo } from "@/components/FoxLogo";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_UNSUBSCRIBE_WEBHOOK || "";

export default function UnsubscribePage() {
  const t = useTranslations("unsubscribe");
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState<string | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);

  useEffect(() => {
    setEmail(searchParams.get("email"));
    setContactId(searchParams.get("id"));
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    if (!contactId || !WEBHOOK_URL) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          email,
          action: "unsubscribe",
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "var(--midnight, #161929)" }}
    >
      <div
        className="w-full max-w-[480px] text-center p-10"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "var(--radius-card, 16px)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <FoxLogo size={48} glow />
        </div>

        {status === "success" ? (
          <>
            {/* Success state */}
            <div className="mb-6">
              <svg
                className="mx-auto"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#52B788"
                  strokeWidth="2"
                  fill="rgba(82,183,136,0.1)"
                />
                <path
                  d="M22 32l7 7 13-13"
                  stroke="#52B788"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1
              className="text-[28px] mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--frost, #E8EDF2)",
              }}
            >
              {t("success.title")}
            </h1>
            <p
              className="text-[16px] leading-relaxed mb-8"
              style={{ color: "var(--mist, #C4CED8)" }}
            >
              {t("success.message")}
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--spruce, #2D6A4F)",
                borderRadius: "var(--radius-button, 8px)",
              }}
            >
              {t("success.backHome")}
            </a>
          </>
        ) : (
          <>
            {/* Confirmation state */}
            <h1
              className="text-[28px] mb-4"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--frost, #E8EDF2)",
              }}
            >
              {t("title")}
            </h1>
            <p
              className="text-[16px] leading-relaxed mb-2"
              style={{ color: "var(--mist, #C4CED8)" }}
            >
              {t("message")}
            </p>
            {email && (
              <p
                className="text-[14px] mb-8 font-medium"
                style={{ color: "var(--frost, #E8EDF2)" }}
              >
                {email}
              </p>
            )}

            <button
              onClick={handleUnsubscribe}
              disabled={status === "loading" || !contactId}
              className="w-full px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--amber, #D4873F)",
                borderRadius: "var(--radius-button, 8px)",
              }}
            >
              {status === "loading" ? "..." : t("button")}
            </button>

            {status === "error" && (
              <p
                className="text-[14px] mb-4"
                style={{ color: "#e74c3c" }}
              >
                {t("error")}
              </p>
            )}

            <a
              href="/"
              className="text-[14px] underline underline-offset-4 transition-colors hover:text-[var(--spruce-light)]"
              style={{ color: "var(--mist, #C4CED8)" }}
            >
              {t("cancel")}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
