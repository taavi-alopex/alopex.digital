import type { site } from "./en/site";

export type ClientText = {
  name: string;
  industry: string;
  status: string;
  title: string;
  result: string;
  systems: { title: string; before: string; built: string; now: string }[];
};

/** Every language file has exactly the shape of the English one. */
export type SiteText = typeof site;
