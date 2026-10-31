import type { Metadata } from "next";
import { getClientText, getText } from "@/content/v2/text";
import { FreeCheck, type Area, type Example } from "@/components/v2/FreeCheck";
import { PageFrame, PageHead } from "@/components/v2/Shared";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.check.head.crumb} | Alopex Digital`, description: t.check.head.lead };
}

// One real example per kind of work: [client, system index].
const EXAMPLES = { reply: ["packtailor", 1], quotes: ["consolis", 0], ops: ["ovision", 0], reports: ["gemoss", 0], sales: ["packtailor", 0], followup: ["koduaken", 0] } as const;

export default async function FreeCheckPage({ params }: Props) {
  const { locale } = await params;
  const t = getText(locale);
  const examples = Object.fromEntries(
    Object.entries(EXAMPLES).map(([area, [id, i]]) => {
      const ct = getClientText(locale, id);
      return [area, { name: ct.name, system: ct.systems[i].title, href: `/work/${id}` }];
    }),
  ) as Record<Area, Example>;
  return (
    <PageFrame>
      <PageHead {...t.check.head} />
      <section className="s">
        <div className="wrap">
          <FreeCheck t={t.check} examples={examples} />
        </div>
      </section>
    </PageFrame>
  );
}
