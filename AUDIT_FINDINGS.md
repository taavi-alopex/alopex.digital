# Website Audit Findings & Implementation Plan

**Date:** 2026-03-03
**Audits run:** Copywriting, Page CRO, Marketing Psychology, SEO
**Services section:** Implemented and pushed (commit e530f42)

---

## Top 5 Priorities

| # | Action | Impact | Status |
|---|--------|--------|--------|
| 1 | Add social proof (testimonials, logos, case study) | Critical | TODO |
| 2 | Add Services section | Critical | DONE |
| 3 | Rewrite Hero H1 + meta title with target keywords | High | TODO |
| 4 | Add "GoHighLevel" keyword throughout copy | High | TODO |
| 5 | Add mid-page CTAs (only 2 across 11 sections) | High | TODO |

---

## P1: Add Social Proof

**Problem:** Zero testimonials, zero client logos, zero case studies anywhere on the page. For a premium B2B service, this is the single biggest trust gap.

**Implementation:**

### Option A: Logo bar (quick win)
- Add after Hero or after About section
- Even 3-5 logos help: HighLevel partner badge + regional client logos
- Component: create `LogoBar.tsx`, light section, horizontal scroll on mobile

### Option B: Testimonials (high impact)
- Place after Clients section (validates pain points) and/or before Final CTA
- Minimum: 2-3 short quotes with name, company, photo
- Format: quote card with attribution

### Option C: Mini case study (highest impact)
- One concrete example: "Company X went from [pain] to [outcome] in [timeframe]"
- E.g., "Solarstone reduced lead response time from 48 hours to 12 minutes"
- Place near Stats section to give those numbers context

**Files to modify:**
- New component(s): `LogoBar.tsx`, `Testimonials.tsx`, or `CaseStudy.tsx`
- `messages/en.json`, `et.json`, `pl.json` — add content
- `src/app/[locale]/page.tsx` — add to layout

---

## P3: Rewrite Hero H1 + Meta Title

**Problem:** H1 "Orchestrating Clarity and Flow" is a purpose statement, not a value proposition. A first-time visitor doesn't know what Alopex does. Meta title has zero commercial keywords.

### Hero H1 Options

| Option | Copy | Rationale |
|--------|------|-----------|
| A | "Stop Losing Revenue to Broken Systems" | Pain-led, forces recognition |
| B | "HighLevel Infrastructure That Actually Gets Used" | Ties to adoption unique |
| C | "Your Revenue Operations, Architected and Launched" | Outcome-focused |

### Hero Label
- **Current:** "Digital Solutions That Deliver" (generic)
- **Recommended:** "GoHighLevel & RevOps for Estonia, Poland & CEE"

### Hero Subtitle
- **Current:** "We build advanced HighLevel & RevOps infrastructure for ambitious service businesses across Scandinavia and CEE. No more manual grind."
- **Recommended:** "We map your business process, build your HighLevel infrastructure, and make sure your team actually uses it. No more leads leaking through manual chaos."
- **Note:** Remove "Scandinavia" — not current target market. Use "Estonia, Poland, and CEE"

### Meta Title
- **Current:** "Alopex Digital — Orchestrating Clarity and Flow"
- **Option A:** "GoHighLevel Agency in Estonia & CEE | Alopex Digital"
- **Option B:** "GoHighLevel Implementation & RevOps | Alopex Digital"
- **Option C:** "HighLevel CRM & RevOps Agency — Estonia, Poland, CEE | Alopex Digital"

### Meta Description
- **Current:** "Advanced HighLevel & RevOps infrastructure for sales-led service businesses in Scandinavia and CEE..."
- **Recommended:** "GoHighLevel implementation & RevOps for service businesses in Estonia, Poland, and CEE. We map your process, build your HighLevel infrastructure, and ensure your team uses it. Book a free discovery call."

**Files to modify:**
- `messages/en.json` — hero section + metadata
- `messages/et.json`, `pl.json` — translations
- Keep "Orchestrating Clarity and Flow" as a tagline/decorative element if desired, but not as the H1

---

## P4: Add "GoHighLevel" Keyword

**Problem:** The full brand name "GoHighLevel" never appears on the page. Only "HighLevel" (shortened) is used. Anyone searching for "GoHighLevel agency" or "GoHighLevel implementation" won't find this site.

**Implementation:** Add "GoHighLevel" in at least these locations:
1. Meta title (see P3 above)
2. Meta description (see P3 above)
3. Hero subtitle — at least one mention
4. About section — "GoHighLevel infrastructure" instead of just "HighLevel infrastructure"
5. Services section — already includes it (done)
6. Process section — mention GoHighLevel in step 3 (Architecture Build)

**Target: 5-7 natural mentions** across the page. Don't keyword-stuff — replace existing "HighLevel" references where "GoHighLevel" reads naturally.

**Files to modify:**
- `messages/en.json` — hero, about, process sections
- `messages/et.json`, `pl.json` — same sections

---

## P5: Add Mid-Page CTAs

**Problem:** Only 2 CTA touchpoints (Hero + Final CTA). 7 consecutive sections with no conversion opportunity. Visitors convinced mid-page have nowhere to act.

**Implementation — add CTAs at 3 points:**

### After Clients section
- Inline text CTA: "Recognize your business? Let's talk." → links to #cta
- Light, non-intrusive — text link style, not a full CTA block

### After Process section
- Button CTA: "Start with a Systems Audit"
- This is the natural entry point after seeing the 5-step process
- Can be a small centered block with micro-copy

### After Services section
- Already implemented — "Not sure what fits? Book a free discovery call"

**Implementation approach:**
- Option A: Add CTA elements directly in `Clients.tsx` and `Process.tsx`
- Option B: Create a reusable `InlineCTA.tsx` component and insert between sections in `page.tsx`

**Files to modify:**
- `src/components/Clients.tsx` or new `InlineCTA.tsx`
- `src/components/Process.tsx` or page layout
- `messages/en.json`, `et.json`, `pl.json` — CTA copy

---

## Additional Findings (Medium Priority)

### Clients Section — Add Outcome One-Liners
Each card states the pain but not what Alopex does about it.

| Client Type | Add This Outcome |
|-------------|-----------------|
| High-Ticket Install | "Automated follow-up sequences that close the gap between lead and signed contract." |
| Relationship Pipeline | "CRM workflows that match, nurture, and never let a warm lead slip." |
| Double-Sided Marketplace | "Candidate and client experiences that protect your brand and fill roles faster." |

**Files:** `messages/en.json` (clients.items), `et.json`, `pl.json`

### About Section — Explain "Maaletooja"
- Add parenthetical: `the 'Maaletooja' (market-bringer)`
- Merge P1 and P2 — they overlap (both say "bring US tech to your market" and "map before build")

**Files:** `messages/en.json` (about section), `pl.json` (EN and PL visitors need the explanation)

### Stats Section — Validate or Reframe
- **150+ Happy Clients** — if real, add context ("since 2021"). If not, remove.
- **3x More Leads** — add baseline: "3x more leads within 90 days of launch"
- **85% Time Saved** — specify: "85% less time on manual follow-up"
- **24/7 Automation** — not a stat, it's a feature. Replace with a real metric.

**Files:** `messages/en.json` (stats.items), `et.json`, `pl.json`

### Values Section — Move Out of Conversion Path
Currently sits between Stats and Guarantee, interrupting the "prove it → reduce risk → convert" flow.

**Options:**
- Move Values below the Final CTA section (before Footer)
- Move to a separate /about page when site expands
- At minimum, make it visually lighter

**Files:** `src/app/[locale]/page.tsx` — reorder components

### CTA Micro-Copy
Add under every "Book a Discovery Call" button:
- "30-minute call. No obligation. We'll map where you're losing revenue."

**Files:** `messages/en.json` (hero, cta sections), `et.json`, `pl.json`, relevant components

### Nav CTA Consistency
- Nav says "Book a Call", Hero/CTA say "Book a Discovery Call"
- Standardize to "Book a Discovery Call" everywhere

**Files:** `messages/en.json` (nav.cta), `et.json`, `pl.json`

### Fix "Bridge" Repetition
"The bridge between world-class tech and your market" (About H2) and "we're the bridge between world-class US tech" (Uniques) — same metaphor twice.

**Fix:** Change one. Suggestion: keep it in About, rewrite Uniques #3 description.

**Files:** `messages/en.json` (uniques.items[2].description), `et.json`, `pl.json`

### Process Step 1 — Off-Brand Metaphor
"We understand the problem before we prescribe the cure" — medical metaphor doesn't match the "architect/orchestrate" language.

**Fix:** "We understand the problem before we design the solution."

**Files:** `messages/en.json` (process.steps[0].description), `et.json`, `pl.json`

---

## SEO Implementation Checklist

| # | Task | Priority |
|---|------|----------|
| 1 | Add "GoHighLevel" to copy (5-7 mentions) | Critical |
| 2 | Rewrite meta title with keywords | Critical |
| 3 | Rewrite meta description with keywords + CTA | Critical |
| 4 | Remove/update "Scandinavia" → "Estonia, Poland, CEE" | High |
| 5 | Implement hreflang tags (EN/ET/PL) | High |
| 6 | Add Organization + LocalBusiness schema markup | Medium |
| 7 | Add locale-specific keywords to ET and PL versions | Medium |
| 8 | Generate and submit XML sitemap | Medium |
| 9 | Expand to multi-page: /services, /industries, /case-studies | Strategic |
| 10 | Start blog/resource section for long-tail keywords | Strategic |

### Heading Hierarchy Improvements

| Current H2 | Recommended |
|------------|-------------|
| "The bridge between world-class tech and your market" | "GoHighLevel & RevOps Agency for Estonia, Poland & CEE" |
| "Built for sales-led service businesses" | Keep (good) or "GoHighLevel Solutions for Service Businesses" |
| "Three things we do differently" | "Why Choose Alopex as Your GoHighLevel Partner" |
| "The Systems Orchestration Method" | "Our GoHighLevel Implementation Process" |

---

## Recommended Page Flow (Target State)

```
Navigation (CTA: "Book a Discovery Call")
  ↓
Hero (outcome-focused H1, keyword-rich)
  ↓
Logo Bar / Social Proof ← NEW
  ↓
About (tightened, Maaletooja explained)
  ↓
Clients (pain cards + outcome one-liners)
  ↓
Inline CTA: "Recognize your business?" ← NEW
  ↓
Services (GoHighLevel + Integrations) ← DONE
  ↓
Uniques (trimmed descriptions)
  ↓
Process (5-step timeline)
  ↓
Mid-page CTA: "Start with a Systems Audit" ← NEW
  ↓
Testimonials / Case Study ← NEW
  ↓
Stats (reframed with attribution)
  ↓
Guarantee (risk reversal)
  ↓
Final CTA ("Ready to stop leaking revenue?")
  ↓
Values (brand layer, low pressure)
  ↓
Footer
```

---

## Marketing Psychology Gaps to Address

| Trigger | Status | How to Fix |
|---------|--------|-----------|
| Social Proof | Missing | Add testimonials, logos, case studies |
| Authority | Weak | Add HighLevel partner badge, certifications, track record numbers |
| Reciprocity | Missing | Add free resource (e.g., "7 Revenue Leaks" PDF or Systems Health Check) |
| Loss Aversion | Partial | Thread loss language through more sections, not just Clients + CTA |
| Urgency/Scarcity | Missing | "We take 3-4 new clients per quarter" (only if real) |
| Anchoring | Missing | Add price reference: "avg cost of full-time RevOps hire: €60k/year" |
| Contrast | Partial | Add before/after comparison element |
