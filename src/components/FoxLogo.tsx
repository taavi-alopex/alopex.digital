import Image from "next/image";

interface FoxLogoProps {
  size?: number;
  glow?: boolean;
  className?: string;
}

export function FoxLogo({ size = 48, glow = false, className = "" }: FoxLogoProps) {
  return (
    <Image
      src="/alopex-logo.svg"
      alt="Alopex Digital"
      width={size}
      height={size}
      className={className}
      style={
        glow
          ? { filter: "drop-shadow(0 0 24px rgba(82, 183, 136, 0.3))" }
          : undefined
      }
      priority
    />
  );
}
