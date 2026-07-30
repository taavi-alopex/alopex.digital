import type { Metadata } from "next";
import { Instrument_Serif, Outfit, Montserrat, JetBrains_Mono } from "next/font/google";
import "../globals.css";

/**
 * Standalone root layout for the Teataja dashboard.
 *
 * /teataja-dash sits outside the [locale] tree — it is single-language, internal, and must
 * not pull in next-intl or the site chrome. Since app/[locale]/layout.tsx is the only other
 * root layout, this segment supplies its own <html>/<body>. Fonts are declared again here
 * for the same reason: the locale layout never runs for these routes.
 */

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teataja kaardistus — dashboard",
  robots: { index: false, follow: false },
};

export default function TeatajaDashLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="et">
      <body
        className={`${instrumentSerif.variable} ${outfit.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
