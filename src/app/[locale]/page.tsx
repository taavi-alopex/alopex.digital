import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Clients } from "@/components/Clients";
import { Uniques } from "@/components/Uniques";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Stats } from "@/components/Stats";
import { Values } from "@/components/Values";
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
        <About />
        <Clients />
        <Uniques />
        <Services />
        <Process />
        <Stats />
        <Values />
        <Guarantee />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
