// Product structure shared by every language. Wording lives in text/<locale>/site.ts → products.

export type ProductData = {
  id: "sales-machine" | "accounting" | "email-sync" | "meeting-sync" | "calendar-sync";
  tone: "beta" | "early" | "live";
  art: string;
  /** public GoHighLevel Marketplace listing: the main button goes there instead of booking a call */
  marketplace?: string;
};

/** The main products: big cards on Products, Services and Home. */
export const PRODUCTS: ProductData[] = [
  { id: "sales-machine", tone: "beta", art: "sales" },
  { id: "accounting", tone: "early", art: "ops" },
  { id: "email-sync", tone: "live", art: "reply", marketplace: "https://marketplace.gohighlevel.com/integration/6a553d2fab037415b1718c9c" },
];

/** Smaller tools we built for ourselves and run at Alopex every day. They have their own pages too. */
export const SMALL_PRODUCTS: ProductData[] = [
  { id: "meeting-sync", tone: "live", art: "meetings" },
  { id: "calendar-sync", tone: "live", art: "calendars" },
];

export const ALL_PRODUCTS = [...PRODUCTS, ...SMALL_PRODUCTS];
