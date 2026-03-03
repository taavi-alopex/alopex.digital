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
    title: t("terms.title") + " | Alopex Digital",
    description: t("terms.metaDescription"),
  };
}

export default async function TermsPage({ params }: Props) {
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
            {t("terms.title")}
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "var(--text-dark-muted)" }}
          >
            {t("terms.lastUpdated")}: 3 March 2026
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
                {t("terms.sections.introduction.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.introduction.content")}
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
                {t("terms.sections.services.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.services.content")}
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
                {t("terms.sections.obligations.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.obligations.content")}
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
                {t("terms.sections.payment.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.payment.content")}
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
                {t("terms.sections.ip.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.ip.content")}
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
                {t("terms.sections.confidentiality.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.confidentiality.content")}
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
                {t("terms.sections.liability.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.liability.content")}
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
                {t("terms.sections.termination.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.termination.content")}
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
                {t("terms.sections.governing.title")}
              </h2>
              <p style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.governing.content")}
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
                {t("terms.sections.contact.title")}
              </h2>
              <p className="mb-3" style={{ color: "var(--text-dark-body)" }}>
                {t("terms.sections.contact.content")}
              </p>
              <div style={{ color: "var(--text-dark-body)" }}>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@alopex.digital"
                    className="hover:underline"
                    style={{ color: "var(--spruce-light)" }}
                  >
                    info@alopex.digital
                  </a>
                </p>
                <p>Tallinna, Puhatu küla, 41213 Alutaguse vald, Ida-Viru maakond, Estonia</p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
