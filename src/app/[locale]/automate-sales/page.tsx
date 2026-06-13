import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AutomateSalesPage } from "@/components/AutomateSalesPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "automateSales" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `https://alopex.digital/${locale}/automate-sales`,
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://alopex.digital/${locale}/automate-sales`,
      siteName: "Alopex Digital",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "automateSales" });

  // FAQ JSON-LD built from this campaign's own FAQ copy (helps AI/search discovery)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [0, 1, 2, 3].map((i) => ({
      "@type": "Question",
      name: t(`faq.items.${i}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.items.${i}.a`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />
      <main>
        <AutomateSalesPage />
      </main>
      <Footer />
    </>
  );
}
