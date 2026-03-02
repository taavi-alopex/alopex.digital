"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.15,
}: ScrollRevealProps) {
  const { ref, isRevealed } = useScrollReveal(threshold);

  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? "revealed" : ""} ${className}`}
      style={delay ? { animationDelay: `${delay * 80}ms` } : undefined}
    >
      {children}
    </div>
  );
}
