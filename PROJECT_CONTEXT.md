# Alopex Digital Website — Project Context & Progress

## Quick Reference
- **Repo**: https://github.com/taavi-alopex/alopex.digital
- **Stack**: Next.js 16, React 19, Tailwind CSS v4, TypeScript
- **CWD**: /Users/taaviswcoachingandrecruiting/alopex.digital
- **Brand**: Nordic-editorial, dark-dominant, "arctic fox in boreal forest"
- **Run**: `npm run dev` → http://localhost:3000

## Brand Tokens (Essential)
### Colors
- Midnight: #161929 | Dark Navy: #282C3E | Dark Surface: #1E2138 | Dark Elevated: #282C44
- Spruce: #2D6A4F | Spruce Light: #52B788 | Spruce Pale: #D8F3DC
- Amber: #D4873F | Amber Light: #F0C78A | Amber Pale: #FFF5E6
- Frost: #E8EDF2 | Off-White: #F8FAF9 | Mist: #C4CED8
- Dark Border: rgba(255,255,255,0.06)

### Typography
- Display: Instrument Serif (H1, quotes)
- Headings/UI: Outfit 300-800 (H2, H3, nav, buttons, labels)
- Body: Montserrat 300-900
- Code: JetBrains Mono

### Motion
- Fox Easing: cubic-bezier(0.16, 1, 0.3, 1)
- Fast: 150ms | Medium: 300ms | Slow: 600ms | Stagger: 80ms

### Rules
- ONE amber CTA per viewport
- Frost noise texture: 4% opacity, overlay blend
- Topographic lines: 6% opacity
- Button radius: 8px | Card radius: 12px | Section radius: 16px

## Business Content
- Purpose: "To orchestrate clarity and flow for ambitious businesses"
- Internal: "Building Freedom Machines"
- Niche: HighLevel & RevOps for sales-led service businesses in Scandinavia/CEE
- 3 Uniques: Strategic Blueprinting | Advanced API Ecosystems | Regional RevOps Fluency
- Process: Systems Audit → Strategic Blueprint → Architecture Build → Frictionless Launch → Growth Loop
- Guarantees: User Adoption Promise + Blueprint Credit
- Values: Ownership Mindset | Responsible Freedom | Everything is Figureoutable | Truth Over Ego | Have Heart

## File Structure
```
src/app/
  globals.css          — Full CVI theme (colors, spacing, motion, textures, animations)
  layout.tsx           — 4 Google Fonts, metadata, OG tags, favicon
  page.tsx             — Assembles all sections
src/components/
  Navigation.tsx       — Fixed nav, glassmorphic on scroll, scroll progress bar, mobile menu
  Hero.tsx             — Full viewport, mouse-following gradient, frost noise, geometric grid, scroll indicator
  About.tsx            — Mission section, purpose quote card, region badges
  Clients.tsx          — Three ideal client type cards
  Uniques.tsx          — Three differentiator cards with icons
  Process.tsx          — 5-step vertical timeline with alternating layout
  Stats.tsx            — 4-column animated counter grid
  Values.tsx           — Editorial alternating layout for 5 core values
  Guarantee.tsx        — Two guarantee cards (User Adoption + Blueprint Credit)
  CTA.tsx              — Final conversion section with pulse-glow amber CTA
  Footer.tsx           — Brand mark, links, gradient bar, copyright
  FoxLogo.tsx          — Logo component with optional glow
  ScrollReveal.tsx     — Intersection Observer scroll animation wrapper
  SectionLabel.tsx     — Uppercase label with gradient line accent
  Button.tsx           — 7 variants, 3 sizes (currently unused, available for expansion)
src/hooks/
  useScrollReveal.ts   — Intersection Observer hook
  useCountUp.ts        — Number counting animation hook
```

## Progress Tracker

### Phase 1: Foundation ✅ DONE
- [x] Next.js project created
- [x] GitHub repo created (private)
- [x] CVI document parsed (full Brand Board v3)
- [x] EOS business docs parsed (10 documents)
- [x] Logo assets downloaded and placed in public/

### Phase 2: Theme & Layout ✅ DONE
- [x] globals.css — full Tailwind v4 theme tokens, CSS variables, keyframes, textures
- [x] layout.tsx — 4 fonts, metadata, OG tags, favicon
- [x] Base components: ScrollReveal, Button, SectionLabel, FoxLogo

### Phase 3: Sections ✅ DONE
- [x] Navigation (fixed, glassmorphic, scroll progress, mobile hamburger)
- [x] Hero (full viewport, animated entrance, mouse gradient, geometric grid, scroll indicator)
- [x] About (mission, purpose quote, region badges)
- [x] Clients ("Who We Serve" — 3 ideal client types)
- [x] 3 Uniques (differentiator cards with icons)
- [x] Process (5-step vertical timeline, alternating layout)
- [x] Stats (animated counters on scroll)
- [x] Values (editorial alternating layout)
- [x] Guarantee (two trust cards)
- [x] CTA (conversion section with pulse-glow)
- [x] Footer (gradient bar, links, copyright)

### Phase 4: Polish ✅ DONE
- [x] Responsive design (mobile hamburger, responsive typography with clamp())
- [x] Visual effects (frost noise, topographic, film grain, geometric grid)
- [x] Animation system (staggered reveals, fox easing, scroll-triggered)
- [x] Production build test (passes clean)
- [x] All commits pushed to GitHub

## Next Steps (Future Improvements)
- [ ] Add actual case study content when available
- [ ] Add HighLevel booking link to CTA buttons (replace mailto)
- [ ] Add real client testimonials
- [ ] Deploy to Vercel or similar
- [ ] Add Estonian language version
- [ ] Add blog/content section
- [ ] Connect contact form to actual backend
