"use client";

export function AuroraEffect() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" style={{ opacity: 0.4 }}>
      {/* Spruce green aurora blob */}
      <div
        className="absolute"
        style={{
          width: "60%",
          height: "50%",
          top: "10%",
          left: "20%",
          background: "radial-gradient(ellipse, rgba(45, 106, 79, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "auroraFloat1 12s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* Amber warm blob */}
      <div
        className="absolute"
        style={{
          width: "40%",
          height: "40%",
          top: "30%",
          right: "10%",
          background: "radial-gradient(ellipse, rgba(212, 135, 63, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "auroraFloat2 15s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />

      {/* Secondary spruce blob */}
      <div
        className="absolute"
        style={{
          width: "50%",
          height: "35%",
          bottom: "20%",
          left: "5%",
          background: "radial-gradient(ellipse, rgba(82, 183, 136, 0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "auroraFloat3 18s ease-in-out infinite",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
