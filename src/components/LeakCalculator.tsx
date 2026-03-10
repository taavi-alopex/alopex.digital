"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function LeakCalculator() {
  const t = useTranslations("heroV2.calculator");
  const [dealValue, setDealValue] = useState(2000);
  const [leadsPerMonth, setLeadsPerMonth] = useState(50);
  const [animatedLost, setAnimatedLost] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // 73% of leads lost × 10% close rate = lost deals × deal value
  const lostLeads = Math.round(leadsPerMonth * 0.73);
  const lostDeals = lostLeads * 0.1;
  const lostRevenue = Math.round(lostDeals * dealValue);
  const lostAnnual = lostRevenue * 12;

  // Animate the lost revenue number
  useEffect(() => {
    const duration = 800;
    const start = performance.now();
    const startVal = animatedLost;
    const endVal = lostRevenue;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedLost(Math.round(startVal + (endVal - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lostRevenue]);

  const formatCurrency = (n: number) =>
    "€" + n.toLocaleString("en-EU");

  return (
    <div
      className="w-full max-w-[580px] mx-auto"
      style={{
        background: "rgba(22, 25, 41, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "var(--radius-section, 16px)",
        padding: "24px 28px",
      }}
    >
      {/* Inputs row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-[10px] font-bold tracking-[1.5px] uppercase mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--mist)",
            }}
          >
            {t("dealValueLabel")}
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium"
              style={{ color: "var(--amber)" }}
            >
              €
            </span>
            <input
              type="number"
              value={dealValue}
              onChange={(e) => {
                setDealValue(Number(e.target.value) || 0);
                setHasInteracted(true);
              }}
              className="w-full pl-7 pr-3 py-3 text-[16px] font-medium text-white outline-none"
              style={{
                fontFamily: "var(--font-body, sans-serif)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--amber)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.12)")
              }
            />
          </div>
        </div>
        <div>
          <label
            className="block text-[10px] font-bold tracking-[1.5px] uppercase mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--mist)",
            }}
          >
            {t("leadsLabel")}
          </label>
          <input
            type="number"
            value={leadsPerMonth}
            onChange={(e) => {
              setLeadsPerMonth(Number(e.target.value) || 0);
              setHasInteracted(true);
            }}
            className="w-full px-3 py-3 text-[16px] font-medium text-white outline-none"
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--amber)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.12)")
            }
          />
        </div>
      </div>

      {/* Result */}
      <div
        className="text-center py-3 px-4"
        style={{
          background: hasInteracted
            ? "rgba(212, 135, 63, 0.1)"
            : "rgba(255,255,255,0.03)",
          border: hasInteracted
            ? "1px solid rgba(212, 135, 63, 0.3)"
            : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px",
          transition: "all 0.4s ease",
        }}
      >
        <p
          className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--amber)",
          }}
        >
          {t("resultLabel")}
        </p>
        <p
          className="text-[clamp(24px,4vw,36px)] font-bold leading-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--amber-light)",
            textShadow: hasInteracted
              ? "0 0 20px rgba(212, 135, 63, 0.3)"
              : "none",
            transition: "text-shadow 0.4s ease",
          }}
        >
          {formatCurrency(animatedLost)}
          <span
            className="text-[14px] font-normal ml-1"
            style={{ color: "var(--mist)" }}
          >
            {t("perMonth")}
          </span>
        </p>
        <p
          className="text-[12px] mt-1"
          style={{ color: "var(--mid-gray)" }}
        >
          {t("breakdown", {
            lostLeads: lostLeads,
            lostDeals: lostDeals.toFixed(1),
            annual: formatCurrency(lostAnnual),
          })}
        </p>
      </div>
    </div>
  );
}
