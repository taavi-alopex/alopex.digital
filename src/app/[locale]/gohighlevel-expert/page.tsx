import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GHLExpertPage } from "@/components/GHLExpertPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ghlExpert" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "GoHighLevel expert",
      "GHL consultant",
      "GoHighLevel specialist",
      "HighLevel expert",
      "GoHighLevel certified",
      "GHL implementation specialist",
      "GoHighLevel developer",
      "GoHighLevel automation expert",
    ],
    alternates: {
      canonical: `https://alopex.digital/${locale}/gohighlevel-expert`,
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://alopex.digital/${locale}/gohighlevel-expert`,
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
        <GHLExpertPage />
      </main>
      <Footer />
    </>
  );
}
