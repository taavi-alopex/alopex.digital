// Alopex asleep: a curled arctic fox cut from a few flat facets (like the logo),
// nose on its tail, amber tail tip. Returns SVG markup.

const C: Record<string, string> = {
  w0: "#FFFFFF", w1: "#F2F4F0", w2: "#E4E8E1", w3: "#D2D8CF",
  e0: "#4A4F66", e1: "#2B2F45", a0: "#F3C38D", a1: "#D4873F", k: "#161929",
};

type Pt = [number, number];

const pg = (p: Pt[], fill: string, cls = "") =>
  `<polygon${cls ? ` class="${cls}"` : ""} fill="${C[fill] ?? fill}" points="${p.map((q) => q.join(",")).join(" ")}"/>`;

const fan = (o: Pt[], k: Pt, shades: string[]) => o.map((p, i) => pg([p, o[(i + 1) % o.length], k], shades[i])).join("");

export function foxSleepSVG(): string {
  const body: Pt[] = [[12, 62], [13, 48], [22, 34], [38, 24], [60, 19], [82, 21], [98, 30], [106, 44], [106, 62]];
  const head: Pt[] = [[96, 42], [106, 31], [118, 31], [134, 40], [147, 46], [146, 51], [130, 55], [108, 57], [96, 52]];
  const tail: Pt[] = [[6, 60], [24, 53], [56, 54], [92, 57], [120, 57], [142, 54], [156, 58], [148, 66], [112, 69], [60, 69], [22, 68], [8, 65]];
  const farEar: Pt[] = [[103, 34], [104, 21], [113, 31]];
  const ear: Pt[] = [[108, 32], [111, 18], [121, 31]];
  let o = `<ellipse cx="80" cy="69" rx="76" ry="3.2" fill="#161929" opacity=".07"/>`;
  o += `<g class="sl-body">${fan(body, [60, 46], ["w2", "w1", "w0", "w0", "w0", "w1", "w2", "w3", "w3"])}${pg(body, "none", "ol")}</g>`;
  o += pg(farEar, "e1") + pg(farEar, "none", "ol");
  o +=
    `<g class="sl-head">${fan(head, [118, 45], ["w0", "w0", "w0", "w1", "w1", "w2", "w3", "w2", "w1"])}${pg(head, "none", "ol")}` +
    pg(ear, "w1") + pg([[111, 30], [111.5, 22], [117, 30]], "e0") + pg(ear, "none", "ol") +
    pg([[143, 44.5], [148, 46], [146.5, 50.5], [143, 49]], "k") +
    `<path class="ol" fill="none" d="M120 39.5 q3.5 2.6 7 0"/></g>`;
  o +=
    `<g class="sl-tail">` +
    pg([[6, 60], [24, 53], [22, 68], [8, 65]], "w2") + pg([[24, 53], [56, 54], [60, 69], [22, 68]], "w1") +
    pg([[56, 54], [92, 57], [112, 69], [60, 69]], "w0") + pg([[92, 57], [120, 57], [128, 68], [112, 69]], "w1") +
    pg([[120, 57], [142, 54], [148, 66], [128, 68]], "a0") + pg([[142, 54], [156, 58], [148, 66]], "a1") + pg(tail, "none", "ol") +
    `</g>`;
  o += `<g class="sl-z"><text x="131" y="29">z</text><text x="139" y="21">z</text></g>`;
  return `<svg class="fox-sleep" viewBox="2 6 158 68" role="img" aria-label="Alopex, our fox, asleep">${o}</svg>`;
}
