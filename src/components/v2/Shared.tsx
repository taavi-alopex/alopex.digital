import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LOGOS, MENU } from "@/content/v2/home";
import type { ClientData } from "@/content/v2/clients";
import { fmt, getClientText, getText, type SiteText } from "@/content/v2/text";
import { Art } from "./Art";
import { BookingForm } from "./BookingBlock";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/* eslint-disable @next/next/no-img-element -- small static logos and portraits, sized by CSS */

export function Logo({ id, name }: { id: string; name?: string }) {
  const l = LOGOS[id];
  if (!l) return null;
  if (!l.src) return <span className="wm">{name ?? l.name}</span>;
  const img = <img src={l.src} alt={l.text ? "" : l.name} style={{ height: l.height }} className={l.invert ? "inv" : undefined} />;
  if (!l.text) return img;
  return (
    <span className="lmark">
      {img}
      {l.text}
    </span>
  );
}

export function systemsLabel(t: SiteText, n: number) {
  return n === 1 ? t.ui.oneSystem : fmt(t.ui.nSystems, { n });
}

export function ClientTile({ c, locale, big }: { c: ClientData; locale: string; big?: boolean }) {
  const t = getText(locale);
  const ct = getClientText(locale, c.id);
  return (
    <Link className={`tile card${big ? " big" : ""}`} href={`/work/${c.id}`}>
      <Art name={c.art} className="tart" />
      <div className="tb">
        <div className="top">
          <span className="lg"><Logo id={c.id} name={ct.name} /></span>
          <span className="n">{systemsLabel(t, c.systems.length)}</span>
        </div>
        <span className="mono muted">{ct.industry}</span>
        <h3>{ct.title}</h3>
        <ul className="syslist">
          {ct.systems.map((s) => (
            <li key={s.title}>{s.title}</li>
          ))}
        </ul>
        <p className="res">{ct.result}</p>
      </div>
    </Link>
  );
}

export function PageHead({ crumb, title, lead, children }: { crumb: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className="phead">
      <div className="wrap">
        <span className="mono muted">{crumb}</span>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

export function BookingSection({ t }: { t: SiteText }) {
  const b = t.booking;
  return (
    <section className="bk" id="book">
      <div className="wrap">
        <div className="bk-card">
          <div className="bk-who">
            <div className="bk-me">
              <img src="/martin.jpg" alt="" />
              <div>
                <b>{b.name}</b>
                <span>{b.role}</span>
              </div>
            </div>
            <h2>{b.title}</h2>
            <p className="bk-q">{b.quote}</p>
            <ul className="bk-get">
              {b.gets.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
          <BookingForm text={b} />
        </div>
      </div>
    </section>
  );
}

/** Every new page: menu, content, the booking block, footer. */
export async function PageFrame({ children, booking = true }: { children: React.ReactNode; booking?: boolean }) {
  const t = getText(await getLocale());
  return (
    <div className="v2">
      <SiteNav menu={MENU.map((m) => ({ href: m.href, label: t.menu[m.key] }))} bookLabel={t.ui.bookCall} menuLabel={t.ui.menu} langLabel={t.ui.language} />
      <main>
        {children}
        {booking && <BookingSection t={t} />}
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
