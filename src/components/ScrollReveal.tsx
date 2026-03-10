"use client";

import { useRef, useEffect, useState, Children, cloneElement, isValidElement } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  /** Animation variant */
  variant?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "none";
  /** Stagger children individually */
  stagger?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.15,
  variant = "fadeUp",
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = () => {
    switch (variant) {
      case "fadeLeft": return "translateX(-40px)";
      case "fadeRight": return "translateX(40px)";
      case "scale": return "scale(0.92)";
      case "none": return "none";
      default: return "translateY(32px)";
    }
  };

  const delayMs = delay * 80;

  if (stagger) {
    return (
      <div ref={ref} className={className}>
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) return child;
          return (
            <div
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? "translateY(0) scale(1)" : getInitialTransform(),
                transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs + i * 100}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs + i * 100}ms`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "translateY(0) translateX(0) scale(1)" : getInitialTransform(),
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
