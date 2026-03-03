"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const GHL_URL =
  "https://api.leadconnectorhq.com/widget/booking/Wt3A4KaUfmwZzFwGMirM";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function BookingModal({ isOpen, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "bookingFadeIn 0.3s var(--fox-ease, ease-out) forwards",
      }}
    >
      <div
        className="relative w-full max-w-[700px] mx-4"
        style={{
          height: "min(85vh, 800px)",
          animation: "bookingSlideUp 0.3s var(--fox-ease, ease-out) forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--midnight,#161929)] border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
          aria-label="Close booking"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        {/* Iframe container */}
        <div
          className="w-full h-full rounded-xl overflow-hidden"
          style={{
            background: "var(--midnight, #161929)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        >
          <iframe
            src={GHL_URL}
            className="w-full h-full border-0"
            title="Book a Discovery Call"
            allow="payment"
          />
        </div>
      </div>

      {/* GHL embed script */}
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />

      <style jsx global>{`
        @keyframes bookingFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bookingSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
