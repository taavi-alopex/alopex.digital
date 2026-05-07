"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";

function LossCalculator() {
  const [dealValue, setDealValue] = useState(2000);
  const [leadsPerMonth, setLeadsPerMonth] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);

  // 73% of leads never get follow-up
  // Assume 10% of those would convert if followed up
  const lostLeads = Math.round(leadsPerMonth * 0.73);
  const conversionRate = 0.10;
  const lostDeals = lostLeads * conversionRate;
  const monthlyLoss = Math.round(lostDeals * dealValue);
  const yearlyLoss = monthlyLoss * 12;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [dealValue, leadsPerMonth]);

  return (
    <div
      className="max-w-[600px] mx-auto"
      style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: "var(--radius-card)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Input fields */}
      <div className="grid grid-cols-2">
        <div
          className="p-6"
          style={{ borderRight: "1px solid var(--frost)" }}
        >
          <label
            className="block text-[10px] font-bold tracking-[1.5px] uppercase mb-3 text-center"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--dark-gray)",
            }}
          >
            Śr. wartość transakcji (€)
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px]"
              style={{ color: "var(--dark-gray)" }}
            >
              €
            </span>
            <input
              type="number"
              value={dealValue}
              onChange={(e) => setDealValue(Number(e.target.value) || 0)}
              className="w-full p-4 pl-8 text-[18px] font-semibold text-center border-0 outline-none"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--midnight)",
                background: "var(--off-white)",
                borderRadius: "var(--radius-button)",
              }}
            />
          </div>
        </div>
        <div className="p-6">
          <label
            className="block text-[10px] font-bold tracking-[1.5px] uppercase mb-3 text-center"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--dark-gray)",
            }}
          >
            Leadów miesięcznie
          </label>
          <input
            type="number"
            value={leadsPerMonth}
            onChange={(e) => setLeadsPerMonth(Number(e.target.value) || 0)}
            className="w-full p-4 text-[18px] font-semibold text-center border-0 outline-none"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--midnight)",
              background: "var(--off-white)",
              borderRadius: "var(--radius-button)",
            }}
          />
        </div>
      </div>

      {/* Result */}
      <div
        className="p-8 text-center"
        style={{
          background: "var(--off-white)",
          borderTop: "1px solid var(--frost)",
        }}
      >
        <div
          className="text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#dc5050",
          }}
        >
          Prawdopodobnie tracisz
        </div>
        <div
          className={`text-[clamp(36px,6vw,52px)] font-bold transition-all duration-300 ${isAnimating ? "scale-105" : "scale-100"}`}
          style={{
            fontFamily: "var(--font-heading)",
            color: "#dc5050",
          }}
        >
          €{monthlyLoss.toLocaleString()}
          <span
            className="text-[20px] font-normal"
            style={{ color: "var(--dark-gray)" }}
          >
            /mies.
          </span>
        </div>
        <p
          className="text-[13px] mt-3"
          style={{ color: "var(--dark-gray)" }}
        >
          {lostLeads} utraconych leadów × {Math.round(conversionRate * 100)}% konwersja = {lostDeals.toFixed(1)} utraconych transakcji · €{yearlyLoss.toLocaleString()}/rok
        </p>
      </div>
    </div>
  );
}

function CaseStudySection() {
  return (
    <section
      id="case-study"
      className="relative py-24 md:py-32 overflow-hidden frost-noise"
      style={{ background: "var(--midnight)" }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text="Case Study" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--frost)" }}
            >
              Jak firma okienna zwiększyła sprzedaż{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                o 16%
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p
              className="text-[17px] mt-4"
              style={{ color: "var(--text-dark-muted)" }}
            >
              bez zatrudniania dodatkowych pracowników
            </p>
          </ScrollReveal>
        </div>

        {/* Problem */}
        <ScrollReveal delay={3} variant="fadeLeft">
          <div className="mb-12">
            <span
              className="text-[11px] font-bold tracking-[2px] uppercase mb-4 inline-block"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--spruce-light)",
              }}
            >
              Problem
            </span>
            <p
              className="text-[16px] leading-[1.8]"
              style={{ color: "var(--text-dark-body)" }}
            >
              Estońska firma <strong style={{ color: "var(--frost)" }}>Koduaken</strong> wysyłała
              około <strong style={{ color: "var(--frost)" }}>400 ofert miesięcznie</strong>. Zespół
              sprzedaży był przeciążony — cały czas pochłaniało przygotowywanie wycen i bieżąca
              komunikacja z klientami.
            </p>
            <p
              className="text-[16px] leading-[1.8] mt-4"
              style={{ color: "var(--text-dark-body)" }}
            >
              Problem nie leżał w jakości ofert. Problem polegał na tym, że{" "}
              <strong style={{ color: "var(--frost)" }}>po wysłaniu oferty nikt nie miał czasu</strong>,
              żeby skontaktować się z klientem.
            </p>
          </div>
        </ScrollReveal>

        {/* Before numbers */}
        <ScrollReveal delay={4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
            {[
              { value: "388", label: "ofert/miesiąc", accent: false },
              { value: "47", label: "odpowiedzi", accent: false },
              { value: "37", label: "zamówień", accent: false },
              { value: "341", label: "ofert bez odpowiedzi", accent: true },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-5"
                style={{
                  background: stat.accent ? "rgba(220, 80, 80, 0.1)" : "var(--dark-elevated)",
                  borderRadius: "var(--radius-card)",
                  border: stat.accent ? "1px solid rgba(220, 80, 80, 0.3)" : "1px solid var(--dark-border)",
                }}
              >
                <div
                  className="text-[28px] font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: stat.accent ? "#dc5050" : "var(--frost)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: stat.accent ? "rgba(220, 80, 80, 0.8)" : "var(--text-dark-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Solution */}
        <ScrollReveal delay={5} variant="fadeRight">
          <div className="mb-14">
            <span
              className="text-[11px] font-bold tracking-[2px] uppercase mb-4 inline-block"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--spruce-light)",
              }}
            >
              Rozwiązanie
            </span>
            <p
              className="text-[16px] leading-[1.8] mb-6"
              style={{ color: "var(--text-dark-body)" }}
            >
              Zbudowaliśmy prosty system automatycznego follow-upu:
            </p>
            <div className="space-y-3">
              {[
                "Śledzi każdą wysłaną ofertę",
                "Automatycznie wysyła przypomnienie, gdy klient nie odpowiada",
                "Handlowiec nie musi nic robić ręcznie — system działa w tle",
                "Odpowiedzi trafiają bezpośrednio do skrzynki handlowca",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <circle cx="10" cy="10" r="10" fill="var(--spruce)" fillOpacity="0.2" />
                    <path
                      d="M6 10l3 3 5-6"
                      stroke="var(--spruce-light)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[15px]"
                    style={{ color: "var(--text-dark-body)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results */}
        <ScrollReveal delay={6} variant="scale">
          <div
            className="p-8 md:p-10"
            style={{
              background: "var(--amber)",
              borderRadius: "var(--radius-card)",
            }}
          >
            <span
              className="text-[11px] font-bold tracking-[2px] uppercase mb-6 inline-block"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--midnight)",
                opacity: 0.7,
              }}
            >
              Wyniki
            </span>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { value: "+16%", label: "więcej transakcji" },
                { value: "+6", label: "zamówień/miesiąc" },
                { value: "0", label: "dodatkowych pracowników" },
              ].map((result, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-[clamp(36px,5vw,48px)] font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--midnight)",
                    }}
                  >
                    {result.value}
                  </div>
                  <div
                    className="text-[13px]"
                    style={{ color: "var(--midnight)", opacity: 0.7 }}
                  >
                    {result.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="pt-6 text-center"
              style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
            >
              <p
                className="text-[16px]"
                style={{ color: "var(--midnight)" }}
              >
                Przy średniej wartości zamówienia{" "}
                <strong>5 000 €</strong>, to{" "}
                <strong>30 000 € dodatkowego przychodu miesięcznie</strong>.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      phase: "Tydzień 1",
      title: "Audyt procesu",
      description:
        "Mapujemy Państwa obecny proces ofertowania — od pierwszego kontaktu po zamówienie. Identyfikujemy gdzie giną oferty.",
    },
    {
      number: "02",
      phase: "Tydzień 1-2",
      title: "Konfiguracja systemu",
      description:
        "Ustawiamy automatyczne przypomnienia dopasowane do Państwa procesu. Treść, timing, kanał — wszystko pod Państwa markę.",
    },
    {
      number: "03",
      phase: "Tydzień 2",
      title: "Integracja",
      description:
        "Łączymy system z Państwa obecnymi narzędziami (email, CRM, kalendarz). Bez zmiany sposobu pracy zespołu.",
    },
    {
      number: "04",
      phase: "Tydzień 3+",
      title: "Uruchomienie + monitoring",
      description:
        "Startujemy i monitorujemy wyniki. Dashboard pokazuje ile ofert dostało follow-up i ile wróciło jako zamówienia.",
    },
  ];

  return (
    <section
      id="process"
      className="relative py-24 md:py-32 overflow-hidden topo-texture"
      style={{ background: "var(--off-white)" }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text="Proces" light />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--midnight)" }}
            >
              Jak to{" "}
              <span className="italic" style={{ color: "var(--spruce)" }}>
                działa?
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={2}>
            <p
              className="text-[17px] mt-4"
              style={{ color: "var(--dark-gray)" }}
            >
              Od audytu do działającego systemu w 2-3 tygodnie
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i + 3} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"}>
              <div
                className="flex gap-6 p-6 md:p-8 card-hover-glow"
                style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-card)",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                  border: "1px solid var(--frost)",
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-[13px] font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: i === steps.length - 1 ? "var(--amber)" : "var(--spruce)",
                    color: "white",
                    borderRadius: "var(--radius-icon)",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <span
                    className="text-[10px] font-bold tracking-[2px] uppercase"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: i === steps.length - 1 ? "var(--amber)" : "var(--spruce)",
                    }}
                  >
                    {step.phase}
                  </span>
                  <h3
                    className="text-[18px] font-semibold mt-1 mb-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--midnight)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.7]"
                    style={{ color: "var(--dark-gray)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    {
      name: "Mikita",
      role: "CRM Specialist",
      bio: "Specjalizuje się w automatyzacji procesów sprzedażowych dla firm B2B. Mówi po polsku.",
      image: "/images/team/mikita.jpg",
      linkedin: "https://www.linkedin.com/in/mikita-kutsenka/",
    },
    {
      name: "Taavi",
      role: "Founder & Automation Architect",
      bio: "Zbudował system follow-up dla Koduaken. Projektuje architekturę automatyzacji dla firm w całej Europie.",
      image: "/images/team/taavi.jpg",
      linkedin: "https://www.linkedin.com/in/taavi-ilmj%C3%A4rv-6b21543a/",
    },
  ];

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden frost-noise"
      style={{ background: "var(--midnight)" }}
    >
      <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="flex justify-center">
              <SectionLabel text="Zespół" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2
              className="text-[clamp(28px,4vw,42px)]"
              style={{ color: "var(--frost)" }}
            >
              Z kim będziesz{" "}
              <span className="italic" style={{ color: "var(--spruce-light)" }}>
                rozmawiać?
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i + 2} variant={i === 0 ? "fadeLeft" : "fadeRight"}>
              <div
                className="group p-8 text-center card-hover-glow-dark"
                style={{
                  background: "var(--dark-elevated)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--dark-border)",
                }}
              >
                <div
                  className="w-28 h-28 mx-auto mb-6 overflow-hidden"
                  style={{
                    borderRadius: "50%",
                    border: "3px solid var(--spruce)",
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3
                  className="text-[20px] font-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--frost)",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[12px] font-medium mt-1 mb-4"
                  style={{ color: "var(--spruce-light)" }}
                >
                  {member.role}
                </p>
                <p
                  className="text-[14px] leading-[1.7] mb-6"
                  style={{ color: "var(--text-dark-body)" }}
                >
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
                  style={{ color: "var(--spruce-light)" }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  const signals = [
    {
      title: "GDPR & UŚUDE",
      description: "Pełna zgodność z europejskimi regulacjami ochrony danych.",
    },
    {
      title: "Cennik w EUR/PLN",
      description: "Faktury w EUR lub PLN według preferencji.",
    },
    {
      title: "Dane w EU",
      description: "Wszystkie dane przechowywane na serwerach w Unii Europejskiej.",
    },
  ];

  return (
    <section
      className="relative py-16 md:py-20"
      style={{
        background: "var(--off-white)",
        borderTop: "1px solid var(--frost)",
      }}
    >
      <div className="max-w-[900px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {signals.map((signal, i) => (
            <ScrollReveal key={i} delay={i}>
              <div className="text-center">
                <h4
                  className="text-[14px] font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--midnight)",
                  }}
                >
                  {signal.title}
                </h4>
                <p
                  className="text-[13px] leading-[1.7]"
                  style={{ color: "var(--dark-gray)" }}
                >
                  {signal.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "var(--amber)" }}
    >
      <div className="max-w-[700px] mx-auto px-5 md:px-8 text-center">
        <ScrollReveal>
          <h2
            className="text-[clamp(28px,4vw,42px)] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--midnight)",
            }}
          >
            Zarezerwuj 20-minutowy audyt
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <p
            className="text-[17px] leading-[1.7] mb-10"
            style={{ color: "var(--midnight)", opacity: 0.8 }}
          >
            Zmapujemy Państwa proces ofertowania i pokażemy, gdzie giną potencjalne zamówienia.
            Bez zobowiązań.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <a
            href="https://api.leadconnectorhq.com/widget/booking/QRDz2smDfgEZvhTtyePu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontFamily: "var(--font-heading)",
              background: "var(--midnight)",
              color: "var(--frost)",
              borderRadius: "var(--radius-button)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Zarezerwuj audyt
          </a>
        </ScrollReveal>
        <ScrollReveal delay={3}>
          <p
            className="text-[13px] mt-6"
            style={{ color: "var(--midnight)", opacity: 0.6 }}
          >
            Rozmowa po polsku z Mikitą lub po angielsku z Taavim
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function QuoteFollowUpPage() {
  return (
    <>
      {/* Hero Section - matching services page style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background forest image */}
        <div className="absolute inset-0 z-[0]">
          <Image
            src="/images/hero-forest.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, rgba(22, 25, 41, 0.85), rgba(22, 25, 41, 0.75) 40%, rgba(45, 106, 79, 0.5))",
            }}
          />
        </div>

        {/* Frost noise texture */}
        <div className="absolute inset-0 z-[4] pointer-events-none frost-noise" />

        {/* Geometric grid overlay */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(82,183,136,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 w-full max-w-[900px] mx-auto px-5 md:px-8 py-32 text-center">
          {/* Big stat */}
          <ScrollReveal>
            <div
              className="text-[clamp(80px,15vw,140px)] font-bold leading-none mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--amber)",
              }}
            >
              73%
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={1}>
            <h1
              className="text-[clamp(28px,4vw,42px)] leading-[1.2] mb-6"
              style={{ color: "var(--frost)" }}
            >
              Twoich leadów nigdy nie otrzymuje
              <br />
              <span
                className="italic"
                style={{ color: "var(--amber)" }}
              >
                drugiego kontaktu
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={2}>
            <p
              className="text-[clamp(15px,1.6vw,17px)] leading-[1.7] max-w-[600px] mx-auto mb-12"
              style={{ color: "var(--text-dark-muted)" }}
            >
              To dziesiątki tysięcy euro przychodu, które co miesiąc wymykają Ci się z rąk.
              Powolne follow-upy, niepołączone narzędzia i ręczny chaos po cichu zabijają
              Twój pipeline.
            </p>
          </ScrollReveal>

          {/* Loss Calculator */}
          <ScrollReveal delay={3}>
            <LossCalculator />
          </ScrollReveal>

          {/* Question */}
          <ScrollReveal delay={4}>
            <p
              className="text-[16px] italic mt-12 mb-8"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--spruce-light)",
              }}
            >
              Kiedy ostatnio skontaktowałeś się ponownie ze swoją istniejącą bazą klientów?
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://api.leadconnectorhq.com/widget/booking/QRDz2smDfgEZvhTtyePu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-[12px] font-bold tracking-[1px] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "var(--amber)",
                  color: "var(--midnight)",
                  borderRadius: "var(--radius-button)",
                }}
              >
                Znajdź swoje wycieki przychodu
              </a>
              <a
                href="#case-study"
                className="px-8 py-4 text-[12px] font-bold tracking-[1px] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]"
                style={{
                  fontFamily: "var(--font-heading)",
                  border: "2px solid rgba(255,255,255,0.25)",
                  color: "var(--frost)",
                  borderRadius: "var(--radius-button)",
                }}
              >
                Zobacz, jak to naprawiamy
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-[7] pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--midnight), transparent)",
          }}
        />
      </section>

      {/* Case Study */}
      <CaseStudySection />

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
