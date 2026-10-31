import { isoArt } from "@/lib/v2/iso";
import { forestRows, type ForestRow } from "@/lib/v2/forest";
import { foxSleepSVG } from "@/lib/v2/fox";

/** A line illustration. The SVG markup is generated from our own code, never from user input. */
export function Art({ name, className = "art" }: { name: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: isoArt(name) }} />;
}

/**
 * A strip of spruce forest. Drawn once at a wide size and cropped from the left,
 * so the trees keep their size on every screen.
 */
export function Forest({ rows, height, width = 2400, className, ground }: { rows: ForestRow[]; height: number; width?: number; className?: string; ground?: string }) {
  const paths = forestRows(width, height, rows);
  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMax slice" aria-hidden="true">
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} />
      ))}
      {ground && <rect x="0" y={height - 8} width={width} height="9" fill={ground} />}
    </svg>
  );
}

export function SleepingFox() {
  return <div className="fox-home" dangerouslySetInnerHTML={{ __html: foxSleepSVG() }} />;
}
