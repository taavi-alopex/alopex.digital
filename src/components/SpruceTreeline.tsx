"use client";

interface SpruceTreelineProps {
  variant?: 1 | 2 | 3;
  className?: string;
  opacity?: number;
  /** Flip for visual variety */
  flip?: boolean;
}

// Three different treeline silhouette profiles
const treelines: Record<number, string> = {
  1: "M0 120 L20 90 L30 100 L45 60 L55 85 L65 45 L75 80 L90 30 L105 75 L115 55 L130 80 L140 50 L155 70 L165 40 L180 75 L195 55 L205 85 L220 65 L235 45 L250 70 L260 55 L275 80 L290 50 L305 35 L315 65 L330 75 L345 55 L360 40 L375 70 L385 85 L400 60 L415 45 L425 75 L440 55 L455 70 L465 40 L480 65 L495 80 L505 50 L520 35 L535 60 L545 75 L560 55 L575 85 L590 60 L600 45 L615 70 L625 80 L640 50 L655 65 L670 40 L680 75 L695 55 L710 70 L725 85 L740 55 L755 40 L770 65 L780 80 L795 50 L810 70 L825 55 L840 85 L855 60 L870 45 L885 75 L900 65 L915 80 L930 50 L945 70 L960 55 L975 85 L990 60 L1000 120 Z",
  2: "M0 120 L15 85 L30 95 L50 55 L65 78 L80 38 L95 72 L110 52 L125 80 L145 42 L160 68 L175 55 L190 82 L210 45 L225 72 L240 58 L260 35 L275 65 L290 78 L310 48 L325 72 L340 55 L360 82 L375 60 L390 42 L410 70 L425 52 L440 78 L460 38 L475 65 L490 55 L510 80 L525 48 L540 72 L560 42 L575 68 L590 55 L610 82 L625 45 L640 72 L660 58 L675 35 L690 65 L710 78 L725 48 L740 72 L760 55 L775 82 L790 60 L810 42 L825 70 L840 52 L860 78 L875 38 L890 65 L910 55 L925 80 L940 48 L955 72 L975 42 L990 68 L1000 120 Z",
  3: "M0 120 L25 80 L40 92 L60 48 L78 75 L95 32 L110 68 L130 50 L148 78 L165 38 L180 65 L200 52 L215 85 L235 42 L250 70 L268 55 L285 82 L305 40 L320 68 L340 52 L355 78 L375 35 L390 62 L405 75 L425 45 L440 70 L458 55 L475 82 L495 42 L510 68 L530 50 L545 78 L565 32 L580 65 L598 52 L615 85 L635 42 L650 70 L668 55 L685 82 L705 38 L720 65 L740 50 L755 78 L775 35 L790 62 L805 75 L825 45 L840 70 L858 55 L875 82 L895 42 L910 68 L930 50 L945 78 L965 35 L980 65 L1000 120 Z",
};

export function SpruceTreeline({
  variant = 1,
  className = "",
  opacity = 0.06,
  flip = false,
}: SpruceTreelineProps) {
  return (
    <div
      className={`w-full pointer-events-none ${className}`}
      style={{
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        <path
          d={treelines[variant]}
          fill="var(--dark-navy, #282C3E)"
        />
      </svg>
    </div>
  );
}
