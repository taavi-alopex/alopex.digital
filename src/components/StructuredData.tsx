export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://alopex.digital/#organization",
    name: "Alopex Digital",
    alternateName: "Alopex Digital OÜ",
    url: "https://alopex.digital",
    logo: {
      "@type": "ImageObject",
      url: "https://alopex.digital/alopex-logo.png",
      width: 512,
      height: 512,
    },
    image: "https://alopex.digital/alopex-logo.png",
    description:
      "GoHighLevel & n8n agency for sales-led businesses across the European Union. We architect, build, and launch revenue operations infrastructure.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Taavi Kala",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EE",
      addressLocality: "Tallinn",
      addressRegion: "Harju",
    },
    areaServed: [
      {
        "@type": "Place",
        name: "European Union",
      },
      {
        "@type": "Country",
        name: "Estonia",
      },
      {
        "@type": "Country",
        name: "Poland",
      },
    ],
    knowsAbout: [
      "GoHighLevel",
      "GoHighLevel Implementation",
      "n8n Automation",
      "Revenue Operations",
      "RevOps",
      "CRM Automation",
      "Marketing Automation",
      "Sales Automation",
      "API Integrations",
      "Workflow Automation",
    ],
    slogan: "Your Revenue Operations, Architected and Launched",
    email: "info@alopex.digital",
    sameAs: [
      "https://www.linkedin.com/company/alopex-digital",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://alopex.digital/#localbusiness",
    name: "Alopex Digital",
    image: "https://alopex.digital/alopex-logo.png",
    url: "https://alopex.digital",
    telephone: "+372 5555 5555",
    email: "info@alopex.digital",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EE",
      addressLocality: "Tallinn",
      addressRegion: "Harju County",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.437,
      longitude: 24.7536,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "€€€",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 54.5260,
        longitude: 15.2551,
      },
      geoRadius: "2000 km",
    },
    serviceType: [
      "GoHighLevel Implementation",
      "CRM Consulting",
      "Marketing Automation",
      "Revenue Operations",
      "n8n Automation",
      "API Integration",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Revenue Operations Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Systems Audit",
            description: "Discovery phase to assess current pains, processes, and bottlenecks to identify revenue leaks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Strategic Blueprint",
            description: "Clear roadmap with full solution architecture, timeline, and integration scope.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Architecture Build",
            description: "GoHighLevel infrastructure, n8n integrations, and automation configuration.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Frictionless Launch",
            description: "Hands-on training until your team is comfortable using the system.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://alopex.digital/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is GoHighLevel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GoHighLevel is an all-in-one sales and marketing platform that combines CRM, email marketing, SMS, calendars, funnels, and more into a single platform. Alopex Digital specializes in implementing and customizing GoHighLevel for European businesses.",
        },
      },
      {
        "@type": "Question",
        name: "What is n8n automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "n8n is an open-source workflow automation tool that allows connecting different applications and services. Alopex Digital uses n8n to create custom integrations between GoHighLevel and local European systems like Merit Aktiva, Montonio, and government portals.",
        },
      },
      {
        "@type": "Question",
        name: "What is RevOps (Revenue Operations)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Revenue Operations is the strategic alignment of sales, marketing, and customer success operations to drive efficient revenue growth. It focuses on breaking down silos, improving processes, and leveraging technology to maximize revenue.",
        },
      },
      {
        "@type": "Question",
        name: "Where does Alopex Digital operate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alopex Digital is based in Estonia and serves sales-led businesses across the entire European Union, with particular expertise in Estonia, Poland, and the CEE region.",
        },
      },
      {
        "@type": "Question",
        name: "What makes Alopex different from other GoHighLevel agencies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike agencies that jump straight into building, Alopex maps your entire business process first through our Strategic Blueprint phase. We also specialize in connecting GoHighLevel to local European systems through custom n8n integrations, and we understand GDPR, local payment gateways, and regional tax requirements.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a GoHighLevel implementation take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Implementation timeline varies based on complexity. A typical project includes 1-2 meetings for the Systems Audit, followed by the Strategic Blueprint phase, then the Architecture Build with weekly progress reports, and finally the Frictionless Launch with hands-on training. Most implementations are live within weeks, not months.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Alopex Digital work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alopex Digital specializes in sales-led businesses including: High-Ticket Install (Solar, Renewables, HVAC), Relationship Pipeline businesses (Real Estate, Consulting, Legal), and Double-Sided Marketplaces (Recruitment, Staffing).",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer ongoing support after implementation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, through our Growth Loop service. This includes bi-weekly stabilization calls that transition to quarterly strategy reviews, ensuring your system evolves with your business growth.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://alopex.digital/#website",
    url: "https://alopex.digital",
    name: "Alopex Digital",
    description: "GoHighLevel & n8n agency for sales-led businesses across the European Union",
    publisher: {
      "@id": "https://alopex.digital/#organization",
    },
    inLanguage: ["en", "et", "pl"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
