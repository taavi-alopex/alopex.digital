import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { N8nAgencyPage } from "@/components/N8nAgencyPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "n8nAgency" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "n8n agency",
      "n8n automation",
      "n8n integration",
      "n8n consultant",
      "n8n developer",
      "workflow automation agency",
      "n8n Europe",
      "automation agency EU",
    ],
    alternates: {
      canonical: `https://alopex.digital/${locale}/n8n-automation-agency`,
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://alopex.digital/${locale}/n8n-automation-agency`,
      siteName: "Alopex Digital",
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <N8nAgencyPage />
      </main>
      <Footer />
    </>
  );
}
