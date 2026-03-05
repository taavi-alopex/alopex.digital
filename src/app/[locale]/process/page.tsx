import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Process } from "@/components/Process";
import { InlineCTA } from "@/components/InlineCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });

  return {
    title: t("meta.title") + " | Alopex Digital",
    description: t("meta.description"),
  };
}

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <Process />
        <InlineCTA variant="assessment" />
      </main>
      <Footer />
    </>
  );
}
