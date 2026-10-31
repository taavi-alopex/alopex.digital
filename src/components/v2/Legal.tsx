import { getTranslations } from "next-intl/server";
import { getText } from "@/content/v2/text";
import { PageFrame, PageHead } from "./Shared";

type Section = { title: string; content?: string; items?: string[]; after?: string };

/** Shown as "Last updated" on both documents. Change it whenever the texts in messages/*.json change. */
const UPDATED = "31.10.2026";

export const COMPANY = {
  name: "Alopex Digital OÜ",
  registry: "17180489",
  address: "Tallinna, Puhatu küla, 41213 Alutaguse vald, Ida-Viru maakond, Estonia",
  email: "info@alopex.digital",
};

/** Privacy policy and terms, wording in messages/{en,et,pl}.json (legal). Rewritten 31.10.2026 for the new site; needs a final legal read before launch. */
export async function LegalPage({ locale, doc }: { locale: string; doc: "privacyPolicy" | "terms" }) {
  const l = await getTranslations({ locale, namespace: "legal" });
  const t = getText(locale);
  const sections = l.raw(`${doc}.sections`) as Record<string, Section>;
  return (
    <PageFrame booking={false}>
      <PageHead crumb="Alopex Digital OÜ" title={l(`${doc}.title`)} lead={`${l(`${doc}.lastUpdated`)}: ${UPDATED}`} />
      <section className="s">
        <div className="wrap legal">
          {doc === "privacyPolicy" && (
            <dl className="facts card">
              <div><dt>{l("privacyPolicy.company")}</dt><dd>{COMPANY.name}</dd></div>
              <div><dt>{l("privacyPolicy.registryCode")}</dt><dd>{COMPANY.registry}</dd></div>
              <div><dt>{l("privacyPolicy.address")}</dt><dd>{COMPANY.address}</dd></div>
              <div><dt>{l("privacyPolicy.email")}</dt><dd><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd></div>
            </dl>
          )}
          {Object.entries(sections).map(([key, s]) => (
            <section key={key}>
              <h2>{s.title}</h2>
              {s.content && <p>{s.content}</p>}
              {s.items && (
                <ul>
                  {s.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
              {s.after && <p>{s.after}</p>}
              {key === "contact" && (
                <p>
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  {doc === "terms" && <><br />{COMPANY.address}</>}
                </p>
              )}
              {key === "supervisory" && (
                <p>
                  Andmekaitse Inspektsioon
                  <br />
                  Tatari 39, 10134 Tallinn, Estonia
                  <br />
                  <a href="mailto:info@aki.ee">info@aki.ee</a>
                </p>
              )}
            </section>
          ))}
          <p className="muted">{t.footer.base}</p>
        </div>
      </section>
    </PageFrame>
  );
}

export async function legalMetadata(locale: string, doc: "privacyPolicy" | "terms") {
  const l = await getTranslations({ locale, namespace: "legal" });
  return { title: `${l(`${doc}.title`)} | Alopex Digital`, description: l(`${doc}.metaDescription`) };
}
