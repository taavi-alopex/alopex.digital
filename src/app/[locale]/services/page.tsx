import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { CUSTOM_CLIENTS } from "@/content/v2/home";
import { PRODUCTS } from "@/content/v2/pages";
import { fmt, getClientText, getText } from "@/content/v2/text";
import { Art } from "@/components/v2/Art";
import { BookLink } from "@/components/v2/BookLink";
import { PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.services.head.crumb} | Alopex Digital`, description: t.services.head.lead };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = getText(locale);
  const { custom, ai } = t.services;
  return (
    <PageFrame>
      <PageHead {...t.services.head} />

      <section className="s">
        <div className="wrap">
          <article className="svc-main card">
            <div>
              <span className="mono muted">{custom.label}</span>
              <h2>{custom.title}</h2>
              <p>{custom.text}</p>
              <ul className="ticks">
                {custom.examples.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="used">
                <span className="mono muted">{t.ui.runningAt}</span>
                {CUSTOM_CLIENTS.map((id) => (
                  <Link key={id} className="chip" href={`/work/${id}`}>{getClientText(locale, id).name}</Link>
                ))}
              </div>
              <div className="acts">
                <BookLink>{t.ui.book30}</BookLink>
                <Link className="link" href="/process">{t.ui.howProjectRuns}</Link>
              </div>
            </div>
            <Art name="custom" className="art panel" />
          </article>

          <article className="svc-ai card" id="ai">
            <Art name="ai" className="art panel" />
            <div>
              <span className="mono muted">{ai.label}</span>
              <h2>{ai.title}</h2>
              <p>{ai.text}</p>
              <ul className="ticks">
                {ai.points.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="acts">
                <BookLink>{t.ui.book30}</BookLink>
              </div>
            </div>
          </article>

          <div className="svc-prods" id="products">
            <div className="shead">
              <div>
                <span className="mono muted">03</span>
                <h2>{t.services.productsTitle}</h2>
              </div>
              <p>{t.services.productsSub}</p>
            </div>
            <div className="grid3">
              {PRODUCTS.map((p) => {
                const pt = t.products[p.id];
                return (
                  <Link key={p.id} className="card small hover prod-mini" href={`/products/${p.id}`}>
                    <Art name={p.art} className="art" />
                    <span className={`lbl ${p.tone}`}>{t.ui.states[p.tone]}</span>
                    <b>{pt.name}</b>
                    <span>{pt.lead}</span>
                    <span className="link">{fmt(t.ui.aboutProduct, { name: pt.name })}</span>
                  </Link>
                );
              })}
            </div>
            <Link className="link" href="/products">{t.services.productsLink} →</Link>
          </div>

          <h2 className="minor">{t.services.platformsTitle}</h2>
          <div className="grid4">
            {t.services.platforms.map((p) => {
              const inner = (
                <>
                  <span className="mono muted">{p.label}</span>
                  <b>{p.title}</b>
                  <span>{p.text}</span>
                  {p.href && <span className="link">{t.ui.readMore}</span>}
                </>
              );
              return p.href ? (
                <Link key={p.title} className="card small hover" href={p.href}>{inner}</Link>
              ) : (
                <div key={p.title} className="card small">{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <div className="shead">
            <h2>{t.services.whoTitle}</h2>
            <p>{t.services.whoSub}</p>
          </div>
          <div className="grid5">
            {t.services.who.map((w) => (
              <div key={w.title} className="card small">
                <b>{w.title}</b>
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
