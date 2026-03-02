import { FoxLogo } from "./FoxLogo";

const footerLinks = {
  Services: [
    { label: "Systems Audit", href: "#process" },
    { label: "Strategic Blueprint", href: "#process" },
    { label: "Architecture Build", href: "#process" },
    { label: "Frictionless Launch", href: "#process" },
    { label: "Growth Loop", href: "#process" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Our Process", href: "#process" },
    { label: "Values", href: "#values" },
    { label: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "var(--dark-navy)" }}>
      {/* Gradient bar */}
      <div
        className="h-1"
        style={{
          background: "linear-gradient(90deg, var(--spruce), var(--amber))",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <FoxLogo size={36} glow />
              <span
                className="text-[14px] font-semibold tracking-[3px] uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                Alopex Digital
              </span>
            </div>
            <p
              className="text-[14px] leading-[1.7] max-w-[360px] mb-6"
              style={{ color: "var(--text-dark-muted)" }}
            >
              Orchestrating clarity and flow for ambitious service businesses
              across Scandinavia and CEE.
            </p>
            <a
              href="mailto:taavi@alopex.digital"
              className="text-[14px] hover:text-[var(--spruce-light)] transition-colors"
              style={{ color: "var(--mist)" }}
            >
              taavi@alopex.digital
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-[11px] font-bold tracking-[2px] uppercase mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--frost)",
                }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] hover:text-[var(--spruce-light)] transition-colors duration-200"
                      style={{
                        color: "var(--text-dark-muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid var(--dark-border)" }}
        >
          <p
            className="text-[12px]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            &copy; {new Date().getFullYear()} Alopex Digital O&Uuml;. All rights
            reserved.
          </p>
          <p
            className="text-[12px]"
            style={{ color: "var(--text-dark-muted)" }}
          >
            Tallinn, Estonia
          </p>
        </div>
      </div>
    </footer>
  );
}
