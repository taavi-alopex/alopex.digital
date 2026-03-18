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

function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://alopex.digital/en/gohighlevel-expert#service",
    name: "GoHighLevel Expert Services",
    provider: {
      "@type": "Organization",
      name: "Alopex Digital",
      url: "https://alopex.digital",
    },
    description:
      "Expert GoHighLevel consulting, implementation, and optimization services. Certified GHL specialists helping businesses maximize their investment in the platform.",
    areaServed: {
      "@type": "Place",
      name: "European Union",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GoHighLevel Expert Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GoHighLevel Consulting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GHL Workflow Automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom GHL Development",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function GHLExpertPage() {
  const t = useTranslations("ghlExpert");

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
      <PersonSchema />

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

      {/* What Does a GoHighLevel Expert Do */}
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
            {t("whatIs.skillsTitle")}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[var(--midnight)]/5 rounded-lg">
                <span className="text-[var(--accent)] text-xl">●</span>
                <div>
                  <h4 className="font-outfit font-semibold text-[var(--midnight)]">
                    {t(`whatIs.skills.${i}.title`)}
                  </h4>
                  <p className="text-sm text-[var(--midnight)]/70">
                    {t(`whatIs.skills.${i}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIY vs Expert */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("diyVsExpert.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("diyVsExpert.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--off-white)]/5 rounded-lg p-6">
              <h3 className="font-outfit font-semibold text-xl mb-4 text-red-400">
                {t("diyVsExpert.diy.title")}
              </h3>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[var(--off-white)]/70">
                    <span className="text-red-400">✗</span>
                    <span>{t(`diyVsExpert.diy.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--accent)]/10 rounded-lg p-6 border border-[var(--accent)]/30">
              <h3 className="font-outfit font-semibold text-xl mb-4 text-[var(--accent)]">
                {t("diyVsExpert.expert.title")}
              </h3>
              <ul className="space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-[var(--off-white)]/90">
                    <span className="text-[var(--accent)]">✓</span>
                    <span>{t(`diyVsExpert.expert.items.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Services */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("services.intro")}
          </p>

          <div className="space-y-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-[var(--midnight)]/10 pb-6">
                <h3 className="font-outfit font-semibold text-xl text-[var(--midnight)] mb-2">
                  {t(`services.items.${i}.title`)}
                </h3>
                <p className="text-[var(--midnight)]/70 mb-3">
                  {t(`services.items.${i}.description`)}
                </p>
                <p className="text-sm text-[var(--accent)] font-medium">
                  {t(`services.items.${i}.outcome`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Hire a GHL Expert */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-6">
            {t("whenToHire.title")}
          </h2>
          <p className="text-lg text-[var(--off-white)]/80 mb-8">
            {t("whenToHire.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0 font-outfit font-bold text-[var(--midnight)]">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-outfit font-semibold text-lg mb-1">
                    {t(`whenToHire.scenarios.${i}.title`)}
                  </h3>
                  <p className="text-[var(--off-white)]/70 text-sm">
                    {t(`whenToHire.scenarios.${i}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose a GHL Expert */}
      <section className="py-16 px-6 bg-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)] mb-6">
            {t("howToChoose.title")}
          </h2>
          <p className="text-lg text-[var(--midnight)]/80 mb-8">
            {t("howToChoose.intro")}
          </p>

          <div className="space-y-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-[var(--midnight)]/5 rounded-lg">
                <span className="text-[var(--accent)] font-outfit font-bold text-lg">
                  {i + 1}.
                </span>
                <div>
                  <h3 className="font-outfit font-semibold text-[var(--midnight)]">
                    {t(`howToChoose.criteria.${i}.title`)}
                  </h3>
                  <p className="text-[var(--midnight)]/70 text-sm">
                    {t(`howToChoose.criteria.${i}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument text-3xl md:text-4xl mb-8">
            {t("faq.title")}
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-b border-[var(--off-white)]/10 pb-4">
                <summary className="flex justify-between items-center cursor-pointer list-none font-outfit font-semibold text-lg">
                  {faq.question}
                  <span className="text-[var(--accent)] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[var(--off-white)]/70">
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
