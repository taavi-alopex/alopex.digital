import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PRODUCTS, SMALL_PRODUCTS } from "@/content/v2/pages";
import { fmt, getText } from "@/content/v2/text";
import { Art } from "@/components/v2/Art";
import { BookLink } from "@/components/v2/BookLink";
import { PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.productsPage.crumb} | Alopex Digital`, description: t.productsPage.lead };
}

export default async function ProductsPage({ params }: Props) {
  const t = getText((await params).locale);
  const pp = t.productsPage;
  return (
    <PageFrame>
      <PageHead crumb={pp.crumb} title={pp.title} lead={pp.lead} />
      <section className="s">
        <div className="wrap">
          <div className="prods">
            {PRODUCTS.map((p, i) => {
              const pt = t.products[p.id];
              return (
                <Link key={p.id} className={`prod card${i === 0 ? " main" : ""}`} href={`/products/${p.id}`}>
                  <Art name={p.art} className="art panel" />
                  <div className="b">
                    <span className={`lbl ${p.tone}`}>{t.ui.states[p.tone]}</span>
                    <span className="mono muted">{pt.for}</span>
                    <h2>{pt.name}</h2>
                    <p>{pt.lead}</p>
                    {i === 0 && (
                      <ol className="msteps">
                        {pt.steps.map(([s, d], k) => (
                          <li key={s}>
                            <i>0{k + 1}</i>
                            <b>{s}</b>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    <span className="go">{fmt(t.ui.aboutProduct, { name: pt.name })}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="s alt">
        <div className="wrap">
          <div className="shead">
            <h2>{pp.ownTitle}</h2>
            <p>{pp.ownSub}</p>
          </div>
          <div className="grid3">
            {SMALL_PRODUCTS.map((p) => {
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
            {t.ownTools.map((o) => (
              <div key={o.name} className="card small">
                <span className={`lbl ${o.state === "live" ? "live" : "early"}`}>{t.ui.states[o.state as "live" | "service"]}</span>
                <b>{o.name}</b>
                <span>{o.text}</span>
                <BookLink className="link">{t.ui.askAbout}</BookLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
