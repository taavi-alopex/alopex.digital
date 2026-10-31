import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getText } from "@/content/v2/text";
import { BookingForm } from "@/components/v2/BookingBlock";
import { JoinTeamLink } from "@/components/v2/Forms";
import { COMPANY } from "@/components/v2/Legal";
import { PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.contact.head.crumb} | Alopex Digital`, description: t.contact.head.lead };
}

const PHOTOS = ["/images/team/taavi.jpg", "/martin.jpg"];
const MORE_LINKS = ["/health-check", "/work"];

/* eslint-disable @next/next/no-img-element -- team portraits, sized by CSS */

/** Contact: the booking form is the main thing here, so the page has no second booking block at the bottom. */
export default async function ContactPage({ params }: Props) {
  const t = getText((await params).locale);
  const c = t.contact;
  const b = t.booking;
  return (
    <PageFrame booking={false}>
      <PageHead {...c.head} />

      <section className="s ct">
        <div className="wrap ct-grid">
          <div className="card ct-book" id="book">
            <h2>{t.ui.book30}</h2>
            <BookingForm text={b} />
          </div>

          <div className="ct-side">
            <div className="card ct-write">
              <h2 className="minor">{c.write}</h2>
              <a className="big" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <a className="big" href="tel:+37257800857">+372 5780 0857</a>
              <span className="muted">{c.hours}</span>
            </div>
            <div className="card ct-people">
              <h2 className="minor">{c.direct}</h2>
              {c.people.map((p, i) => (
                <div key={p.email} className="ct-person">
                  <img src={PHOTOS[i]} alt="" />
                  <div>
                    <b>{p.name}</b>
                    <span className="muted">{p.role}</span>
                    <a href={`mailto:${p.email}`}>{p.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <div className="shead">
            <h2>{c.more}</h2>
          </div>
          <div className="grid3">
            {c.moreItems.map((m, i) => (
              <div key={m.title} className="card small">
                <b>{m.title}</b>
                <span>{m.text}</span>
                {MORE_LINKS[i] ? (
                  <Link className="link" href={MORE_LINKS[i]}>{m.link} →</Link>
                ) : (
                  <span className="link">
                    <JoinTeamLink label={`${t.footer.joinTeam} →`} closeLabel={t.ui.close} text={t.about.join} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s ct-details">
        <div className="wrap">
          <h2 className="minor">{c.details}</h2>
          <dl className="facts card">
            <div><dt>{c.company}</dt><dd>{COMPANY.name} · {c.registry} {COMPANY.registry}</dd></div>
            <div><dt>{c.address}</dt><dd>{COMPANY.address}</dd></div>
            <div>
              <dt>{c.follow}</dt>
              <dd className="soc">
                <a href="https://www.linkedin.com/company/alopex-digital" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://www.instagram.com/alopex.digital/" target="_blank" rel="noopener">Instagram</a>
                <a href="https://www.facebook.com/alopexdigital" target="_blank" rel="noopener">Facebook</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </PageFrame>
  );
}
