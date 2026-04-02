# Auditoria slide a slide e roteiro executivo

Escopo:
- apenas a apresentacao em TypeScript, centrada em `src/deck/slides.tsx`

Base de leitura:
- `src/deck/slides.tsx`
- `src/data/reportData.ts`
- `presentation_assets/source_data/`
- `analysis_output/`
- `relatorio_final_case.md`

## Slide 1 - Capa
- Objetivo do slide: abrir a apresentacao, situar o case e enquadrar o tema em termos executivos.
- Principais numeros/mensagens: `66` redes ativas em 2025; foco em concentracao de receita, perfil de clientes, dimensao por categoria e remuneracao variavel.
- Veredito de consistencia: `coerente`
- Justificativa curta: o texto de abertura esta alinhado com a base tratada em `src/data/reportData.ts` e com a narrativa central do relatorio final.
- Riscos de interpretacao para gerencia: a capa promete uma leitura executiva forte, mas nao explicita ainda as premissas metodologicas que sustentam os numeros.
- Guia executivo: Esta analise compara 2024 e 2025 sobre a base ativa do negocio, destaca a concentracao de faturamento, o perfil dos principais clientes, a leitura por categoria e o efeito de volume, preco e mix no crescimento.
- Fonte principal: `src/deck/slides.tsx`, `src/data/reportData.ts`, `presentation_assets/source_data/s02_quality_snapshot.csv`

## Slide 2 - Concentração de faturamento / Pareto
- Objetivo do slide: provar que a receita de 2025 esta concentrada em poucas redes e justificar priorizacao comercial.
- Principais numeros/mensagens: `10` redes concentram `81,17%` do faturamento de 2025; a rede `GPA` lidera com `R$ 6.891.306,20`; o corte de classe A fica acima do limiar de `80%`.
- Veredito de consistencia: `coerente`
- Justificativa curta: o grafico de barras com acumulado responde bem a pergunta de concentracao e os numeros batem com `presentation_assets/source_data/s03_pareto_chart.csv` e `analysis_output/pareto_network_2025.csv`.
- Riscos de interpretacao para gerencia: a leitura pode virar dependencia excessiva de poucas contas se nao for acompanhada da ressalva de que a cauda longa ainda representa quase `19%` da receita.
- Guia executivo: A carteira nao esta pulverizada; ela depende de um grupo pequeno de redes estrategicas. Isso pede gestao dedicada nas contas A e uso tatico da cauda longa para ampliar cobertura e mix.
- Fonte principal: `src/deck/slides.tsx`, `presentation_assets/source_data/s03_pareto_chart.csv`, `analysis_output/pareto_network_2025.csv`

## Slide 3 - Analise comparativa por cliente
- Objetivo do slide: comparar redes por ticket, volume, sortimento, crescimento e relacao entre preco medio e crescimento.
- Principais numeros/mensagens: `DALBEN` tem o maior ticket medio por loja ativa, em `R$ 183.874,13`; `GPA` lidera volume com `1.668.495` unidades; `DAOLIO` lidera sortimento com `29` SKUs; `ST MARCHE` tem o maior ganho absoluto, `R$ 1.321.707,87`; `M.QUALIDADE` lidera crescimento percentual com `1.525,12%`; correlacao preco x crescimento e `0,0257`.
- Veredito de consistencia: `coerente com ressalvas`
- Justificativa curta: a leitura central e valida, mas o sortimento tem baixo poder discriminatorio no topo, o crescimento percentual precisa ser lido com cautela por causa de bases pequenas e o ultimo insight do slide extrapola o que o grafico realmente mostra.
- Riscos de interpretacao para gerencia: a gerencia pode supervalorizar o `1.525,12%` sem olhar a base baixa de `M.QUALIDADE`; tambem pode interpretar sortimento como diferencial forte quando varios clientes estao perto do teto de `29` SKUs; e a frase sobre "execucao e sortimento" soa mais conclusiva do que a evidencia exibida no scatter.
- Guia executivo: O desempenho varia mais pelo perfil da conta do que pelo tamanho isolado. O cliente que mais cresce em percentual nao e o de maior preco medio, e o maior ganho financeiro vem de outra rede, o que mostra que crescimento relativo e impacto real sao leituras complementares.
- Fonte principal: `src/deck/slides.tsx`, `presentation_assets/source_data/s05_price_vs_growth.csv`, `analysis_output/network_metrics.csv`

## Slide 4 - Analise por dimensao de negocio
- Objetivo do slide: mostrar que a categoria e a melhor dimensao para aprofundar a analise de negocio.
- Principais numeros/mensagens: `SALADAS` lidera receita em 2025 com `R$ 12.587.734,14`; `GOURMET` lidera crescimento percentual com `170,73%`, mas sobre base menor; `TEMPEROS` tem a maior alta de preco em `3,59%`; `IN NATURA` cresce com queda de preco de `-3,72%`; `COUVE` cresce com preco de `-1,12%`.
- Veredito de consistencia: `coerente`
- Justificativa curta: os tres graficos da pagina respondem a perguntas diferentes, mas complementares, e os numeros coincidem com `presentation_assets/source_data/s06_category_*.csv` e `analysis_output/category_metrics.csv`.
- Riscos de interpretacao para gerencia: a frase "cresce com pressao de preco" exige leitura combinada de volume, receita e preco; se a gerencia olhar so o percentual, pode perder a diferenca entre escala e velocidade, especialmente em `GOURMET`, que cresce muito sobre base pequena.
- Guia executivo: A leitura por categoria organiza a discussao de negocio. `SALADAS` sustenta a escala, `GOURMET` lidera em velocidade percentual sobre base menor, `LEGUMES` e `VERSATIL` tambem aceleram, e `IN NATURA` e `COUVE` mostram que expansao de volume nao veio acompanhada de ganho de preco.
- Fonte principal: `src/deck/slides.tsx`, `presentation_assets/source_data/s06_category_revenue.csv`, `presentation_assets/source_data/s06_category_growth.csv`, `presentation_assets/source_data/s06_category_price.csv`

## Slide 5 - YoY I / Visao consolidada
- Objetivo do slide: resumir a mecanica do crescimento de 2025 contra 2024.
- Principais numeros/mensagens: receita sobe `R$ 4.848.092,71` ou `24,04%`; volume sobe `22,89%`; preco medio sobe apenas `0,94%`; sortimento fica em `29` itens, sem variacao.
- Veredito de consistencia: `coerente`
- Justificativa curta: o grafico indexado em base `100` e os cards laterais contam a mesma historia: o crescimento veio quase todo de volume, com contribucao marginal de preco e sem alavanca de mix.
- Riscos de interpretacao para gerencia: "quase todo de volume" e uma inferencia correta, mas ainda e uma inferencia; convem evitar leitura de causalidade absoluta sem mostrar decomposicao formal.
- Guia executivo: 2025 fechou acima de 2024 em receita, mas sem mudanca relevante de sortimento. Em termos executivos, o motor principal foi volume, enquanto preco teve papel secundario.
- Fonte principal: `src/deck/slides.tsx`, `analysis_output/overall_metrics.csv`

## Slide 6 - YoY II / Drivers por rede
- Objetivo do slide: identificar as principais redes que puxaram o crescimento e as que mais tiraram receita.
- Principais numeros/mensagens: `ST MARCHE` gerou `R$ 1.321.707,87` de alta; `OBA` gerou `R$ 602.436,37`; `DALBEN` gerou `R$ 516.836,72`; do lado negativo, `PAGUE MENOS` caiu `R$ 320.461,48` e `VAREJO` caiu `R$ 71.024,35`.
- Veredito de consistencia: `coerente com ressalvas`
- Justificativa curta: o slide esta correto como recorte dos principais drivers, mas a mensagem deve deixar claro que a lista e selecionada e nao uma decomposicao completa de todas as redes ativas.
- Riscos de interpretacao para gerencia: sem a ressalva de corte, a gerencia pode concluir que o grafico mostra toda a distribuicao; alem disso, a ausencia de linha zero explicita reduz a leitura rapida de positivos e negativos.
- Guia executivo: Poucas redes concentram os movimentos mais relevantes de 2025. O foco executivo deve ser proteger os ganhos das contas que aceleraram e tratar as perdas mais materialmente negativas com prioridade comercial.
- Fonte principal: `src/deck/slides.tsx`, `presentation_assets/source_data/s08_drivers_diverging.csv`, `analysis_output/network_metrics.csv`

## Slide 7 - YoY III / Categorias
- Objetivo do slide: mostrar como o crescimento se distribui entre categorias em valor absoluto e em taxa percentual.
- Principais numeros/mensagens: `SALADAS` responde por `R$ 2.814.011,49` de incremento; `LEGUMES` por `R$ 613.460,25`; `VERSATIL` por `R$ 498.408,83`; `GOURMET` lidera crescimento percentual com `170,73%`.
- Veredito de consistencia: `coerente com ressalvas`
- Justificativa curta: os numeros exibidos estao corretos para as categorias ativas, mas a frase "todas as categorias cresceram" e ampla demais porque `SALADA COMPLETA` aparece zerada na base e nao cresce nem cai.
- Riscos de interpretacao para gerencia: o titulo pode induzir a leitura de universalidade. Para defesa executiva, o correto e falar em categorias ativas ou categorias com base comparavel.
- Guia executivo: A mensagem certa e que todas as categorias relevantes e ativas cresceram em 2025, com `SALADAS` sustentando a maior parte do valor e `GOURMET` liderando a velocidade percentual a partir de uma base menor.
- Fonte principal: `src/deck/slides.tsx`, `presentation_assets/source_data/s08_category_impact_table.csv`, `analysis_output/category_metrics.csv`

## Slide 8 - Remuneracao variavel
- Objetivo do slide: propor um modelo de incentivo que remunere crescimento com qualidade comercial.
- Principais numeros/mensagens: composicao do bonus em `40%` volume comparavel, `30%` disciplina de preco, `20%` sortimento e `10%` mix; regra de governanca para separar clientes novos, impor piso de preco e exigir recorrencia em sortimento.
- Veredito de consistencia: `coerente`
- Justificativa curta: a proposta fecha com a narrativa da analise, porque o crescimento de 2025 veio de volume, nao de preco, e o deck usa a versao completa do modelo que esta alinhada ao `relatorio_final_case.md`.
- Riscos de interpretacao para gerencia: existe divergencia secundaria em documentos intermediarios, porque `analysis_output/case_analysis_report.md` registra uma versao 50/30/20. O deck e o relatorio final seguem 40/30/20/10.
- Guia executivo: O incentivo precisa premiar crescimento sem estimular desconto excessivo nem concentracao artificial. O modelo proposto equilibra volume, preco, sortimento e mix para proteger qualidade comercial.
- Fonte principal: `src/deck/slides.tsx`, `relatorio_final_case.md`, `analysis_output/case_analysis_report.md`

## Resumo final
- Pontos solidos: o Pareto responde bem a concentracao; o comparativo por cliente separa impacto absoluto de taxa de crescimento; a leitura por categoria e os slides YoY contam uma historia unica e coerente; a proposta de remuneracao fecha com a analise.
- Ressalvas: `Slide 3` pede cuidado com sortimento e base pequena; `Slide 6` precisa explicitar que mostra principais drivers e nao todas as redes; `Slide 7` precisa qualificar a frase universal sobre categorias.
- O que corrigir antes de apresentar: trocar "todas as categorias" por "categorias ativas/comparaveis" no `Slide 7`; deixar claro no `Slide 6` que o corte e selecao de principais impactos; se a defesa for tecnica, incluir uma nota curta de metodologia ou anexar a base de qualidade para evitar duvidas sobre denominador e criterios de comparacao.
