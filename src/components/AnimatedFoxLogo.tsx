"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedFoxLogoProps {
  size?: number;
  glow?: boolean;
  className?: string;
  animate?: boolean;
}

// Simplified fox silhouette paths extracted from the logo for draw animation
const foxPaths = [
  // Main body shape
  "M323.882 290.744C323.493 288.044 322.279 279.319 322.539 277.01C323.92 264.714 326.711 251.414 329.099 239.258C330.268 233.313 331.785 223.661 333.386 218.467L334.108 218.311L335.631 219.552C344.326 227.965 355.406 240.397 363.739 249.427C379.098 265.756 394.307 282.225 409.365 298.832C412.658 302.394 437.728 328.802 438.601 330.737C440.044 331.715 440.06 332.048 441.832 332.053C453.933 332.091 466.303 332.039 478.384 332.033L553.468 331.998C559.501 331.996 581.128 331.434 585.43 332.882",
  // Right ear/head
  "M586.285 332.337C591.199 325.932 597.241 320.297 602.581 314.267C615.377 299.819 628.383 285.789 641.543 271.684L678.771 231.659C683.843 226.307 687.156 222.282 692.71 217.111C695.334 228.301 697.065 240.612 699.306 252.019C700.78 259.519 702.983 269.542 703.573 277.006",
  // Right side body
  "M703.573 277.006C703.821 280.145 702.231 289.756 701.706 293.323C700.564 300.938 699.485 308.562 698.47 316.195L689.431 383.788C687.858 395.358 685.976 406.897 684.561 418.484L684.842 420.624L713.968 478.52C719.666 489.573 727.723 503.962 732.367 515.337",
  // Face left detail
  "M625.451 491.656C644.785 496.061 664.253 499.784 683.588 504.052C699.919 507.657 715.931 511.892 732.367 515.337",
  // Nose/snout
  "M490.253 498.18C487.95 500.086 464.177 543.971 462.451 548.058",
  "M535.046 496.709C537.737 501.281 562.881 546.672 562.981 546.725",
  // Legs
  "M493.907 525.389C494.172 531.335 494.896 537.257 495.539 543.177",
  "M532.566 562.395C531.367 566.251 531.359 570.818 531.501 574.835C532.266 596.472 532.402 618.104 532.921 639.739",
  // Tail area
  "M311.184 624.254L315.219 610.371C315.287 608.752 318.854 596.221 319.502 593.665C323.285 578.744 327.977 563.567 331.257 548.553",
  // Bottom
  "M378.093 701.783C377.907 701.615 377.731 701.436 377.548 701.264C368.415 692.684 358.474 680.339 350.85 670.298",
  "M648.178 701.695C647.172 702.848 633.502 707.481 630.672 708.482L595.283 720.886L543.784 739.004C534.794 742.159 525.805 745.606 516.681 748.346",
];

export function AnimatedFoxLogo({
  size = 140,
  glow = false,
  className = "",
  animate = true,
}: AnimatedFoxLogoProps) {
  const [isDrawn, setIsDrawn] = useState(!animate);
  const [showFill, setShowFill] = useState(!animate);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate) return;

    // After draw animation completes, show fill
    const drawTimer = setTimeout(() => {
      setIsDrawn(true);
    }, 2000);

    const fillTimer = setTimeout(() => {
      setShowFill(true);
    }, 2400);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(fillTimer);
    };
  }, [animate]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-1000"
        style={{
          opacity: showFill ? 1 : 0,
          background: "radial-gradient(circle, rgba(82, 183, 136, 0.25) 0%, transparent 70%)",
          transform: "scale(1.5)",
          animation: showFill ? "foxBreathGlow 4s ease-in-out infinite" : "none",
        }}
      />

      {/* Full colored logo (fades in after draw) */}
      <img
        src="/alopex-logo.svg"
        alt="Alopex Digital"
        width={size}
        height={size}
        className="relative z-10 transition-opacity duration-800"
        style={{
          opacity: showFill ? 1 : 0,
          filter: glow ? "drop-shadow(0 0 24px rgba(82, 183, 136, 0.3))" : undefined,
          transitionDuration: "800ms",
        }}
      />

      {/* SVG draw animation overlay */}
      {animate && !showFill && (
        <svg
          ref={svgRef}
          viewBox="0 0 1024 1024"
          width={size}
          height={size}
          className="absolute inset-0 z-20"
          style={{ filter: "drop-shadow(0 0 8px rgba(82, 183, 136, 0.4))" }}
        >
          {foxPaths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--spruce-light, #52B788)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 2000,
                strokeDashoffset: 2000,
                animation: `foxPathDraw 1.8s ${i * 0.12}s var(--fox-ease, cubic-bezier(0.16, 1, 0.3, 1)) forwards`,
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
