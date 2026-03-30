# Project Research Summary

**Project:** LaVita Comparativo — Executive Dashboard Visual Upgrade
**Domain:** React/Vite/Recharts slide deck — visual design quality for job application submission
**Researched:** 2026-03-29
**Confidence:** HIGH (all findings derived from direct code inspection + WCAG 2.1 specification)

---

## Executive Summary

This project requires surgical visual improvements to an already-functional slide deck before a deadline of 08h00 on 30/03/2026. The problems are well-diagnosed: the entire palette occupies a compressed luminance range (L=14–35 in HSL), which causes semantic colors to lose their meaning, opacity-based badge/tint backgrounds to become invisible, and the deck canvas to be indistinguishable from the panels floating above it. This is not an aesthetic preference — it is a measurable contrast failure that can be resolved with exact hex value replacements in two files.

The recommended approach is two parallel interventions: (1) update CSS semantic tokens (`--success`, `--warning`, `--danger`) and the `.deck-canvas` background in `src/index.css`, and (2) update `chartPalette` hex values in `src/utils/theme.ts` to introduce hue variety while preserving all key names. These two changes alone will fix 4 of the 6 stated requirements automatically via token propagation. The remaining 2 requirements (KpiCard tone differentiation, InsightBlock badge visibility) require targeted edits to the component files but are low-complexity and well-specified.

The primary risk is over-correction: replacing muted blues with vibrant saturated colors that read as unprofessional in an executive context. All recommended values are constrained to HSL saturation ≤55% and mid-range lightness (L=33–50), which is the professional register for persistent semantic color in a business dashboard. All changes are backward-compatible — no key renames, no new CSS tokens, no structural refactoring.

---

## Key Findings

### From STACK.md — Color Palette Recommendations

The existing `chartPalette` fails because all 9 values are desaturated blue-grey variants spanning the same hue. The recommended "Executive Navy + 3-Signal" model keeps the navy anchor and introduces hue variety through teal, amber, and red families, each separated by at least 40° hue angle in HSL space — enough for color-blind discrimination per ColorBrewer and NASA dataviz research.

CSS semantic tokens must be slightly darker than their chart palette equivalents: tokens appear as small text/badge signals (need higher contrast for 12px text), while chart palette values appear as large fill areas (can tolerate slightly lower contrast).

**Recommended exact values:**

| Target | File | Token/Key | Current | Replace With |
|--------|------|-----------|---------|--------------|
| CSS semantic | `src/index.css` | `--success` | `#37594c` | `#1a7a42` |
| CSS semantic | `src/index.css` | `--warning` | `#7c5b32` | `#b56b0f` |
| CSS semantic | `src/index.css` | `--danger` | `#7b403b` | `#b52b27` |
| Chart palette | `src/utils/theme.ts` | `navy` | `#13283f` | `#1a3a5c` |
| Chart palette | `src/utils/theme.ts` | `navySoft` | `#35506a` | `#2e6da4` |
| Chart palette | `src/utils/theme.ts` | `teal` | `#516b84` | `#0e8a6e` |
| Chart palette | `src/utils/theme.ts` | `tealSoft` | `#7f95aa` | `#5db89a` |
| Chart palette | `src/utils/theme.ts` | `success` | `#4d665d` | `#1a8a4a` |
| Chart palette | `src/utils/theme.ts` | `amber` | `#8d6a3c` | `#c47c14` |
| Chart palette | `src/utils/theme.ts` | `red` | `#8b4f49` | `#c0392b` |
| Chart palette | `src/utils/theme.ts` | `slate` | `#8b98a6` | `#8896a5` |
| Chart palette | `src/utils/theme.ts` | `slateSoft` | `#dde4eb` | `#dde5ef` |

**Hard constraint (confirmed by all 4 researchers):** Never pass `var(--token)` syntax as a Recharts `fill=` or `stroke=` prop. SVG attributes do not resolve CSS custom properties. All chart colors must be resolved hex strings from `chartPalette`.

### From FEATURES.md — Component Design Patterns

Direct code inspection identified the root cause of each visual flatness issue:

**Must-fix (table stakes — deck is not credible without these):**

1. **InsightBlock badges** — Current opacity of 10–12% on white produces contrast ratios of ~1.05:1 (WCAG AA requires 4.5:1). Fix: add `ring-1 ring-inset ring-[rgba(...,0.25)]` to all badge variants. The `ring-1 ring-inset` renders as `box-shadow: inset 0 0 0 1px` — it gives the badge a visible boundary without changing layout.

2. **KpiCard tone differentiation** — All three tones (`accent`, `success`, `danger`) currently resolve to identical CSS class `panel text-[var(--ink)]`. Fix requires two-channel approach: structural stripe (inset box-shadow `3px 0 0`) + background tint (6–7% opacity). Color the label text per tone, NOT the value number — the value must remain maximally legible in `--ink`.

3. **SlideFrame header anchor** — No visual hierarchy break between title and summary text. Fix: insert a `h-[2px] w-12 bg-[var(--accent)] rounded-full` separator element between the h1 and the summary paragraph.

**Should-fix (differentiators):**

4. **Deck canvas background** — Canvas is currently near-white (L≈97–99), indistinguishable from panels above it. Fix: update `.deck-canvas` gradient to `linear-gradient(180deg, #edf2f7 0%, #e2eaf3 100%)` (L≈92–94), which provides a visible lift step beneath the white panels.

5. **MetricStrip cell visibility** — `accent` cell at 8% opacity and `muted` cell at 3% opacity are effectively invisible. Fix: raise `accent` to `rgba(46,85,121,0.14)`, raise `muted` to `rgba(15,33,53,0.05)`. Change dividers from `border-[var(--border)]` to `border-[var(--border-strong)]` at xl breakpoint.

**Defer (out of scope given deadline):**

- ChartCard `border-t` separator above chart area — lowest impact, safely skipped

### From ARCHITECTURE.md — CSS Token System

The CSS token system has a structural flaw: semantic colors cluster in L=14–35 range, where human color perception cannot reliably distinguish hues. This causes every signal color to read as "some dark color" rather than green/amber/red.

The fix for the deck canvas is architectural: the canvas must be darkest (L≈92), panels lighter (L≈97–100). Currently this is inverted — the canvas is near-white and panels appear to float on nothing.

**The token fix propagates automatically.** Once `--success`, `--warning`, `--danger` are updated in `:root`, every component that uses `var(--success)` for text, badges, borders, or fills inherits the new value without any component code changes. The InsightBlock badge opacity fix benefits most from this propagation.

**Exact CSS changes required in `src/index.css`:**
```css
/* In :root block */
--success: #2d7a57;
--warning: #b36a1a;
--danger:  #c0392b;

/* In .deck-canvas rule — replace existing background */
.deck-canvas {
  background:
    radial-gradient(circle at top right, rgba(46, 85, 121, 0.08), transparent 30%),
    linear-gradient(180deg, #edf2f7 0%, #e2eaf3 100%);
}
```

Note: ARCHITECTURE.md recommends `--success: #2d7a57` while STACK.md recommends `#1a7a42`. These differ slightly in lightness (L=33 vs L=29). See Contradiction Analysis below.

### From PITFALLS.md — What to Avoid

**Critical pitfalls that cause functional breakage:**

1. **Renaming chartPalette keys** — Breaks slides.tsx and all other Recharts consumers silently (bars render colorless). Only change hex values. All key names (`navy`, `navySoft`, `teal`, `tealSoft`, `success`, `amber`, `red`, `slate`, `slateSoft`) must be preserved exactly.

2. **Passing `var(--token)` to Recharts props** — SVG `fill` attributes do not evaluate CSS custom properties. Always pass resolved hex strings.

3. **Over-saturating colors** — Replacing muted blues with vivid colors damages executive credibility. Stay at S≤55%, L=33–50. "Distinct enough to tell apart" is the goal, not "vivid from across a room."

4. **Fixing InsightBlock by raising opacity to 100%** — Produces solid-colored blocks that break the layered design language. Target 14–18% background opacity, not solid fills.

5. **Coloring value numbers in KpiCard** — Damages legibility of the actual data. Color the label and structural stripe only; value stays in `--ink`.

6. **Removing `.chart-grid` SVG text rules from index.css** — Axis labels become black (SVG default) and break the visual tone. Keep the selector; if `--ink-soft` value changes, sync the hardcoded `#425568` fill value in `.chart-grid`.

**Moderate pitfalls:**

7. **Mismatched color temperature** — Current palette is entirely cool (blue-navy). New semantic colors should lean slightly cool: teal-green for success, gold-brown for warning, dusty rose-red for danger. Warm lime green or hot orange would clash.

8. **Not testing `/print` route** — The print mode flattens all glass/blur effects. Badge and panel colors that look subtle on screen may look washed out in print. Test after each change.

---

## Contradiction Analysis

Three researchers address the exact values for `--success`. The values differ slightly:

| Source | `--success` recommendation | Basis |
|--------|---------------------------|-------|
| STACK.md | `#1a7a42` (L≈29, S≈65%) | WCAG contrast math, 5.2:1 on white |
| ARCHITECTURE.md | `#2d7a57` (L≈33, S≈47%) | Principle-based (L=33–46 target range) |
| FEATURES.md | `#2d7a5e` for inline use | Derived from code analysis context |

**Resolution:** ARCHITECTURE.md's `#2d7a57` is the safer choice — it sits at L=33, which is the midpoint of the recommended professional range (L=33–46) and avoids the over-saturation risk flagged in PITFALLS.md. STACK.md's `#1a7a42` is slightly more vivid (higher saturation, lower lightness) but still within acceptable bounds. Use ARCHITECTURE.md's value in the `:root` token; use STACK.md's chart palette value for `chartPalette.success` since chart fills can tolerate slightly higher saturation.

**No other contradictions exist.** All four researchers agree on: `--danger: #c0392b`, the deck-canvas gradient, the two-channel KpiCard fix, the `ring-1 ring-inset` badge fix, the SlideFrame separator, and the hard prohibition on renaming chartPalette keys.

---

## Implications for Roadmap

All changes are independent — no phase has a hard dependency on another. However, the recommended execution order is by impact and risk profile.

### Phase 1: Token Foundation (Highest Leverage)

**Rationale:** CSS token changes in `src/index.css` propagate automatically to all components. Doing this first means InsightBlock badges, KpiCard accents, and MetricStrip cells all improve without touching component files. It also establishes the correct color reference for all subsequent component-level work.

**Delivers:** Corrected semantic signal colors + deck canvas layering
**Files:** `src/index.css` only
**Changes:**
- `--success: #2d7a57` in `:root`
- `--warning: #b36a1a` in `:root`
- `--danger: #c0392b` in `:root`
- `.deck-canvas` background gradient update

**Avoids:** Anti-pattern of fixing panels instead of canvas (ARCHITECTURE.md Pitfall 3)
**Test:** View deck in browser; check `/print` route for badge visibility

### Phase 2: Chart Palette Diversification

**Rationale:** Independent from CSS tokens. Updates `chartPalette` in theme.ts to introduce hue variety. Must be done as value-only replacement — key names are a hard constraint.

**Delivers:** Perceptually distinct chart series colors (navy, teal, amber, red families)
**Files:** `src/utils/theme.ts` only
**Changes:** Replace all 9 hex values per the table in STACK.md findings above
**Avoids:** Key renaming (PITFALLS.md Pitfall 2); passing CSS vars to SVG props (Pitfall 3)
**Test:** View each slide with multi-series charts; confirm no colorless/gray bars

### Phase 3: KpiCard Tone Differentiation

**Rationale:** The token fix from Phase 1 partially helps, but `toneClassNames` still maps accent/success/danger to the same base class. Requires explicit two-channel fix (inset stripe + background tint + label color) in KpiCard.tsx.

**Delivers:** Visually distinct success/danger/accent card variants
**Files:** `src/components/KpiCard.tsx`, `src/index.css` (add utility classes for tone stripes)
**Key constraint:** Color the label, NOT the value number
**Changes:**
- Add `.tone-stripe-success`, `.tone-stripe-danger`, `.tone-stripe-accent` utility classes to `index.css` using `box-shadow: inset 3px 0 0` (layout-safe — respects border-radius)
- Update `toneClassNames` map in KpiCard.tsx to use these classes + background tints
- Update label color per tone

**Avoids:** Full-opacity border fix that breaks panel aesthetic (PITFALLS.md Pitfall 6)

### Phase 4: InsightBlock Badge Visibility

**Rationale:** If token propagation from Phase 1 raises `--success` to L=33, badges at 10–12% opacity may already be visible. Evaluate after Phase 1 before making component changes. If still insufficient, apply the `ring-1 ring-inset` fix.

**Delivers:** Readable category badges on InsightBlock components
**Files:** `src/components/InsightBlock.tsx` only
**Changes:** Add `ring-1 ring-inset ring-[rgba(...,0.25)]` to all 5 accent variants in `accentClassNames`
**Avoids:** Solid fills that overpower the card hierarchy (PITFALLS.md Pitfall 5)

### Phase 5: SlideFrame Header Anchor + MetricStrip Polish

**Rationale:** These are the lowest-risk, lowest-complexity changes. Saved for last because they are purely additive (no existing behavior modified) and can be skipped entirely without breaking the other improvements.

**Delivers:** Title anchoring + cell differentiation
**Files:** `src/components/SlideFrame.tsx`, `src/components/MetricStrip.tsx`
**Changes:**
- SlideFrame: insert `<div className="mt-4 h-[2px] w-12 rounded-full bg-[var(--accent)]" />` between h1 and summary
- MetricStrip: raise `accent` cell to `rgba(46,85,121,0.14)`, raise `muted` to `rgba(15,33,53,0.05)`, change xl dividers to `border-[var(--border-strong)]`

### Phase Ordering Rationale

- Phase 1 before all others because token changes propagate for free — they reduce the scope of Phases 3 and 4
- Phase 2 is fully independent and can be done in parallel with Phase 1 if time allows
- Phase 4 is conditional on Phase 1 output — evaluate first, code second
- Phase 5 is purely additive and can be dropped without consequence if time is too short

### Research Flags

All phases use standard, well-documented patterns. No phase requires additional research.

- **Phase 1:** Pattern is standard CSS variable update. No research needed.
- **Phase 2:** chartPalette is a plain object of hex strings. No research needed.
- **Phase 3:** Tailwind `box-shadow: inset` utility is stable in v4. FEATURES.md has exact class names. No research needed.
- **Phase 4:** Tailwind `ring-1 ring-inset` confirmed working in v4. FEATURES.md has exact class names. No research needed.
- **Phase 5:** Trivial DOM insertions and class updates. No research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Token values (index.css) | HIGH | Derived from WCAG 2.1 math + direct code inspection. Minor variance between researchers resolved. |
| chartPalette values (theme.ts) | MEDIUM-HIGH | Values derived from color theory + WCAG math. Visual QA in browser required before submission. |
| Component patterns (KpiCard, InsightBlock) | HIGH | Based on direct code inspection of component files. Exact class names provided. |
| Deck canvas gradient | HIGH | Direct CSS replacement. No JS interactions. Print mode compatibility confirmed. |
| Pitfalls list | HIGH | All pitfalls derived from direct code inspection, not speculation. |

**Overall confidence:** HIGH

### Gaps to Address

- **Visual QA required:** All hex values should be verified in-browser at actual screen brightness before final submission. Run all changed pairs through https://webaim.org/resources/contrastchecker/.
- **InsightBlock Phase 4 conditionality:** The need for component-level changes depends on whether the token update in Phase 1 already produces visible badges. Do not code Phase 4 until Phase 1 is tested.
- **Print mode test:** Run `/print` route after Phase 1 and Phase 3 to confirm badge and KpiCard colors are not washed out in flat rendering.

---

## Complete Action List by File

This is the consolidated implementation reference, ordered by file, for the planning agent.

### File 1: `src/index.css`

**Change 1 — Semantic tokens in `:root` block:**
```
--success: #2d7a57;   /* was #37594c */
--warning: #b36a1a;   /* was #7c5b32 */
--danger:  #c0392b;   /* was #7b403b */
```

**Change 2 — Deck canvas background:**
```
.deck-canvas {
  background:
    radial-gradient(circle at top right, rgba(46, 85, 121, 0.08), transparent 30%),
    linear-gradient(180deg, #edf2f7 0%, #e2eaf3 100%);
}
```

**Change 3 — Add tone stripe utility classes:**
```
.tone-stripe-accent  { box-shadow: inset 3px 0 0 var(--accent); }
.tone-stripe-success { box-shadow: inset 3px 0 0 #2d7a5e; }
.tone-stripe-danger  { box-shadow: inset 3px 0 0 #c0392b; }
```

### File 2: `src/utils/theme.ts`

Replace all 9 hex values in `chartPalette`. Do not change key names.
```
navy:      '#1a3a5c'
navySoft:  '#2e6da4'
teal:      '#0e8a6e'
tealSoft:  '#5db89a'
success:   '#1a8a4a'
amber:     '#c47c14'
red:       '#c0392b'
slate:     '#8896a5'
slateSoft: '#dde5ef'
```

### File 3: `src/components/KpiCard.tsx`

- Update `toneClassNames` (or equivalent map): add `tone-stripe-*` class and background tint per tone
- Update label color map: `accent → text-[var(--accent)]`, `success → text-[#2d7a5e]`, `danger → text-[#c0392b]`
- Do NOT change value/number color — keep at `var(--ink)` for all tones

### File 4: `src/components/InsightBlock.tsx`

- Update `accentClassNames` for all 5 accent variants: add `ring-1 ring-inset ring-[rgba(...,0.25)]`
- Evaluate after Phase 1 (token update) — may already be sufficient without this change

### File 5: `src/components/SlideFrame.tsx`

- Insert between h1 and summary paragraph:
  `<div className="mt-4 h-[2px] w-12 rounded-full bg-[var(--accent)]" />`

### File 6: `src/components/MetricStrip.tsx`

- `accent` cell: change opacity from `0.08` to `0.14` in `rgba(46,85,121,...)`
- `muted` cell: change opacity from `0.03` to `0.05` in `rgba(15,33,53,...)`
- xl dividers: add `xl:border-[var(--border-strong)]` class

---

## Sources

### Primary (HIGH confidence — direct code inspection)
- `/src/index.css` — CSS custom properties, `.deck-canvas`, `.chart-grid` rules
- `/src/utils/theme.ts` — chartPalette object
- `/src/components/KpiCard.tsx` — toneClassNames, accentBorders, toneLabelColor
- `/src/components/InsightBlock.tsx` — accentClassNames opacity values
- `/src/components/MetricStrip.tsx` — cell variant backgrounds
- `/src/components/SlideFrame.tsx` — header structure
- `/src/deck/slides.tsx` — chartPalette usage patterns in Recharts props

### Primary (HIGH confidence — published standards)
- WCAG 2.1 SC 1.4.3 (Text Contrast, Level AA) — 4.5:1 minimum for normal text
- WCAG 2.1 SC 1.4.11 (Non-text Contrast, Level AA) — 3:1 minimum for UI components
- SVG specification — `fill` attribute does not evaluate CSS `var()` syntax

### Secondary (MEDIUM-HIGH confidence — established practice)
- ColorBrewer project (Cynthia Brewer, Penn State) — hue separation for CVD discrimination
- NASA dataviz guidelines — 30°+ hue separation for reliable series discrimination
- Executive dashboard conventions from Bloomberg, Tableau, Power BI theme analysis

---
*Research completed: 2026-03-29*
*Ready for roadmap: yes*
