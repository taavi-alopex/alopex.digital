import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

const slugs = [
  "ovision-invoicing",
  "gemoss-sales-kpis",
  "ovision-production",
  "swa-poland-recruitment",
  "ovision-quotes-costing",
] as const;

const clientLogos: Record<string, string> = {
  Ovision: "/ovision-logo.svg",
  Gemoss: "/gemoss-logo.svg",
};

export async function CaseStudiesListing() {
  const t = await getTranslations("caseStudies");

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--midnight) 0%, var(--dark-surface) 100%)",
      }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text={t("label")} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h1
              className="text-[clamp(28px,4vw,42px)] mb-4"
              style={{ color: "var(--frost)" }}
            >
              {t("title")}{" "}
              <span
                className="italic"
                style={{ color: "var(--spruce-light)" }}
              >
                {t("titleAccent")}
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p
              className="text-[16px] leading-[1.7] max-w-[600px] mx-auto"
              style={{ color: "var(--text-dark-muted)" }}
            >
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {slugs.map((slug, index) => {
            const client = t(`items.${slug}.client`);
            const tag = t(`items.${slug}.tag`);
            const title = t(`items.${slug}.title`);
            const summary = t(`items.${slug}.summary`);
            const logo = clientLogos[client];

            return (
              <ScrollReveal
                key={slug}
                delay={index + 3}
                variant={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
              >
                <Link
                  href={`/case-studies/${slug}`}
                  className="group block h-full p-6 md:p-8 card-hover-glow-dark no-underline"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Client + tag */}
                  <div className="flex items-center gap-3 mb-4">
                    {logo ? (
                      <Image
                        src={logo}
                        alt={client}
                        width={80}
                        height={20}
                        className={`object-contain ${client === "Gemoss" ? "brightness-0 invert opacity-80" : ""}`}
                      />
                    ) : (
                      <span
                        className="text-[14px] font-semibold"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--frost)",
                        }}
                      >
                        {client}
                      </span>
                    )}
                    <span
                      className="px-3 py-1 text-[10px] font-bold tracking-[1px] uppercase"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--spruce-light)",
                        background: "rgba(82,183,136,0.1)",
                        borderRadius: "var(--radius-badge)",
                      }}
                    >
                      {tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[20px] md:text-[22px] font-semibold mb-3 group-hover:text-[var(--spruce-light)] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--frost)",
                    }}
                  >
                    {title}
                  </h2>

                  {/* Summary */}
                  <p
                    className="text-[14px] leading-[1.7] mb-5"
                    style={{ color: "var(--text-dark-muted)" }}
                  >
                    {summary}
                  </p>

                  {/* Read more */}
                  <span
                    className="text-[13px] font-semibold tracking-wide group-hover:translate-x-1 transition-transform duration-200 inline-block"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--spruce-light)",
                    }}
                  >
                    {t("readMore")} &rarr;
                  </span>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(82,183,136,0.05) 0%, transparent 70%)",
                      borderRadius: "var(--radius-card)",
                    }}
                  />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
