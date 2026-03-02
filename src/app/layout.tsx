import type { Metadata } from "next";
import { Instrument_Serif, Outfit, Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alopex Digital — Orchestrating Clarity and Flow",
  description:
    "Advanced HighLevel & RevOps infrastructure for sales-led service businesses in Scandinavia and CEE. We architect, build, and launch systems that stop revenue leaking.",
  keywords: [
    "HighLevel",
    "RevOps",
    "CRM automation",
    "sales automation",
    "Estonia",
    "Scandinavia",
    "CEE",
    "digital agency",
  ],
  openGraph: {
    title: "Alopex Digital — Orchestrating Clarity and Flow",
    description:
      "Advanced HighLevel & RevOps infrastructure for sales-led service businesses.",
    url: "https://alopex.digital",
    siteName: "Alopex Digital",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${instrumentSerif.variable} ${outfit.variable} ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
