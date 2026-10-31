"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { trailTrees } from "@/lib/v2/forest";
import { BookLink } from "./BookLink";

const TRAIL_WIDTH = 2400;
const TRAIL_HEIGHT = 16;

/** The menu's scroll indicator: a spruce forest that grows from the left edge to the right edge as you read. */
function Trail() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trees = useMemo(() => trailTrees(TRAIL_WIDTH, TRAIL_HEIGHT), []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const els = Array.from(svg.querySelectorAll<SVGPathElement>(".tr"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const f = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      const edge = f * window.innerWidth * 1.002;
      els.forEach((el, i) => el.classList.toggle("on", f > 0.002 && trees[i].x <= edge));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [trees]);

  return (
    <div className="trail" aria-hidden="true">
      <svg ref={svgRef} width={TRAIL_WIDTH} height={TRAIL_HEIGHT} viewBox={`0 0 ${TRAIL_WIDTH} ${TRAIL_HEIGHT}`}>
        {trees.map((t, i) => (
          <path key={i} className={`tr ${t.tone}`} d={t.d} />
        ))}
      </svg>
    </div>
  );
}

const LANG_NAMES: Record<string, string> = { en: "English", et: "Eesti", pl: "Polski" };

/** Language dropdown: the current code in the menu bar, full names in the list. */
function LangMenu({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`lang${open ? " open" : ""}`} ref={box}>
      <button type="button" className="lang-btn" aria-label={label} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.8 3.8 5.8 3.8 9s-1.2 6.2-3.8 9c-2.6-2.8-3.8-5.8-3.8-9S9.4 5.8 12 3z" />
        </svg>
        {locale.toUpperCase()}
        <svg className="chev" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" />
        </svg>
      </button>
      {open && (
        <ul className="lang-list">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => {
                  setOpen(false);
                  if (l !== locale) router.replace(pathname, { locale: l });
                }}
              >
                <span className="tick" aria-hidden="true">{l === locale ? "✓" : ""}</span>
                {LANG_NAMES[l] ?? l}
                <small>{l.toUpperCase()}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SiteNav({ menu, bookLabel, menuLabel, langLabel }: { menu: { href: string; label: string }[]; bookLabel: string; menuLabel: string; langLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="wrap nav-row">
        <Link className="brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/fox.png" alt="" />
          Alopex Digital
        </Link>
        <ul className={`menu${open ? " open" : ""}`}>
          {menu.map((m) => (
            <li key={m.href}>
              <Link href={m.href} aria-current={pathname === m.href || pathname.startsWith(`${m.href}/`) ? "page" : undefined} onClick={() => setOpen(false)}>
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
        <LangMenu label={langLabel} />
        <BookLink className="btn sm">{bookLabel}</BookLink>
        <button className="burger" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
          {menuLabel}
        </button>
      </div>
      <Trail />
    </nav>
  );
}
