// Clients and the systems we built for them: structure only. The wording lives in text/<locale>/clients.ts.
// Erimasinad (NDA) is never listed. Dial Security is named since 31.10 (Mikita).

export const AREA_KEYS = ["sales", "reply", "quotes", "ops", "reports", "web"] as const;
export type AreaKey = (typeof AREA_KEYS)[number];

export type ClientData = { id: string; art: string; systems: { area: AreaKey; tags: string[] }[] };

export const CLIENT_DATA: ClientData[] = [
  {
    "id": "packtailor",
    "art": "reply",
    "systems": [
      {
        "area": "sales",
        "tags": [
          "Maps & search",
          "Website crawler",
          "Bouncer"
        ]
      },
      {
        "area": "reply",
        "tags": [
          "Instantly",
          "CRM",
          "AI drafts"
        ]
      },
      {
        "area": "reply",
        "tags": [
          "n8n",
          "CRM"
        ]
      },
      {
        "area": "reply",
        "tags": [
          "Instantly",
          "CRM"
        ]
      }
    ]
  },
  {
    "id": "woodnest",
    "art": "map",
    "systems": [
      {
        "area": "sales",
        "tags": [
          "Clay",
          "Registries"
        ]
      },
      {
        "area": "sales",
        "tags": [
          "Instantly"
        ]
      },
      {
        "area": "reply",
        "tags": [
          "CRM",
          "Postgres"
        ]
      }
    ]
  },
  {
    "id": "ovision",
    "art": "ops",
    "systems": [
      {
        "area": "ops",
        "tags": [
          "CRM",
          "Merit Aktiva"
        ]
      },
      {
        "area": "ops",
        "tags": [
          "CRM",
          "SharePoint"
        ]
      },
      {
        "area": "quotes",
        "tags": [
          "CRM",
          "Catalogue"
        ]
      },
      {
        "area": "ops",
        "tags": [
          "Custom CRM",
          "Claude"
        ]
      },
      {
        "area": "web",
        "tags": [
          "EIS"
        ]
      }
    ]
  },
  {
    "id": "gemoss",
    "art": "reports",
    "systems": [
      {
        "area": "reports",
        "tags": [
          "ClickUp",
          "Google Sheets"
        ]
      },
      {
        "area": "reply",
        "tags": [
          "CRM"
        ]
      }
    ]
  },
  {
    "id": "security",
    "art": "radar",
    "systems": [
      {
        "area": "sales",
        "tags": [
          "Building register",
          "News"
        ]
      },
      {
        "area": "sales",
        "tags": [
          "Instantly",
          "CRM"
        ]
      },
      {
        "area": "reports",
        "tags": [
          "Dashboard"
        ]
      }
    ]
  },
  {
    "id": "moso",
    "art": "web",
    "systems": [
      {
        "area": "web",
        "tags": [
          "Mapping"
        ]
      },
      {
        "area": "web",
        "tags": [
          "Next.js",
          "Sanity"
        ]
      },
      {
        "area": "reply",
        "tags": [
          "CRM"
        ]
      }
    ]
  },
  {
    "id": "spetselektroodi",
    "art": "road",
    "systems": [
      {
        "area": "web",
        "tags": [
          "EIS",
          "RTE"
        ]
      },
      {
        "area": "sales",
        "tags": [
          "Business register"
        ]
      }
    ]
  },
  {
    "id": "swa",
    "art": "sales",
    "systems": [
      {
        "area": "sales",
        "tags": [
          "Meta Ads",
          "CRM"
        ]
      },
      {
        "area": "sales",
        "tags": [
          "SMS",
          "CRM"
        ]
      },
      {
        "area": "ops",
        "tags": [
          "CRM"
        ]
      }
    ]
  },
  {
    "id": "kastoram",
    "art": "web",
    "systems": [
      {
        "area": "web",
        "tags": [
          "Website",
          "Voice"
        ]
      },
      {
        "area": "quotes",
        "tags": [
          "Excel",
          "CRM"
        ]
      }
    ]
  },
  {
    "id": "koduaken",
    "art": "reply",
    "systems": [
      {
        "area": "reply",
        "tags": [
          "CRM"
        ]
      }
    ]
  },
  {
    "id": "consolis",
    "art": "quotes",
    "systems": [
      {
        "area": "quotes",
        "tags": [
          "IFC",
          "PDF",
          "Excel"
        ]
      }
    ]
  }
];

export const clientDataById = (id: string) => CLIENT_DATA.find((c) => c.id === id);
export const areasOf = (c: ClientData) => Array.from(new Set(c.systems.map((s) => s.area)));
