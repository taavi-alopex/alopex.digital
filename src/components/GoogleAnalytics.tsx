"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Extend window for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Helper function to track events (can be imported and used anywhere)
export function trackGAEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, params);
  }
}

// Predefined event helpers
export const GAEvents = {
  // Track form submissions
  formSubmit: (formName: string) => {
    trackGAEvent("form_submit", { form_name: formName });
  },

  // Track CTA clicks
  ctaClick: (ctaName: string, destination?: string) => {
    trackGAEvent("cta_click", { cta_name: ctaName, destination });
  },

  // Track page sections viewed (scroll tracking)
  sectionView: (sectionName: string) => {
    trackGAEvent("section_view", { section_name: sectionName });
  },

  // Track outbound links
  outboundClick: (url: string) => {
    trackGAEvent("outbound_click", { url });
  },

  // Track file downloads
  fileDownload: (fileName: string) => {
    trackGAEvent("file_download", { file_name: fileName });
  },
};

// Component to track page views on route changes
function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Main GoogleAnalytics component
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Track page views on route changes */}
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView />
      </Suspense>
    </>
  );
}
