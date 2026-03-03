"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

function StatItem({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 2000, started);

  return (
    <div className="text-center py-6">
      <div
        className="text-[clamp(36px,5vw,52px)] font-bold tracking-tight mb-2"
        style={{
          fontFamily: "var(--font-heading)",
          color: "white",
        }}
      >
        {count}
        <span style={{ color: "var(--amber-light)" }}>{suffix}</span>
      </div>
      <div
        className="text-[12px] font-semibold tracking-[2px] uppercase"
        style={{
          fontFamily: "var(--font-heading)",
          color: "rgba(255,255,255,0.65)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Stats() {
  const t = useTranslations("stats");
  const items: { value: number; suffix: string; label: string }[] = t.raw("items");
  const { ref, isRevealed } = useScrollReveal(0.3);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--spruce) 0%, #1a5c3f 50%, var(--midnight) 100%)",
      }}
    >
      {/* Frost noise */}
      <div className="frost-noise absolute inset-0 rounded-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((stat) => (
            <StatItem key={stat.label} {...stat} started={isRevealed} />
          ))}
        </div>
      </div>
    </section>
  );
}
