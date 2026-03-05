import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactPage } from "@/components/ContactPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("meta.title") + " | Alopex Digital",
    description: t("meta.description"),
  };
}

export default function Contact() {
  return (
    <>
      <Navigation />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
