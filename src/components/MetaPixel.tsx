"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Extend window for fbq
declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: unknown;
  }
}

// Helper function to track events (can be imported and used anywhere)
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

// Predefined event helpers
export const MetaEvents = {
  // Track when someone submits a lead form
  lead: (params?: { content_name?: string; value?: number; currency?: string }) => {
    trackMetaEvent("Lead", params);
  },

  // Track when someone schedules/books
  schedule: (params?: { content_name?: string }) => {
    trackMetaEvent("Schedule", params);
  },

  // Track when someone views important content
  viewContent: (params?: { content_name?: string; content_category?: string }) => {
    trackMetaEvent("ViewContent", params);
  },

  // Track form submissions (custom event)
  submitForm: (formName: string) => {
    trackMetaEvent("SubmitApplication", { content_name: formName });
  },

  // Track when someone starts checkout/booking flow
  initiateCheckout: (params?: { content_name?: string }) => {
    trackMetaEvent("InitiateCheckout", params);
  },
};

// Component to track page views
function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

// Main MetaPixel component
export function MetaPixel() {
  if (!META_PIXEL_ID) {
    return null;
  }

  return (
    <>
      {/* Meta Pixel Base Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* NoScript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Track page views on route changes */}
      <Suspense fallback={null}>
        <MetaPixelPageView />
      </Suspense>
    </>
  );
}
