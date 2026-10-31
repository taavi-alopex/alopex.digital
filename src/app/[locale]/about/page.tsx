import type { Metadata } from "next";
import { CLIENT_DATA } from "@/content/v2/clients";
import { getText } from "@/content/v2/text";
import { JoinForm } from "@/components/v2/Forms";
import { PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.about.head.crumb} | Alopex Digital`, description: t.about.head.lead };
}

const PHOTOS = ["/images/team/taavi.jpg", "/martin.jpg"];
const EMAILS = ["taavi@alopex.digital", "martin@alopex.digital"];
// Team size, client and system counts (from the Work data) and working languages.
const STATS = [8, CLIENT_DATA.length, CLIENT_DATA.reduce((n, c) => n + c.systems.length, 0), 4];

/* eslint-disable @next/next/no-img-element -- team portraits, sized by CSS */

export default async function AboutPage({ params }: Props) {
  const t = getText((await params).locale);
  const a = t.about;
  return (
    <PageFrame>
      <PageHead {...a.head} />
      <section className="s">
        <div className="wrap ab-story">
          <div>
            <h2>{a.storyTitle}</h2>
            {a.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="ab-stats">
            {STATS.map((n, i) => (
              <div key={a.stats[i]} className="card">
                <b>{n}</b>
                <span>{a.stats[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap">
          <div className="grid3 ab-diff">
            {a.diff.map((d, i) => (
              <div key={d.title} className="card small">
                <span className="mono muted">0{i + 1}</span>
                <b>{d.title}</b>
                <span>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <div className="shead">
            <h2>{a.talkTo}</h2>
          </div>
          <div className="ab-people">
            {a.people.map((p, i) => (
              <div key={p.name} className="card ab-person">
                <img src={PHOTOS[i]} alt="" />
                <b>{p.name}</b>
                <span className="mono muted">{p.role}</span>
                <p>{p.text}</p>
                <a href={`mailto:${EMAILS[i]}`}>{EMAILS[i]}</a>
              </div>
            ))}
            <div className="card ab-person ab-team">
              <div className="ab-dots" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => <i key={i} />)}
              </div>
              <p>{a.builders}</p>
            </div>
          </div>
          <dl className="facts card ab-facts">
            {a.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="s alt">
        <div className="wrap">
          <div className="shead">
            <h2>{a.valuesTitle}</h2>
          </div>
          <div className="grid5">
            {a.values.map((v) => (
              <div key={v.title} className="card small">
                <b>{v.title}</b>
                <span>{v.text}</span>
              </div>
            ))}
          </div>
          <div className="join card" id="join">
            <div>
              <b>{a.join.title}</b>
              <span>{a.join.text}</span>
            </div>
            <JoinForm text={a.join} />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
