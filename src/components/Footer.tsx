"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FoxLogo } from "./FoxLogo";
import { useRecruitment } from "./RecruitmentProvider";

const serviceHrefs = ["/services", "/services", "/services", "/services", "/services"];
const companyHrefs = ["/about", "/process", "/about", "/contact"];
const legalHrefs = ["/privacy-policy", "/terms"];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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

export function Footer() {
  const t = useTranslations("footer");
  const tRecruitment = useTranslations("recruitment");
  const { openRecruitment } = useRecruitment();
  const services: { label: string }[] = t.raw("services");
  const company: { label: string }[] = t.raw("company");
  const legal: { label: string }[] = t.raw("legal");

  const linkColumns = [
    { title: t("servicesTitle"), links: services, hrefs: serviceHrefs, isInternal: true },
    { title: t("companyTitle"), links: company, hrefs: companyHrefs, isInternal: true },
    { title: t("legalTitle"), links: legal, hrefs: legalHrefs, isInternal: true },
  ];

  return (
    <footer style={{ background: "var(--dark-navy)" }}>
      {/* Gradient bar */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, var(--spruce), var(--amber))",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <FoxLogo size={36} glow />
              <span
                className="text-[14px] font-semibold tracking-[3px] uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                Alopex Digital
              </span>
            </div>
            <p
              className="text-[14px] leading-[1.7] max-w-[360px] mb-6"
              style={{ color: "var(--text-dark-muted)" }}
            >
              {t("tagline")}
            </p>
            <a
              href="mailto:info@alopex.digital"
              className="text-[14px] hover:text-[var(--spruce-light)] transition-colors"
              style={{ color: "var(--mist)" }}
            >
              info@alopex.digital
            </a>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--spruce-light)]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    color: "var(--mist)",
                  }}
                  aria-label={name}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[11px] font-bold tracking-[2px] uppercase mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, i) => {
                  const href = col.hrefs[i];
                  const isHashLink = href.startsWith("#");
                  return (
                    <li key={link.label}>
                      {isHashLink ? (
                        <a
                          href={href}
                          className="text-[14px] hover:text-[var(--spruce-light)] transition-colors duration-200"
                          style={{
                            color: "var(--text-dark-muted)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-[14px] hover:text-[var(--spruce-light)] transition-colors duration-200"
                          style={{
                            color: "var(--text-dark-muted)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
                {col.title === t("companyTitle") && (
                  <li>
                    <button
                      onClick={openRecruitment}
                      className="text-[14px] bg-transparent border-0 p-0 cursor-pointer hover:text-[var(--spruce-light)] transition-colors duration-200"
                      style={{
                        color: "var(--text-dark-muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tRecruitment("footerLink")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--dark-border)" }}
        >
          <p
            className="text-[12px]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p
            className="text-[12px]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            {t("location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
