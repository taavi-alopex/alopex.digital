import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Clients } from "@/components/Clients";
import { InlineCTA } from "@/components/InlineCTA";
import { SocialProof } from "@/components/SocialProof";
import { Stats } from "@/components/Stats";
import { Anchoring } from "@/components/Anchoring";
import { Guarantee } from "@/components/Guarantee";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Clients />
        <InlineCTA variant="afterClients" />
        <SocialProof />
        <Stats />
        <Anchoring />
        <Guarantee />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
