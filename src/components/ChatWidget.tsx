'use client';

import { useEffect } from 'react';

const WIDGET_ID = '69b340866a7fadea5f45e0db';

export function ChatWidget() {
  useEffect(() => {
    // Prevent duplicate script loading
    if (document.getElementById('ghl-chat-widget')) return;

    const script = document.createElement('script');
    script.id = 'ghl-chat-widget';
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', WIDGET_ID);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('ghl-chat-widget');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
