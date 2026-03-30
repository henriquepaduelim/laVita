# Requirements: LaVita Comparativo — Design Visual

**Defined:** 2026-03-30
**Core Value:** O design precisa transmitir credibilidade analítica: dados claros, hierarquia visual evidente, gráficos legíveis.

## v1 Requirements

### Token Foundation

- [ ] **TOKEN-01**: CSS semantic tokens `--success`, `--warning`, `--danger` devem ter saturação adequada para sinalização visual (min 4.5:1 contrast ratio para uso em texto)
- [ ] **TOKEN-02**: Background `.deck-canvas` deve ser visivelmente mais escuro que os painéis brancos (diferença mínima L ≥ 5 no HSL)
- [ ] **TOKEN-03**: Nenhum token CSS novo deve ser criado — apenas valores existentes atualizados

### Chart Palette

- [ ] **CHART-01**: `chartPalette` deve conter pelo menos 3 famílias de hue distintas (navy, teal/green, amber, red) separadas por ≥ 40° no HSL
- [ ] **CHART-02**: Todos os nomes de chave em `chartPalette` devem ser preservados (navy, navySoft, teal, tealSoft, success, amber, red, slate, slateSoft)
- [ ] **CHART-03**: Nenhum valor deve usar sintaxe `var(--token)` — apenas hex strings resolvidos
- [ ] **CHART-04**: Todas as cores de chart devem passar WCAG 1.4.11 (3:1 contraste em fundo branco)

### KpiCard Differentiation

- [ ] **KPI-01**: Variantes de tom `accent`, `success`, `danger` devem ser visualmente distintas da variante `default`
- [ ] **KPI-02**: Cada tom deve ter uma "stripe" lateral (inset box-shadow) como âncora visual de cor
- [ ] **KPI-03**: O valor numérico principal do card deve permanecer em `--ink` — não colorir dados
- [ ] **KPI-04**: O label (título) do card pode ser colorido por tom para reforçar a diferenciação

### InsightBlock Badges

- [ ] **BADGE-01**: Badges de categoria (InsightBlock) devem ser legíveis: contraste mínimo 4.5:1 para o texto do badge
- [ ] **BADGE-02**: Fundo dos badges deve ter pelo menos um contorno visual (ring/border) para definir os limites
- [ ] **BADGE-03**: Não usar fills sólidos — manter opacidade baixa (12–18%) para não competir com o conteúdo

### SlideFrame + MetricStrip

- [ ] **FRAME-01**: SlideFrame deve ter um elemento âncora visual entre o h1 e o summary (separador de cor)
- [ ] **STRIP-01**: Células `accent` e `muted` do MetricStrip devem ser visualmente distinguíveis do fundo branco

## v2 Requirements

### Charts

- **CHART-V2-01**: Adicionar tooltips customizados com brand colors para charts Recharts
- **CHART-V2-02**: Adicionar animação de entrada nos valores numéricos dos KpiCards

### Polish

- **POLISH-V2-01**: Dark mode para o deck
- **POLISH-V2-02**: Transições de cor nos hover states dos KpiCards

## Out of Scope

| Feature | Reason |
|---------|--------|
| Mudanças de conteúdo | Escopo é apenas visual |
| Refatoração de componentes | Manter compatibilidade |
| Novos slides | Conteúdo está completo |
| Criação de novos tokens CSS | Risco de quebrar props existentes |
| Renomear chaves do chartPalette | Quebra slides.tsx silenciosamente |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TOKEN-01 | Phase 1 | Pending |
| TOKEN-02 | Phase 1 | Pending |
| TOKEN-03 | Phase 1 | Pending |
| CHART-01 | Phase 2 | Pending |
| CHART-02 | Phase 2 | Pending |
| CHART-03 | Phase 2 | Pending |
| CHART-04 | Phase 2 | Pending |
| KPI-01 | Phase 3 | Pending |
| KPI-02 | Phase 3 | Pending |
| KPI-03 | Phase 3 | Pending |
| KPI-04 | Phase 3 | Pending |
| BADGE-01 | Phase 4 | Pending |
| BADGE-02 | Phase 4 | Pending |
| BADGE-03 | Phase 4 | Pending |
| FRAME-01 | Phase 5 | Pending |
| STRIP-01 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-30*
*Last updated: 2026-03-30 after initial definition*
