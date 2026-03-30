# LaVita Comparativo — Design Visual

## What This Is

Slide deck interativo (React + Vite + Recharts) criado como case para vaga de Analista Comercial Pleno na La Vita Alimentos. Apresenta análise comercial 2024–2025 em formato de deck navegável com gráficos, KPIs e insights executivos. O projeto já está funcional — o objetivo desta iniciativa é elevar a qualidade visual para nível executivo antes da entrega.

## Core Value

O design precisa transmitir credibilidade analítica: dados claros, hierarquia visual evidente, gráficos legíveis. Um slide deck com design pobre desqualifica o conteúdo analítico que ele contém.

## Requirements

### Validated

- ✓ Slide deck navegável com AnimatePresence (framer-motion) — existing
- ✓ Gráficos Recharts (Pareto, Scatter, Bar, Line, ComposedChart) — existing
- ✓ Componentes KpiCard, ChartCard, InsightBlock, MetricStrip, SlideFrame — existing
- ✓ Navegação por teclado (arrow keys) e swipe — existing
- ✓ Rota /print para versão impressa — existing
- ✓ Tokens CSS custom properties (--brand, --accent, --ink, etc.) — existing
- ✓ Fontes Lexend + Source Sans 3 — existing

### Active

- [ ] Paleta de gráficos com cores semanticamente distintas (não só azul-cinza)
- [ ] Fundo deck-canvas com contraste suficiente para os painéis brancos se destacarem
- [ ] Cores semânticas CSS (--success, --warning, --danger) com vibração adequada
- [ ] InsightBlock badges visíveis (opacidade atual 10% — invisível)
- [ ] KpiCard com diferenciação visual por tom (accent, success, danger)
- [ ] SlideFrame com âncora visual no título (separador ou acento de cor)

### Out of Scope

- Mudanças de conteúdo ou dados — apenas visual
- Refatoração de arquitetura ou estrutura de componentes — manter compatibilidade
- Novos slides ou seções — escopo existente está completo
- Responsividade mobile — já funciona, não é prioridade agora

## Context

- Stack: React 18, TypeScript, Vite, Tailwind CSS v4, Recharts, Framer Motion
- Paleta atual: `chartPalette` em `src/utils/theme.ts` — todas as cores são variações de navy/slate (#13283f, #35506a, #516b84, #8b98a6)
- Tokens CSS em `src/index.css` — --success: #37594c, --warning: #7c5b32, --danger: #7b403b (dessaturados)
- Componentes base em `src/components/`: KpiCard, ChartCard, InsightBlock, ChartCard
- Slides em `src/deck/slides.tsx` — importa diretamente de theme.ts para cores dos gráficos
- Deadline de entrega: 30/03/2026 às 08h00

## Constraints

- **Compatibilidade**: Não quebrar importações de `chartPalette` — apenas alterar valores, não as chaves
- **Tokens CSS**: Alterações de `--success`/`--warning`/`--danger` devem usar variáveis já existentes, não criar novas
- **Timeline**: Tudo deve estar pronto antes de 08h00 de 30/03/2026
- **Escopo**: Apenas arquivos visuais — theme.ts, index.css, componentes UI

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Melhorar design antes de entregar | Design pobre desqualifica análise bem feita | — Pending |
| Manter nomes das chaves em chartPalette | Evitar quebrar slides.tsx e outros importadores | — Pending |
| Focar em 6 arquivos específicos | Mudanças atômicas e reversíveis, menor risco | — Pending |

## Evolution

Este documento evolui a cada fase.

**Após cada fase:**
1. Requisitos invalidados? → Mover para Out of Scope com razão
2. Requisitos validados? → Mover para Validated com referência da fase
3. Novos requisitos? → Adicionar em Active
4. Decisões? → Registrar em Key Decisions

---
*Last updated: 2026-03-30 after initialization*
