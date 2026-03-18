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
    "@id": "https://alopex.digital/en/n8n-automation-agency#service",
    name: "n8n Automation Services",
    provider: {
      "@type": "Organization",
      name: "Alopex Digital",
      url: "https://alopex.digital",
    },
    description:
      "Professional n8n workflow automation services. Custom integrations, API connections, and business process automation for European businesses.",
    areaServed: {
      "@type": "Place",
      name: "European Union",
    },
    serviceType: [
      "n8n Workflow Development",
      "API Integration",
      "Business Process Automation",
      "Data Synchronization",
      "Custom Automation Solutions",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function N8nAgencyPage() {
  const t = useTranslations("n8nAgency");

  const faqs = [
    { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
    { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
    { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
    { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
    { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
    { question: t("faq.items.5.question"), answer: t("faq.items.5.answer") },
    { question: t("faq.items.6.question"), answer: t("faq.items.6.answer") },
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

      {/* What is n8n */}
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
            {t("whatIs.capabilitiesTitle")}
          </h3>
          <ul className="grid md:grid-cols-2 gap-3 text-[var(--midnight)]/80">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[var(--accent)] mt-1">✓</span>
                <span>{t(`whatIs.capabilities.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* n8n vs Other Tools */}
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
                  <th className="py-3 px-4 font-outfit font-semibold">{t("comparison.table.feature")}</th>
                  <th className="py-3 px-4 font-outfit font-semibold">n8n</th>
                  <th className="py-3 px-4 font-outfit font-semibold">Zapier</th>
                  <th className="py-3 px-4 font-outfit font-semibold">Make</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-[var(--off-white)]/10">
                    <td className="py-3 px-4 font-medium">{t(`comparison.rows.${i}.feature`)}</td>
                    <td className="py-3 px-4 text-[var(--off-white)]/70">{t(`comparison.rows.${i}.n8n`)}</td>
                    <td className="py-3 px-4 text-[var(--off-white)]/70">{t(`comparison.rows.${i}.zapier`)}</td>
                    <td className="py-3 px-4 text-[var(--off-white)]/70">{t(`comparison.rows.${i}.make`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Our n8n Services */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("services.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-[var(--midnight)]/5 rounded-lg p-6">
                <h3 className="font-outfit font-semibold text-lg text-[var(--midnight)] mb-2">
                  {t(`services.items.${i}.title`)}
                </h3>
                <p className="text-[var(--midnight)]/70 text-sm">
                  {t(`services.items.${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("integrations.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("integrations.intro")}
          </p>

          <div className="space-y-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-l-4 border-[var(--accent)] pl-6 py-2">
                <h3 className="font-outfit font-semibold text-xl mb-2">
                  {t(`integrations.examples.${i}.title`)}
                </h3>
                <p className="text-[var(--off-white)]/70 mb-2">
                  {t(`integrations.examples.${i}.description`)}
                </p>
                <p className="text-sm text-[var(--accent)]">
                  {t(`integrations.examples.${i}.tools`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why n8n for European Businesses */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("whyEurope.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("whyEurope.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--midnight)] font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-lg text-[var(--midnight)] mb-1">
                    {t(`whyEurope.reasons.${i}.title`)}
                  </h3>
                  <p className="text-[var(--midnight)]/70 text-sm">
                    {t(`whyEurope.reasons.${i}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("process.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("process.intro")}
          </p>

          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0 font-instrument text-2xl text-[var(--midnight)]">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-xl mb-1">
                    {t(`process.steps.${i}.title`)}
                  </h3>
                  <p className="text-[var(--off-white)]/70">
                    {t(`process.steps.${i}.description`)}
                  </p>
                </div>
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
