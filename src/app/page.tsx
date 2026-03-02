import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Uniques } from "@/components/Uniques";
import { Process } from "@/components/Process";
import { Values } from "@/components/Values";
import { Stats } from "@/components/Stats";
import { Guarantee } from "@/components/Guarantee";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Uniques />
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
