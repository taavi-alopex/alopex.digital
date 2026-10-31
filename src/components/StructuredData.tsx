// schema.org data for search engines. Kept in line with the 2026 site wording (src/content/v2/text/en).
import { site } from "@/content/v2/text/en/site";

const DESCRIPTION =
  "Alopex Digital builds automation and AI systems that do the repetitive work in sales and administration for companies in Estonia, Poland and the Nordics: custom automation, AI assistants and ready-made products.";

function Json({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationSchema() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://alopex.digital/#organization",
        name: "Alopex Digital",
        alternateName: "Alopex Digital OÜ",
        url: "https://alopex.digital",
        logo: { "@type": "ImageObject", url: "https://alopex.digital/alopex-logo.png", width: 512, height: 512 },
        image: "https://alopex.digital/alopex-logo.png",
        description: DESCRIPTION,
        foundingDate: "2024",
        founder: [{ "@type": "Person", name: "Taavi Ilmjärv" }, { "@type": "Person", name: "Martin Teras" }],
        address: { "@type": "PostalAddress", addressCountry: "EE" },
        areaServed: ["Estonia", "Poland", "Finland", "Sweden", "Denmark"].map((name) => ({ "@type": "Country", name })),
        knowsAbout: ["Process automation", "AI assistants", "CRM automation", "Sales automation", "Invoice automation", "n8n", "GoHighLevel", "Merit Aktiva", "API integrations"],
        email: "info@alopex.digital",
        telephone: "+372 5780 0857",
        sameAs: ["https://www.linkedin.com/company/alopex-digital", "https://www.instagram.com/alopex.digital/", "https://www.facebook.com/alopexdigital"],
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://alopex.digital/#localbusiness",
        name: "Alopex Digital",
        image: "https://alopex.digital/alopex-logo.png",
        url: "https://alopex.digital",
        telephone: "+372 5780 0857",
        email: "info@alopex.digital",
        address: { "@type": "PostalAddress", addressCountry: "EE" },
        openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
        serviceType: ["Custom automation", "AI consulting", "CRM setup", "n8n workflows", "Websites", "Digital roadmaps and grants"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: site.process.steps.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
        },
      }}
    />
  );
}

export function FAQPageSchema() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: site.process.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://alopex.digital/#website",
        url: "https://alopex.digital",
        name: "Alopex Digital",
        description: DESCRIPTION,
        publisher: { "@id": "https://alopex.digital/#organization" },
        inLanguage: ["en", "et", "pl"],
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })),
      }}
    />
  );
}
