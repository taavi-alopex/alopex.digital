"use client";

import { useRouter } from "@/i18n/navigation";

/** "Book a call": scrolls to the booking block on this page, or opens it on the home page. */
export function BookLink({ className = "btn", children }: { className?: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <a
      className={className}
      href="#book"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById("book");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", "#book");
        } else {
          router.push("/#book");
        }
      }}
    >
      {children}
    </a>
  );
}
