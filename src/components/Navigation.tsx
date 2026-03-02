"use client";

import { useEffect, useState } from "react";
import { FoxLogo } from "./FoxLogo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#uniques" },
  { label: "Process", href: "#process" },
  { label: "Values", href: "#values" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
      style={{ transitionTimingFunction: "var(--fox-ease)" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between h-[72px]">
        {/* Brand Mark */}
        <a href="#" className="flex items-center gap-3 group">
          <FoxLogo size={32} glow={scrolled} />
          <span
            className="text-[13px] font-semibold tracking-[3px] uppercase text-white hidden sm:block"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Alopex Digital
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-[var(--mist)] hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.5px] uppercase text-white border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(212,135,63,0.3)]"
            style={{
              fontFamily: "var(--font-heading)",
              background: "var(--amber)",
              borderRadius: "6px",
              transitionTimingFunction: "var(--fox-ease)",
            }}
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden nav-glass border-t border-[rgba(255,255,255,0.06)]">
          <div className="px-5 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-[var(--mist)] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-3 text-[12px] font-semibold tracking-[0.5px] uppercase text-white text-center"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--amber)",
                borderRadius: "var(--radius-button)",
              }}
            >
              Book a Call
            </a>
          </div>
        </div>
      )}

      {/* Scroll Progress */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, var(--spruce), var(--spruce-light))",
        }}
      />
    </nav>
  );
}
