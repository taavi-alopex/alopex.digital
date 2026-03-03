import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("terms.title") + " | Alopex Digital",
    description: t("terms.metaDescription"),
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-outfit">{t("terms.title")}</h1>
        <p className="text-sm text-gray-500 mb-8">{t("terms.lastUpdated")}: 3 March 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.introduction.title")}</h2>
            <p>{t("terms.sections.introduction.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.services.title")}</h2>
            <p>{t("terms.sections.services.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.obligations.title")}</h2>
            <p>{t("terms.sections.obligations.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.payment.title")}</h2>
            <p>{t("terms.sections.payment.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.ip.title")}</h2>
            <p>{t("terms.sections.ip.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.confidentiality.title")}</h2>
            <p>{t("terms.sections.confidentiality.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.liability.title")}</h2>
            <p>{t("terms.sections.liability.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.termination.title")}</h2>
            <p>{t("terms.sections.termination.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.governing.title")}</h2>
            <p>{t("terms.sections.governing.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("terms.sections.contact.title")}</h2>
            <p className="mb-2">Email: <a href="mailto:info@alopex.digital" className="text-blue-600 hover:underline">info@alopex.digital</a></p>
            <p>Tallinna, Puhatu küla, 41213 Alutaguse vald, Ida-Viru maakond, Estonia</p>
          </section>
        </div>
      </article>
    </main>
  );
}
