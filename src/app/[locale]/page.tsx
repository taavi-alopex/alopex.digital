import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { HomeHero } from "@/components/HomeContent";
import { ABVariantProvider } from "@/components/ABVariantProvider";
import { Clients } from "@/components/Clients";
import { InlineCTA } from "@/components/InlineCTA";
import { SocialProof } from "@/components/SocialProof";
import { Stats } from "@/components/Stats";
import { Anchoring } from "@/components/Anchoring";
import { Guarantee } from "@/components/Guarantee";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SpruceTreeline } from "@/components/SpruceTreeline";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const urlVariant = typeof params.v === "string" ? params.v : undefined;

  return (
    <>
      <Navigation />
      <main>
        <ABVariantProvider urlVariant={urlVariant}>
          <HomeHero />
        </ABVariantProvider>
        <Clients />
        <InlineCTA variant="afterClients" />
        {/* Organic treeline divider */}
        <div className="relative" style={{ background: "var(--midnight)", marginTop: "-1px" }}>
          <SpruceTreeline variant={2} opacity={0.05} />
        </div>
        <SocialProof />
        <Stats />
        <Anchoring />
        {/* Organic treeline divider */}
        <div className="relative" style={{ background: "var(--off-white)", marginTop: "-1px" }}>
          <SpruceTreeline variant={3} opacity={0.06} flip />
        </div>
        <Guarantee />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
