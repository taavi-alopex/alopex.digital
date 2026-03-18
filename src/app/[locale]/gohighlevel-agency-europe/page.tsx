import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GHLAgencyEuropePage } from "@/components/GHLAgencyEuropePage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ghlAgencyEurope" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "GoHighLevel agency Europe",
      "GoHighLevel partner EU",
      "GoHighLevel implementation Europe",
      "GHL agency",
      "GoHighLevel consultant",
      "GoHighLevel expert Europe",
      "CRM implementation EU",
      "marketing automation Europe",
    ],
    alternates: {
      canonical: `https://alopex.digital/${locale}/gohighlevel-agency-europe`,
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://alopex.digital/${locale}/gohighlevel-agency-europe`,
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
        <GHLAgencyEuropePage />
      </main>
      <Footer />
    </>
  );
}
