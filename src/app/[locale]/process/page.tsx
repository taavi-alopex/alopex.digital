import type { Metadata } from "next";
import { getText } from "@/content/v2/text";
import { ProcessSteps } from "@/components/v2/ProcessSteps";
import { PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.process.head.crumb} | Alopex Digital`, description: t.process.head.lead };
}

export default async function ProcessPage({ params }: Props) {
  const t = getText((await params).locale);
  const p = t.process;
  return (
    <PageFrame>
      <PageHead {...p.head} />
      <section className="s">
        <div className="wrap">
          <ProcessSteps steps={p.steps} hint={p.scrollHint} stepLabel={p.stepLabel} give={p.give} get={p.get} />
        </div>
      </section>
      <section className="s alt">
        <div className="wrap">
          <div className="shead">
            <h2>{p.promisesTitle}</h2>
            <p>{p.promisesSub}</p>
          </div>
          <div className="grid3">
            {p.promises.map((x) => (
              <div key={x.title} className="card small">
                <span className="lbl live">{x.label}</span>
                <b>{x.title}</b>
                <span>{x.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap faq-wrap">
          <h2 className="minor">{p.faqTitle}</h2>
          <div className="faq">
            {p.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
