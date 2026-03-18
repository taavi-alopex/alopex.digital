"use client";

import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/SectionLabel";

function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://alopex.digital/en/revops-agency-europe#service",
    name: "Revenue Operations Services",
    provider: {
      "@type": "Organization",
      name: "Alopex Digital",
      url: "https://alopex.digital",
    },
    description:
      "Revenue Operations (RevOps) agency serving European businesses. We align sales, marketing, and customer success operations to drive efficient revenue growth.",
    areaServed: {
      "@type": "Place",
      name: "European Union",
    },
    serviceType: [
      "Revenue Operations Strategy",
      "CRM Implementation",
      "Sales Process Optimization",
      "Marketing Automation",
      "Data Analytics & Reporting",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function RevOpsAgencyPage() {
  const t = useTranslations("revopsAgency");

  const faqs = [
    { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
    { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
    { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
    { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
    { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
    { question: t("faq.items.5.question"), answer: t("faq.items.5.answer") },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <ServiceSchema />

      {/* Hero Section */}
      <section className="bg-[var(--midnight)] text-[var(--off-white)] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel text={t("hero.label")} light />
          <h1 className="font-instrument text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-[var(--off-white)]/80 max-w-2xl">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* What is RevOps */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("whatIs.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-6">
            {t("whatIs.p1")}
          </p>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("whatIs.p2")}
          </p>

          <h3 className="font-outfit font-semibold text-xl text-[var(--midnight)] mb-4">
            {t("whatIs.pillarsTitle")}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[var(--midnight)]/5 rounded-lg p-6">
                <h4 className="font-outfit font-semibold text-lg text-[var(--midnight)] mb-2">
                  {t(`whatIs.pillars.${i}.title`)}
                </h4>
                <p className="text-sm text-[var(--midnight)]/70">
                  {t(`whatIs.pillars.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs You Need RevOps */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("signs.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("signs.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400">!</span>
                </div>
                <div>
                  <h3 className="font-outfit font-semibold mb-1">
                    {t(`signs.items.${i}.title`)}
                  </h3>
                  <p className="text-[var(--off-white)]/70 text-sm">
                    {t(`signs.items.${i}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our RevOps Services */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("services.intro")}
          </p>

          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-l-4 border-[var(--accent)] pl-6 py-2">
                <h3 className="font-outfit font-semibold text-xl text-[var(--midnight)] mb-2">
                  {t(`services.items.${i}.title`)}
                </h3>
                <p className="text-[var(--midnight)]/70">
                  {t(`services.items.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RevOps vs Traditional */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("comparison.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("comparison.intro")}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--off-white)]/20">
                  <th className="py-3 px-4 font-outfit font-semibold">{t("comparison.table.aspect")}</th>
                  <th className="py-3 px-4 font-outfit font-semibold">{t("comparison.table.traditional")}</th>
                  <th className="py-3 px-4 font-outfit font-semibold">{t("comparison.table.revops")}</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-b border-[var(--off-white)]/10">
                    <td className="py-3 px-4 font-medium">{t(`comparison.rows.${i}.aspect`)}</td>
                    <td className="py-3 px-4 text-red-400/80">{t(`comparison.rows.${i}.traditional`)}</td>
                    <td className="py-3 px-4 text-[var(--accent)]">{t(`comparison.rows.${i}.revops`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The RevOps Stack */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("stack.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("stack.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-[var(--midnight)] text-[var(--off-white)] rounded-lg p-6">
                <h3 className="font-outfit font-semibold text-lg mb-2">
                  {t(`stack.categories.${i}.title`)}
                </h3>
                <p className="text-[var(--off-white)]/70 text-sm mb-3">
                  {t(`stack.categories.${i}.description`)}
                </p>
                <p className="text-xs text-[var(--accent)]">
                  {t(`stack.categories.${i}.tools`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why European RevOps */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("whyEurope.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("whyEurope.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border border-[var(--off-white)]/20 rounded-lg p-6">
                <h3 className="font-outfit font-semibold text-xl mb-2">
                  {t(`whyEurope.reasons.${i}.title`)}
                </h3>
                <p className="text-[var(--off-white)]/70">
                  {t(`whyEurope.reasons.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-8">
            {t("faq.title")}
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-[var(--midnight)]/10 pb-4">
                <summary className="flex justify-between items-center cursor-pointer list-none font-outfit font-semibold text-lg text-[var(--midnight)]">
                  {faq.question}
                  <span className="text-[var(--accent)] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--midnight)]/70">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[var(--accent)] text-[var(--midnight)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-instrument text-3xl md:text-4xl mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-xl mb-8 opacity-80">
            {t("cta.subtitle")}
          </p>
          <a
            href="https://alopex.digital/en/contact"
            className="inline-block bg-[var(--midnight)] text-[var(--off-white)] px-8 py-4 rounded-lg font-outfit font-semibold hover:opacity-90 transition-opacity"
          >
            {t("cta.button")}
          </a>
          <p className="mt-4 text-sm opacity-70">
            {t("cta.micro")}
          </p>
        </div>
      </section>
    </>
  );
}
