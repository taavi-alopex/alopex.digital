import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("privacyPolicy.title") + " | Alopex Digital",
    description: t("privacyPolicy.metaDescription"),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 font-outfit">{t("privacyPolicy.title")}</h1>
        <p className="text-sm text-gray-500 mb-8">{t("privacyPolicy.lastUpdated")}: 3 March 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.introduction.title")}</h2>
            <p className="mb-4">{t("privacyPolicy.sections.introduction.content")}</p>

            <table className="w-full text-sm border-collapse mb-4">
              <tbody>
                <tr className="border-b"><td className="font-semibold pr-4 py-2">{t("privacyPolicy.company")}</td><td className="py-2">Alopex Digital OÜ</td></tr>
                <tr className="border-b"><td className="font-semibold pr-4 py-2">{t("privacyPolicy.registryCode")}</td><td className="py-2">17180489</td></tr>
                <tr className="border-b"><td className="font-semibold pr-4 py-2">{t("privacyPolicy.address")}</td><td className="py-2">Tallinna, Puhatu küla, 41213 Alutaguse vald, Ida-Viru maakond, Estonia</td></tr>
                <tr className="border-b"><td className="font-semibold pr-4 py-2">{t("privacyPolicy.email")}</td><td className="py-2">info@alopex.digital</td></tr>
              </tbody>
            </table>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.dataCollected.title")}</h2>
            <p>{t("privacyPolicy.sections.dataCollected.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.legalBasis.title")}</h2>
            <p>{t("privacyPolicy.sections.legalBasis.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.thirdParties.title")}</h2>
            <p>{t("privacyPolicy.sections.thirdParties.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.retention.title")}</h2>
            <p>{t("privacyPolicy.sections.retention.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.rights.title")}</h2>
            <p>{t("privacyPolicy.sections.rights.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.cookies.title")}</h2>
            <p>{t("privacyPolicy.sections.cookies.content")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.contact.title")}</h2>
            <p className="mb-2">{t("privacyPolicy.sections.contact.content")}</p>
            <p>Email: <a href="mailto:info@alopex.digital" className="text-blue-600 hover:underline">info@alopex.digital</a></p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("privacyPolicy.sections.supervisory.title")}</h2>
            <p className="mb-2">{t("privacyPolicy.sections.supervisory.content")}</p>
            <p>
              Andmekaitse Inspektsioon<br/>
              Tatari 39, 10134 Tallinn, Estonia<br/>
              <a href="mailto:info@aki.ee" className="text-blue-600 hover:underline">info@aki.ee</a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
