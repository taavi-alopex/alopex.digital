"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingStars({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!starsRef.current) return;
    // Slow constant rotation
    starsRef.current.rotation.y += delta * 0.02;
    starsRef.current.rotation.x += delta * 0.01;

    // Subtle parallax from mouse
    const targetX = (mouseY - 50) * 0.0003;
    const targetY = (mouseX - 50) * 0.0003;
    starsRef.current.rotation.x += (targetX - starsRef.current.rotation.x) * 0.01;
    starsRef.current.rotation.y += (targetY - starsRef.current.rotation.y) * 0.01;
  });

  return (
    <Stars
      ref={starsRef}
      radius={80}
      depth={60}
      count={200}
      factor={3}
      saturation={0.1}
      fade
      speed={0.5}
    />
  );
}

interface StarfieldBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export function StarfieldBackground({ mouseX, mouseY }: StarfieldBackgroundProps) {
  return (
    <div className="absolute inset-0 z-[1]" style={{ opacity: 0.7 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 1], fov: 60 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          dpr={[1, 1.5]}
        >
          <RotatingStars mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
      </Suspense>
    </div>
  );
}
