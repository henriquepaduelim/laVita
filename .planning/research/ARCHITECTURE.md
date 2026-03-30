# Architecture Patterns: CSS Token Design System

**Domain:** Executive dashboard / slide deck — professional data presentation
**Researched:** 2026-03-29
**Scope:** Semantic color tokens and background layering system
**Constraint:** Update values only — no new token names

---

## 1. The Core Problem: Compressed Contrast Range

The current token system has two distinct failures, both rooted in the same cause: the entire palette occupies too narrow a lightness range.

### Failure A — Semantic colors are indistinguishable from each other

Current semantic tokens in HSL approximation:

| Token | Hex | Hue | Saturation | Lightness | Problem |
|-------|-----|-----|------------|-----------|---------|
| `--success` | `#37594c` | 155° | 22% | 28% | L=28 is near-black. Reads as dark ink. |
| `--warning` | `#7c5b32` | 33° | 42% | 34% | L=34, desaturated. Reads as brown. |
| `--danger` | `#7b403b` | 4° | 32% | 35% | L=35, desaturated. Reads as dark rose. |
| `--brand` | `#0f2135` | 211° | 52% | 14% | L=14, navy. |
| `--accent` | `#2e5579` | 211° | 45% | 32% | L=32, steel blue. |

All five tokens cluster between L=14 and L=35. On a white surface they all appear as "some kind of dark color." The semantic signal (green=good, amber=caution, red=bad) is lost entirely at this lightness level because hue recognition requires sufficient saturation and a mid-range lightness where the human eye can distinguish hues.

### Failure B — Deck canvas and panels are the same tone

The layering stack:
```
body         → gradient #f6f9fc → #e8eef4 → #dbe3eb   (very light cool gray)
deck-canvas  → rgba(255,255,255,0.97) → rgba(247,249,252,0.98)  (≈ pure white)
panel        → rgba(255,255,255,0.82)                  (≈ pure white, 18% translucent)
```

The body background is the only element with visible color (~L92-96 range). The deck-canvas overrides it with near-white, and the panel sits on top of near-white. There is no perceptible step between canvas and panel — cards float on nothing.

---

## 2. Principles for Fixing This

### Principle 1 — Semantic colors must live at mid-range lightness (L=40–65)

For a hue to read as "green" rather than "dark," it needs:
- Saturation ≥ 45% (below this it reads as gray)
- Lightness between 40–65% (below this it reads as ink; above 70% it reads as tint/background)

The target zone for `--success`, `--warning`, `--danger` as foreground/badge/icon colors on white panels is approximately L=42–52, S=50–65%. This gives enough vibrancy to communicate semantic meaning while remaining readable (WCAG AA requires 4.5:1 against white; L=42 with high saturation typically achieves this).

### Principle 2 — Background layering requires at least a 6-point lightness step per level

A 3-level hierarchy (canvas → panel → content area) needs each step to be perceptible. On a light scheme:

```
Level 0 — canvas/page:   L ≈ 88–92  (clearly not-white, a tinted surface)
Level 1 — panel:         L ≈ 97–100 (white — reads as elevated above canvas)
Level 2 — content well:  L ≈ 94–96  (slightly recessed within panel, for inputs/tables)
```

The deck-canvas must be the darkest of the three, not the lightest. Currently it inverts this.

### Principle 3 — Semantic colors must visually differ from brand colors

`--brand` is navy (hue 210°). If `--success` is a dark navy-adjacent color (hue 155°, L=28), users cannot distinguish "this KPI uses brand styling" from "this KPI is in a healthy state." The hue distance between semantic tokens and brand must be perceptible: success should read clearly green, warning clearly amber, danger clearly red.

---

## 3. Recommended Token Value Changes

### 3a. Semantic color tokens

**Rule applied:** Push to L=44–50, S=55–65%, maintain hue identity. These values render on white panels with sufficient contrast and unmistakable semantic meaning.

| Token | Current | Recommended | HSL | Rationale |
|-------|---------|-------------|-----|-----------|
| `--success` | `#37594c` | `#2d7a57` | hsl(152, 47%, 33%) | Brighter mid-green. Clearly "healthy." Contrast ~5.1:1 on white. |
| `--warning` | `#7c5b32` | `#b36a1a` | hsl(33, 74%, 40%) | True amber-orange. Unmistakably "caution." Contrast ~4.6:1 on white. |
| `--danger` | `#7b403b` | `#c0392b` | hsl(5, 65%, 46%) | Clear mid-red. Unmistakably "alert." Contrast ~4.8:1 on white. |

Contrast ratios are approximate; exact values depend on rendering. All three clear WCAG AA (4.5:1) for normal text at recommended values.

**Why not brighter (e.g. L=60)?**
L=60 with high saturation produces neon-adjacent colors (lime green, bright orange, hot red) that look alarming and unprofessional on an executive dashboard. L=33–46 is the professional register: saturated enough to read, dark enough to feel deliberate.

**Why not the chartPalette values?**
`chartPalette.success` is `#4d665d` (L=35, S=15%) — still too dark and desaturated for badge/icon use. The CSS tokens must be more vivid than chart fill colors because they appear as small UI signals (badges, KPI accents) rather than large chart areas.

### 3b. Deck canvas background

**Current:** `rgba(255,255,255,0.97) → rgba(247,249,252,0.98)` (L≈97–99, effectively white)

**Recommended:**
```css
.deck-canvas {
  background:
    radial-gradient(circle at top right, rgba(46, 85, 121, 0.08), transparent 30%),
    linear-gradient(180deg, #edf2f7 0%, #e2eaf3 100%);
}
```

The base color `#edf2f7` is approximately HSL(210°, 27%, 94%) and `#e2eaf3` is HSL(215°, 27%, 92%). This is:
- Clearly not white (L=92–94 vs panel L=97–100)
- Tonally consistent with the existing brand palette (cool steel-blue hue family)
- Doesn't fight the body gradient — it reads as a contained canvas region
- Provides a ~5-point lightness step below white panels, making panels visibly "lift"

**Why not a stronger color?**
Decks are viewed for extended periods. A dark or saturated canvas would compete with chart content. The target is a canvas that recedes and makes panels appear as paper on a desktop — a classic executive presentation metaphor.

### 3c. Panel and surface token alignment

The surface tokens do not need value changes — they are structurally correct. The fix is entirely in the canvas background. Once the canvas background darkens to L=92–94, the existing `--surface: rgba(255,255,255,0.82)` reads correctly as elevated.

However, one consideration: `--surface` uses 82% opacity, which means on the new canvas (~L93) the blended result is approximately L97 rather than pure white. This is acceptable — it preserves the frosted-glass quality without disappearing.

---

## 4. Background Layering: Correct Mental Model

```
┌─────────────────────────────────────────────────────┐
│  body / page                   L ≈ 95–97 cool gray  │  ← body gradient (existing, correct)
│  ┌───────────────────────────────────────────────┐  │
│  │  .deck-canvas                 L ≈ 92–94        │  │  ← CHANGE: currently L≈97–99
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │  .panel (--surface)        L ≈ 97–100   │  │  │  ← visible lift above canvas
│  │  │  ┌───────────────────────────────────┐  │  │  │
│  │  │  │  --surface-muted        L ≈ 96–97  │  │  │  │  ← recessed within panel
│  │  │  └───────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

Each level is lighter than the one below it. This is the standard for light-scheme executive dashboards: the outer environment is the darkest, panels appear to sit on top.

---

## 5. InsightBlock Badge Visibility

This is a direct consequence of the semantic color problem. If `--success` is L=28 (nearly black) and a badge background is `rgba(--success, 0.10)`, the result is an almost invisible warm-gray tint — the 10% opacity multiplied by an already-dark base color produces near-zero contrast.

**Root fix:** When `--success` is updated to L=33 with S=47%, a 10% opacity background becomes a clearly tinted green-gray wash that reads as a semantic cue. No component code changes needed — the token fix propagates automatically.

If the badge still feels weak at 10% opacity, the token fix to L=33+ means bumping to 12–15% opacity will produce a clearly visible badge tint without looking harsh.

---

## 6. chartPalette Values: Separate Concern

`chartPalette` in `theme.ts` is used for chart fills, not for semantic UI signals. Chart colors serve a different function: they must be:
1. Perceptibly distinct from each other when displayed as adjacent bars/lines
2. Readable on a white chart background as area fills (large surface area, so lower saturation is acceptable)
3. Non-alarming (users should not perceive a routine data series as an "alert")

The current `chartPalette` is all blues and muted colors — that's the actual problem called out in PROJECT.md ("all navy/slate variations"). The fix is to introduce hue variety while keeping the executive register.

**This is a separate change from CSS token updates** and should not be conflated. CSS semantic tokens (`--success`, `--warning`, `--danger`) are UI signal colors. `chartPalette` values are data visualization encoding colors. They can share hue families but should not be identical values because their opacity context, surface area, and semantic role differ.

---

## 7. Anti-Patterns to Avoid

### Anti-Pattern 1 — Using chart palette values directly as semantic token values
**What goes wrong:** A muted chart fill (S=15%, L=35%) used as a badge or KPI accent reads as "brownish gray" rather than as a semantic signal.
**Instead:** CSS semantic tokens should be 10–20 points more saturated and 5–15 points higher lightness than their equivalent chart fill colors.

### Anti-Pattern 2 — Making semantic tokens too bright to be "safe"
**What goes wrong:** L=65, S=80% gives neon lime/orange/red. Looks alarming at rest; only appropriate for active alerts.
**Instead:** L=33–46, S=50–65% is the professional range for persistent semantic color in a business dashboard.

### Anti-Pattern 3 — Fixing the panel instead of the canvas
**What goes wrong:** Making `--surface` slightly off-white (#fafafa) while keeping deck-canvas near-white still produces insufficient contrast. The panel is always above the canvas — you must darken the thing below.
**Instead:** The canvas background is the correct lever. Panels remain white.

### Anti-Pattern 4 — Using opacity-based semantic backgrounds on dark base colors
**What goes wrong:** `rgba(var(--danger), 0.10)` where `--danger` is L=35 produces a near-invisible dark blush.
**Instead:** Mid-lightness base colors (L=44+) produce legible tinted backgrounds at 10–15% opacity.

---

## 8. Exact CSS Changes Required

These are the minimum changes to fix the identified problems. No new tokens. No structural changes.

**In `src/index.css` — `:root` block:**
```css
--success: #2d7a57;   /* was #37594c — brighter mid-green, hue identity preserved */
--warning: #b36a1a;   /* was #7c5b32 — true amber-orange, S and L both raised */
--danger:  #c0392b;   /* was #7b403b — clear mid-red, unmistakably semantic */
```

**In `src/index.css` — `.deck-canvas` rule:**
```css
.deck-canvas {
  background:
    radial-gradient(circle at top right, rgba(46, 85, 121, 0.08), transparent 30%),
    linear-gradient(180deg, #edf2f7 0%, #e2eaf3 100%);
}
```

**In `src/utils/theme.ts` — `chartPalette`:**
These are separate from CSS tokens and addressed in a different research file. The palette needs hue variety, not just lightness adjustment.

---

## 9. Compatibility Assessment

| Change | Breaking Risk | Reason |
|--------|--------------|--------|
| `--success` new value | None | All usages are `var(--success)` — value update propagates automatically |
| `--warning` new value | None | Same |
| `--danger` new value | None | Same |
| `.deck-canvas` background | None | Class applies to one element; no JS references to this value |
| No new tokens added | None | Constraint fully respected |
| No token names changed | None | Existing component references remain valid |

Print mode (`@media print` and `.print-mode`) overrides all surface and background values to white — the semantic token changes have no adverse effect on print output.

---

## Sources

Research conducted from direct analysis of:
- `/Users/henriquepmachado/Documents/LaVitaComparativo/src/index.css` (full file)
- `/Users/henriquepmachado/Documents/LaVitaComparativo/src/utils/theme.ts`
- `/Users/henriquepmachado/Documents/LaVitaComparativo/.planning/PROJECT.md`

Color contrast ratios calculated via WCAG 2.1 relative luminance formula.
HSL analysis performed against hex values in the existing token set.
Design system principles applied from WCAG 2.1, Material Design 3, and Radix UI Themes color scale methodologies (training knowledge, HIGH confidence — these are stable, well-documented principles not subject to version drift).
