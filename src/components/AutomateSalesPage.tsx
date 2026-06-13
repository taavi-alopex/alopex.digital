"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatedFoxLogo } from "@/components/AnimatedFoxLogo";
import { FoxLogo } from "@/components/FoxLogo";
import { AuroraEffect } from "@/components/AuroraEffect";
import { SpruceTreeline } from "@/components/SpruceTreeline";
import { SectionLabel } from "@/components/SectionLabel";
import { ScrollReveal } from "@/components/ScrollReveal";

// Lazy-load the Three.js starfield exactly like the homepage hero
const StarfieldBackground = lazy(() =>
  import("@/components/StarfieldBackground").then((m) => ({
    default: m.StarfieldBackground,
  }))
);

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/discovery-call-with-martin-teras-30min";

// Fires a PostHog event if PostHog is loaded. No-op until the snippet is added.
function track(event: string) {
  if (typeof window !== "undefined") {
    const w = window as unknown as { posthog?: { capture: (e: string) => void } };
    w.posthog?.capture(event);
  }
}

function BookLink({
  label,
  event,
  tone = "amber",
}: {
  label: string;
  event: string;
  tone?: "amber" | "dark";
}) {
  const isAmber = tone === "amber";
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ph-event={event}
      onClick={() => track(event)}
      className={`inline-flex items-center justify-center px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase border-2 border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-0.5 ${
        isAmber ? "text-white pulse-glow" : "text-[var(--off-white)]"
      }`}
      style={{
        fontFamily: "var(--font-heading)",
        background: isAmber ? "var(--amber)" : "var(--midnight)",
        borderRadius: "var(--radius-button)",
        transitionTimingFunction: "var(--fox-ease)",
      }}
    >
      {label}
    </a>
  );
}

export function AutomateSalesPage() {
  const t = useTranslations("automateSales");
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

  const steps = [0, 1, 2, 3, 4, 5, 6];
  const proofItems = [0, 1];
  const faqItems = [0, 1, 2, 3];

  return (
    <>
      {/* ============================================================
          HERO — layered, atmospheric (mirrors homepage Hero)
          ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 0: boreal forest photo with subtle parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-forest.jpg"
            alt=""
            fill
            priority
            quality={85}
            className="object-cover"
            style={{
              transform: `scale(1.05) translate(${(mousePos.x - 50) * 0.02}%, ${
                (mousePos.y - 50) * 0.02
              }%)`,
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(22, 25, 41, 0.78), rgba(22, 25, 41, 0.62) 40%, rgba(45, 106, 79, 0.4))",
            }}
          />
        </div>

        {/* Layer 1: 3D starfield */}
        <Suspense fallback={null}>
          <StarfieldBackground mouseX={mousePos.x} mouseY={mousePos.y} />
        </Suspense>

        {/* Layer 2: aurora */}
        <AuroraEffect />

        {/* Layer 3: mouse-following glow */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(45, 106, 79, 0.12), transparent 60%)`,
          }}
        />

        {/* Layer 4: frost noise + film grain */}
        <div className="absolute inset-0 z-[4] pointer-events-none frost-noise film-grain" />

        {/* Layer 5: geometric grid */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(82,183,136,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
          }}
        />

        {/* Layer 6: treeline silhouette */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none"
          style={{
            transform: `translateY(${Math.max(0, (mousePos.y - 50) * 0.05)}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <SpruceTreeline variant={1} opacity={0.15} />
        </div>

        <div className="relative z-10 text-center max-w-[820px] mx-auto px-5 py-32">
          {/* Animated fox logo */}
          <div
            className="mb-9"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded
                ? "translateY(0) scale(1)"
                : "translateY(16px) scale(0.9)",
              transition:
                "opacity 1s var(--fox-ease), transform 1s var(--fox-ease)",
            }}
          >
            <AnimatedFoxLogo size={120} glow animate={loaded} className="mx-auto" />
          </div>

          {/* Eyebrow */}
          <div
            className="flex justify-center"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s var(--fox-ease) 0.2s, transform 0.7s var(--fox-ease) 0.2s",
            }}
          >
            <SectionLabel text={t("hero.label")} />
          </div>

          {/* H1 — clip-mask reveal */}
          <h1
            className="text-[clamp(34px,5.8vw,60px)] leading-[1.05] text-[var(--frost)] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.7s var(--fox-ease) 0.35s",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            <span className="inline-block overflow-hidden align-bottom">
              <span
                className="inline-block"
                style={{
                  transform: loaded ? "translateY(0)" : "translateY(100%)",
                  transition: "transform 0.8s var(--fox-ease) 0.4s",
                }}
              >
                {t("hero.title")}
              </span>
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <span
                className="italic inline-block"
                style={{
                  color: "var(--spruce-light)",
                  transform: loaded ? "translateY(0)" : "translateY(100%)",
                  transition: "transform 0.8s var(--fox-ease) 0.55s",
                }}
              >
                {t("hero.titleAccent")}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[clamp(15px,1.9vw,18px)] leading-relaxed max-w-[600px] mx-auto mb-10"
            style={{
              color: "var(--mist)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s var(--fox-ease) 0.5s, transform 0.7s var(--fox-ease) 0.5s",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s var(--fox-ease) 0.65s, transform 0.7s var(--fox-ease) 0.65s",
            }}
          >
            <BookLink label={t("hero.cta")} event="cta_hero_book" />
            <p
              className="mt-5 text-[13px]"
              style={{ color: "var(--text-dark-muted)" }}
            >
              {t("hero.micro")}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
        >
          <span
            className="text-[10px] font-semibold tracking-[2px] uppercase"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--text-dark-muted)",
            }}
          >
            {t("hero.scroll")}
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

        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-[7] pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--off-white), transparent)",
          }}
        />
      </section>

      {/* ============================================================
          PROBLEM
          ============================================================ */}
      <section
        className="relative py-24 md:py-32 px-5"
        style={{ background: "var(--off-white)" }}
      >
        <div className="max-w-[760px] mx-auto">
          <ScrollReveal>
            <div className="flex justify-center md:justify-start">
              <div className="gradient-line mb-8" />
            </div>
            <h2
              className="text-[clamp(28px,4vw,44px)] leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-display)", color: "var(--midnight)" }}
            >
              {t("problem.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p
              className="text-[17px] leading-[1.8] mb-6"
              style={{ color: "rgba(22,25,41,0.78)" }}
            >
              {t("problem.p1")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p
              className="text-[18px] leading-[1.75] pl-6 border-l-2"
              style={{
                color: "var(--midnight)",
                borderColor: "var(--amber)",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
              }}
            >
              {t("problem.p2")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* treeline divider into dark */}
      <div className="relative" style={{ background: "var(--midnight)", marginTop: "-1px" }}>
        <SpruceTreeline variant={2} opacity={0.06} />
      </div>

      {/* ============================================================
          THE MACHINE — vertical timeline
          ============================================================ */}
      <section
        className="relative py-24 md:py-32 px-5 overflow-hidden frost-noise"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(45,106,79,0.10), transparent 55%), var(--midnight)",
        }}
      >
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <SectionLabel text="01 — 07" />
            <h2
              className="text-[clamp(28px,4vw,46px)] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--frost)" }}
            >
              {t("machine.title")}
            </h2>
            <p
              className="text-[17px] leading-[1.8] max-w-[620px] mb-14"
              style={{ color: "var(--mist)" }}
            >
              {t("machine.intro")}
            </p>
          </ScrollReveal>

          {/* timeline */}
          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-[23px] top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, var(--amber), rgba(212,135,63,0.15))",
              }}
            />
            <ScrollReveal stagger className="space-y-7">
              {steps.map((i) => (
                <div key={i} className="relative flex items-start gap-6 group">
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--amber)",
                      color: "var(--midnight)",
                      fontFamily: "var(--font-display)",
                      boxShadow: "0 0 0 6px var(--midnight), 0 8px 24px rgba(212,135,63,0.25)",
                    }}
                  >
                    <span className="text-[19px]">{i + 1}</span>
                  </div>
                  <div className="pt-1.5">
                    <h3
                      className="text-[19px] font-semibold mb-1"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--frost)",
                      }}
                    >
                      {t(`machine.steps.${i}.title`)}
                    </h3>
                    <p
                      className="text-[15px] leading-[1.7]"
                      style={{ color: "var(--text-dark-body)" }}
                    >
                      {t(`machine.steps.${i}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* meta-proof callout */}
          <ScrollReveal delay={1}>
            <div
              className="mt-14 rounded-2xl p-7 md:p-8 flex items-start gap-4"
              style={{
                background: "rgba(212,135,63,0.08)",
                border: "1px solid rgba(212,135,63,0.25)",
              }}
            >
              <span
                className="text-[var(--amber)] text-[22px] leading-none flex-shrink-0"
                aria-hidden
              >
                ✦
              </span>
              <p
                className="text-[17px] md:text-[19px] leading-[1.6] italic"
                style={{ fontFamily: "var(--font-display)", color: "var(--amber-light)" }}
              >
                {t("machine.metaProof")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* treeline divider into light */}
      <div className="relative" style={{ background: "var(--off-white)", marginTop: "-1px" }}>
        <SpruceTreeline variant={3} opacity={0.07} flip />
      </div>

      {/* ============================================================
          PROOF
          ============================================================ */}
      <section
        className="relative py-24 md:py-32 px-5"
        style={{ background: "var(--off-white)" }}
      >
        <div className="max-w-[920px] mx-auto">
          <ScrollReveal>
            <SectionLabel text="Track record" />
            <h2
              className="text-[clamp(28px,4vw,44px)] leading-[1.1] mb-12"
              style={{ fontFamily: "var(--font-display)", color: "var(--midnight)" }}
            >
              {t("proof.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger className="grid md:grid-cols-2 gap-6">
            {proofItems.map((i) => (
              <div
                key={i}
                className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--white)",
                  border: "1px solid rgba(22,25,41,0.08)",
                  boxShadow: "0 4px 24px rgba(22,25,41,0.04)",
                }}
              >
                <div
                  className="absolute left-0 top-8 bottom-8 w-1 rounded-r"
                  style={{ background: "var(--amber)" }}
                />
                <h3
                  className="text-[22px] font-semibold mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--midnight)",
                  }}
                >
                  {t(`proof.items.${i}.name`)}
                </h3>
                <p
                  className="text-[15px] leading-[1.75] mb-6"
                  style={{ color: "rgba(22,25,41,0.7)" }}
                >
                  {t(`proof.items.${i}.body`)}
                </p>
                <p
                  className="text-[16px] font-semibold inline-flex items-center gap-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}
                >
                  <span className="text-[var(--amber)]">→</span>
                  {t(`proof.items.${i}.result`)}
                </p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          ROI
          ============================================================ */}
      <section
        className="relative py-24 md:py-32 px-5 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 100%, rgba(45,106,79,0.10), transparent 55%), linear-gradient(160deg, var(--midnight), var(--dark-navy))",
        }}
      >
        <div className="max-w-[820px] mx-auto">
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-14 items-center">
            <div>
              <ScrollReveal>
                <h2
                  className="text-[clamp(28px,4vw,44px)] leading-[1.1] mb-6"
                  style={{ fontFamily: "var(--font-display)", color: "var(--frost)" }}
                >
                  {t("roi.title")}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={1}>
                <p
                  className="text-[16px] leading-[1.8] mb-6"
                  style={{ color: "var(--mist)" }}
                >
                  {t("roi.p1")}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={2}>
                <p
                  className="text-[19px] leading-[1.6] italic"
                  style={{ fontFamily: "var(--font-display)", color: "var(--amber-light)" }}
                >
                  {t("roi.p2")}
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="scale" delay={1}>
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--dark-border)",
                }}
              >
                {/* cost */}
                <p
                  className="text-[11px] uppercase tracking-[2px] mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-dark-muted)",
                  }}
                >
                  {t("roi.card.costLabel")}
                </p>
                <p
                  className="text-[20px] line-through"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--mist)",
                    textDecorationColor: "rgba(212,135,63,0.6)",
                  }}
                >
                  {t("roi.card.cost")}
                </p>

                {/* divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="h-px flex-1" style={{ background: "var(--dark-border)" }} />
                  <span
                    className="text-[11px] uppercase tracking-[2px]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-dark-muted)",
                    }}
                  >
                    vs
                  </span>
                  <div className="h-px flex-1" style={{ background: "var(--dark-border)" }} />
                </div>

                {/* machine */}
                <p
                  className="text-[11px] uppercase tracking-[2px] mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--amber)" }}
                >
                  {t("roi.card.machineLabel")}
                </p>
                <p
                  className="text-[clamp(36px,6vw,52px)] leading-none mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "var(--amber)" }}
                >
                  ∞
                </p>
                <p
                  className="text-[14px] leading-[1.5]"
                  style={{ color: "var(--mist)" }}
                >
                  {t("roi.card.machine")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — dark, layered (mirrors homepage CTA)
          ============================================================ */}
      <section
        className="relative py-24 md:py-36 px-5 overflow-hidden frost-noise film-grain"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(45,106,79,0.12), transparent 60%), linear-gradient(160deg, var(--midnight), var(--dark-navy))",
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/strategy-call.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ filter: "brightness(0.3)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(22, 25, 41, 0.88), rgba(40, 44, 62, 0.78))",
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <FoxLogo size={400} className="opacity-[0.03]" />
        </div>

        <div className="relative z-10 max-w-[640px] mx-auto text-center">
          <ScrollReveal variant="scale">
            <h2
              className="text-[clamp(30px,4.5vw,48px)] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-display)", color: "var(--frost)" }}
            >
              {t("ctaSection.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p
              className="text-[16px] leading-[1.8] mb-10"
              style={{ color: "var(--mist)" }}
            >
              {t("ctaSection.subtitle")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <BookLink label={t("ctaSection.button")} event="cta_footer_book" />
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section
        className="relative py-24 md:py-32 px-5"
        style={{ background: "var(--off-white)" }}
      >
        <div className="max-w-[760px] mx-auto">
          <ScrollReveal>
            <SectionLabel text="FAQ" />
            <h2
              className="text-[clamp(28px,4vw,44px)] leading-[1.1] mb-10"
              style={{ fontFamily: "var(--font-display)", color: "var(--midnight)" }}
            >
              {t("faq.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger className="space-y-2">
            {faqItems.map((i) => (
              <details
                key={i}
                className="group rounded-xl px-5 py-4 transition-colors"
                style={{ background: "var(--white)", border: "1px solid rgba(22,25,41,0.08)" }}
              >
                <summary
                  className="flex justify-between items-center cursor-pointer list-none text-[17px] font-semibold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}
                >
                  {t(`faq.items.${i}.q`)}
                  <span className="text-[var(--amber)] text-[22px] leading-none ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p
                  className="mt-4 text-[15px] leading-[1.75]"
                  style={{ color: "rgba(22,25,41,0.72)" }}
                >
                  {t(`faq.items.${i}.a`)}
                </p>
              </details>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
