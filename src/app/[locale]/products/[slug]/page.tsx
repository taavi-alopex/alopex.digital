import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ALL_PRODUCTS } from "@/content/v2/pages";
import { getText } from "@/content/v2/text";
import { Art } from "@/components/v2/Art";
import { BookLink } from "@/components/v2/BookLink";
import { PageFrame } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string; slug: string }> };

const byId = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ALL_PRODUCTS.map((p) => ({ locale, slug: p.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = byId(slug);
  if (!p) return {};
  const pt = getText(locale).products[p.id];
  return { title: `${pt.name} | Alopex Digital`, description: pt.lead };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const p = byId(slug);
  if (!p) notFound();
  const t = getText(locale);
  const pt = t.products[p.id];

  return (
    <PageFrame>
      <header className="phead case">
        <div className="wrap">
          <Link className="back" href="/products">{t.ui.backProducts}</Link>
          <div className="case-grid">
            <div>
              <span className="mono muted">{pt.name} · {pt.for}</span> <span className={`lbl ${p.tone}`}>{t.ui.states[p.tone]}</span>
              <h1>{pt.tagline}</h1>
              <p className="lead">{pt.lead}</p>
              <div className="actions">
                {p.marketplace ? (
                  <a className="btn" href={p.marketplace} target="_blank" rel="noopener noreferrer">{pt.cta} ↗</a>
                ) : (
                  <BookLink>{pt.cta}</BookLink>
                )}
                <BookLink className="btn ghost">{t.ui.bookDemo}</BookLink>
              </div>
            </div>
            <Art name={p.art} className="art panel" />
          </div>
        </div>
      </header>
      <section className="s">
        <div className="wrap">
          <h2 className="minor">{t.ui.howItWorks}</h2>
          <ol className="steps4">
            {pt.steps.map(([s, d], i) => (
              <li key={s}>
                <span className="mono muted">0{i + 1}</span>
                <b>{s}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <div className="grid2">
            <div className="card small">
              <b>{t.ui.whoFor}</b>
              <ul className="ticks one">
                {pt.who.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div className="card small">
              <b>{pt.proofTitle}</b>
              <span>{pt.proof}</span>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
