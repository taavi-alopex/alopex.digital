"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

/* ── Platform capability icons (GoHighLevel) ── */
const platformIcons = [
  // CRM & Pipeline
  <svg key="crm" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // Marketing Automation
  <svg key="automation" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>,
  // Calendar & Booking
  <svg key="calendar" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>,
  // Reputation Management
  <svg key="reputation" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
  // Websites & Funnels
  <svg key="funnels" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>,
  // Forms & Surveys
  <svg key="forms" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>,
  // Invoicing & Payments
  <svg key="payments" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>,
  // Reporting & Dashboards
  <svg key="dashboards" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>,
];

/* ── Integration icons (n8n) ── */
const integrationIcons = [
  // ERP & Accounting
  <svg key="erp" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M8 10h8M8 14h4" />
  </svg>,
  // E-Signature
  <svg key="esign" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>,
  // Payment Gateways
  <svg key="gateway" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  // Government Portals
  <svg key="gov" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
  </svg>,
  // Legacy CRM Migration
  <svg key="migration" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" />
  </svg>,
  // Custom API Bridges
  <svg key="api" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>,
];

/* ── Use case icons ── */
const useCaseIcons = [
  // Solar/HVAC — house
  <svg key="install" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z" />
  </svg>,
  // Real Estate/Consulting — people
  <svg key="pipeline" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // Recruitment/Staffing — exchange arrows
  <svg key="marketplace" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>,
];

export function Services() {
  const t = useTranslations("services");
  const platformItems: { title: string; description: string }[] = t.raw("platformItems");
  const integrationItems: { title: string; description: string }[] = t.raw("integrationItems");
  const useCases: { industry: string; examples: string; pain: string; solution: string; outcome: string }[] = t.raw("useCases");

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden topo-texture"
      style={{ background: "var(--off-white)" }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* ── Section Header ── */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text={t("label")} light />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)] mb-4"
              style={{ color: "var(--midnight)" }}
            >
              {t("title")}{" "}
              <span className="italic" style={{ color: "var(--spruce)" }}>
                {t("titleAccent")}
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p
              className="text-[15px] leading-[1.7] max-w-[560px] mx-auto"
              style={{ color: "var(--dark-gray)" }}
            >
              {t("intro")}
            </p>
          </ScrollReveal>
        </div>

        {/* ── Capabilities Grid ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* GoHighLevel Platform */}
          <ScrollReveal delay={1}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "var(--spruce)", color: "white" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <h3
                  className="text-[14px] font-bold tracking-[1.5px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--spruce)",
                  }}
                >
                  {t("platformLabel")}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {platformItems.map((item, i) => (
                  <div
                    key={item.title}
                    className="group flex gap-3 p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "var(--white)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--frost)",
                      transitionTimingFunction: "var(--fox-ease)",
                    }}
                  >
                    <div
                      className="w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{
                        color: "var(--spruce)",
                        background: "var(--spruce-pale)",
                        borderRadius: "var(--radius-button)",
                      }}
                    >
                      {platformIcons[i]}
                    </div>
                    <div>
                      <h4
                        className="text-[13px] font-semibold mb-0.5"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--midnight)",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-[12px] leading-[1.6]"
                        style={{ color: "var(--dark-gray)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Custom Integrations via n8n */}
          <ScrollReveal delay={2}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "var(--amber)", color: "white" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                  </svg>
                </div>
                <h3
                  className="text-[14px] font-bold tracking-[1.5px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--amber)",
                  }}
                >
                  {t("integrationsLabel")}
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {integrationItems.map((item, i) => (
                  <div
                    key={item.title}
                    className="group flex gap-3 p-4 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "var(--white)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--frost)",
                      transitionTimingFunction: "var(--fox-ease)",
                    }}
                  >
                    <div
                      className="w-9 h-9 flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{
                        color: "var(--amber)",
                        background: "var(--amber-pale)",
                        borderRadius: "var(--radius-button)",
                      }}
                    >
                      {integrationIcons[i]}
                    </div>
                    <div>
                      <h4
                        className="text-[13px] font-semibold mb-0.5"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--midnight)",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-[12px] leading-[1.6]"
                        style={{ color: "var(--dark-gray)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Industry Use Cases ── */}
        <div className="mb-16">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <ScrollReveal>
              <div className="flex justify-center">
                <SectionLabel text={t("useCasesLabel")} light />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h3
                className="text-[clamp(22px,3vw,32px)]"
                style={{ color: "var(--midnight)" }}
              >
                {t("useCasesTitle")}{" "}
                <span className="italic" style={{ color: "var(--spruce)" }}>
                  {t("useCasesTitleAccent")}
                </span>
              </h3>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {useCases.map((uc, i) => (
              <ScrollReveal key={uc.industry} delay={i + 1}>
                <div
                  className="group relative p-6 md:p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "var(--white)",
                    borderRadius: "var(--radius-card)",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                    border: "1px solid var(--frost)",
                    transitionTimingFunction: "var(--fox-ease)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{ color: "var(--spruce-light)" }}
                  >
                    {useCaseIcons[i]}
                  </div>

                  {/* Industry */}
                  <h4
                    className="text-[16px] font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--midnight)",
                    }}
                  >
                    {uc.industry}
                  </h4>

                  {/* Examples */}
                  <p
                    className="text-[12px] font-medium mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--spruce)",
                    }}
                  >
                    {uc.examples}
                  </p>

                  {/* Pain — bold hook */}
                  <p
                    className="text-[14px] font-semibold mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--amber)",
                    }}
                  >
                    {uc.pain}
                  </p>

                  {/* Solution */}
                  <p
                    className="text-[13px] leading-[1.7] mb-4 flex-1"
                    style={{ color: "var(--dark-gray)" }}
                  >
                    {uc.solution}
                  </p>

                  {/* Outcome badge */}
                  <div
                    className="px-3 py-2 text-[11px] font-medium leading-[1.5]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--spruce)",
                      background: "var(--spruce-pale)",
                      borderRadius: "var(--radius-badge)",
                    }}
                  >
                    {uc.outcome}
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "var(--spruce)",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── Section CTA ── */}
        <ScrollReveal>
          <div className="text-center">
            <p
              className="text-[18px] font-semibold mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--midnight)",
              }}
            >
              {t("ctaText")}
            </p>
            <p
              className="text-[14px] mb-6"
              style={{ color: "var(--dark-gray)" }}
            >
              {t("ctaDescription")}
            </p>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 px-6 py-3 text-[13px] font-semibold tracking-[0.5px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--spruce)",
                color: "white",
                borderRadius: "var(--radius-button)",
                transitionTimingFunction: "var(--fox-ease)",
              }}
            >
              {t("ctaButton")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
