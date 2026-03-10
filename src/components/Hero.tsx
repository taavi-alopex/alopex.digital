"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { AnimatedFoxLogo } from "./AnimatedFoxLogo";
import { AuroraEffect } from "./AuroraEffect";
import { SpruceTreeline } from "./SpruceTreeline";
import { SectionLabel } from "./SectionLabel";
import { MagneticButton } from "./MagneticButton";
import { useBooking } from "./BookingProvider";

// Lazy load Three.js starfield for performance
const StarfieldBackground = lazy(() =>
  import("./StarfieldBackground").then((m) => ({ default: m.StarfieldBackground }))
);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 0: Photorealistic boreal forest background */}
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
        {/* Dark overlay to keep text readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(22, 25, 41, 0.75), rgba(22, 25, 41, 0.6) 40%, rgba(45, 106, 79, 0.4))",
          }}
        />
      </div>

      {/* Layer 1: 3D Starfield */}
      <Suspense fallback={null}>
        <StarfieldBackground mouseX={mousePos.x} mouseY={mousePos.y} />
      </Suspense>

      {/* Layer 2: Aurora overlay */}
      <AuroraEffect />

      {/* Layer 3: Mouse-following radial glow */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(45, 106, 79, 0.12), transparent 60%)
          `,
        }}
      />

      {/* Frost noise + film grain textures */}
      <div className="absolute inset-0 z-[4] pointer-events-none frost-noise film-grain" />

      {/* Geometric grid overlay */}
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

      {/* Layer 5: Spruce treeline silhouette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none"
        style={{
          transform: `translateY(${Math.max(0, (mousePos.y - 50) * 0.05)}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <SpruceTreeline variant={1} opacity={0.15} />
      </div>

      <div className="relative z-10 text-center max-w-[800px] mx-auto px-5 py-32">
        {/* Fox Logo — animated draw-in */}
        <div
          className="mb-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
            transition: "opacity 1s var(--fox-ease), transform 1s var(--fox-ease)",
          }}
        >
          <AnimatedFoxLogo size={140} glow animate={loaded} className="mx-auto" />
        </div>

        {/* Label */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.2s, transform 0.7s var(--fox-ease) 0.2s",
          }}
          className="flex justify-center"
        >
          <SectionLabel text={t("label")} />
        </div>

        {/* H1 — clip-mask text reveal */}
        <h1
          className="text-[clamp(32px,5.5vw,56px)] text-[var(--frost)] mb-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.35s, transform 0.7s var(--fox-ease) 0.35s",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block"
              style={{
                transform: loaded ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.8s var(--fox-ease) 0.4s",
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
                color: "var(--spruce-light)",
                transform: loaded ? "translateY(0)" : "translateY(100%)",
                transition: "transform 0.8s var(--fox-ease) 0.55s",
              }}
            >
              {t("titleAccent")}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[clamp(14px,1.8vw,17px)] leading-relaxed max-w-[560px] mx-auto mb-10"
          style={{
            color: "var(--mist)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.5s, transform 0.7s var(--fox-ease) 0.5s",
            textShadow: "0 1px 10px rgba(0,0,0,0.4)",
          }}
        >
          {t("subtitle")}
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s var(--fox-ease) 0.65s, transform 0.7s var(--fox-ease) 0.65s",
          }}
        >
          <MagneticButton
            onClick={openBooking}
            className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase text-white border-2 border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 pulse-glow"
            style={{
              fontFamily: "var(--font-heading)",
              background: "var(--amber)",
              borderRadius: "var(--radius-button)",
            }}
          >
            {t("ctaPrimary")}
          </MagneticButton>
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
            transition: "opacity 0.7s var(--fox-ease) 0.8s, transform 0.7s var(--fox-ease) 0.8s",
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
        className="absolute bottom-0 left-0 right-0 h-32 z-[7] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--midnight), transparent)",
        }}
      />
    </section>
  );
}
