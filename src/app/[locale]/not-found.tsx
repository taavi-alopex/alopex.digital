import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getText } from "@/content/v2/text";
import { PageFrame } from "@/components/v2/Shared";

export default async function NotFound() {
  const t = getText(await getLocale());
  return (
    <PageFrame booking={false}>
      <section className="s">
        <div className="wrap narrow">
          <div className="card center-box">
            <h1>{t.notFound.title}</h1>
            <p>{t.notFound.text}</p>
            <Link className="btn" href="/">{t.notFound.home}</Link>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
