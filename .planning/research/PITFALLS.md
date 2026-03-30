# Domain Pitfalls — Executive Dashboard Visual Redesign

**Domain:** React/Recharts slide deck, job application context
**Researched:** 2026-03-29
**Scope:** Visual-only changes to theme.ts, index.css, KpiCard.tsx, InsightBlock.tsx

---

## Critical Pitfalls

Mistakes that cause a redesign to look worse than the original, or that break functionality.

---

### Pitfall 1: Over-Saturating Colors in a Professional Context

**What goes wrong:** Replacing a muted navy/slate palette with bright, saturated colors (vibrant reds, electric blues, bold greens). The result looks like a startup marketing page — not an executive deck delivered to a hiring manager.

**Why it happens:** The natural instinct when "fixing" a monochromatic palette is to swing toward maximum color differentiation. This is correct in direction but wrong in degree.

**Consequences:** The deck reads as unserious. A hiring manager assessing analytical credibility will discount the content when the presentation looks like it was designed by someone who does not understand executive communication norms.

**Prevention:**
- Keep saturation below 55% (HSL) for any color used at large areas or as a chart fill.
- Muted, desaturated semantic colors are intentional at small-text sizes — they are not a bug. The problem in this project is that --success/#37594c, --warning/#7c5b32, --danger/#7b403b are used as badge fill/text AND as chart fills at larger scale. Increase vibrance moderately (push saturation to ~45-55%), not maximally.
- "Distinct enough to tell apart" is the goal, not "vivid enough to notice from across a room."

**Detection:** If any new color feels "loud" when viewed at full screen, it is too saturated for this context.

---

### Pitfall 2: Breaking chartPalette Key Names

**What goes wrong:** Renaming or removing keys in `chartPalette` (navy, navySoft, teal, tealSoft, success, amber, red, slate, slateSoft) while slides.tsx and possibly other files reference them by name.

**Why it happens:** The temptation is to rename keys to something more descriptive (e.g., "primary", "secondary") when restructuring the palette.

**Consequences:** Runtime error — `chartPalette.navy` returns `undefined`, which Recharts silently treats as no fill, defaulting bars/lines to gray or invisible. This is a functional breakage, not just a visual one.

**Prevention:** Only change the hex VALUES of existing keys. Never rename or delete keys. PROJECT.md explicitly states this constraint:
> "Manter nomes das chaves em chartPalette — Evitar quebrar slides.tsx e outros importadores"

**Detection:** After any change to theme.ts, do a global search for each key name (navy, navySoft, teal, etc.) to confirm every reference still resolves.

---

### Pitfall 3: Recharts Ignores CSS Variables as fill/stroke Props

**What goes wrong:** Passing CSS custom property syntax directly to Recharts chart props — e.g., `fill="var(--success)"` on a `<Bar>` or `<Cell>` — looks valid in JSX but produces no color in the rendered SVG.

**Why it happens:** Recharts renders to SVG, and SVG `fill` attributes do not resolve CSS custom properties (`var(--x)`) the same way HTML elements do. SVG attributes are not CSS properties; the browser does not evaluate `var()` in an SVG `fill` attribute string.

**Consequences:** The element renders with no fill (transparent or default gray). The chart looks broken.

**Prevention:**
- Always pass resolved hex values to Recharts props. This is why theme.ts exports `chartPalette` as a plain object of hex strings — that is the correct pattern already in use.
- If semantic meaning is needed, resolve the mapping in JavaScript before passing to the chart: `const barColor = isPositive ? chartPalette.success : chartPalette.red`.
- Never use `var(--token)` directly in `fill=`, `stroke=`, `color=` props on any Recharts component.

**Detection:** If a chart element appears gray or colorless after a color change, check whether a CSS variable was passed directly as a prop value.

---

### Pitfall 4: CSS Custom Properties on SVG Text Elements

**What goes wrong:** The `.chart-grid` CSS rules in index.css correctly set `fill: #425568` on `.recharts-text` and `.recharts-cartesian-axis-tick-value`. If those rules are removed or the selector changes, chart axis labels will inherit the SVG default (black, or the Recharts internal default) and stop matching the deck's text tone.

**Consequences:** Chart labels become noticeably darker or inconsistent with the surrounding UI text. Looks like a broken style.

**Prevention:**
- Do not remove the `.chart-grid` selector block from index.css.
- The current value `#425568` is appropriate — it matches the approximate visual weight of `--ink-soft` (#44586b) in SVG context. These values should stay synchronized if either is changed.
- If you update `--ink-soft`, also update the hardcoded `#425568` in `.chart-grid` to match.

**Detection:** Look at axis tick labels and legend text after any change — they should be medium-gray, not black, not invisible.

---

### Pitfall 5: InsightBlock Badges Are Currently Nearly Invisible — Wrong Fix

**What goes wrong:** The badge opacity problem (10-12% background opacity) is diagnosed correctly in PROJECT.md. The wrong fix is raising the `bg-opacity` to 100%, which produces solid-colored blocks that look harsh and break the card's visual hierarchy.

**Why it happens:** The badge background at `rgba(15,33,53,0.1)` is nearly invisible against a white panel. The text color (e.g., `var(--brand)` = #0f2135) may also have insufficient contrast against a near-white badge background.

**Correct fix:** Raise background opacity to approximately 12-18% AND ensure the text color on that badge has at least 4.5:1 contrast ratio against the badge background. For the brand accent (#0f2135 on rgba(15,33,53,0.14) ~ #e8ecf0 effective), the contrast is adequate. The visual fix is increasing opacity, not changing the color scheme.

**Wrong fix:** Switching badge background to a fully saturated color with white text — this overwrites the subtle, layered design language the rest of the deck uses.

**Prevention:** Test badge visibility by viewing at actual screen brightness, not zoomed-in dev tools. The fix must make the badge readable without making it the loudest element on the slide.

---

### Pitfall 6: KpiCard Tones Are Structurally Hollow — Adding Color in the Wrong Place

**What goes wrong:** Looking at KpiCard.tsx, tones `accent`, `success`, and `danger` all resolve to the same CSS class: `panel text-[var(--ink)]`. The accentBorders map gives them slightly different border colors, but those borders are nearly invisible at 0.22 opacity.

**Consequence if misdiagnosed:** Attempting to fix this by changing the border opacity to 1.0 gives a harsh, thick-bordered card look that breaks the panel aesthetic.

**Correct approach:** The tone differentiation should live in the value text color and a very subtle background tint — not in a heavy border. For `success`, tint the value text with `--success`. For `danger`, tint the value text with `--danger`. For `accent`, tint with `--accent`. This is a surgical text-color change per tone, not a structural change.

**What NOT to change:** The `panel` class background and shadow system — this is the visual foundation of the deck. Do not add new panel variant classes; work within the existing `tone` prop routing.

---

## Moderate Pitfalls

---

### Pitfall 7: Inconsistent Color Temperature Across the Palette

**What goes wrong:** Replacing individual colors piecemeal with hues that have different color temperature. The current palette is entirely cool (blue-navy-slate). Introducing a warm green (lime) or a warm amber that clashes with the cool base will make the deck feel incoherent.

**Prevention:** Any new semantic colors (success, warning, danger) should be desaturated and lean slightly cool: a teal-green for success, a gold-brown for warning, a dusty rose-red for danger. The current tokens are close to correct in temperature — they just need more luminance/saturation to be readable.

---

### Pitfall 8: Changing Colors That Work for Print Mode

**What goes wrong:** The `/print` route disables backdrop-filter and box-shadow (see index.css .print-mode rules). Colors that look correct on screen with the blurred glass panel effect may look washed out in print mode, where the panels are rendered flat.

**Prevention:** After any color change, test the `/print` route. Particularly check:
- InsightBlock badges (colored backgrounds become more prominent without glass effect)
- panel-muted backgrounds (rgba(255,255,255,0.46) effectively becomes white in print — ensure text has sufficient contrast against white, not just against the blurred canvas)

---

### Pitfall 9: Misreading Recharts Tooltip Colors

**What goes wrong:** Tooltip dot colors in Recharts are controlled by the `fill` prop of the data series (Bar, Line, Scatter), not by CSS. If you change chart colors only via CSS and not via chartPalette values passed as props, the tooltip indicators will show old colors while the chart elements show new colors.

**Prevention:** All color changes to chart elements must go through `chartPalette` in theme.ts. CSS class overrides for chart elements (like `.chart-grid`) are only for structural elements (grid lines, axis text) — not for data series colors.

---

## Minor Pitfalls

---

### Pitfall 10: Changing Font Weights in Display Numbers

**What goes wrong:** KpiCard and CoverSlide use `font-semibold` (600) for large metric values. Changing this to `font-bold` (700) with Lexend creates noticeably wider characters that may cause layout overflow on narrower breakpoints.

**Prevention:** Do not change font-weight on display-size numbers as part of a visual refresh. This is not a color change — it affects layout.

---

### Pitfall 11: Removing `text-white/78` and `text-white/62` Opacity on panel-strong

**What goes wrong:** The CoverSlide and KpiCard `brand` tone use opacity-reduced white for secondary text (`text-white/78`, `text-white/62`). These opacity levels create text hierarchy inside a dark panel. Replacing them with full white for "better contrast" collapses the hierarchy — everything reads at the same weight.

**Prevention:** On dark (`panel-strong`) panels, text hierarchy is achieved through opacity, not through gray shades. `text-white/70` for labels, `text-white` for values, `text-white/62` for notes is the correct structure. Leave it unchanged.

---

## Phase-Specific Warnings for This Project

| Change Target | Likely Pitfall | Mitigation |
|---|---|---|
| `chartPalette` hex values in theme.ts | Key names broken; CSS var passed to SVG prop | Only change hex strings; keep keys identical |
| `--success` / `--warning` / `--danger` tokens | Too vibrant for context; mismatched temperature | Stay in 40-55% HSL saturation range, cool temperature |
| InsightBlock badge opacity | Over-corrected to fully solid badges | 14-20% opacity background is enough |
| KpiCard tone differentiation | Border-heavy fixes clash with panel system | Target value text color, not container background |
| `.chart-grid` SVG text rules | Axis labels become black or disappear | Keep the selector; sync fill value with --ink-soft |
| Any color touching print mode | Washed out on flat print | Test /print route after every change |

---

## Contrast Reference (WCAG 2.1)

These are the minimums. For executive material, aim above the minimum.

| Use Case | Minimum Ratio | Recommended |
|---|---|---|
| Body text on white | 4.5:1 | 7:1 |
| Large text / display numbers (18px+ bold) | 3:1 | 4.5:1 |
| UI component boundaries / chart bars | 3:1 | 4.5:1 |
| Chart axis labels (small, ~12px) | 4.5:1 | 7:1 |
| Badge text on tinted background | 4.5:1 | 7:1 |

**Current token check (approximate):**

| Token | Value | On white bg | Status |
|---|---|---|---|
| --ink (#0f1b2a) | very dark navy | ~17:1 | Pass |
| --ink-soft (#44586b) | medium slate | ~6.5:1 | Pass |
| --success (#37594c) | dark teal-green | ~5.8:1 | Pass (borderline for badge text) |
| --warning (#7c5b32) | dark amber-brown | ~4.7:1 | Pass (borderline) |
| --danger (#7b403b) | dark dusty red | ~4.8:1 | Pass (borderline) |
| chartPalette.slate (#8b98a6) | medium gray | ~2.9:1 | **Fail for text** — use only as fills |
| chartPalette.slateSoft (#dde4eb) | near-white | ~1.3:1 | **Fail for text** — background-only |

The semantic tokens pass at current values for body/badge text. The risk is that increasing their saturation without checking may cause them to fail if luminance drops — verify after changes.

---

## Sources

All findings derived from direct code inspection of:
- `/src/utils/theme.ts` — chartPalette values
- `/src/index.css` — CSS custom properties and .chart-grid SVG rules
- `/src/components/KpiCard.tsx` — toneClassNames mapping
- `/src/components/InsightBlock.tsx` — accentClassNames opacity values
- `/src/deck/slides.tsx` — Recharts usage patterns
- `/.planning/PROJECT.md` — stated constraints and requirements

WCAG 2.1 contrast ratios from W3C specification (Level AA thresholds, published 2018, unchanged in WCAG 2.2).

Recharts SVG/CSS variable behavior: known limitation of SVG attribute rendering — `fill` in SVG attributes is not evaluated as CSS, so `var(--x)` syntax produces no color. This is consistent with SVG specification behavior, not a Recharts bug.

Confidence: HIGH for all code-derived findings (direct observation). HIGH for WCAG thresholds (stable specification). MEDIUM for "over-designed looks worse" judgments (professional convention, not a standard).
