import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RevOpsAgencyPage } from "@/components/RevOpsAgencyPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "revopsAgency" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "RevOps agency",
      "RevOps agency Europe",
      "revenue operations",
      "RevOps consultant",
      "revenue operations agency EU",
      "RevOps implementation",
      "sales operations Europe",
      "marketing operations agency",
    ],
    alternates: {
      canonical: `https://alopex.digital/${locale}/revops-agency-europe`,
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://alopex.digital/${locale}/revops-agency-europe`,
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
        <RevOpsAgencyPage />
      </main>
      <Footer />
    </>
  );
}
