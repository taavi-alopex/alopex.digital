"use client";

import { useState } from "react";
import Image from "next/image";

function ROICalculator() {
  const [quotes, setQuotes] = useState(100);
  const [dealValue, setDealValue] = useState(5000);
  const [conversionRate, setConversionRate] = useState(10);

  // Calculations
  const currentOrders = Math.round((quotes * conversionRate) / 100);
  const additionalOrders = Math.round(currentOrders * 0.16); // +16% improvement
  const newOrders = currentOrders + additionalOrders;
  const additionalRevenue = additionalOrders * dealValue;
  const annualRevenue = additionalRevenue * 12;

  // PLN conversion (approximate rate)
  const plnRate = 4.3;
  const additionalRevenuePLN = Math.round(additionalRevenue * plnRate);
  const annualRevenuePLN = Math.round(annualRevenue * plnRate);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h3 className="font-instrument text-2xl text-[var(--midnight)] mb-6 text-center">
        Kalkulator ROI
      </h3>
      <p className="text-center text-[var(--midnight)]/60 mb-8 text-sm">
        Dostosuj wartości do swojej firmy
      </p>

      <div className="space-y-6">
        {/* Quotes per month */}
        <div>
          <label className="block text-sm font-medium text-[var(--midnight)] mb-2">
            Ofert miesięcznie: <span className="font-bold text-[var(--accent)]">{quotes}</span>
          </label>
          <input
            type="range"
            min="20"
            max="500"
            step="10"
            value={quotes}
            onChange={(e) => setQuotes(Number(e.target.value))}
            className="w-full h-2 bg-[var(--midnight)]/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
          <div className="flex justify-between text-xs text-[var(--midnight)]/40 mt-1">
            <span>20</span>
            <span>500</span>
          </div>
        </div>

        {/* Deal value */}
        <div>
          <label className="block text-sm font-medium text-[var(--midnight)] mb-2">
            Średnia wartość zamówienia: <span className="font-bold text-[var(--accent)]">{dealValue.toLocaleString()} €</span>
          </label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={dealValue}
            onChange={(e) => setDealValue(Number(e.target.value))}
            className="w-full h-2 bg-[var(--midnight)]/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
          <div className="flex justify-between text-xs text-[var(--midnight)]/40 mt-1">
            <span>1 000 €</span>
            <span>20 000 €</span>
          </div>
        </div>

        {/* Current conversion */}
        <div>
          <label className="block text-sm font-medium text-[var(--midnight)] mb-2">
            Obecna konwersja: <span className="font-bold text-[var(--accent)]">{conversionRate}%</span>
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full h-2 bg-[var(--midnight)]/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />
          <div className="flex justify-between text-xs text-[var(--midnight)]/40 mt-1">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 pt-8 border-t border-[var(--midnight)]/10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-[var(--midnight)]/5 rounded-lg">
            <div className="text-sm text-[var(--midnight)]/60">Teraz</div>
            <div className="text-2xl font-bold text-[var(--midnight)]">{currentOrders}</div>
            <div className="text-xs text-[var(--midnight)]/40">zamówień/mies.</div>
          </div>
          <div className="text-center p-4 bg-[var(--accent)]/10 rounded-lg border-2 border-[var(--accent)]">
            <div className="text-sm text-[var(--accent)]">Po wdrożeniu</div>
            <div className="text-2xl font-bold text-[var(--accent)]">{newOrders}</div>
            <div className="text-xs text-[var(--midnight)]/40">zamówień/mies.</div>
          </div>
        </div>

        <div className="bg-[var(--accent)] text-[var(--midnight)] rounded-xl p-6 text-center">
          <div className="text-sm opacity-80 mb-1">Dodatkowy przychód miesięcznie</div>
          <div className="text-3xl font-bold mb-1">
            +{additionalRevenue.toLocaleString()} €
          </div>
          <div className="text-sm opacity-70">
            (~{additionalRevenuePLN.toLocaleString()} PLN)
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--midnight)]/20">
            <div className="text-sm opacity-80">Rocznie to</div>
            <div className="text-xl font-bold">
              +{annualRevenue.toLocaleString()} € <span className="font-normal opacity-70">(~{annualRevenuePLN.toLocaleString()} PLN)</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--midnight)]/40 mt-4">
          * Szacunki oparte na +16% wzrostu konwersji (case study Koduaken)
        </p>
      </div>
    </div>
  );
}

function CaseStudySection() {
  return (
    <section className="py-20 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm font-medium mb-4">
            Case Study
          </span>
          <h2 className="font-instrument text-3xl md:text-4xl lg:text-5xl">
            Jak firma okienna zwiększyła sprzedaż o 16%
          </h2>
          <p className="mt-4 text-xl text-[var(--off-white)]/60">
            bez zatrudniania dodatkowych pracowników
          </p>
        </div>

        {/* Problem */}
        <div className="mb-12">
          <h3 className="font-outfit font-semibold text-xl text-[var(--accent)] mb-4">Problem</h3>
          <p className="text-lg text-[var(--off-white)]/80 leading-relaxed">
            Estońska firma <strong>Koduaken</strong> wysyłała około <strong>400 ofert miesięcznie</strong>.
            Ich zespół sprzedaży był przeciążony — cały czas pochłaniało przygotowywanie wycen
            i bieżąca komunikacja z klientami.
          </p>
          <p className="text-lg text-[var(--off-white)]/80 leading-relaxed mt-4">
            Problem nie leżał w jakości ofert. Problem polegał na tym, że <strong>po wysłaniu oferty
            nikt nie miał czasu</strong>, żeby skontaktować się z klientem. Oferta była wysyłana i...
            czekano, aż klient sam odpowie.
          </p>
        </div>

        {/* Before numbers */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[var(--off-white)]/5 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--off-white)]">388</div>
            <div className="text-sm text-[var(--off-white)]/60">ofert/miesiąc</div>
          </div>
          <div className="bg-[var(--off-white)]/5 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--off-white)]">47</div>
            <div className="text-sm text-[var(--off-white)]/60">odpowiedzi</div>
          </div>
          <div className="bg-[var(--off-white)]/5 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--off-white)]">37</div>
            <div className="text-sm text-[var(--off-white)]/60">zamówień</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-6 text-center border border-red-500/30">
            <div className="text-3xl font-bold text-red-400">341</div>
            <div className="text-sm text-red-400/80">ofert bez odpowiedzi</div>
          </div>
        </div>

        {/* Solution */}
        <div className="mb-12">
          <h3 className="font-outfit font-semibold text-xl text-[var(--accent)] mb-4">Rozwiązanie</h3>
          <p className="text-lg text-[var(--off-white)]/80 leading-relaxed">
            Zbudowaliśmy prosty system automatycznego follow-upu, który:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span className="text-[var(--off-white)]/80">Śledzi każdą wysłaną ofertę</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span className="text-[var(--off-white)]/80">Automatycznie wysyła przyjazne przypomnienie, gdy klient nie odpowiada</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span className="text-[var(--off-white)]/80">Handlowiec nie musi nic robić ręcznie — system działa w tle</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[var(--accent)] mt-1">✓</span>
              <span className="text-[var(--off-white)]/80">Odpowiedzi trafiają bezpośrednio do skrzynki handlowca</span>
            </li>
          </ul>
        </div>

        {/* Results */}
        <div className="bg-[var(--accent)] text-[var(--midnight)] rounded-2xl p-8 md:p-12">
          <h3 className="font-outfit font-semibold text-xl mb-6">Wyniki</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">+16%</div>
              <div className="text-sm opacity-80 mt-2">więcej transakcji</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">+6</div>
              <div className="text-sm opacity-80 mt-2">zamówień/miesiąc</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">0</div>
              <div className="text-sm opacity-80 mt-2">dodatkowych pracowników</div>
            </div>
          </div>
          <div className="border-t border-[var(--midnight)]/20 pt-6">
            <p className="text-center text-lg">
              Przy średniej wartości zamówienia <strong>5 000 €</strong>, to <strong>30 000 € dodatkowego przychodu miesięcznie</strong>.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-[var(--off-white)]/40 mt-8">
          * Case study na podstawie wdrożenia w estońskiej firmie z branży okien i drzwi (2025).
          Wyniki mogą się różnić w zależności od branży i procesu sprzedaży.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Audyt procesu",
      description: "Mapujemy Państwa obecny proces ofertowania — od pierwszego kontaktu po zamówienie. Identyfikujemy gdzie \"giną\" oferty.",
    },
    {
      number: "02",
      title: "Konfiguracja systemu",
      description: "Ustawiamy automatyczne przypomnienia dopasowane do Państwa procesu. Treść, timing, kanał — wszystko pod Państwa markę.",
    },
    {
      number: "03",
      title: "Integracja",
      description: "Łączymy system z Państwa obecnymi narzędziami (email, CRM, kalendarz). Bez zmiany sposobu pracy zespołu.",
    },
    {
      number: "04",
      title: "Uruchomienie + monitoring",
      description: "Startujemy i monitorujemy wyniki. Dashboard pokazuje ile ofert dostało follow-up i ile wróciło jako zamówienia.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[var(--off-white)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-instrument text-3xl md:text-4xl text-[var(--midnight)]">
            Jak to działa?
          </h2>
          <p className="mt-4 text-lg text-[var(--midnight)]/60">
            Od audytu do działającego systemu w 2-3 tygodnie
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-[var(--midnight)] text-[var(--accent)] rounded-full flex items-center justify-center font-outfit font-bold text-xl">
                {step.number}
              </div>
              <div>
                <h3 className="font-outfit font-semibold text-xl text-[var(--midnight)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--midnight)]/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-20 px-6 bg-[var(--midnight)] text-[var(--off-white)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-instrument text-3xl md:text-4xl">
            Z kim będziesz rozmawiać?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mikita */}
          <div className="bg-[var(--off-white)]/5 rounded-2xl p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[var(--accent)]">
              <Image
                src="/images/team/mikita.jpg"
                alt="Mikita"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-outfit font-semibold text-xl mb-2">Mikita</h3>
            <p className="text-[var(--accent)] text-sm mb-4">CRM Specialist</p>
            <p className="text-[var(--off-white)]/70 text-sm mb-6">
              Specjalizuje się w automatyzacji procesów sprzedażowych dla firm B2B.
              Mówi po polsku.
            </p>
            <a
              href="https://www.linkedin.com/in/mikita-kutsenka/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Taavi */}
          <div className="bg-[var(--off-white)]/5 rounded-2xl p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[var(--accent)]">
              <Image
                src="/images/team/taavi.jpg"
                alt="Taavi"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-outfit font-semibold text-xl mb-2">Taavi</h3>
            <p className="text-[var(--accent)] text-sm mb-4">Founder & Automation Architect</p>
            <p className="text-[var(--off-white)]/70 text-sm mb-6">
              Zbudował system follow-up dla Koduaken.
              Projektuje architekturę automatyzacji dla firm w całej Europie.
            </p>
            <a
              href="https://www.linkedin.com/in/taavi-ilmj%C3%A4rv-6b21543a/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  return (
    <section className="py-12 px-6 bg-[var(--off-white)] border-t border-[var(--midnight)]/10">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl mb-2">🇪🇺</div>
            <h4 className="font-outfit font-semibold text-[var(--midnight)] mb-1">GDPR & UŚUDE</h4>
            <p className="text-sm text-[var(--midnight)]/60">
              Pełna zgodność z europejskimi regulacjami ochrony danych i polską ustawą o świadczeniu usług drogą elektroniczną.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">💶</div>
            <h4 className="font-outfit font-semibold text-[var(--midnight)] mb-1">Cennik w EUR</h4>
            <p className="text-sm text-[var(--midnight)]/60">
              Faktury w EUR lub PLN według preferencji. Stały kurs, brak niespodzianek walutowych.
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-outfit font-semibold text-[var(--midnight)] mb-1">Dane w EU</h4>
            <p className="text-sm text-[var(--midnight)]/60">
              Wszystkie dane przechowywane na serwerach w Unii Europejskiej. Bez transferu do USA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-6 bg-[var(--accent)]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-instrument text-3xl md:text-4xl lg:text-5xl text-[var(--midnight)] mb-6">
          Zarezerwuj 20-minutowy audyt
        </h2>
        <p className="text-xl text-[var(--midnight)]/80 mb-8">
          Zmapujemy Państwa proces ofertowania i pokażemy, gdzie „giną" potencjalne zamówienia.
          Bez zobowiązań.
        </p>
        <a
          href="https://api.leadconnectorhq.com/widget/booking/QRDz2smDfgEZvhTtyePu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--midnight)] text-[var(--off-white)] px-10 py-5 rounded-xl font-outfit font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          Zarezerwuj audyt →
        </a>
        <p className="mt-6 text-sm text-[var(--midnight)]/60">
          Rozmowa po polsku z Mikitą lub po angielsku z Taavim
        </p>
      </div>
    </section>
  );
}

export function QuoteFollowUpPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--midnight)] text-[var(--off-white)] py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm font-medium mb-6">
            Dla firm z branży okien i drzwi
          </span>
          <h1 className="font-instrument text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Wysyłasz 50+ ofert miesięcznie.
            <br />
            <span className="text-[var(--accent)]">73% nigdy nie dostaje drugiego kontaktu.</span>
          </h1>
          <p className="text-xl text-[var(--off-white)]/70 max-w-2xl mx-auto mb-10">
            Nie dlatego, że cena nie pasuje. Dlatego, że nikt nie ma czasu zadzwonić i zapytać.
            <br />
            <strong className="text-[var(--off-white)]">Automatyczny follow-up rozwiązuje ten problem.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#kalkulator"
              className="inline-block bg-[var(--accent)] text-[var(--midnight)] px-8 py-4 rounded-xl font-outfit font-semibold hover:opacity-90 transition-opacity"
            >
              Oblicz potencjalny wzrost →
            </a>
            <a
              href="#case-study"
              className="inline-block border-2 border-[var(--off-white)]/30 text-[var(--off-white)] px-8 py-4 rounded-xl font-outfit font-semibold hover:bg-[var(--off-white)]/10 transition-colors"
            >
              Zobacz case study
            </a>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="kalkulator" className="py-20 px-6 bg-gradient-to-b from-[var(--midnight)] to-[var(--off-white)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-instrument text-3xl md:text-4xl text-[var(--off-white)] mb-4">
              Ile zostawiacie na stole?
            </h2>
            <p className="text-lg text-[var(--off-white)]/60">
              Przesuń suwaki, żeby zobaczyć potencjalny wzrost
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Case Study */}
      <div id="case-study">
        <CaseStudySection />
      </div>

      {/* How it works */}
      <HowItWorks />

      {/* Team */}
      <TeamSection />

      {/* Trust Signals */}
      <TrustSignals />

      {/* CTA */}
      <CTASection />
    </>
  );
}
