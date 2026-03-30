# Analise Do Case La Vita

## 1. Decisoes Metodologicas
- Cliente foi tratado como `rede`; loja foi tratada como `NM_REDUZIDO`.
- Pareto e comparativos principais usam `2025` como ano corrente; `2024` entra como base para YoY.
- Ticket medio por loja = faturamento da rede em 2025 / numero de lojas ativas da rede em 2025.
- Preco medio = faturamento total / quantidade total; nao foi usada media simples de preco de linha.
- Crescimento percentual por rede considera apenas redes com base comparavel (`receita 2024 > 0`).
- Macro-regiao nao foi usada como dimensao principal porque a base nao permite ligacao deterministica por loja ou municipio.

## 2. Qualidade Dos Dados
- Linhas consolidadas no faturamento: `1.191.052`.
- Cobertura do join de lojas: `100,0000%`.
- Cobertura do join de produtos: `99,9999%`.
- Faixa temporal 2024: `2024-01-02` a `2024-12-30`; 2025: `2025-01-02` a `2025-12-31`.
- Cadastro de clientes: `2.056` lojas em `271` redes.
- Cadastro de produtos: `52` codigos unicos.
- A base de macro-regiao foi considerada inadequada para analise principal por falta de chave de ligacao confiavel.

## 3. Visao Geral YoY
- Receita 2024: `R$ 20.163.057,51`; 2025: `R$ 25.011.150,22`; variacao `24,04%`.
- Volume 2024: `5.990.273`; 2025: `7.361.633`; variacao `22,89%`.
- Preco medio 2024: `R$ 3,37`; 2025: `R$ 3,40`; variacao `0,94%`.
- Sortimento 2024: `29`; 2025: `29`; variacao `0,00%`.
- Lojas ativas 2024: `346`; 2025: `385`.

## 4. Curva ABC / Pareto
- `10` redes concentram `80%` do faturamento de 2025.
- `GPA`: receita `R$ 6.891.306,20` | acumulado `27,55%`.
- `OBA`: receita `R$ 2.827.616,16` | acumulado `38,86%`.
- `COVABRA`: receita `R$ 2.764.298,44` | acumulado `49,91%`.
- `SAVEGNAGO`: receita `R$ 1.599.039,19` | acumulado `56,30%`.
- `ST MARCHE`: receita `R$ 1.485.000,72` | acumulado `62,24%`.
- `CARREFOUR`: receita `R$ 1.322.112,07` | acumulado `67,53%`.
- `MAMBO`: receita `R$ 1.283.428,32` | acumulado `72,66%`.
- `ENXUTO`: receita `R$ 1.034.334,99` | acumulado `76,79%`.
- `DALBEN`: receita `R$ 551.622,40` | acumulado `79,00%`.
- `BOA`: receita `R$ 542.556,10` | acumulado `81,17%`.

## 5. Analise Comparativa Por Cliente
- Maior ticket medio por loja: `DALBEN` com `R$ 183.874,13`.
- Maior volume de itens em 2025: `GPA` com `1.668.495` unidades.
- Maior sortimento em 2025: `DAOLIO` com `29` SKUs.
- Maior crescimento comparavel em 2025: `M.QUALIDADE` com `1525,12%`.
- Rede com maior preco medio em 2025: `DB` com `R$ 4,41`.
- A rede de maior crescimento foi `M.QUALIDADE` com preco medio de `R$ 3,65`. Mesmo cliente com maior preco medio: `false`.
- Correlacao entre crescimento e preco medio em redes comparaveis: `0,0257`.

## 6. Dimensao Escolhida: Categoria
- Categoria foi escolhida por ter chave completa produto->categoria e menor risco de ambiguidade.
- `SALADAS`: receita 2025 `R$ 12.587.734,14` | crescimento `28,79%` | volume `28,17%` | preco `0,49%`.
- `IN NATURA`: receita 2025 `R$ 5.509.690,59` | crescimento `5,29%` | volume `9,36%` | preco `-3,72%`.
- `COUVE`: receita 2025 `R$ 2.380.220,49` | crescimento `8,63%` | volume `9,86%` | preco `-1,12%`.
- `TEMPEROS`: receita 2025 `R$ 1.564.718,52` | crescimento `23,11%` | volume `18,85%` | preco `3,59%`.
- `LEGUMES`: receita 2025 `R$ 1.537.922,05` | crescimento `66,36%` | volume `65,55%` | preco `0,49%`.
- `VERSATIL`: receita 2025 `R$ 1.173.146,58` | crescimento `73,87%` | volume `70,78%` | preco `1,81%`.

## 7. YoY Em 3 Blocos
### Bloco 1 - Visao Geral
- Receita, volume e preco medio indicam se o crescimento veio de expansao real ou apenas de repasse/preco.
### Bloco 2 - Impulsionadores E Detratores
- Top 5 impulsionadores por rede:
- `ST MARCHE`: delta `R$ 1.321.707,87` | crescimento `809,41%`.
- `OBA`: delta `R$ 602.436,37` | crescimento `27,07%`.
- `DALBEN`: delta `R$ 516.836,72` | crescimento `1485,77%`.
- `GPA`: delta `R$ 363.799,39` | crescimento `5,57%`.
- `SAVEGNAGO`: delta `R$ 336.263,15` | crescimento `26,63%`.
- Top 5 detratores por rede:
- `PAGUE MENOS`: delta `R$ -320.461,48` | crescimento `-80,50%`.
- `VAREJO`: delta `R$ -71.024,35` | crescimento `-64,95%`.
- `DB`: delta `R$ -69.176,91` | crescimento `-59,34%`.
- `H.FARTURA`: delta `R$ -40.090,27` | crescimento `-9,19%`.
- `OUTRAS REGIOES`: delta `R$ -32.654,12` | crescimento `n/a`.
### Bloco 3 - Recomendacoes
- Replicar alavancas das redes comparaveis que cresceram com preco sustentado.
- Expandir sortimento nas redes medias com boa base de volume e baixa diversidade de SKU.
- Separar clientes novos da analise de crescimento organico.
- Monitorar erosao de preco em contas que crescem abaixo do mercado ou perdem receita.

## 8. Modelo De Remuneracao Variavel
- Peso 40%: crescimento de volume comparavel YoY.
- Peso 30%: disciplina de preco, medindo preco medio versus meta ou faixa de referencia.
- Peso 20%: ganho de sortimento por cliente.
- Peso 10%: execucao de mix em clientes foco.
- Regras de protecao: piso de faturamento, trilha separada para clientes novos e redutor para crescimento baseado apenas em desconto.

## 9. Ferramentas, Frameworks E Metodos
- `Python` para ingestao e reproducao.
- `pandas` para consolidacao final e tabelas analiticas.
- `openpyxl` em leitura streaming para planilhas grandes.
- `DuckDB` recomendado para versao futura com auditoria SQL e performance melhor em agregacoes.
- `pandera` ou validacoes explicitas para esquema, ranges e unicidade.
- Metodos: profiling de dados, validacao de joins, reconciliacao de totais, definicao formal de metricas, Pareto, YoY comparavel e analise por dimensao com chave confiavel.

