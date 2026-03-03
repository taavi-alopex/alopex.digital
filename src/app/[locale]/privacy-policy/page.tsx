import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

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
    <>
      <Navigation />
      <main
        className="min-h-screen pt-32 pb-20 px-5 md:px-8"
        style={{ background: "var(--midnight)" }}
      >
        <article className="max-w-3xl mx-auto">
          <h1
            className="text-3xl md:text-4xl mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--frost)",
            }}
          >
            {t("privacyPolicy.title")}
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "var(--text-dark-muted)" }}
          >
            {t("privacyPolicy.lastUpdated")}: 3 March 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.introduction.title")}
              </h2>
              <p
                className="mb-6 leading-relaxed"
                style={{ color: "var(--text-dark-body)" }}
              >
                {t("privacyPolicy.sections.introduction.content")}
              </p>

              <div
                className="rounded-lg p-5"
                style={{ background: "var(--dark-surface)" }}
              >
                <table className="w-full text-sm">
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--dark-border)" }}>
                      <td
                        className="font-semibold pr-4 py-3"
                        style={{ color: "var(--frost)" }}
                      >
                        {t("privacyPolicy.company")}
                      </td>
                      <td className="py-3" style={{ color: "var(--text-dark-body)" }}>
                        Alopex Digital OÜ
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--dark-border)" }}>
                      <td
                        className="font-semibold pr-4 py-3"
                        style={{ color: "var(--frost)" }}
                      >
                        {t("privacyPolicy.registryCode")}
                      </td>
                      <td className="py-3" style={{ color: "var(--text-dark-body)" }}>
                        17180489
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--dark-border)" }}>
                      <td
                        className="font-semibold pr-4 py-3"
                        style={{ color: "var(--frost)" }}
                      >
                        {t("privacyPolicy.address")}
                      </td>
                      <td className="py-3" style={{ color: "var(--text-dark-body)" }}>
                        Tallinna, Puhatu küla, 41213 Alutaguse vald, Ida-Viru maakond, Estonia
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="font-semibold pr-4 py-3"
                        style={{ color: "var(--frost)" }}
                      >
                        {t("privacyPolicy.email")}
                      </td>
                      <td className="py-3" style={{ color: "var(--text-dark-body)" }}>
                        info@alopex.digital
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.dataCollected.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.dataCollected.content")}
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.legalBasis.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.legalBasis.content")}
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.thirdParties.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.thirdParties.content")}
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.retention.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.retention.content")}
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.rights.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.rights.content")}
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.cookies.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.cookies.content")}
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.contact.title")}
              </h2>
              <p className="mb-3" style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.contact.content")}
              </p>
              <p style={{ color: "var(--text-dark-body)" }}>
                Email:{" "}
                <a
                  href="mailto:info@alopex.digital"
                  className="hover:underline"
                  style={{ color: "var(--spruce-light)" }}
                >
                  info@alopex.digital
                </a>
              </p>
            </section>

            <section>
              <h2
                className="text-xl font-semibold mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {t("privacyPolicy.sections.supervisory.title")}
              </h2>
              <p className="mb-3" style={{ color: "var(--text-dark-body)" }}>
                {t("privacyPolicy.sections.supervisory.content")}
              </p>
              <div style={{ color: "var(--text-dark-body)" }}>
                <p>Andmekaitse Inspektsioon</p>
                <p>Tatari 39, 10134 Tallinn, Estonia</p>
                <p>
                  <a
                    href="mailto:info@aki.ee"
                    className="hover:underline"
                    style={{ color: "var(--spruce-light)" }}
                  >
                    info@aki.ee
                  </a>
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
