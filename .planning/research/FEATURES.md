# Feature Landscape: Visual Component Design

**Domain:** Executive slide deck — React + Tailwind CSS v4 dashboard
**Researched:** 2026-03-29
**Confidence:** HIGH (based on direct code analysis of all five components + design system tokens)

---

## Diagnostic: What Is Currently Broken

Before recommendations, here is what the code analysis reveals as the root causes of flatness.

| Component | Root Cause of Flatness |
|-----------|----------------------|
| KpiCard (accent/success/danger) | `toneClassNames` maps all three to identical `'panel text-[var(--ink)]'` — zero visual differentiation |
| KpiCard (border accents) | Opacity 22% (`rgba(...,0.22)`) on a white background — invisible at normal viewing distance |
| InsightBlock badges | Background opacity 10–12% on a white card — insufficient contrast, badge reads as ghost |
| MetricStrip `accent` cell | `bg-[rgba(46,85,121,0.08)]` — 8% opacity; indistinguishable from transparent at a glance |
| MetricStrip `muted` cell | `bg-[rgba(15,33,53,0.03)]` — 3% opacity; literally invisible |
| SlideFrame header | No visual anchor — title floats without separator, color accent, or weight contrast against the summary |
| ChartCard | No `question` token color that reads as truly distinct from `--accent` at small size |

The palette tokens themselves are the second layer of the problem:
- `--success: #37594c` is a dark muted forest green — low saturation, very low contrast against white surfaces
- `--warning: #7c5b32` is a muted ochre-brown — low saturation
- `--danger: #7b403b` is a muted brick red — low saturation
- All three were designed for subtle use, not semantic signaling. At 12% opacity backgrounds, they produce near-invisible tinting.

---

## 1. KPI Card — Tone Variant Differentiation

### What "tone" must communicate

A viewer scanning five KpiCards in 2 seconds must read: which card is a warning, which is a success, which is the headline number. Color alone is insufficient when saturation is low — tone must be expressed through **at least two simultaneous visual channels**.

### The two-channel rule

| Channel | Examples |
|---------|---------|
| Color fill | Background tint, border hue |
| Structural accent | Left border stripe, top bar, icon dot, label color |

Using only one channel (e.g., just a subtle border) fails on projectors, print, and in peripheral vision. Using two channels makes tone readable even at reduced contrast.

### Recommended per-tone pattern

**`default`** — No changes needed. Clean white panel.

**`brand`** — Already correct. Dark gradient fill + white text = maximum contrast, reads as "headline." Keep.

**`muted`** — Already correct. Slightly grayed surface = "secondary context."

**`accent`** (informational / neutral emphasis)
The problem: currently identical to `default`.
Fix: add a 3px left border stripe in `--accent` color (`#2e5579`) plus a tinted background at ~6%.
```
border-l-[3px] border-l-[var(--accent)] bg-[rgba(46,85,121,0.06)]
```
The stripe provides the structural channel. The tint provides the color channel.

**`success`** (positive outcome — revenue growth, target met)
The problem: `--success: #37594c` is too dark/muted to read as "green" on white.
Fix: use a more saturated inline success tint. Since you cannot add new tokens, apply an explicit color inline:
```
border-l-[3px] border-l-[#2d7a5e] bg-[rgba(45,122,94,0.07)]
```
The label text should shift to the success color: `text-[#2d7a5e]` for the label `<p>`, not the value.
The value stays `text-[var(--ink)]` — the number must be maximally legible.

**`danger`** (negative outcome — churn, decline, risk)
The problem: `--danger: #7b403b` reads as brown, not red-danger.
Fix:
```
border-l-[3px] border-l-[#c0392b] bg-[rgba(192,57,43,0.06)]
```
Label text: `text-[#c0392b]`.

**`success` / `danger` label color logic:**
Change label color, NOT value color. The value must always be maximally readable (`--ink`). Color the label and the structural stripe — this is how Bloomberg Terminal and financial dashboards signal semantic tone without compromising number legibility.

### Implementation pattern

```tsx
// Structural channel: left border stripe
const toneStripe: Record<KpiCardTone, string> = {
  default: '',
  brand:   '',
  muted:   '',
  accent:  'border-l-[3px] border-l-[var(--accent)]',
  success: 'border-l-[3px] border-l-[#2d7a5e]',
  danger:  'border-l-[3px] border-l-[#c0392b]',
};

// Color channel: background tint
const toneBg: Record<KpiCardTone, string> = {
  default: '',
  brand:   '',           // panel-strong already handles this
  muted:   '',           // panel-muted handles this
  accent:  'bg-[rgba(46,85,121,0.06)]',
  success: 'bg-[rgba(45,122,94,0.07)]',
  danger:  'bg-[rgba(192,57,43,0.06)]',
};

// Label color per tone
const toneLabelColor: Record<KpiCardTone, string> = {
  default: 'text-[var(--ink-soft)]',
  brand:   'text-white/70',
  muted:   'text-[var(--ink-soft)]',
  accent:  'text-[var(--accent)]',
  success: 'text-[#2d7a5e]',
  danger:  'text-[#c0392b]',
};
```

Border radius note: left stripe + rounded corners requires careful handling.
Use `rounded-l-none` or reduce left radius to `rounded-l-[4px]` when stripe is active, so the stripe is flush against the edge, not clipped by the border-radius. Alternative: use `box-shadow: inset 3px 0 0 <color>` as a CSS class — this respects border-radius naturally.

```css
/* In index.css, add utility class per tone */
.tone-stripe-accent  { box-shadow: inset 3px 0 0 var(--accent); }
.tone-stripe-success { box-shadow: inset 3px 0 0 #2d7a5e; }
.tone-stripe-danger  { box-shadow: inset 3px 0 0 #c0392b; }
```

This is the cleanest approach — no border-radius collision, works with `compact` mode, works with `panel-strong` overlay.

---

## 2. InsightBlock Badges — Maximum Readability

### Root cause analysis

Current badge background:
- `brand`:   `rgba(15,33,53,0.1)` on `panel-muted` white = contrast ratio ~1.05:1 — invisible
- `success`: `rgba(55,89,76,0.12)` — contrast ratio ~1.06:1 — invisible
- `danger`:  `rgba(123,64,59,0.12)` — contrast ratio ~1.07:1 — invisible

WCAG AA for small text (< 18px) requires 4.5:1. These are failing by a factor of ~4x.

### What makes a badge readable

A badge conveys category in < 100ms — it must be scannable before the content is read. Three techniques work:

1. **Filled background with sufficient opacity** — minimum 18–20% opacity with a dark enough base color, or use a solid light tint with colored text.
2. **Outlined badge** — transparent fill + 1px colored border + colored text. Works well on white surfaces.
3. **Solid colored badge** — saturated fill + white or near-white text. Highest visibility, appropriate for "danger."

### Recommended badge styles per accent

**`brand`** (strategic / context)
```
bg-[rgba(15,33,53,0.10)] text-[var(--brand)] ring-1 ring-inset ring-[rgba(15,33,53,0.20)]
```
The `ring-1 ring-inset` adds a visible outline without changing layout. At opacity 10%, the ring at 20% gives the badge its boundary definition — this is the key fix. Text `--brand` (#0f2135) on white = 15.3:1 contrast. Pass.

**`teal`** (analytical / data context)
```
bg-[rgba(46,85,121,0.10)] text-[var(--accent)] ring-1 ring-inset ring-[rgba(46,85,121,0.25)]
```
`--accent` (#2e5579) on white = 7.4:1. Pass.

**`success`** (positive signal)
Use a more saturated fill than current `--success` token:
```
bg-[rgba(45,122,94,0.12)] text-[#1d6b4a] ring-1 ring-inset ring-[rgba(45,122,94,0.28)]
```
`#1d6b4a` on white = 5.8:1. Pass.

**`danger`** (risk / negative signal)
This one benefits from a solid approach:
```
bg-[rgba(192,57,43,0.11)] text-[#a82416] ring-1 ring-inset ring-[rgba(192,57,43,0.30)]
```
`#a82416` on white = 5.6:1. Pass.

**`amber`** (caution / attention)
Amber text on white is problematic — amber/yellow tones have low luminosity contrast.
Use the text darker than the ring:
```
bg-[rgba(180,120,30,0.10)] text-[#7a4e10] ring-1 ring-inset ring-[rgba(180,120,30,0.28)]
```
`#7a4e10` on white = 7.2:1. Pass.

### Tailwind class pattern (consolidated)

```tsx
const accentClassNames = {
  brand:   'bg-[rgba(15,33,53,0.10)]   text-[var(--brand)]  ring-1 ring-inset ring-[rgba(15,33,53,0.20)]',
  teal:    'bg-[rgba(46,85,121,0.10)]  text-[var(--accent)] ring-1 ring-inset ring-[rgba(46,85,121,0.25)]',
  success: 'bg-[rgba(45,122,94,0.12)]  text-[#1d6b4a]       ring-1 ring-inset ring-[rgba(45,122,94,0.28)]',
  danger:  'bg-[rgba(192,57,43,0.11)]  text-[#a82416]       ring-1 ring-inset ring-[rgba(192,57,43,0.30)]',
  amber:   'bg-[rgba(180,120,30,0.10)] text-[#7a4e10]       ring-1 ring-inset ring-[rgba(180,120,30,0.28)]',
};
```

`ring-1 ring-inset` uses Tailwind's ring utilities which render as `box-shadow: inset 0 0 0 1px <color>` — they do not affect layout, they respect border-radius, and they stack cleanly with existing `box-shadow` on `.panel` (Tailwind's ring is a separate box-shadow layer in the `ring-shadow` CSS variable in v4).

---

## 3. SlideFrame — Visual Anchors in Presentation Headers

### What the current code lacks

The eyebrow → title → summary stack has no visual hierarchy break. On a projector or screenshot, they blur into a single text block. Viewers need a structural cue that says "this is the slide title" distinct from "this is the context."

### Four anchor techniques, ranked by implementation effort

**Technique A: Color-ruled separator (lowest effort, highest impact)**
A 2–3px horizontal rule between title and summary, in `--accent` color, spanning a fixed width (40–60px). This is the "editorial rule" pattern used in annual reports, slide decks (McKinsey, BCG), and premium dashboards.

```tsx
// Add between h1 and summary p:
<div className="mt-4 h-[2px] w-12 rounded-full bg-[var(--accent)]" />
```

A 2px × 48px accent rule is readable at any display size, adds no layout cost, and immediately elevates the header from "plain text block" to "structured section."

**Technique B: Eyebrow + accent left border**
Give the eyebrow container a left accent stripe:
```tsx
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l-[3px] border-l-[var(--accent)] pl-3">
```
This creates the editorial "pull quote" pattern — strong, professional, minimal.

**Technique C: Title weight + ink contrast**
The current title is `font-semibold`. Consider `font-bold` (weight 700) for the h1. In Lexend, the weight jump from 600→700 is visible and adds presence without changing size. This pairs with Technique A.

**Technique D: Subtle background shelf**
Give the header area a slightly distinct background zone:
```tsx
<div className="rounded-xl bg-[rgba(46,85,121,0.035)] px-4 py-3 -mx-4">
  {/* eyebrow + title + separator + summary */}
</div>
```
This is used in Notion, Linear, and Vercel dashboards. It visually "shelves" the header from the content body below.

### Recommended combination

Use Technique A + C together:
- `h-[2px] w-12 bg-[var(--accent)] rounded-full` separator after the h1
- `font-bold` on the h1

Do NOT use Technique B + A together — two structural lines in the same header area creates competition.

### Slide counter styling

Current: `{index + 1} / {total}` in `text-[var(--ink-soft)]`.
Improvement: use a subtle monospaced rendering or widen the tracking. The dot separator (`h-1 w-1 rounded-full bg-[var(--border-strong)]`) is good but the dot is barely visible at `--border-strong` opacity. Change to `bg-[var(--accent)]` — makes the separator feel intentional rather than accidental.

```tsx
<span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-50" />
```

---

## 4. MetricStrip — Premium vs Flat Cells

### Current problems

| Cell type | Background | Reads as |
|-----------|-----------|---------|
| `brand` | `rgba(15,33,53,0.98)` dark gradient | Good — strong dark cell |
| `accent` | `rgba(46,85,121,0.08)` | Barely different from `muted` |
| `muted` | `rgba(15,33,53,0.03)` | Identical to transparent |
| default | `bg-transparent` | Same as outer container |

Three of four states are visually identical. The entire purpose of the strip — to let viewers see at a glance which cell is emphasized — is lost.

### What makes strip cells feel "premium"

Premium data strips (Bloomberg, Datadog, Figma analytics) use two techniques simultaneously:

1. **Cell differentiation through fill contrast, not just color.** The accent cell should be noticeably lighter/tinted, not 8% opacity.
2. **Vertical dividers with visible weight.** The current `border-l border-[var(--border)]` is at ~10% opacity — the dividers between cells are nearly invisible.

### Recommended cell values

**`brand` cell** — Keep the dark gradient. This is correct.
Enhance: add `shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]` to give the dark cell a top highlight — this is the "premium dark panel" technique used in Apple, Vercel, and Linear dark cards.

**`accent` cell** — Raise opacity to 14–16%:
```
bg-[rgba(46,85,121,0.14)]
```
At 14%, the cell is visually distinct from both `muted` and transparent while remaining harmonious.

**`muted` cell** — Raise to 5% and add a top indicator line:
```
bg-[rgba(15,33,53,0.05)]
```
At 3%, this was literally invisible. At 5%, it registers as "slightly different."

**`default` (undefined)** — Keep transparent. The outer container's white gradient provides the surface.

### Divider visibility

Change border opacity in the MetricStrip divider line:
```tsx
// Current
index > 0 ? 'border-t border-[var(--border)] xl:border-t-0 xl:border-l' : ''

// Improved: use border-[var(--border-strong)] for xl dividers
index > 0 ? 'border-t border-[var(--border)] xl:border-t-0 xl:border-l xl:border-[var(--border-strong)]' : ''
```
`--border-strong` is `rgba(16,29,45,0.18)` vs `--border` at `rgba(16,29,45,0.10)`. This is subtle but meaningful — the cell grid becomes legible as a grid rather than a blur.

### Value text size

Current: `text-[2rem]` — appropriate. Do not reduce.

For the `brand` cell specifically: consider adding a subtle numeric highlight using letter-spacing tightening:
```tsx
className={`font-display mt-4 text-[2rem] font-semibold tracking-[-0.02em] ...`}
// vs current: tracking-tight which = -0.025em — already good
```

The `brand` cell value can also be slightly larger to reinforce emphasis:
```tsx
// brand cell only
className="font-display mt-4 text-[2.15rem] font-semibold tracking-tight text-white"
```

---

## 5. ChartCard — Supporting Improvements

ChartCard has fewer problems than the other components. Two targeted improvements:

### Question label color

Current: `text-[var(--accent)]` — this is correct for a question eyebrow. However `--accent` (#2e5579) at `text-xs` (12px) on a white background is a low-contrast label. Either increase to `text-[0.7rem]` with extra tracking, or use a slightly more saturated accent:

```tsx
// Option: bold + slightly tighter
<p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
```

Font-weight 600 → 700 at this size makes the label land with more presence.

### Chart wrapper visual separation

The `chart-grid` div that contains Recharts output has no top separator. On dense slides, the chart bleeds visually into the description text. Add a subtle separator:

```tsx
<div className={`chart-grid ${compact ? 'mt-4 pt-4 border-t border-[var(--border)]' : 'mt-6 pt-6 border-t border-[var(--border)]'}`}>
```

This creates a clear "metadata zone" (title + description) vs "chart zone" — the same editorial convention used by FT, WSJ, and Bloomberg chart embeds.

---

## Table Stakes

These are the minimum required for the deck to read as professional.

| Fix | Component | Complexity | Impact |
|-----|-----------|------------|--------|
| `ring-1 ring-inset` on all InsightBlock badges | InsightBlock | Low | HIGH — badges currently invisible |
| `box-shadow: inset 3px 0 0` stripe for success/danger/accent KpiCard | KpiCard | Low | HIGH — tones currently undifferentiated |
| Raise `accent` tone label color to `text-[var(--accent)]` | KpiCard | Trivial | Medium — adds second channel |
| Raise MetricStrip `accent` cell to `rgba(46,85,121,0.14)` | MetricStrip | Trivial | Medium — cell currently invisible |
| Add 2px accent rule separator in SlideFrame header | SlideFrame | Trivial | HIGH — title has no anchor |
| Change eyebrow dot to `bg-[var(--accent)]` in SlideFrame | SlideFrame | Trivial | Low — polish |

## Differentiators (if time allows)

| Fix | Component | Complexity | Impact |
|-----|-----------|------------|--------|
| `inset 0 1px 0 rgba(255,255,255,0.08)` top-highlight on brand cells | MetricStrip | Trivial | Medium — premium dark panel feel |
| `font-bold` on SlideFrame h1 | SlideFrame | Trivial | Low-medium |
| `border-t border-[var(--border)]` separator above chart area | ChartCard | Trivial | Medium |
| Tighter `tracking-[-0.02em]` on brand MetricStrip value | MetricStrip | Trivial | Low |

## Anti-Features (do not do)

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Add new CSS custom properties | Violates project constraint — tokens already defined | Inline rgba() values that approximate what the existing tokens should have been |
| Change `chartPalette` key names | Breaks slides.tsx imports | Change values only |
| Color the value number in KpiCard for success/danger | Damages legibility of the actual data | Color the label and the structural stripe, not the number |
| Use `border-l-4` or wider stripes | Creates layout distortion in compact mode | Use `box-shadow: inset 3px 0 0` which is layout-free |
| Opacity < 0.05 for any background tint | Below rendering threshold on most monitors | Minimum 0.06 for any intentional tint |
| Amber/yellow text on white below 7:1 contrast | Fails WCAG AA at small sizes | Use dark amber `#7a4e10` not light amber |

---

## Feature Dependencies

```
InsightBlock badge fix (ring-1) → independent
KpiCard tone stripe fix → independent
MetricStrip cell opacity fix → independent
SlideFrame separator → independent
ChartCard border-t → independent
```

All five fixes are independent. No sequencing required.

---

## MVP Recommendation

Prioritize in this order (all trivial-to-low complexity, all in 6 files):

1. InsightBlock `accentClassNames` — add `ring-1 ring-inset ring-[rgba(...,0.25)]` to all five variants
2. KpiCard — add `tone-stripe-success/danger/accent` inset shadow utility classes to `index.css`; apply to `toneClassNames` map
3. KpiCard — change accent/success/danger label color in `toneLabelColor`
4. SlideFrame — add `<div className="mt-4 h-[2px] w-12 rounded-full bg-[var(--accent)]" />` between h1 and summary
5. MetricStrip — raise `accent` cell to `rgba(46,85,121,0.14)`, `muted` to `rgba(15,33,53,0.05)`, add `xl:border-[var(--border-strong)]` on dividers

Defer: ChartCard border-t (lowest impact, can be skipped entirely given deadline)

---

## Sources

Analysis based on:
- Direct code inspection of all five component files (KpiCard.tsx, InsightBlock.tsx, MetricStrip.tsx, SlideFrame.tsx, ChartCard.tsx)
- Design system token audit (src/index.css, src/utils/theme.ts)
- Contrast ratio calculations using WCAG 2.1 relative luminance formula
- Tailwind CSS v4 ring utility behavior (box-shadow layer separate from shadow layer, ring-inset support confirmed in v4 docs)
- Confidence: HIGH for all recommendations based on code analysis; MEDIUM for the specific color values (#2d7a5e, #c0392b, #1d6b4a, #a82416) which are calculated to pass WCAG AA but should be visually verified in-browser
