"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { useBooking } from "./BookingProvider";

interface InlineCTAProps {
  variant: "afterClients" | "afterProcess";
}

export function InlineCTA({ variant }: InlineCTAProps) {
  const t = useTranslations("inlineCta");
  const { openBooking } = useBooking();

  if (variant === "afterClients") {
    return (
      <div
        className="py-8 text-center"
        style={{ background: "var(--dark-surface)" }}
      >
        <ScrollReveal>
          <p
            className="text-[15px]"
            style={{ color: "var(--mist)" }}
          >
            {t("afterClients")}{" "}
            <button
              onClick={openBooking}
              className="border-0 bg-transparent cursor-pointer text-[15px] font-semibold underline underline-offset-4 transition-colors duration-200 hover:opacity-80"
              style={{ color: "var(--amber-light)" }}
            >
              {t("afterClientsLink")}
            </button>
          </p>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div
      className="py-12 text-center"
      style={{ background: "var(--off-white)" }}
    >
      <ScrollReveal>
        <button
          onClick={openBooking}
          className="px-8 py-3.5 text-[13px] font-semibold tracking-wide border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--amber)",
            color: "var(--midnight)",
            borderRadius: "8px",
            transitionTimingFunction: "var(--fox-ease)",
          }}
        >
          {t("afterProcess")}
        </button>
        <p
          className="mt-3 text-[12px]"
          style={{ color: "var(--dark-gray)" }}
        >
          {t("afterProcessMicro")}
        </p>
      </ScrollReveal>
    </div>
  );
}
