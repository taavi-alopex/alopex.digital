"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FoxLogo } from "./FoxLogo";

const serviceHrefs = ["#process", "#process", "#process", "#process", "#process"];
const companyHrefs = ["#about", "#process", "#values", "#contact"];
const legalHrefs = ["/privacy-policy", "/terms"];

export function Footer() {
  const t = useTranslations("footer");
  const services: { label: string }[] = t.raw("services");
  const company: { label: string }[] = t.raw("company");
  const legal: { label: string }[] = t.raw("legal");

  const linkColumns = [
    { title: t("servicesTitle"), links: services, hrefs: serviceHrefs, isInternal: false },
    { title: t("companyTitle"), links: company, hrefs: companyHrefs, isInternal: false },
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
                {col.links.map((link, i) => (
                  <li key={link.label}>
                    {col.isInternal ? (
                      <Link
                        href={col.hrefs[i]}
                        className="text-[14px] hover:text-[var(--spruce-light)] transition-colors duration-200"
                        style={{
                          color: "var(--text-dark-muted)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={col.hrefs[i]}
                        className="text-[14px] hover:text-[var(--spruce-light)] transition-colors duration-200"
                        style={{
                          color: "var(--text-dark-muted)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
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
