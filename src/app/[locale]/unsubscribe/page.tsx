import type { Metadata } from "next";
import { Suspense } from "react";
import { getText } from "@/content/v2/text";
import { PageFrame } from "@/components/v2/Shared";
import { UnsubscribeBox } from "@/components/v2/Unsubscribe";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: `${t.unsubscribe.title} | Alopex Digital`, robots: { index: false } };
}

export default async function UnsubscribePage({ params }: Props) {
  const t = getText((await params).locale);
  return (
    <PageFrame booking={false}>
      <section className="s">
        <div className="wrap narrow">
          <Suspense>
            <UnsubscribeBox text={t.unsubscribe} />
          </Suspense>
        </div>
      </section>
    </PageFrame>
  );
}
