// The four search pages: GoHighLevel, GoHighLevel expert, n8n and RevOps.
// Structure lives here; the wording is in text/<locale>/platforms.ts, in every language of the site.

export const PLATFORM_IDS = ["gohighlevel-agency-europe", "gohighlevel-expert", "n8n-automation-agency", "revops-agency-europe"] as const;
export type PlatformId = (typeof PLATFORM_IDS)[number];

/** Client pages shown under "Built for our clients" on each search page. */
export const PLATFORM_CASES: Record<PlatformId, string[]> = {
  "gohighlevel-agency-europe": ["packtailor", "gemoss", "swa"],
  "gohighlevel-expert": ["gemoss", "koduaken", "packtailor"],
  "n8n-automation-agency": ["packtailor", "woodnest", "ovision"],
  "revops-agency-europe": ["koduaken", "gemoss", "woodnest"],
};

export type PlatformLabels = { fits: string; notFits: string; cases: string; allWork: string; faq: string };

export type PlatformPage = {
  meta: { title: string; description: string };
  crumb: string;
  title: string;
  lead: string;
  what: { title: string; text: string; fits: string[]; notFits: string[] };
  doTitle: string;
  do: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};
