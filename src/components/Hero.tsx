"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FoxLogo } from "./FoxLogo";
import { SectionLabel } from "./SectionLabel";
import { useBooking } from "./BookingProvider";

export function Hero() {
  const t = useTranslations("hero");
  const { openBooking } = useBooking();
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setLoaded(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden frost-noise film-grain"
      style={{
        background: `
          radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(45, 106, 79, 0.08), transparent 60%),
          radial-gradient(ellipse at 70% 90%, rgba(212, 135, 63, 0.06), transparent),
          linear-gradient(160deg, #161929, #1a1e2e 40%, rgba(45, 106, 79, 0.15))
        `,
      }}
    >
      {/* Geometric grid overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(82,183,136,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-[800px] mx-auto px-5 py-32">
        {/* Fox Logo */}
        <div
          className={`mb-10 transition-all duration-1000 ${
            loaded
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-90"
          }`}
          style={{ transitionTimingFunction: "var(--fox-ease)" }}
        >
          <FoxLogo size={140} glow className="mx-auto" />
        </div>

        {/* Label */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: "200ms",
            transitionTimingFunction: "var(--fox-ease)",
          }}
        >
          <SectionLabel text={t("label")} />
        </div>

        {/* H1 */}
        <h1
          className={`text-[clamp(32px,5.5vw,56px)] text-[var(--frost)] mb-6 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: "350ms",
            transitionTimingFunction: "var(--fox-ease)",
          }}
        >
          {t("title")}
          <br />
          <span className="italic" style={{ color: "var(--spruce-light)" }}>
            {t("titleAccent")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[clamp(14px,1.8vw,17px)] leading-relaxed max-w-[560px] mx-auto mb-10 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            color: "var(--mist)",
            transitionDelay: "500ms",
            transitionTimingFunction: "var(--fox-ease)",
          }}
        >
          {t("subtitle")}
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: "650ms",
            transitionTimingFunction: "var(--fox-ease)",
          }}
        >
          <button
            onClick={openBooking}
            className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-2 border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 pulse-glow"
            style={{
              fontFamily: "var(--font-heading)",
              background: "var(--amber)",
              borderRadius: "var(--radius-button)",
              transitionTimingFunction: "var(--fox-ease)",
            }}
          >
            {t("ctaPrimary")}
          </button>
          <a
            href="#process"
            className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]"
            style={{
              fontFamily: "var(--font-heading)",
              borderColor: "rgba(255,255,255,0.25)",
              borderRadius: "var(--radius-button)",
              transitionTimingFunction: "var(--fox-ease)",
            }}
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <span
          className="text-[10px] font-semibold tracking-[2px] uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-dark-muted)",
          }}
        >
          {t("scroll")}
        </span>
        <div className="scroll-indicator">
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="var(--mist)"
            strokeWidth="1.5"
          >
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <circle cx="8" cy="8" r="2" fill="var(--spruce-light)" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--midnight), transparent)",
        }}
      />
    </section>
  );
}
