"use client";

import { Hero } from "@/components/Hero";
import { HeroVariantB } from "@/components/HeroVariantB";
import { useABVariant } from "@/components/ABVariantProvider";

export function HomeHero() {
  const variant = useABVariant();
  return variant === "2" ? <HeroVariantB /> : <Hero />;
}
