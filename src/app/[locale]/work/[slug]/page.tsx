import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CLIENT_DATA, clientDataById } from "@/content/v2/clients";
import { getClientText, getText } from "@/content/v2/text";
import { Art } from "@/components/v2/Art";
import { ClientTile, Logo, PageFrame, systemsLabel } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => CLIENT_DATA.map((c) => ({ locale, slug: c.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!clientDataById(slug)) return {};
  const ct = getClientText(locale, slug);
  return { title: `${ct.name}: ${ct.title} | Alopex Digital`, description: ct.result };
}

export default async function ClientPage({ params }: Props) {
  const { locale, slug } = await params;
  const c = clientDataById(slug);
  if (!c) notFound();
  const t = getText(locale);
  const ct = getClientText(locale, c.id);
  const quote = t.home.quotes.items.find((q) => q.client === c.id);
  const others = CLIENT_DATA.filter((x) => x.id !== c.id).slice(0, 3);

  return (
    <PageFrame>
      <header className="phead case">
        <div className="wrap">
          <Link className="back" href="/work">{t.ui.backWork}</Link>
          <div className="case-grid">
            <div>
              <div className="case-logo"><Logo id={c.id} name={ct.name} /></div>
              <span className="mono muted">{ct.industry} · {ct.status}</span>
              <h1>{ct.title}</h1>
              <p className="lead">{ct.result}</p>
            </div>
            <Art name={c.art} className="art panel" />
          </div>
        </div>
      </header>

      <section className="s">
        <div className="wrap">
          <div className="shead">
            <h2>{t.ui.whatWeBuilt}</h2>
            <span className="mono muted">{systemsLabel(t, c.systems.length)}</span>
          </div>
          <div className="systems">
            {c.systems.map((s, i) => {
              const st = ct.systems[i];
              return (
                <article key={st.title} className="sys card">
                  <span className="no">{i + 1}</span>
                  <div>
                    <h3>{st.title}</h3>
                    <Link className="chip area" href={`/work?area=${s.area}`}>{t.areas[s.area].title}</Link>
                    <div className="tags">
                      {s.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="col"><b>{t.ui.before}</b><p>{st.before}</p></div>
                  <div className="col"><b>{t.ui.built}</b><p>{st.built}</p></div>
                  <div className="col now"><b>{t.ui.now}</b><p>{st.now}</p></div>
                </article>
              );
            })}
          </div>
          {quote && (
            <figure className="card quote wide">
              <blockquote>{quote.quote}</blockquote>
              <figcaption>
                <b>{quote.name}</b>
                <span>{quote.role}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <div className="shead">
            <h2>{t.ui.otherClients}</h2>
            <Link className="link" href="/work">{t.ui.allWork}</Link>
          </div>
          <div className="wall">
            {others.map((o) => (
              <ClientTile key={o.id} c={o} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
