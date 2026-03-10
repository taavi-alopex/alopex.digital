"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useBooking } from "./BookingProvider";
import { useNewsletter } from "./NewsletterProvider";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";
import { MagneticButton } from "./MagneticButton";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/alopex.digital/", Icon: InstagramIcon },
  { name: "Facebook", href: "https://www.facebook.com/alopexdigital", Icon: FacebookIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/alopex-digital/", Icon: LinkedInIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@alopex.digital", Icon: TikTokIcon },
];

const teamMembers = [
  { name: "Taavi Ilmjärv", role: "Founder", email: "taavi@alopex.digital" },
  { name: "Martin Teras", role: "Partner", email: "martin@alopex.digital" },
];

export function ContactPage() {
  const t = useTranslations("contact");
  const tNewsletter = useTranslations("newsletter");
  const { openBooking } = useBooking();
  const { openNewsletter } = useNewsletter();

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--midnight)" }}
    >
      {/* Background photo with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/strategy-call.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "brightness(0.2)" }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(22, 25, 41, 0.9), rgba(40, 44, 62, 0.85))",
          }}
        />
      </div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="frost-noise absolute inset-0 z-[1]" />

      <div className="relative z-10 py-32 md:py-40">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="flex justify-center">
                <SectionLabel text={t("label")} />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h1
                className="text-[clamp(36px,5vw,56px)] mt-4 mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--frost)",
                }}
              >
                {t("title")}{" "}
                <span className="italic" style={{ color: "var(--spruce-light)" }}>
                  {t("titleAccent")}
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p
                className="text-[18px] leading-[1.7] max-w-[600px] mx-auto"
                style={{ color: "var(--mist)" }}
              >
                {t("subtitle")}
              </p>
            </ScrollReveal>
          </div>

          {/* Main content grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left column - CTA and contact info */}
            <ScrollReveal delay={3} variant="fadeLeft">
              <div
                className="p-8 md:p-10 h-full card-hover-glow-dark"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Book a call CTA */}
                <div className="mb-10">
                  <h3
                    className="text-[20px] font-semibold mb-3"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--frost)",
                    }}
                  >
                    {t("bookCall.title")}
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed mb-6"
                    style={{ color: "var(--mist)" }}
                  >
                    {t("bookCall.description")}
                  </p>
                  <MagneticButton
                    onClick={openBooking}
                    className="w-full px-8 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,135,63,0.35)]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      background: "var(--amber)",
                      borderRadius: "var(--radius-button)",
                    }}
                  >
                    {t("bookCall.button")}
                  </MagneticButton>
                </div>

                {/* Contact details */}
                <div
                  className="pt-8 space-y-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <a
                    href="tel:+37257800857"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(82,183,136,0.15)]"
                      style={{
                        background: "rgba(82,183,136,0.1)",
                        borderRadius: "10px",
                      }}
                    >
                      <PhoneIcon className="w-5 h-5 text-[var(--spruce-light)]" />
                    </div>
                    <div>
                      <p
                        className="text-[13px] mb-1"
                        style={{ color: "var(--text-dark-muted)" }}
                      >
                        {t("phone")}
                      </p>
                      <p
                        className="text-[16px] font-medium transition-colors duration-200 group-hover:text-[var(--spruce-light)]"
                        style={{ color: "var(--frost)" }}
                      >
                        +372 5780 0857
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@alopex.digital"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(82,183,136,0.15)]"
                      style={{
                        background: "rgba(82,183,136,0.1)",
                        borderRadius: "10px",
                      }}
                    >
                      <MailIcon className="w-5 h-5 text-[var(--spruce-light)]" />
                    </div>
                    <div>
                      <p
                        className="text-[13px] mb-1"
                        style={{ color: "var(--text-dark-muted)" }}
                      >
                        {t("email")}
                      </p>
                      <p
                        className="text-[16px] font-medium transition-colors duration-200 group-hover:text-[var(--spruce-light)]"
                        style={{ color: "var(--frost)" }}
                      >
                        info@alopex.digital
                      </p>
                    </div>
                  </a>
                </div>

                {/* Social links */}
                <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p
                    className="text-[13px] mb-4"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    {t("followUs")}
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map(({ name, href, Icon }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(82,183,136,0.15)]"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "10px",
                          color: "var(--mist)",
                        }}
                        aria-label={name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Newsletter signup */}
                <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p
                    className="text-[15px] mb-4"
                    style={{ color: "var(--frost)" }}
                  >
                    {tNewsletter("contactTitle")}
                  </p>
                  <button
                    onClick={openNewsletter}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 text-[14px] font-medium border cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--spruce-light)] hover:text-[var(--spruce-light)]"
                    style={{
                      background: "rgba(82,183,136,0.05)",
                      borderColor: "rgba(82,183,136,0.3)",
                      borderRadius: "var(--radius-button)",
                      color: "var(--frost)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    {tNewsletter("button")}
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right column - Company info and team */}
            <div className="space-y-8">
              {/* Company details */}
              <ScrollReveal delay={4} variant="fadeRight">
                <div
                  className="p-8 md:p-10 card-hover-glow-dark"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(82,183,136,0.1)",
                        borderRadius: "10px",
                      }}
                    >
                      <BuildingIcon className="w-5 h-5 text-[var(--spruce-light)]" />
                    </div>
                    <div>
                      <h3
                        className="text-[18px] font-semibold mb-1"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--frost)",
                        }}
                      >
                        Alopex Digital OÜ
                      </h3>
                      <p
                        className="text-[14px]"
                        style={{ color: "var(--text-dark-muted)" }}
                      >
                        Reg: 17180489
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(82,183,136,0.1)",
                        borderRadius: "10px",
                      }}
                    >
                      <MapPinIcon className="w-5 h-5 text-[var(--spruce-light)]" />
                    </div>
                    <div>
                      <p
                        className="text-[13px] mb-2"
                        style={{ color: "var(--text-dark-muted)" }}
                      >
                        {t("registeredAddress")}
                      </p>
                      <p
                        className="text-[15px] leading-relaxed"
                        style={{ color: "var(--frost)" }}
                      >
                        Tallinna, Puhatu<br />
                        41213 Ida-Viru maakond<br />
                        Estonia
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Team contacts */}
              <ScrollReveal delay={5} variant="fadeRight">
                <div
                  className="p-8 md:p-10 card-hover-glow-dark"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3
                    className="text-[18px] font-semibold mb-6"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--frost)",
                    }}
                  >
                    {t("team.title")}
                  </h3>

                  <div className="space-y-5">
                    {teamMembers.map((member) => (
                      <a
                        key={member.email}
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-4 group"
                      >
                        <div
                          className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-[16px] font-semibold transition-colors duration-300 group-hover:bg-[rgba(82,183,136,0.15)]"
                          style={{
                            fontFamily: "var(--font-heading)",
                            background: "rgba(82,183,136,0.1)",
                            borderRadius: "10px",
                            color: "var(--spruce-light)",
                          }}
                        >
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p
                            className="text-[15px] font-medium"
                            style={{ color: "var(--frost)" }}
                          >
                            {member.name}
                          </p>
                          <p
                            className="text-[13px] transition-colors duration-200 group-hover:text-[var(--spruce-light)]"
                            style={{ color: "var(--text-dark-muted)" }}
                          >
                            {member.email}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
