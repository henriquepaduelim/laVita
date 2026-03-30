# La Vita Executive Report

Website em React + Vite + TypeScript + Tailwind CSS que transforma os CSVs já preparados do case em uma apresentação executiva interativa.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion
- React Router

## Estrutura

- `presentation_assets/source_data`
  CSVs preparados para os principais visuais da apresentação.
- `analysis_output`
  Métricas consolidadas usadas para KPIs e cards complementares.
- `src/components`
  Blocos reutilizáveis como cards, wrappers e navegação.
- `src/sections`
  Seções narrativas da apresentação.
- `src/data`
  Importação e transformação leve dos CSVs em objetos tipados.
- `src/utils`
  Parser CSV, formatação e funções auxiliares.

## Seções da apresentação

- Hero executivo com tese do case
- Resumo executivo
- Metodologia e qualidade dos dados
- Pareto de redes
- Perfil das contas e preço vs. crescimento
- Desempenho por categoria
- Drivers e detratores Year over Year
- Recomendações finais

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

Aplicação padrão em `http://localhost:4173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Importe o projeto na Vercel.
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. O arquivo `vercel.json` já inclui rewrite para suportar a rota principal `/`.

## Fonte dos dados

O front consome diretamente os CSVs locais gerados no pipeline analítico existente. A lógica do estudo não é recalculada no cliente; o frontend apenas:

- importa os arquivos já preparados;
- aplica tipagem e formatação;
- monta gráficos, KPIs e narrativas executivas sobre os resultados disponíveis.

## Observações

- O layout prioriza desktop, mantendo responsividade funcional em mobile.
- O projeto usa Google Fonts para tipografia corporativa.
