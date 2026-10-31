import type { Metadata } from "next";
import Script from "next/script";
import { Familjen_Grotesk, Source_Sans_3, Martian_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getText } from "@/content/v2/text";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { OrganizationSchema, LocalBusinessSchema, FAQPageSchema, WebSiteSchema } from "@/components/StructuredData";
import "../globals.css";
import "../v2.css";

const familjen = Familjen_Grotesk({ variable: "--font-familjen", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], display: "swap" });
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], display: "swap" });
const martian = Martian_Mono({ variable: "--font-martian", subsets: ["latin", "latin-ext"], weight: ["400", "500"], display: "swap" });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getText(locale);
  return {
    metadataBase: new URL("https://alopex.digital"),
    title: t.meta.title,
    description: t.meta.description,
    keywords: ["process automation", "AI consulting", "CRM automation", "n8n", "GoHighLevel", "Merit Aktiva", "Estonia", "Poland", "Nordics"],
    alternates: {
      languages: {
        en: "https://alopex.digital/en",
        et: "https://alopex.digital/et",
        pl: "https://alopex.digital/pl",
        "x-default": "https://alopex.digital/en",
      },
    },
    icons: { icon: "/alopex-logo.svg", apple: "/alopex-logo.png" },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `https://alopex.digital/${locale}`,
      siteName: "Alopex Digital",
      type: "website",
      locale: locale === "et" ? "et_EE" : locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <Script id="cookieyes" src="https://cdn-cookieyes.com/client_data/0fa48870f6545632d245c569fd209db8/script.js" strategy="beforeInteractive" />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <FAQPageSchema />
        <WebSiteSchema />
      </head>
      <body className={`${familjen.variable} ${sourceSans.variable} ${martian.variable} antialiased`} suppressHydrationWarning>
        <MetaPixel />
        <GoogleAnalytics />
        {/* Client components only need the locale; all wording comes from src/content/v2/text. */}
        <NextIntlClientProvider locale={locale} messages={{}}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
