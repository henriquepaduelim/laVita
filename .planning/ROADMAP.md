# Roadmap: LaVita Comparativo — Design Visual

## Overview

The slide deck is functionally complete. This milestone elevates it from a working prototype to a credible executive artifact before the 30/03/2026 08h00 deadline. Five surgical phases address the 6 visual failures identified in the audit: desaturated semantic tokens, near-invisible deck canvas contrast, monochrome chart palette, undifferentiated KpiCard tones, invisible InsightBlock badges, and a missing header anchor in SlideFrame.

Execution order matters: Phase 1 token changes propagate automatically to all downstream components, potentially reducing the scope of Phases 3 and 4. Phase 2 is fully independent. Phase 4 is conditional on Phase 1 output. Phase 5 is a drop-safe polish layer.

## Milestones

- [ ] **Milestone 1: Design Visual Upgrade** — Phases 1-5

## Phases

- [ ] **Phase 1: Token Foundation** — Update semantic CSS tokens and deck canvas background in `src/index.css`
- [ ] **Phase 2: Chart Palette** — Replace all 9 hex values in `chartPalette` with hue-diverse set
- [ ] **Phase 3: KpiCard Differentiation** — Add tone stripe + background tint + label color per variant
- [ ] **Phase 4: InsightBlock Badges** — Add ring-1 ring-inset to badge variants (conditional on Phase 1)
- [ ] **Phase 5: SlideFrame + MetricStrip Polish** — Insert header separator; raise MetricStrip cell opacity (drop if time runs out)

## Phase Details

### Phase 1: Token Foundation
**Goal**: CSS semantic signal colors and deck canvas layering are correct — components that reference `var(--success)`, `var(--warning)`, `var(--danger)` render distinct and legible colors, and the canvas is visibly darker than the white panels floating above it
**Depends on**: Nothing (first phase)
**Requirements**: TOKEN-01, TOKEN-02, TOKEN-03
**Success Criteria** (what must be TRUE):
  1. `--success` renders a clear green (not dark teal) on badge text at 12px — visible contrast against white
  2. `--warning` renders a clear amber-brown — distinct from `--danger` without inspecting code
  3. `--danger` renders a clear red — not the same dark navy tone as current value
  4. The deck canvas background is visibly gray-blue, not white — white panels have a visible lift above the canvas
  5. No new CSS custom properties were introduced — only existing token values were updated
**Plans**: TBD
**UI hint**: yes

### Phase 2: Chart Palette
**Goal**: The Recharts chart palette contains at least 3 perceptually distinct hue families — navy, teal/green, amber, and red — so that multi-series charts are readable without a legend
**Depends on**: Nothing (can run in parallel with Phase 1)
**Requirements**: CHART-01, CHART-02, CHART-03, CHART-04
**Success Criteria** (what must be TRUE):
  1. A Pareto or multi-series bar chart shows visibly distinct colors for each series — no two series look like the same dark blue-grey
  2. All 9 chartPalette key names are unchanged: navy, navySoft, teal, tealSoft, success, amber, red, slate, slateSoft
  3. No chartPalette value uses `var(--token)` syntax — all values are resolved hex strings
  4. The amber and red chart colors are distinguishable from the navy anchor on a white background
**Plans**: TBD

### Phase 3: KpiCard Differentiation
**Goal**: KpiCard variants `accent`, `success`, and `danger` are visually distinct from the default card — a viewer can identify tone without reading the label
**Depends on**: Phase 1 (tone stripe colors reference updated tokens; Phase 1 must complete first)
**Requirements**: KPI-01, KPI-02, KPI-03, KPI-04
**Success Criteria** (what must be TRUE):
  1. Each of accent, success, and danger KpiCards has a visible left-edge stripe in the appropriate color
  2. Success and danger cards have a faint background tint that reinforces the tone without dominating the white panel
  3. The label text is colored per tone (accent blue, success green, danger red) — the value number remains in `--ink`
  4. Default cards (no tone) are visually unchanged
**Plans**: TBD
**UI hint**: yes

### Phase 4: InsightBlock Badges
**Goal**: InsightBlock category badges are readable — each badge has a visible boundary and enough contrast that the category text is legible at normal viewing distance
**Depends on**: Phase 1 (evaluate badge visibility after token update before writing code — may already pass)
**Requirements**: BADGE-01, BADGE-02, BADGE-03

**Note — CONDITIONAL:** If Phase 1 token propagation raises badge contrast to ≥4.5:1 for text and adds sufficient boundary definition, this phase may require no changes. Do not write Phase 4 code until Phase 1 is tested in-browser. If badges still fail, apply the `ring-1 ring-inset` fix.

**Success Criteria** (what must be TRUE):
  1. Badge text contrast ≥4.5:1 against badge background — readable without straining
  2. Each badge has a visible boundary (ring/border) defining its edges against the white card background
  3. Badge backgrounds remain semi-transparent (12–18% opacity) — not solid fills
**Plans**: TBD
**UI hint**: yes

### Phase 5: SlideFrame + MetricStrip Polish
**Goal**: SlideFrame title slides have a visual anchor between the h1 and body text; MetricStrip accent and muted cells are distinguishable from plain white cells

**Note — DROP SAFE:** This phase is purely additive — no existing behavior is modified. If the deadline is at risk, skip Phase 5. The deck is credible without it. Execute only after Phases 1-4 are confirmed complete.

**Depends on**: Phase 3 (execute last; purely cosmetic, no token dependencies)
**Requirements**: FRAME-01, STRIP-01
**Success Criteria** (what must be TRUE):
  1. A short accent-colored bar is visible between the h1 and the summary paragraph on title slides
  2. MetricStrip `accent` cells have a noticeably different background from plain white cells
  3. MetricStrip `muted` cells are subtly differentiated — not invisible
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution order:** Phase 1 → Phase 2 (parallel if possible) → Phase 3 → Phase 4 (evaluate first) → Phase 5 (if time allows)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Token Foundation | 0/TBD | Not started | - |
| 2. Chart Palette | 0/TBD | Not started | - |
| 3. KpiCard Differentiation | 0/TBD | Not started | - |
| 4. InsightBlock Badges | 0/TBD | Not started | - |
| 5. SlideFrame + MetricStrip Polish | 0/TBD | Not started | - |

---
*Roadmap created: 2026-03-30*
*Milestone 1: Design Visual Upgrade — deadline 2026-03-30 08h00*
