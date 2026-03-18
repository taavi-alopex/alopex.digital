import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";
import { routing } from "@/i18n/routing";

const slugs = [
  "ovision-invoicing",
  "gemoss-sales-kpis",
  "ovision-production",
  "swa-poland-recruitment",
  "ovision-quotes-costing",
];

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });

  const title = t(`items.${slug}.title`);
  const client = t(`items.${slug}.client`);
  const summary = t(`items.${slug}.summary`);

  return {
    title: `${title} — ${client} | Alopex Digital`,
    description: summary,
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: summary,
        author: {
          "@type": "Organization",
          name: "Alopex Digital",
        },
      }),
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <CaseStudyDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
