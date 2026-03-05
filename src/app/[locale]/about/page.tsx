import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";
import { Values } from "@/components/Values";
import { Stats } from "@/components/Stats";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("meta.title") + " | Alopex Digital",
    description: t("meta.description"),
  };
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <About />
        <Stats />
        <Values />
      </main>
      <Footer />
    </>
  );
}
