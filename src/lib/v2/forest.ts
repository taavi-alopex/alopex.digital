// Spruce forests drawn as SVG paths: the menu trail, the inner-page treeline and the footer forest.

export function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** One spruce: four stacked tiers plus a short trunk. Base is the ground line. */
export function spruce(x: number, base: number, h: number) {
  const w = h * 0.46;
  let d = "";
  for (let i = 0; i < 4; i++) {
    const top = base - h + h * i * 0.19;
    const bot = i === 3 ? base + 2 : base - h + h * (0.36 + i * 0.2);
    const hw = (w * (0.3 + i * 0.23)) / 1.15;
    d += `M${x.toFixed(1)} ${top.toFixed(1)} L${(x + hw).toFixed(1)} ${bot.toFixed(1)} L${(x - hw).toFixed(1)} ${bot.toFixed(1)} Z `;
  }
  return d + `M${(x - 1.5).toFixed(1)} ${(base - h * 0.08).toFixed(1)} h3 v${(h * 0.1).toFixed(1)} h-3 Z `;
}

export type ForestRow = {
  seed: number;
  color: string;
  min: number;
  max: number;
  /** distance of the ground line from the bottom */
  base: number;
  /** [minimum gap, random extra gap] between trees */
  step: [number, number];
  /** a clearing, as fractions of the width */
  gap?: [number, number];
};

export function forestRows(width: number, height: number, rows: ForestRow[]) {
  return rows.map((row) => {
    const r = rng(row.seed);
    let x = -10;
    let d = "";
    while (x < width + 20) {
      let h = row.min + r() * (row.max - row.min);
      if (r() < 0.12) h *= 1.25;
      const inGap = row.gap && x > width * row.gap[0] && x < width * row.gap[1];
      if (!inGap) d += spruce(x, height - row.base, Math.min(h, height - row.base - 2));
      x += row.step[0] + r() * row.step[1];
    }
    return { d, color: row.color };
  });
}

export type TrailTree = { x: number; d: string; tone: "c1" | "c2" | "c3" };

/** The small trees under the menu, spread over the full width. */
export function trailTrees(width: number, height = 20): TrailTree[] {
  const r = rng(77);
  const trees: TrailTree[] = [];
  let x = 4;
  while (x < width - 2) {
    const h = height * 0.32 + r() * height * 0.55;
    const q = r();
    trees.push({ x, d: spruce(x, height, h), tone: q < 0.16 ? "c3" : q < 0.55 ? "c2" : "c1" });
    x += 5 + r() * 10;
  }
  return trees;
}
