// Line illustrations: isometric boxes with one hairline, white with amber and mint accents.
// Pure functions that return SVG markup, so they render on the server.

type Tone = "w" | "a" | "g" | "s";

const TONES: Record<Tone, [string, string, string]> = {
  w: ["#FFFFFF", "#F1F2EE", "#E1E4DC"],
  a: ["#FBE3C8", "#EFB97F", "#D4873F"],
  g: ["#EFFAF2", "#D8F3DC", "#B2DCBF"],
  s: ["#FFF8EC", "#FFEFD6", "#F0DBB5"],
};

const IC = Math.cos(Math.PI / 6);
type P3 = [number, number, number];

function makeCanvas() {
  const bx = [1e9, 1e9, -1e9, -1e9];
  const pts = (a: P3[]) =>
    a
      .map(([x, y, z]) => {
        const px = (x - y) * IC;
        const py = (x + y) * 0.5 - z;
        bx[0] = Math.min(bx[0], px);
        bx[1] = Math.min(bx[1], py);
        bx[2] = Math.max(bx[2], px);
        bx[3] = Math.max(bx[3], py);
        return `${px.toFixed(2)},${py.toFixed(2)}`;
      })
      .join(" ");
  const box = (x: number, y: number, z: number, w: number, d: number, h: number, t: Tone = "w") => {
    const c = TONES[t];
    return (
      `<polygon fill="${c[1]}" points="${pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])}"/>` +
      `<polygon fill="${c[2]}" points="${pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])}"/>` +
      `<polygon fill="${c[0]}" points="${pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])}"/>`
    );
  };
  const ln = (a: P3[], cls = "") => `<polyline fill="none"${cls ? ` class="${cls}"` : ""} points="${pts(a)}"/>`;
  const ring = (cx: number, cy: number, z: number, r: number, cls = "") => {
    const a: P3[] = [];
    for (let i = 0; i <= 56; i++) {
      const t = (i / 56) * Math.PI * 2;
      a.push([cx + r * Math.cos(t), cy + r * Math.sin(t), z]);
    }
    return ln(a, cls);
  };
  return { bx, pts, box, ln, ring };
}

type Canvas = ReturnType<typeof makeCanvas>;

const ARTS: Record<string, (c: Canvas) => string> = {
  custom: ({ box, ln }) => {
    let o = box(0, 0, 0, 14, 14, 0.5);
    for (const [x, y] of [[2.5, 2.5], [11.5, 2.5], [2.5, 11.5], [11.5, 11.5]]) o += ln([[x, y, 0.5], [7, 7, 0.5]], "dash");
    o += box(1, 1, 0.5, 3, 3, 2.2);
    for (let i = 0; i < 3; i++) o += ln([[1.6, 1.7 + i * 0.8, 2.7], [3.4, 1.7 + i * 0.8, 2.7]], "f");
    o += box(10, 1, 0.5, 3, 3, 1.1) + ln([[10.6, 2.5, 1.6], [12.4, 2.5, 1.6]], "f");
    o += box(1, 10, 0.5, 3, 3, 1.4, "s") + ln([[1, 10, 1.9], [2.5, 11.6, 1.9], [4, 10, 1.9]]);
    o += box(5.5, 5.5, 0.5, 3, 3, 3.2, "a") + ln([[6.2, 6.2, 3.7], [7.8, 6.2, 3.7], [7.8, 7.8, 3.7], [6.2, 7.8, 3.7], [6.2, 6.2, 3.7]]);
    return o + box(10, 10, 0.5, 3, 3, 2.4, "g");
  },
  ai: ({ box, ln }) => {
    let o = box(0, 0, 0, 8, 11, 0.3);
    for (let i = 0; i < 8; i++) o += ln([[1, 1.2 + i * 1.2, 0.3], [i % 3 === 2 ? 4.6 : 7, 1.2 + i * 1.2, 0.3]], "f");
    o += box(1, 3.3, 0.3, 4.6, 0.6, 0.06, "a") + box(1, 7, 0.3, 3.4, 0.6, 0.06, "a");
    o += ln([[-0.6, 5, 2.6], [-0.6, 5, 0.3]], "dash") + ln([[8.6, 5, 2.6], [8.6, 5, 0.3]], "dash");
    o += box(-0.6, 5, 2.6, 9.2, 1.4, 0.12, "g") + ln([[8, 6, 0.3], [11, 5, 0.3]], "dash");
    o += box(11, 3, 0, 4, 3, 0.3) + box(11, 3, 0.9, 4, 3, 0.3) + box(11, 3, 1.8, 4, 3, 0.3, "a");
    return o + ln([[11.6, 3.8, 2.1], [14, 3.8, 2.1]]) + ln([[11.6, 4.6, 2.1], [13, 4.6, 2.1]]);
  },
  products: ({ box, ln }) => {
    let o = box(0, 0, 0, 16, 5, 0.6);
    for (const [x, h, t] of [[1, 4.2, "w"], [6.3, 2.8, "a"], [11.6, 3.4, "g"]] as [number, number, Tone][])
      o += box(x, 1, 0.6, 3.4, 3, h, t) + ln([[x + 0.5, 4, 0.6 + h - 0.7], [x + 2.4, 4, 0.6 + h - 0.7]], "f");
    return o;
  },
  sales: ({ box }) => {
    let o = box(-0.8, -0.8, 0, 12.8, 10.4, 0.3);
    const hot = new Set(["1,1", "3,0", "2,2", "4,3"]);
    const cells: [number, number][] = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) cells.push([i, j]);
    cells.sort((a, b) => a[0] + a[1] - b[0] - b[1]);
    for (const [i, j] of cells) {
      const h = hot.has(`${i},${j}`);
      o += box(i * 2.4, j * 2.4, 0.3, 1.5, 1.5, h ? 1.9 : 0.5, h ? "a" : "w");
    }
    return o;
  },
  reply: ({ box, ln }) => {
    let o = "";
    for (const [x, n, t] of [[0, 4, "w"], [5.5, 3, "g"], [11, 2, "a"]] as [number, number, Tone][]) {
      for (let k = 0; k < n; k++) o += box(x, 0, k * 0.55, 4, 2.8, 0.35, t);
      const top = (n - 1) * 0.55 + 0.35;
      o += ln([[x, 0, top], [x + 2, 1.5, top], [x + 4, 0, top]]);
    }
    return o + ln([[2, 3.2, 0.2], [6.5, 3.2, 0.2]], "dash") + ln([[7.5, 3.2, 0.2], [12, 3.2, 0.2]], "dash");
  },
  quotes: ({ box, ln }) => {
    let o = box(0, 0, 0, 12, 9, 0.25);
    for (let i = 2; i < 12; i += 2) o += ln([[i, 0, 0.25], [i, 9, 0.25]], "f");
    for (let j = 2; j < 9; j += 2) o += ln([[0, j, 0.25], [12, j, 0.25]], "f");
    o += box(2, 1, 0.25, 5, 1, 3, "g");
    o += box(2, 4, 0.25, 7, 1, 4.2) + ln([[4, 5, 1.3], [6.2, 5, 1.3], [6.2, 5, 3.3], [4, 5, 3.3], [4, 5, 1.3]]);
    o += ln([[2, 7, 0.25], [9, 7, 0.25]], "am") + ln([[2, 6.6, 0.25], [2, 7.4, 0.25]], "am") + ln([[9, 6.6, 0.25], [9, 7.4, 0.25]], "am");
    return o + box(10.4, 6, 0.25, 3.4, 2.6, 0.3, "a") + ln([[11, 6.8, 0.55], [13.2, 6.8, 0.55]]) + ln([[11, 7.6, 0.55], [12.4, 7.6, 0.55]]);
  },
  ops: ({ box, ln }) => {
    let o = box(0, 0, 0, 19, 3, 0.9);
    for (let x = 1; x < 19; x += 1.5) o += ln([[x, 0, 0.9], [x, 3, 0.9]], "f");
    o += box(1, 0.5, 0.9, 2, 2, 2) + box(5.5, 0.5, 0.9, 2, 2, 2) + box(10, 0.5, 0.9, 2, 2, 2, "g") + box(14.5, 0.5, 0.9, 2.6, 2, 1.2, "a");
    return o + ln([[2, 3, 0.45], [17, 3, 0.45]], "am") + ln([[16.2, 3, 0.75], [17, 3, 0.45], [16.2, 3, 0.15]], "am");
  },
  reports: ({ box, ln }) => {
    let o = box(0, 0, 0, 12, 5, 0.3);
    for (const [x, h, t] of [[1, 1.4, "w"], [3.6, 2.4, "w"], [6.2, 3.4, "g"], [8.8, 4.8, "a"]] as [number, number, Tone][])
      o += box(x, 1.5, 0.3, 2, 2, h, t);
    return o + ln([[2, 2.5, 2.4], [4.6, 2.5, 3.4], [7.2, 2.5, 4.4], [9.8, 2.5, 5.8]], "dash");
  },
  web: ({ box, ln }) => {
    let o = box(0, 0, 0, 13, 9, 0.4) + ln([[0, 1.4, 0.4], [13, 1.4, 0.4]]) + ln([[0.6, 0.7, 0.4], [1, 0.7, 0.4]]) + ln([[1.4, 0.7, 0.4], [1.8, 0.7, 0.4]]);
    o += box(1, 2.4, 0.4, 6, 5.6, 0.5, "g");
    for (let i = 0; i < 3; i++) o += ln([[1.8, 3.4 + i, 0.9], [5.6 - i, 3.4 + i, 0.9]], "f");
    return o + box(8, 2.4, 0.4, 4, 2.4, 0.35) + box(8, 5.6, 0.4, 4, 2.4, 0.35, "a");
  },
  map: ({ box, ln }) => {
    let o = box(0, 0, 0, 14, 10.6, 0.3);
    const tiles: [number, number, number, number, number, Tone][] = [
      [1, 1, 3, 2.5, 0.6, "w"], [4.6, 1, 2.6, 3.2, 1.1, "g"], [1, 4.2, 2.8, 5.4, 1.5, "a"], [8, 1, 4.5, 2, 0.6, "w"],
      [4.6, 4.8, 3.4, 4.8, 0.6, "w"], [8.6, 3.6, 2.4, 2.6, 1.7, "g"], [11.6, 3.6, 1.6, 2.6, 0.6, "w"], [8.6, 6.8, 4.6, 2.8, 0.6, "w"],
    ];
    for (const [x, y, w, d, h, t] of tiles) o += box(x, y, 0.3, w, d, h, t);
    return o + ln([[2.4, 6.9, 1.8], [2.4, 6.9, 4.2]]) + box(1.9, 6.4, 4.2, 1, 1, 1, "a");
  },
  radar: ({ box, ln, ring }) => {
    let o = box(0, 0, 0, 14, 14, 0.2) + ring(7, 7, 0.2, 6.4, "am dash") + ring(7, 7, 0.2, 4.6, "am");
    o += box(5.5, 5.5, 0.2, 3, 3, 5.4);
    for (let z = 1.2; z < 5; z += 1.1) o += ln([[6, 8.5, z], [8, 8.5, z]], "f");
    return o + ring(11.2, 3.2, 0.2, 1.9, "am") + box(10, 2, 0.2, 2.4, 2.4, 1.6, "g");
  },
  road: ({ box, ln, pts }) => {
    let o = "";
    for (const [x, h, t] of [[0, 0.6, "w"], [3.4, 1.4, "w"], [6.8, 2.2, "g"], [10.2, 3, "a"]] as [number, number, Tone][]) o += box(x, 0, 0, 3, 3, h, t);
    o += ln([[1.5, 1.5, 0.6], [4.9, 1.5, 1.4], [8.3, 1.5, 2.2], [11.7, 1.5, 3]], "dash");
    return o + ln([[11.7, 1.5, 3], [11.7, 1.5, 5.4]]) + `<polygon class="flag" points="${pts([[11.7, 1.5, 5.4], [13.4, 1.5, 4.95], [11.7, 1.5, 4.5]])}"/>`;
  },
  // Meeting Sync: a calendar event → the notes document → the right folder.
  meetings: ({ box, ln }) => {
    let o = box(0, 0, 0, 5.4, 5.4, 0.35) + box(0, 0, 0.35, 5.4, 1.1, 0.08, "g");
    for (let i = 1; i < 4; i++) o += ln([[i * 1.35, 1.1, 0.35], [i * 1.35, 5.4, 0.35]], "f");
    for (let j = 1; j < 3; j++) o += ln([[0, 1.1 + j * 1.43, 0.35], [5.4, 1.1 + j * 1.43, 0.35]], "f");
    o += box(1.45, 2.63, 0.35, 1.25, 1.33, 0.22, "a");
    o += ln([[5.6, 3.3, 0.2], [7.4, 3.3, 0.2]], "dash");
    o += box(7.4, 0.6, 0, 3.8, 5, 0.18) + box(7.4, 0.6, 0.18, 3.8, 5, 0.18);
    o += box(7.9, 1.2, 0.36, 2.6, 0.5, 0.05, "a");
    for (let i = 0; i < 5; i++) o += ln([[7.9, 2.3 + i * 0.65, 0.36], [i % 2 ? 9.6 : 10.6, 2.3 + i * 0.65, 0.36]], "f");
    o += ln([[11.4, 3.3, 0.2], [13.2, 3.3, 0.2]], "dash");
    o += box(13.2, 0.8, 0, 4.6, 4.6, 2.3, "s") + box(13.2, 0.8, 2.3, 1.9, 1.3, 0.35, "s");
    o += box(13.8, 1.6, 2.3, 3.4, 3.2, 0.12);
    for (let i = 0; i < 3; i++) o += ln([[14.3, 2.4 + i * 0.75, 2.42], [16.6, 2.4 + i * 0.75, 2.42]], "f");
    return o;
  },
  // Calendar Sync: the same event copied to a second calendar, once in full and once as "Busy".
  calendars: ({ box, ln }) => {
    let o = "";
    for (const [x, head, ev] of [[0, "g", "a"], [9, "s", "w"]] as [number, Tone, Tone][]) {
      o += box(x, 0, 0, 6.4, 6.4, 0.35) + box(x, 0, 0.35, 6.4, 1.2, 0.08, head);
      for (let i = 1; i < 4; i++) o += ln([[x + i * 1.6, 1.2, 0.35], [x + i * 1.6, 6.4, 0.35]], "f");
      for (let j = 1; j < 3; j++) o += ln([[x, 1.2 + j * 1.73, 0.35], [x + 6.4, 1.2 + j * 1.73, 0.35]], "f");
      o += box(x + 1.75, 1.35, 0.35, 1.3, 3.2, 0.5, ev);
      if (ev === "a") for (let k = 0; k < 2; k++) o += ln([[x + 2.05, 1.8 + k * 0.6, 0.85], [x + 2.75, 1.8 + k * 0.6, 0.85]], "f");
    }
    o += ln([[6.8, 2.2, 0.5], [8.6, 2.2, 0.5]], "am") + ln([[8.0, 2.2, 0.9], [8.6, 2.2, 0.5], [8.0, 2.2, 0.1]], "am");
    o += ln([[8.6, 4.4, 0.5], [6.8, 4.4, 0.5]], "am dash") + ln([[7.4, 4.4, 0.9], [6.8, 4.4, 0.5], [7.4, 4.4, 0.1]], "am");
    return o;
  },
};

export type ArtName = keyof typeof ARTS;

export function isoArt(name: string): string {
  const c = makeCanvas();
  const body = (ARTS[name] ?? ARTS.custom)(c);
  const [x0, y0, x1, y1] = c.bx;
  const w = x1 - x0;
  const h = y1 - y0;
  const p = Math.max(w, h) * 0.04;
  return `<svg class="iso" viewBox="${(x0 - p).toFixed(2)} ${(y0 - p).toFixed(2)} ${(w + 2 * p).toFixed(2)} ${(h + 2 * p).toFixed(2)}" aria-hidden="true"><g>${body}</g></svg>`;
}
