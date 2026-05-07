import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QuoteFollowUpPage } from "@/components/QuoteFollowUpPage";

export const metadata: Metadata = {
  title: "Automatyczny Follow-Up Ofert | +16% Więcej Zamówień | Alopex Digital",
  description:
    "Wysyłasz 50+ ofert miesięcznie? 73% nigdy nie dostaje drugiego kontaktu. Zobacz jak estońska firma okienna zwiększyła sprzedaż o 16% bez zatrudniania nikogo nowego.",
  keywords: [
    "automatyczny follow-up",
    "CRM dla firm okiennych",
    "automatyzacja sprzedaży",
    "follow-up ofert",
    "zwiększenie konwersji",
    "system przypomnień",
    "okna i drzwi",
    "stolarka otworowa",
  ],
  alternates: {
    canonical: "https://alopex.digital/pl/automatyczny-follow-up",
  },
  openGraph: {
    title: "Automatyczny Follow-Up Ofert | +16% Więcej Zamówień",
    description:
      "Wysyłasz 50+ ofert miesięcznie? 73% nigdy nie dostaje drugiego kontaktu. Zobacz case study z branży okiennej.",
    url: "https://alopex.digital/pl/automatyczny-follow-up",
    siteName: "Alopex Digital",
    type: "website",
    locale: "pl_PL",
  },
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <QuoteFollowUpPage />
      </main>
      <Footer />
    </>
  );
}
