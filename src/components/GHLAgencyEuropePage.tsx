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
    "@id": "https://alopex.digital/en/gohighlevel-agency-europe#service",
    name: "GoHighLevel Implementation Services",
    provider: {
      "@type": "Organization",
      name: "Alopex Digital",
      url: "https://alopex.digital",
    },
    description:
      "Professional GoHighLevel implementation, customization, and ongoing support for businesses across Europe. GDPR-compliant CRM and marketing automation solutions.",
    areaServed: {
      "@type": "Place",
      name: "European Union",
    },
    serviceType: [
      "GoHighLevel Implementation",
      "CRM Setup",
      "Marketing Automation",
      "Sales Pipeline Configuration",
      "Custom API Integrations",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GHLAgencyEuropePage() {
  const t = useTranslations("ghlAgencyEurope");

  const faqs = [
    { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
    { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
    { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
    { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
    { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
    { question: t("faq.items.5.question"), answer: t("faq.items.5.answer") },
    { question: t("faq.items.6.question"), answer: t("faq.items.6.answer") },
    { question: t("faq.items.7.question"), answer: t("faq.items.7.answer") },
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

      {/* What is GoHighLevel Section */}
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
            {t("whatIs.featuresTitle")}
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-[var(--midnight)]/80">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>{t(`whatIs.features.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why European Businesses Need a Local Partner */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("whyLocal.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("whyLocal.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border border-[var(--off-white)]/20 rounded-lg p-6">
                <h3 className="font-outfit font-semibold text-xl mb-3">
                  {t(`whyLocal.reasons.${i}.title`)}
                </h3>
                <p className="text-[var(--off-white)]/70">
                  {t(`whyLocal.reasons.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our GoHighLevel Services */}
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

      {/* Implementation Process */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("process.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("process.intro")}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--off-white)]/20">
                  <th className="py-4 pr-4 font-outfit font-semibold">{t("process.table.phase")}</th>
                  <th className="py-4 pr-4 font-outfit font-semibold">{t("process.table.activities")}</th>
                  <th className="py-4 font-outfit font-semibold">{t("process.table.deliverables")}</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-b border-[var(--off-white)]/10">
                    <td className="py-4 pr-4 font-semibold">{t(`process.steps.${i}.phase`)}</td>
                    <td className="py-4 pr-4 text-[var(--off-white)]/70">{t(`process.steps.${i}.activities`)}</td>
                    <td className="py-4 text-[var(--off-white)]/70">{t(`process.steps.${i}.deliverables`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GoHighLevel vs Other CRMs */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("comparison.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("comparison.intro")}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--midnight)] text-[var(--off-white)]">
                  <th className="py-3 px-4 font-outfit font-semibold">{t("comparison.table.feature")}</th>
                  <th className="py-3 px-4 font-outfit font-semibold">GoHighLevel</th>
                  <th className="py-3 px-4 font-outfit font-semibold">HubSpot</th>
                  <th className="py-3 px-4 font-outfit font-semibold">Salesforce</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-[var(--midnight)]/10">
                    <td className="py-3 px-4 font-medium text-[var(--midnight)]">{t(`comparison.rows.${i}.feature`)}</td>
                    <td className="py-3 px-4 text-[var(--midnight)]/70">{t(`comparison.rows.${i}.ghl`)}</td>
                    <td className="py-3 px-4 text-[var(--midnight)]/70">{t(`comparison.rows.${i}.hubspot`)}</td>
                    <td className="py-3 px-4 text-[var(--midnight)]/70">{t(`comparison.rows.${i}.salesforce`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("industries.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("industries.intro")}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[var(--off-white)]/5 rounded-lg p-6">
                <h3 className="font-outfit font-semibold text-xl mb-2">
                  {t(`industries.items.${i}.title`)}
                </h3>
                <p className="text-sm text-[var(--off-white)]/60 mb-3">
                  {t(`industries.items.${i}.examples`)}
                </p>
                <p className="text-[var(--off-white)]/80">
                  {t(`industries.items.${i}.outcome`)}
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
