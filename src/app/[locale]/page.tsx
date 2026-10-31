import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getText } from "@/content/v2/text";
import { PageFrame } from "@/components/v2/Shared";
import { ClientStrip, Hero, HowItRuns, JobsBand, Quotes, RecentWork, Shipped, WhatWeDo } from "@/components/v2/Home";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getText((await params).locale);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = getText(locale);
  const p = { t, locale };
  return (
    <PageFrame>
      <Hero {...p} />
      <ClientStrip {...p} />
      <WhatWeDo {...p} />
      <JobsBand {...p} />
      <RecentWork {...p} />
      <HowItRuns {...p} />
      <Quotes {...p} />
      <Shipped {...p} />
    </PageFrame>
  );
}
