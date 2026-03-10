"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
  const { ref, isRevealed } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
    >
      <div
        style={{
          transform: isRevealed ? "translateY(0)" : "translateY(100%)",
          opacity: isRevealed ? 1 : 0,
          transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay * 0.1}s, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay * 0.1}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
