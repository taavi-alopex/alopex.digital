"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { SectionLabel } from "./SectionLabel";
import { AnimatedFoxLogo } from "./AnimatedFoxLogo";
import { SpruceTreeline } from "./SpruceTreeline";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/anlzXzfzVMRmXFsp7Kao";

function ROICalculator() {
  const [quotes, setQuotes] = useState(100);
  const [dealValue, setDealValue] = useState(5000);
  const [conversionRate, setConversionRate] = useState(10);

  const currentOrders = Math.round((quotes * conversionRate) / 100);
  const additionalOrders = Math.round(currentOrders * 0.16);
  const newOrders = currentOrders + additionalOrders;
  const additionalRevenue = additionalOrders * dealValue;
  const annualRevenue = additionalRevenue * 12;
  const plnRate = 4.3;
  const additionalRevenuePLN = Math.round(additionalRevenue * plnRate);
  const annualRevenuePLN = Math.round(annualRevenue * plnRate);

  return (
    <div
      className="p-8 md:p-10"
      style={{
        background: "var(--white)",
        borderRadius: "var(--radius-card)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
        border: "1px solid var(--frost)",
      }}
    >
      <div className="text-center mb-8">
        <h3 className="text-[20px] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>
          Kalkulator ROI
        </h3>
        <p className="text-[13px]" style={{ color: "var(--dark-gray)" }}>
          Na podstawie case study Koduaken (+16% konwersji)
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-[13px] font-medium" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>Ofert miesięcznie</label>
            <span className="text-[18px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}>{quotes}</span>
          </div>
          <input type="range" min="20" max="500" step="10" value={quotes} onChange={(e) => setQuotes(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, var(--spruce) 0%, var(--spruce) ${((quotes - 20) / 480) * 100}%, var(--frost) ${((quotes - 20) / 480) * 100}%, var(--frost) 100%)` }} />
          <div className="flex justify-between text-[11px] mt-2" style={{ color: "var(--dark-gray)" }}><span>20</span><span>500</span></div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-[13px] font-medium" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>Średnia wartość zamówienia</label>
            <span className="text-[18px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}>{dealValue.toLocaleString()} €</span>
          </div>
          <input type="range" min="1000" max="20000" step="500" value={dealValue} onChange={(e) => setDealValue(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, var(--spruce) 0%, var(--spruce) ${((dealValue - 1000) / 19000) * 100}%, var(--frost) ${((dealValue - 1000) / 19000) * 100}%, var(--frost) 100%)` }} />
          <div className="flex justify-between text-[11px] mt-2" style={{ color: "var(--dark-gray)" }}><span>1 000 €</span><span>20 000 €</span></div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-3">
            <label className="text-[13px] font-medium" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>Obecna konwersja</label>
            <span className="text-[18px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}>{conversionRate}%</span>
          </div>
          <input type="range" min="5" max="30" step="1" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, var(--spruce) 0%, var(--spruce) ${((conversionRate - 5) / 25) * 100}%, var(--frost) ${((conversionRate - 5) / 25) * 100}%, var(--frost) 100%)` }} />
          <div className="flex justify-between text-[11px] mt-2" style={{ color: "var(--dark-gray)" }}><span>5%</span><span>30%</span></div>
        </div>
      </div>

      <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--frost)" }}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-5" style={{ background: "var(--off-white)", borderRadius: "var(--radius-card)" }}>
            <div className="text-[11px] font-bold tracking-[1px] uppercase mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--dark-gray)" }}>Teraz</div>
            <div className="text-[32px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>{currentOrders}</div>
            <div className="text-[11px]" style={{ color: "var(--dark-gray)" }}>zamówień/mies.</div>
          </div>
          <div className="text-center p-5" style={{ background: "var(--spruce-pale)", borderRadius: "var(--radius-card)", border: "2px solid var(--spruce)" }}>
            <div className="text-[11px] font-bold tracking-[1px] uppercase mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}>Po wdrożeniu</div>
            <div className="text-[32px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}>{newOrders}</div>
            <div className="text-[11px]" style={{ color: "var(--dark-gray)" }}>zamówień/mies.</div>
          </div>
        </div>

        <div className="p-6 text-center" style={{ background: "var(--midnight)", borderRadius: "var(--radius-card)" }}>
          <div className="text-[11px] font-bold tracking-[1px] uppercase mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce-light)" }}>Dodatkowy przychód miesięcznie</div>
          <div className="text-[36px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--frost)" }}>+{additionalRevenue.toLocaleString()} €</div>
          <div className="text-[13px]" style={{ color: "var(--text-dark-muted)" }}>(~{additionalRevenuePLN.toLocaleString()} PLN)</div>
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--dark-border)" }}>
            <span className="text-[13px]" style={{ color: "var(--text-dark-muted)" }}>Rocznie to </span>
            <span className="text-[18px] font-bold" style={{ color: "var(--spruce-light)" }}>+{annualRevenue.toLocaleString()} €</span>
          </div>
        </div>
        <p className="text-center text-[11px] mt-4" style={{ color: "var(--dark-gray)" }}>* Szacunki oparte na +16% wzrostu konwersji (case study Koduaken)</p>
      </div>
    </div>
  );
}

function CaseStudySection() {
  return (
    <section id="case-study" className="relative py-16 md:py-20 overflow-hidden frost-noise" style={{ background: "var(--midnight)" }}>
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <ScrollReveal>
            <div className="flex justify-center"><SectionLabel text="Case Study" /></div>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="text-[clamp(24px,3.5vw,36px)]" style={{ color: "var(--frost)" }}>
              Jak firma okienna zwiększyła sprzedaż <span className="italic" style={{ color: "var(--spruce-light)" }}>o 16%</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Compact layout - two columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Problem & Solution */}
          <ScrollReveal delay={2} variant="fadeLeft">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold tracking-[2px] uppercase mb-2 inline-block" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce-light)" }}>Problem</span>
                <p className="text-[14px] leading-[1.7]" style={{ color: "var(--text-dark-body)" }}>
                  <strong style={{ color: "var(--frost)" }}>Koduaken</strong> wysyłał ~400 ofert/mies. Po wysłaniu oferty <strong style={{ color: "var(--frost)" }}>nikt nie miał czasu</strong> na follow-up.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[2px] uppercase mb-2 inline-block" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce-light)" }}>Rozwiązanie</span>
                <div className="space-y-2">
                  {["Automatyczne przypomnienia", "System działa w tle", "Zero dodatkowej pracy"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="var(--spruce)" fillOpacity="0.2" /><path d="M6 10l3 3 5-6" stroke="var(--spruce-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="text-[13px]" style={{ color: "var(--text-dark-body)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right column - Results */}
          <ScrollReveal delay={3} variant="fadeRight">
            <div className="p-6" style={{ background: "var(--dark-elevated)", borderRadius: "var(--radius-card)", border: "1px solid var(--dark-border)" }}>
              <span className="text-[10px] font-bold tracking-[2px] uppercase mb-4 inline-block" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce-light)" }}>Wyniki</span>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[{ value: "+16%", label: "transakcji" }, { value: "+6", label: "zamówień/mies." }, { value: "0", label: "nowych pracowników" }].map((r, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[28px] font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce-light)" }}>{r.value}</div>
                    <div className="text-[10px]" style={{ color: "var(--text-dark-muted)" }}>{r.label}</div>
                  </div>
                ))}
              </div>
              <div className="pt-4 text-center" style={{ borderTop: "1px solid var(--dark-border)" }}>
                <p className="text-[14px]" style={{ color: "var(--text-dark-body)" }}>
                  = <strong style={{ color: "var(--spruce-light)" }}>+30 000 €</strong>/mies.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats row */}
        <ScrollReveal delay={4}>
          <div className="grid grid-cols-4 gap-2 mt-8">
            {[{ value: "388", label: "ofert", accent: false }, { value: "47", label: "odpowiedzi", accent: false }, { value: "37", label: "zamówień", accent: false }, { value: "341", label: "bez kontaktu", accent: true }].map((stat, i) => (
              <div key={i} className="text-center p-3" style={{ background: stat.accent ? "rgba(220, 80, 80, 0.1)" : "var(--dark-elevated)", borderRadius: "var(--radius-button)", border: stat.accent ? "1px solid rgba(220, 80, 80, 0.3)" : "1px solid var(--dark-border)" }}>
                <div className="text-[20px] font-bold" style={{ fontFamily: "var(--font-heading)", color: stat.accent ? "#dc5050" : "var(--frost)" }}>{stat.value}</div>
                <div className="text-[9px]" style={{ color: stat.accent ? "rgba(220, 80, 80, 0.8)" : "var(--text-dark-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: "01", phase: "Tydzień 1", title: "Audyt procesu", description: "Mapujemy proces ofertowania i identyfikujemy gdzie giną oferty." },
    { number: "02", phase: "Tydzień 1-2", title: "Konfiguracja", description: "Ustawiamy automatyczne przypomnienia pod Państwa markę." },
    { number: "03", phase: "Tydzień 2", title: "Integracja", description: "Łączymy z email, CRM, kalendarzem. Bez zmiany pracy zespołu." },
    { number: "04", phase: "Tydzień 3+", title: "Start + monitoring", description: "Dashboard pokazuje wyniki w czasie rzeczywistym." },
  ];

  return (
    <section id="process" className="relative py-20 md:py-24 overflow-hidden" style={{ background: "var(--off-white)" }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ transform: "rotate(180deg)" }}>
        <SpruceTreeline variant={2} opacity={0.04} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <SpruceTreeline variant={1} opacity={0.04} />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "linear-gradient(var(--spruce) 1px, transparent 1px), linear-gradient(90deg, var(--spruce) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <ScrollReveal><div className="flex justify-center"><SectionLabel text="Proces" light /></div></ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="text-[clamp(28px,4vw,42px)]" style={{ color: "var(--midnight)" }}>
              Jak to <span className="italic" style={{ color: "var(--spruce)" }}>działa?</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i + 2}>
              <div className="flex gap-5 p-5 card-hover-glow" style={{ background: "var(--white)", borderRadius: "var(--radius-card)", boxShadow: "0 2px 20px rgba(0,0,0,0.04)", border: "1px solid var(--frost)" }}>
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[12px] font-bold" style={{ fontFamily: "var(--font-heading)", background: i === 3 ? "var(--spruce-light)" : "var(--spruce)", color: "white", borderRadius: "var(--radius-icon)" }}>{step.number}</div>
                <div>
                  <span className="text-[9px] font-bold tracking-[2px] uppercase" style={{ fontFamily: "var(--font-heading)", color: "var(--spruce)" }}>{step.phase}</span>
                  <h3 className="text-[16px] font-semibold mt-0.5 mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>{step.title}</h3>
                  <p className="text-[13px] leading-[1.6]" style={{ color: "var(--dark-gray)" }}>{step.description}</p>
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
    { name: "Mikita", role: "CRM Specialist", bio: "Automatyzacja procesów sprzedażowych. Mówi po polsku.", image: "/images/team/mikita.jpg", linkedin: "https://www.linkedin.com/in/mikita-kutsenka/" },
    { name: "Taavi", role: "Founder", bio: "Zbudował system follow-up dla Koduaken.", image: "/images/team/taavi.jpg", linkedin: "https://www.linkedin.com/in/taavi-ilmj%C3%A4rv-6b21543a/" },
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden frost-noise" style={{ background: "var(--midnight)" }}>
      <div className="relative z-10 max-w-[700px] mx-auto px-5 md:px-8">
        <div className="text-center mb-10">
          <ScrollReveal><div className="flex justify-center"><SectionLabel text="Zespół" /></div></ScrollReveal>
          <ScrollReveal delay={1}>
            <h2 className="text-[clamp(24px,3.5vw,36px)]" style={{ color: "var(--frost)" }}>
              Z kim będziesz <span className="italic" style={{ color: "var(--spruce-light)" }}>rozmawiać?</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i + 2}>
              <div className="group p-5 text-center card-hover-glow-dark" style={{ background: "var(--dark-elevated)", borderRadius: "var(--radius-card)", border: "1px solid var(--dark-border)" }}>
                <div className="w-20 h-20 mx-auto mb-4 overflow-hidden" style={{ borderRadius: "50%", border: "2px solid var(--spruce)" }}>
                  <Image src={member.image} alt={member.name} width={80} height={80} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h3 className="text-[16px] font-semibold" style={{ fontFamily: "var(--font-heading)", color: "var(--frost)" }}>{member.name}</h3>
                <p className="text-[11px] font-medium mt-0.5 mb-2" style={{ color: "var(--spruce-light)" }}>{member.role}</p>
                <p className="text-[12px] leading-[1.6] mb-3" style={{ color: "var(--text-dark-body)" }}>{member.bio}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "var(--spruce-light)" }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
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
  return (
    <section className="relative py-12" style={{ background: "var(--off-white)", borderTop: "1px solid var(--frost)" }}>
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[{ title: "GDPR & UŚUDE", desc: "Zgodność z regulacjami EU" }, { title: "EUR/PLN", desc: "Faktury w obu walutach" }, { title: "Dane w EU", desc: "Serwery w Unii Europejskiej" }].map((s, i) => (
            <div key={i} className="min-w-[140px]">
              <h4 className="text-[13px] font-semibold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--midnight)" }}>{s.title}</h4>
              <p className="text-[11px]" style={{ color: "var(--dark-gray)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 md:py-24 frost-noise" style={{ background: "var(--midnight)" }}>
      <div className="max-w-[600px] mx-auto px-5 md:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(26px,4vw,38px)] mb-5" style={{ fontFamily: "var(--font-display)", color: "var(--frost)" }}>
            Zarezerwuj 30-minutowy audyt
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <p className="text-[16px] leading-[1.7] mb-8" style={{ color: "var(--text-dark-muted)" }}>
            Zmapujemy Państwa proces ofertowania i pokażemy, gdzie giną potencjalne zamówienia. Bez zobowiązań.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-5 text-[14px] font-semibold tracking-[0.5px] uppercase transition-all duration-300 hover:-translate-y-0.5 pulse-glow" style={{ fontFamily: "var(--font-heading)", background: "var(--amber)", color: "white", borderRadius: "var(--radius-button)", boxShadow: "0 4px 20px rgba(212,135,63,0.3)" }}>
            Zarezerwuj audyt
          </a>
        </ScrollReveal>
        <ScrollReveal delay={3}>
          <p className="text-[12px] mt-5" style={{ color: "var(--text-dark-muted)" }}>
            Rozmowa po polsku z Mikitą lub po angielsku z Taavim
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function QuoteFollowUpPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-[0]">
          <Image src="/images/hero-forest.jpg" alt="" fill className="object-cover" priority quality={85} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(22, 25, 41, 0.85), rgba(22, 25, 41, 0.75) 40%, rgba(45, 106, 79, 0.4))" }} />
        </div>

        <div className="absolute inset-0 z-[4] pointer-events-none frost-noise" />
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(82,183,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(82,183,136,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)" }} />

        {/* Spruce treeline at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none">
          <SpruceTreeline variant={1} opacity={0.15} />
        </div>

        <div className="relative z-10 w-full max-w-[800px] mx-auto px-5 md:px-8 py-32 text-center">
          {/* Fox Logo */}
          <div className="mb-8" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)", transition: "opacity 1s var(--fox-ease), transform 1s var(--fox-ease)" }}>
            <AnimatedFoxLogo size={100} glow animate={loaded} className="mx-auto" />
          </div>

          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--fox-ease) 0.2s, transform 0.7s var(--fox-ease) 0.2s" }} className="flex justify-center">
            <SectionLabel text="Dla firm z branży okien i drzwi" />
          </div>

          <h1 className="text-[clamp(28px,4.5vw,48px)] leading-[1.2] mb-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--fox-ease) 0.35s, transform 0.7s var(--fox-ease) 0.35s", color: "var(--frost)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Wysyłasz ponad 50 ofert miesięcznie!
          </h1>

          <h2 className="text-[clamp(24px,4vw,42px)] leading-[1.2] mb-8 italic" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--fox-ease) 0.45s, transform 0.7s var(--fox-ease) 0.45s", color: "var(--spruce-light)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Ale 73% z nich przepada bez wieści...
          </h2>

          <p className="text-[clamp(15px,1.8vw,18px)] leading-[1.7] max-w-[550px] mx-auto mb-10" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--fox-ease) 0.55s, transform 0.7s var(--fox-ease) 0.55s", color: "var(--mist)", textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}>
            Powód? Wcale nie cena, a brak czasu na zwykły telefon z Twojej strony.
            <br />
            <strong style={{ color: "var(--frost)" }}>Automatyczny follow-up sprawi, że żadna okazja nie ucieknie Ci przez palce.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s var(--fox-ease) 0.65s, transform 0.7s var(--fox-ease) 0.65s" }}>
            <a href="#kalkulator" className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase transition-all duration-300 hover:-translate-y-0.5 pulse-glow" style={{ fontFamily: "var(--font-heading)", background: "var(--amber)", color: "white", borderRadius: "var(--radius-button)" }}>
              Oblicz potencjalny wzrost
            </a>
            <a href="#case-study" className="px-8 py-4 text-[13px] font-semibold tracking-[0.5px] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]" style={{ fontFamily: "var(--font-heading)", border: "2px solid rgba(255,255,255,0.25)", color: "var(--frost)", borderRadius: "var(--radius-button)", backdropFilter: "blur(8px)" }}>
              Zobacz case study
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}>
          <span className="text-[10px] font-semibold tracking-[2px] uppercase" style={{ fontFamily: "var(--font-heading)", color: "var(--text-dark-muted)" }}>Przewiń</span>
          <div className="scroll-indicator">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--mist)" strokeWidth="1.5">
              <rect x="1" y="1" width="14" height="22" rx="7" />
              <circle cx="8" cy="8" r="2" fill="var(--spruce-light)" stroke="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="kalkulator" className="relative py-20 md:py-24" style={{ background: "var(--off-white)" }}>
        {/* Background decorations */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ transform: "rotate(180deg)" }}>
          <SpruceTreeline variant={3} opacity={0.03} />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: "radial-gradient(var(--spruce) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="relative z-10 max-w-[600px] mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <ScrollReveal><div className="flex justify-center"><SectionLabel text="Kalkulator" light /></div></ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="text-[clamp(26px,4vw,38px)]" style={{ color: "var(--midnight)" }}>
                Ile możesz <span className="italic" style={{ color: "var(--spruce)" }}>zyskać?</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={2}>
            <ROICalculator />
          </ScrollReveal>
        </div>
      </section>

      <CaseStudySection />
      <HowItWorks />
      <TeamSection />
      <TrustSignals />
      <CTASection />
    </>
  );
}
