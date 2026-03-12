  import type { Metadata } from "next";
  import Script from "next/script";
  import { Instrument_Serif, Outfit, Montserrat, JetBrains_Mono } from "next/font/google";
  import { notFound } from "next/navigation";
  import { NextIntlClientProvider } from "next-intl";
  import { getMessages, getTranslations } from "next-intl/server";
  import { routing } from "@/i18n/routing";
  import { BookingProvider } from "@/components/BookingProvider";
  import { AssessmentProvider } from "@/components/AssessmentProvider";
  import { RecruitmentProvider } from "@/components/RecruitmentProvider";
  import { NewsletterProvider } from "@/components/NewsletterProvider";
  import { MetaPixel } from "@/components/MetaPixel";
  import { ChatWidget } from "@/components/ChatWidget";
  import "../globals.css";

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
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
  });

  const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
  });

  const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "700"],
    display: "swap",
  });

  type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  };

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
      title: t("title"),
      description: t("description"),
      keywords: [
        "GoHighLevel",
        "GoHighLevel agency",
        "GoHighLevel implementation",
        "n8n",
        "n8n automation",
        "RevOps",
        "CRM automation",
        "revenue operations",
        "European Union",
        "EU",
      ],
      alternates: {
        canonical: `https://alopex.digital/${locale}`,
        languages: {
          en: "https://alopex.digital/en",
          et: "https://alopex.digital/et",
          pl: "https://alopex.digital/pl",
          "x-default": "https://alopex.digital/en",
        },
      },
      icons: {
        icon: "/alopex-logo.svg",
        apple: "/alopex-logo.png",
      },
      openGraph: {
        title: t("title"),
        description: t("ogDescription"),
        url: "https://alopex.digital",
        siteName: "Alopex Digital",
        type: "website",
        locale: locale === "et" ? "et_EE" : locale === "pl" ? "pl_PL" : "en_US",
      },
    };
  }

  export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
      notFound();
    }

    const messages = await getMessages();

    return (
      <html lang={locale} className="scroll-smooth">
        <head>
          <Script
            id="cookieyes"
            src="https://cdn-cookieyes.com/client_data/0fa48870f6545632d245c569fd209db8/script.js"
            strategy="beforeInteractive"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Alopex Digital",
                url: "https://alopex.digital",
                logo: "https://alopex.digital/alopex-logo.png",
                description: "GoHighLevel & n8n agency for sales-led businesses across the EU.",
                areaServed: {
                  "@type": "Place",
                  name: "European Union",
                },
                sameAs: [],
              }),
            }}
          />
        </head>
        <body
          className={`${instrumentSerif.variable} ${outfit.variable} ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}
          suppressHydrationWarning
        >
          <MetaPixel />
          <NextIntlClientProvider messages={messages}>
            <BookingProvider>
              <AssessmentProvider>
                <RecruitmentProvider>
                    <NewsletterProvider>
                      {children}
                    </NewsletterProvider>
                  </RecruitmentProvider>
              </AssessmentProvider>
            </BookingProvider>
          </NextIntlClientProvider>
          <ChatWidget />
        </body>
      </html>
    );
  }
