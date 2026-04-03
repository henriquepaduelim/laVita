# Analise do Case La Vita Alimentos

## 1. Escopo e criterio
- Foco da leitura: confiabilidade analitica, correcao numerica e rastreabilidade das decisoes.
- Nao foram produzidos slides; os resultados abaixo traduzem o conteudo que sustentaria a apresentacao.
- Quando o case foi ambiguo, a decisao metodologica foi explicitada junto com o impacto.

## 2. Validacao estrutural das bases
- `base_faturamento.xlsx`: 2 abas, `2024` com 536.056 linhas de fatos e `2025` com 654.996 linhas de fatos.
- Colunas do faturamento: `DATA ENTREGA`, `CLIENTE`, `CD_PRODUTO2`, `QUANTIDADE`, `VENDA`.
- Periodo identificado: 2024 de 2024-01-02 a 2024-12-30; 2025 de 2025-01-02 a 2025-12-31.
- `base_cliente.xlsx`: 2.056 linhas, 271 redes, 2.056 lojas, 117 municipios, 6 estados.
- `base_produtos.xlsx`: 52 linhas, 52 codigos unicos, 8 categorias; apenas 29 SKUs tiveram venda em 2025.
- `base_macro_regiao.xlsx`: 92 linhas, apenas 15 pares distintos, 2 valores distintos em `UF` e 14 macro-regioes distintas. A base nao tem granularidade suficiente para mapear as 117 cidades do cadastro de clientes.

### Granularidade inferida
- O fato comercial esta no nivel `data de entrega x loja x produto`.
- A base nao contem `pedido`, `nota fiscal` ou `id de linha`; portanto, repeticoes nessa chave nao podem ser classificadas automaticamente como duplicidade ou como eventos legitimos no mesmo dia.
- Para evitar inflacao por granularidade, todas as metricas foram consolidadas no nivel analitico necessario antes da comparacao.

## 3. Teste das chaves de juncao
- Faturamento -> clientes: chave `CLIENTE` = `NM_REDUZIDO` com cobertura de 100,00%. Linhas sem correspondencia: 0.
- Faturamento -> produtos: chave `CD_PRODUTO2` = `CODIGO` com cobertura de 100,00%. Linhas sem correspondencia: 1.
- Clientes -> macro-regiao: inviavel de forma deterministica com a estrutura recebida. A coluna `UF` da base de macro-regiao nao discrimina cidade nem loja, e a combinacao `UF + MACRO_REGIAO` aparece repetida em excesso.

### Decisao metodologica
- Analises por cliente foram feitas em nivel de `rede` (`DS_REDE`).
- Analises por loja usam `NM_REDUZIDO` quando necessario para Pareto e cobertura.
- Analises por regiao nao foram usadas para conclusao numerica por falta de chave confiavel.

## 4. Ambiguidades metodologicas do case
- `Cliente` pode significar loja ou rede. Adotei `rede` como cliente de negocio, porque o case cita explicitamente `Rede (cliente)` e pede `ticket medio por loja`, o que pressupoe agrupamento acima da loja.
- `Ticket medio por loja` pode usar lojas cadastradas ou lojas ativas no periodo. Calculei ambos e usei `lojas ativas em 2025` como principal, por refletir o desempenho operacional observado no ano. Impacto: o ticket por lojas cadastradas e sempre menor ou igual e expõe ociosidade/com baixa cobertura.
- `Crescimento` pode ser absoluto ou percentual. Reportei ambos. Para ranking principal de crescimento, usei crescimento percentual apenas entre clientes comparaveis com venda em 2024, para nao deixar contas novas dominarem o ranking com base zero.
- Pareto pode ser por 2025, por base consolidada ou por loja. Adotei 2025 e nivel de rede, por ser a leitura mais aderente ao estado atual do negocio.
- `Preco medio` foi calculado como `VENDA / QUANTIDADE` em base agregada, evitando media simples de precos transacionais.
- O cadastro possui 2.056 lojas, mas apenas 385 ficaram ativas em 2025 (18,73%). Isso afeta qualquer leitura de ticket por loja.

## 5. Resposta ao case

### 5.1 Concentração de faturamento (Curva ABC / Pareto)
- Em 2025, 10 redes concentram 81,17% do faturamento total ao criterio Pareto 80/20.
- Isso representa 15,15% das 66 redes ativas em 2025.
- Sensibilidade em nivel de loja: 174 lojas concentram 80,16% do faturamento de 2025.
- Top 10 redes no acumulado de 2025:
  - GPA: R$ 6.891.306,20 (27,55%; acumulado 27,55%)
  - OBA: R$ 2.827.616,16 (11,31%; acumulado 38,86%)
  - COVABRA: R$ 2.764.298,44 (11,05%; acumulado 49,91%)
  - SAVEGNAGO: R$ 1.599.039,19 (6,39%; acumulado 56,30%)
  - ST MARCHE: R$ 1.485.000,72 (5,94%; acumulado 62,24%)
  - CARREFOUR: R$ 1.322.112,07 (5,29%; acumulado 67,53%)
  - MAMBO: R$ 1.283.428,32 (5,13%; acumulado 72,66%)
  - ENXUTO: R$ 1.034.334,99 (4,14%; acumulado 76,79%)
  - DALBEN: R$ 551.622,40 (2,21%; acumulado 79,00%)
  - BOA: R$ 542.556,10 (2,17%; acumulado 81,17%)

### 5.2 Analise comparativa por cliente (rede)
- Maior ticket medio por loja ativa em 2025: `DALBEN` com R$ 183.874,13 por loja ativa.
- Maior ticket medio por loja cadastrada em 2025: `DALBEN` com R$ 137.905,60 por loja cadastrada.
- Maior volume em 2025: `GPA` com 1.668.495 itens.
- Maior sortimento em 2025: empate entre `CASA DELIZA`, `CUBATAO`, `DAOLIO`, `PONTO NOVO`, `SAVEGNAGO`, `VAREJO`, todos com 29 SKUs distintos.
- Maior crescimento percentual entre clientes comparaveis (2024 > 0): `M.QUALIDADE` com 1525,12% sobre 2024.
- Maior crescimento absoluto: `ST MARCHE` com aumento de R$ 1.321.707,87 em 2025 vs 2024.
- Redes novas em 2025 com venda e sem base 2024: 14. A maior foi `PALATO` com R$ 56.229,54.
- Cliente com maior preco medio em 2025: `DB` com R$ 4,41 por item.
- O cliente com maior crescimento percentual nao coincide com o maior preco medio: nao. Correlacao entre crescimento percentual e preco medio 2025 entre clientes comparaveis: 0.0257.

#### Top 10 clientes comparaveis por crescimento percentual
- M.QUALIDADE: crescimento 1525,12%; receita 2025 R$ 51.520,59; preco medio 2025 R$ 3,65; sortimento 28.
- DALBEN: crescimento 1485,77%; receita 2025 R$ 551.622,40; preco medio 2025 R$ 3,14; sortimento 28.
- ST MARCHE: crescimento 809,41%; receita 2025 R$ 1.485.000,72; preco medio 2025 R$ 4,06; sortimento 28.
- NOVA MAKIM: crescimento 332,31%; receita 2025 R$ 34.352,30; preco medio 2025 R$ 3,61; sortimento 21.
- STEAK PARK: crescimento 313,40%; receita 2025 R$ 8.748,30; preco medio 2025 R$ 4,34; sortimento 15.
- NATURAL DA TERRA: crescimento 247,81%; receita 2025 R$ 295.421,95; preco medio 2025 R$ 3,44; sortimento 28.
- HIROTA: crescimento 237,96%; receita 2025 R$ 400.419,30; preco medio 2025 R$ 3,16; sortimento 25.
- VITORIA MAX: crescimento 224,57%; receita 2025 R$ 83.082,10; preco medio 2025 R$ 2,57; sortimento 24.
- VILLA REAL: crescimento 122,86%; receita 2025 R$ 62.777,40; preco medio 2025 R$ 3,36; sortimento 28.
- GUARANI: crescimento 120,40%; receita 2025 R$ 4.346,98; preco medio 2025 R$ 3,54; sortimento 21.

### 5.3 Analise direcionada por dimensao de negocio escolhida: categoria
- Escolhi `categoria`, nao `macro-regiao`, porque a juncao produto -> categoria e completa e confiavel, enquanto a base de macro-regiao nao permite segmentacao auditavel.
- Resultado por categoria em 2025 vs 2024:
- SALADAS: receita 2025 R$ 12.587.734,14; YoY 28,79%; volume 2025 3.012.271; preco medio 2025 R$ 4,18; sortimento 7.
- IN NATURA: receita 2025 R$ 5.509.690,59; YoY 5,29%; volume 2025 2.068.787; preco medio 2025 R$ 2,66; sortimento 9.
- COUVE: receita 2025 R$ 2.380.220,49; YoY 8,63%; volume 2025 765.542; preco medio 2025 R$ 3,11; sortimento 1.
- TEMPEROS: receita 2025 R$ 1.564.718,52; YoY 23,11%; volume 2025 672.184; preco medio 2025 R$ 2,33; sortimento 3.
- LEGUMES: receita 2025 R$ 1.537.922,05; YoY 66,36%; volume 2025 352.029; preco medio 2025 R$ 4,37; sortimento 5.
- VERSATIL: receita 2025 R$ 1.173.146,58; YoY 73,87%; volume 2025 428.130; preco medio 2025 R$ 2,74; sortimento 3.
- GOURMET: receita 2025 R$ 257.717,85; YoY 170,73%; volume 2025 62.690; preco medio 2025 R$ 4,11; sortimento 1.
- SALADA COMPLETA: receita 2025 R$ 0,00; YoY n/a; volume 2025 0; preco medio 2025 R$ nan; sortimento 0.

### 5.4 Year over Year (conteudo que sustentaria 3 slides)
#### Slide 1 - Visao geral
- Receita: 2024 = R$ 20.163.057,51; 2025 = R$ 25.011.150,22; variacao = R$ 4.848.092,71 (24,04%).
- Volume: 2024 = 5.990.272; 2025 = 7.361.633; variacao = 1.371.360 (22,89%).
- Preço médio: 2024 = R$ 3,37; 2025 = R$ 3,40; variacao = R$ 0,03 (0,94%).
- Sortimento: 2024 = 29; 2025 = 29; variacao = 0 (0,00%).

#### Slide 2 - Impulsionadores e detratores
- Top 5 redes por incremento absoluto de receita em 2025 vs 2024:
  - ST MARCHE: R$ 1.321.707,87 (809,41%)
  - OBA: R$ 602.436,37 (27,07%)
  - DALBEN: R$ 516.836,72 (1485,77%)
  - GPA: R$ 363.799,39 (5,57%)
  - SAVEGNAGO: R$ 336.263,15 (26,63%)
- Top 5 redes detratoras por queda absoluta de receita em 2025 vs 2024:
  - PAGUE MENOS: R$ -320.461,48 (-80,50%)
  - VAREJO: R$ -71.024,35 (-64,95%)
  - DB: R$ -69.176,91 (-59,34%)
  - H.FARTURA: R$ -40.090,27 (-9,19%)
  - OUTRAS REGIOES: R$ -32.654,12 (-100,00%)
- Top 5 categorias impulsionadoras por incremento absoluto de receita:
  - SALADAS: R$ 2.814.011,49 (28,79%)
  - LEGUMES: R$ 613.460,25 (66,36%)
  - VERSATIL: R$ 498.408,83 (73,87%)
  - TEMPEROS: R$ 293.710,85 (23,11%)
  - IN NATURA: R$ 276.798,79 (5,29%)
- Nenhuma categoria apresentou queda absoluta de receita em 2025 vs 2024.

#### Slide 3 - Recomendacoes analiticamente sustentadas
- Priorizar expansão nas redes com crescimento acima da média e sortimento abaixo do teto observado de 29 SKUs, porque há espaço de mix sem depender apenas de preço.
- Tratar erosão de preço nas categorias com crescimento de volume, mas queda de receita/price, usando piso por categoria em vez de desconto linear por cliente.
- Separar gestão de contas novas da gestão de contas comparáveis: clientes que entram em 2025 inflacionam leitura de crescimento percentual.
- Monitorar ticket por loja com duas lentes: lojas cadastradas e lojas ativas. Quando a diferença é grande, o problema é cobertura de loja, não necessariamente sell-out.
- Evitar análises geográficas até corrigir a base de macro-região, porque a chave atual não sustenta segmentação confiável.

### 5.5 Proposta de remuneracao variavel
- Objetivo: remunerar crescimento com qualidade, sem premiar ganho de receita por desconto excessivo ou concentracao exagerada em poucos SKUs.
- Estrutura sugerida de score trimestral por carteira:
  - 40% `crescimento de volume`: variacao de quantidade vs mesmo periodo do ano anterior, comparando apenas base ativa/comparavel.
  - 30% `disciplina de preco`: indice de preco realizado (`receita / quantidade`) contra meta por categoria e cliente, com gatilho minimo para impedir erosao de margem/posicionamento.
  - 20% `expansao de sortimento`: evolucao de SKUs distintos por cliente, limitada a SKUs elegiveis para evitar mix artificial.
  - 10% `execucao de mix`: venda recorrente em clientes foco para reduzir concentracao excessiva em poucos itens.
- Regras de governanca:
  - Gate 1: se o indice de preco ficar abaixo do piso, o componente de volume nao paga integralmente.
  - Gate 2: crescimento sobre base zero deve ser medido separadamente de clientes comparaveis, para nao distorcer incentivo.
  - Gate 3: sortimento so pontua se houver recorrencia minima, evitando venda pontual apenas para bater meta.
- Exemplo de formula: `payout = target_bonus * (0,4*score_volume + 0,3*score_preco + 0,2*score_sortimento + 0,1*score_mix)`, com cada score truncado entre 0% e 120%.
- Vantagem tecnica: o modelo usa variaveis observaveis e auditaveis no proprio faturamento, sem depender de julgamento subjetivo.

## 6. Riscos de interpretacao e impacto
- A base de macro-regiao foi considerada inadequada para analise conclusiva. Impacto: qualquer leitura geografica a partir dela teria alto risco de erro de atribuicao.
- A diferenca mediana entre ticket por loja ativa e ticket por loja cadastrada foi de 88,89%. Impacto: rankings mudam se o denominador de lojas nao for explicitado.
- Apenas 18,73% das lojas cadastradas tiveram faturamento em 2025. Impacto: metricas por loja ficam super sensiveis ao conceito de loja elegivel vs loja ativa.
- Das 271 redes cadastradas, apenas 66 tiveram faturamento em 2025. Impacto: concentracao e ticket precisam ser lidos sobre base ativa, nao sobre cadastro total.
- Clientes novos em 2025 nao foram misturados ao ranking principal de crescimento percentual. Impacto: o ranking fica mais justo para comparar desempenho real, e nao apenas entrada de base nova.
- O crescimento foi calculado em ano fechado, porque as duas abas cobrem o calendario completo de 2024 e 2025. Se a empresa quiser usar ano movel ou YTD equivalente, os numeros mudam.
- Preco medio foi calculado por `receita / quantidade` agregada. Uma media simples de precos por linha produziria viés matematico.

## 7. Ferramentas, frameworks, metodos e praticas recomendados
### Stack recomendada
- `Python`: linguagem principal para ETL analitico, validacao e reprodutibilidade.
- `pandas`: integracao das bases pequenas, consolidacao de metricas e tabulacao final.
- `openpyxl` em modo `read_only`: leitura segura de planilhas grandes quando a origem chega em `.xlsx`.
- `DuckDB` (recomendado para a versao evoluida do processo): executar validacoes, joins e agregacoes SQL sobre arquivos locais com mais velocidade e melhor auditabilidade.
- `Pandera` ou `Great Expectations`: validacao formal de schema, chaves, dominios e regras de negocio antes do calculo.
- `Jupyter Notebook` para exploracao inicial e `script .py` para execucao final versionada e reprodutivel.

### Metodos e praticas
- Data profiling antes da analise: cardinalidade, nulos, dominios, cobertura de chave e periodo.
- Definicao formal das metricas antes dos graficos: receita, volume, preco medio, sortimento, ticket e crescimento precisam de formula unica.
- Reconciliacao obrigatoria: total da base tratada deve bater com o total da base bruta apos joins e agregacoes.
- Separacao entre clientes comparaveis e clientes novos nas analises de crescimento.
- Registro explicito das ambiguidades do case e da decisao adotada, para que o numero seja defendivel em discussao executiva.
- Evitar Excel como motor principal da analise em volume acima de 1 milhao de linhas; usar Excel apenas para inspecao rapida ou apresentacao final.

## 8. Arquivos gerados
- `analysis_output/network_metrics.csv`
- `analysis_output/store_metrics.csv`
- `analysis_output/category_metrics.csv`
- `analysis_output/overall_metrics.csv`
- `analysis_output/pareto_network_2025.csv`
- `analysis_output/pareto_store_2025.csv`
- `analysis_output/case_analysis_report.md`