import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { AREA_KEYS, CLIENT_DATA, areasOf, type AreaKey } from "@/content/v2/clients";
import { fmt, getText } from "@/content/v2/text";
import { Art } from "@/components/v2/Art";
import { ClientTile, PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ area?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.work.crumb} | Alopex Digital`, description: t.work.meta };
}

// "What we automate" lives here as a filter: pick the kind of work, see who we built it for.
export default async function WorkPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const t = getText(locale);
  const { area: raw } = await searchParams;
  const area = (AREA_KEYS as readonly string[]).includes(raw ?? "") ? (raw as AreaKey) : null;
  const list = area ? CLIENT_DATA.filter((c) => areasOf(c).includes(area)) : CLIENT_DATA;
  const systems = CLIENT_DATA.reduce((n, c) => n + c.systems.length, 0);

  return (
    <PageFrame>
      <PageHead crumb={t.work.crumb} title={t.work.title} lead={fmt(t.work.lead, { c: CLIENT_DATA.length, s: systems })} />
      <section className="s">
        <div className="wrap">
          <nav className="filters" aria-label={t.work.filter}>
            <Link href="/work" aria-current={!area ? "true" : undefined} scroll={false}>{t.work.all}</Link>
            {AREA_KEYS.map((k) => (
              <Link key={k} href={`/work?area=${k}`} aria-current={area === k ? "true" : undefined} scroll={false}>
                {t.areas[k].title}
              </Link>
            ))}
          </nav>
          {area && (
            <div className="area-note card">
              <Art name={area} className="art" />
              <div>
                <h2>{t.areas[area].title}</h2>
                <ul className="ticks one">
                  {t.areas[area].jobs.map((j) => (
                    <li key={j}>{j}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="wall">
            {list.map((c) => (
              <ClientTile key={c.id} c={c} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
