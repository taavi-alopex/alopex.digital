"use client";

import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { AuroraEffect } from "./AuroraEffect";
import { SpruceTreeline } from "./SpruceTreeline";
import { SectionLabel } from "./SectionLabel";
import { LeakCalculator } from "./LeakCalculator";
import { useBooking } from "./BookingProvider";

const StarfieldBackground = lazy(() =>
  import("./StarfieldBackground").then((m) => ({ default: m.StarfieldBackground }))
);

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function HeroVariantB() {
  const t = useTranslations("heroV2");
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 0: Forest background */}
      <div className="absolute inset-0 z-[0]">
        <Image
          src="/images/hero-forest.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={85}
          style={{
            transform: `scale(1.05) translate(${(mousePos.x - 50) * 0.02}%, ${(mousePos.y - 50) * 0.02}%)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(22, 25, 41, 0.8), rgba(22, 25, 41, 0.65) 40%, rgba(45, 106, 79, 0.35))",
          }}
        />
      </div>

      {/* Layer 1: Starfield */}
      <Suspense fallback={null}>
        <StarfieldBackground mouseX={mousePos.x} mouseY={mousePos.y} />
      </Suspense>

      {/* Layer 2: Aurora */}
      <AuroraEffect />

      {/* Layer 3: Mouse radial */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(212, 135, 63, 0.08), transparent 60%)`,
        }}
      />

      {/* Textures */}
      <div className="absolute inset-0 z-[4] pointer-events-none frost-noise film-grain" />

      {/* Grid */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]"
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

      {/* Treeline */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none"
        style={{
          transform: `translateY(${Math.max(0, (mousePos.y - 50) * 0.05)}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <SpruceTreeline variant={1} opacity={0.15} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[860px] mx-auto px-5 py-32">
        {/* Label */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.1s, transform 0.7s var(--fox-ease) 0.1s",
          }}
          className="flex justify-center"
        >
          <SectionLabel text={t("label")} />
        </div>

        {/* Big stat — 73% */}
        <div
          className="my-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            transition: "opacity 0.8s var(--fox-ease) 0.25s, transform 0.8s var(--fox-ease) 0.25s",
          }}
        >
          <span
            className="inline-block text-[clamp(72px,12vw,120px)] leading-none font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--amber)",
              textShadow: "0 4px 40px rgba(212, 135, 63, 0.3)",
            }}
          >
            <AnimatedCounter target={73} suffix="%" />
          </span>
        </div>

        {/* H1 — problem statement */}
        <h1
          className="text-[clamp(28px,4.5vw,48px)] text-[var(--frost)] mb-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.45s, transform 0.7s var(--fox-ease) 0.45s",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block"
              style={{
                transform: loaded ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.8s var(--fox-ease) 0.5s",
              }}
            >
              {t("title")}
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span
              className="italic inline-block"
              style={{
                color: "var(--amber-light)",
                transform: loaded ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.8s var(--fox-ease) 0.65s",
              }}
            >
              {t("titleAccent")}
            </span>
          </span>
        </h1>

        {/* Subtitle — revenue cost */}
        <p
          className="text-[clamp(14px,1.8vw,17px)] leading-relaxed max-w-[600px] mx-auto mb-5"
          style={{
            color: "var(--mist)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.6s, transform 0.7s var(--fox-ease) 0.6s",
            textShadow: "0 1px 10px rgba(0,0,0,0.4)",
          }}
        >
          {t("subtitle")}
        </p>

        {/* Leak Calculator */}
        <div
          className="mb-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.7s, transform 0.7s var(--fox-ease) 0.7s",
          }}
        >
          <LeakCalculator />
        </div>

        {/* Revenue hook question */}
        <p
          className="text-[clamp(14px,1.6vw,16px)] font-medium mb-8"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--mist)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.8s, transform 0.7s var(--fox-ease) 0.8s",
            textShadow: "0 1px 10px rgba(0,0,0,0.4)",
          }}
        >
          <em>{t("hook")}</em>
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.9s, transform 0.7s var(--fox-ease) 0.9s",
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
          <Link
            href="/process"
            className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]"
            style={{
              fontFamily: "var(--font-heading)",
              borderColor: "rgba(255,255,255,0.25)",
              borderRadius: "var(--radius-button)",
              transitionTimingFunction: "var(--fox-ease)",
              backdropFilter: "blur(8px)",
            }}
          >
            {t("ctaSecondary")}
          </Link>
        </div>

        {/* Assessment link */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 1s, transform 0.7s var(--fox-ease) 1s",
          }}
          className="mt-6"
        >
          <Link
            href="/health-check"
            className="text-[13px] underline underline-offset-4 transition-colors duration-200 hover:opacity-80"
            style={{ color: "var(--mist)" }}
          >
            {t("assessmentLink")} →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
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
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <circle cx="8" cy="8" r="2" fill="var(--spruce-light)" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[7] pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--midnight), transparent)",
        }}
      />
    </section>
  );
}
