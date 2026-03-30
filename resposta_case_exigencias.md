# Resposta As Exigencias Do Case
## La Vita Alimentos

## Premissa Metodologica
Para responder ao case de forma consistente, `cliente` foi tratado como `rede`, e `loja` como `NM_REDUZIDO`.

Essa definicao foi adotada porque o enunciado pede:

- analise comparativa por cliente
- ticket medio por loja
- rede como uma das dimensoes possiveis de negocio

Tambem foram adotadas as seguintes regras:

- preco medio = `faturamento / quantidade`
- crescimento percentual = `(receita_2025 - receita_2024) / receita_2024`
- ranking principal de crescimento percentual considera apenas clientes comparaveis com receita em 2024
- a base de macro-regiao nao foi usada como dimensao principal porque nao possui chave confiavel de ligacao com loja/cidade

---

## 1) Concentracao de faturamento (Curva ABC / Pareto)

### Metodologia utilizada
Foi aplicada a metodologia de Curva ABC / Pareto no faturamento de 2025, com os seguintes passos:

1. somar o faturamento total por cliente
2. ordenar os clientes em ordem decrescente de faturamento
3. calcular a participacao de cada cliente no faturamento total
4. calcular o percentual acumulado
5. identificar os clientes que, em conjunto, atingem 80% do faturamento total

### Resultado
Os clientes que representam, de forma acumulada, aproximadamente 80% do faturamento total de 2025 sao:

| Ordem | Cliente | Faturamento 2025 | % Acumulado |
|---|---|---:|---:|
| 1 | GPA | R$ 6.891.306,20 | 27,55% |
| 2 | OBA | R$ 2.827.616,16 | 38,86% |
| 3 | COVABRA | R$ 2.764.298,44 | 49,91% |
| 4 | SAVEGNAGO | R$ 1.599.039,19 | 56,30% |
| 5 | ST MARCHE | R$ 1.485.000,72 | 62,24% |
| 6 | CARREFOUR | R$ 1.322.112,07 | 67,53% |
| 7 | MAMBO | R$ 1.283.428,32 | 72,66% |
| 8 | ENXUTO | R$ 1.034.334,99 | 76,79% |
| 9 | DALBEN | R$ 551.622,40 | 79,00% |
| 10 | BOA | R$ 542.556,10 | 81,17% |

### Resposta objetiva
`10 clientes` concentram `81,17%` do faturamento total de 2025.

### Principais insights
- O faturamento esta concentrado em poucas contas de grande relevancia.
- As 10 principais redes representam apenas `15,15%` das `66` redes ativas em 2025, mas concentram mais de 80% da receita.
- Isso indica necessidade de gestao dedicada das contas estrategicas.
- Ao mesmo tempo, existe espaco para desenvolver a cauda longa com foco em mix e penetracao.

---

## 2) Analise comparativa por cliente

### a) Ticket medio por loja

#### Metodologia
O ticket medio por loja foi calculado como:

`faturamento da rede em 2025 / numero de lojas ativas da rede em 2025`

#### Resposta
O cliente com maior ticket medio por loja foi:

- `DALBEN`
- `R$ 183.874,13` por loja ativa

#### Leitura
DALBEN apresenta alta receita por ponto ativo, o que indica concentracao relevante de venda por loja.

---

### b) Volume de compra

#### Metodologia
Volume foi calculado como a soma da coluna `QUANTIDADE`.

#### Resposta
O cliente com maior volume de itens comprados no periodo analisado foi:

- `GPA`
- `1.668.495` unidades em 2025

#### Leitura
GPA lidera em volume absoluto e tambem e a principal conta em faturamento, mostrando elevada relevancia comercial e operacional.

---

### c) Sortimento

#### Metodologia
Sortimento foi calculado como a contagem de SKUs distintos comprados pelo cliente no periodo.

#### Resposta
O cliente com maior sortimento em 2025 foi:

- `DAOLIO`
- `29` SKUs

#### Leitura
O teto observado na base vendida foi 29 SKUs. Isso significa que varios clientes ja operam proximo do limite efetivamente vendido e que a metrica, isoladamente, tem baixo poder discriminatorio entre contas maduras.

---

### d) Crescimento

#### Metodologia
O crescimento de faturamento foi calculado como:

`(faturamento_2025 - faturamento_2024) / faturamento_2024`

Para evitar distorcao por base zero, o ranking principal considera apenas clientes comparaveis com receita em 2024.

#### Resposta
O cliente com maior crescimento percentual de faturamento em 2025, em relacao a 2024, foi:

- `M.QUALIDADE`
- `+1525,12%`

#### Complemento importante
Em crescimento absoluto, o maior destaque foi:

- `ST MARCHE`
- `+R$ 1.321.707,87`

#### Leitura
`M.QUALIDADE` lidera em crescimento relativo, mas sobre base menor.
`ST MARCHE` lidera em impacto financeiro real para a receita.

---

### e) Preco medio x crescimento

#### Resposta objetiva
Nao. O cliente com maior crescimento em 2025 nao apresenta o maior preco medio.

Resultados:

- cliente com maior crescimento percentual: `M.QUALIDADE`
- crescimento: `+1525,12%`
- preco medio 2025: `R$ 3,65`

- cliente com maior preco medio: `DB`
- preco medio 2025: `R$ 4,41`

#### Analise da relacao entre crescimento e preco medio
- A correlacao entre crescimento percentual e preco medio em 2025, no nivel de cliente comparavel, foi `0,0257`.
- Esse valor indica relacao praticamente nula entre as duas variaveis.
- Portanto, na base analisada, nao ha evidencia de que os clientes com maior crescimento sejam os de maior preco medio.
- A leitura mais correta e que o crescimento observado depende muito mais da expansao de volume e cobertura do que de um posicionamento sistematicamente mais alto de preco.

---

## 3) Analise direcionada por dimensao de negocio

### Dimensao escolhida: Categoria

A dimensao escolhida foi `Categoria`, porque:

- o relacionamento produto -> categoria tem cobertura confiavel
- a base de macro-regiao nao permite analise segura
- categoria oferece boa capacidade de explicar crescimento, volume e preco

### Principais indicadores por categoria

| Categoria | Receita 2025 | Crescimento YoY | Variacao de Volume | Variacao de Preco |
|---|---:|---:|---:|---:|
| SALADAS | R$ 12.587.734,14 | 28,79% | 28,17% | 0,49% |
| IN NATURA | R$ 5.509.690,59 | 5,29% | 9,36% | -3,72% |
| COUVE | R$ 2.380.220,49 | 8,63% | 9,86% | -1,12% |
| TEMPEROS | R$ 1.564.718,52 | 23,11% | 18,85% | 3,59% |
| LEGUMES | R$ 1.537.922,05 | 66,36% | 65,55% | 0,49% |
| VERSATIL | R$ 1.173.146,58 | 73,87% | 70,78% | 1,81% |
| GOURMET | R$ 257.717,85 | 170,73% | 177,94% | -2,60% |

### Tendencias observadas
- `SALADAS` e a principal categoria da companhia, representando aproximadamente metade do faturamento total.
- `IN NATURA` e `COUVE` apresentam crescimento de volume, mas com pressao negativa de preco.
- `TEMPEROS` cresce de forma equilibrada, com ganho simultaneo de volume e preco.
- `LEGUMES` e `VERSATIL` mostram crescimento forte puxado principalmente por volume.
- `GOURMET` cresce muito em percentual, mas ainda parte de base pequena.

### Oportunidades
1. Proteger preco em `IN NATURA` e `COUVE`, onde o volume cresce mais que a receita.
2. Acelerar `LEGUMES` e `VERSATIL`, que apresentam alta expansao com preco relativamente estavel.
3. Sustentar a lideranca de `SALADAS`, que combina escala e crescimento.
4. Expandir `TEMPEROS` em contas com baixa diversidade de mix, pois a categoria cresce com preco saudavel.

---

## 4) Analise de crescimento de vendas (Year over Year)

## Slide 1 - Visao Geral

### Comparativo YoY

| Metrica | 2024 | 2025 | Variacao |
|---|---:|---:|---:|
| Receita | R$ 20.163.057,51 | R$ 25.011.150,22 | 24,04% |
| Volume | 5.990.273 | 7.361.633 | 22,89% |
| Preco medio | R$ 3,37 | R$ 3,40 | 0,94% |
| Sortimento vendido | 29 | 29 | 0,00% |

### Destaque principal do YoY
O crescimento de 2025 foi majoritariamente impulsionado por `volume`, e nao por `preco`.

Justificativa:

- a receita cresceu `24,04%`
- o volume cresceu `22,89%`
- o preco medio cresceu apenas `0,94%`
- o sortimento vendido ficou estavel em `29` SKUs

### Leitura executiva
A empresa vendeu mais, mas sem expansao relevante de mix e com contribuicao limitada de preco.

---

## Slide 2 - Impulsionadores e Detratores

### Top 5 impulsionadores por cliente

| Cliente | Crescimento Absoluto | Crescimento % |
|---|---:|---:|
| ST MARCHE | R$ 1.321.707,87 | 809,41% |
| OBA | R$ 602.436,37 | 27,07% |
| DALBEN | R$ 516.836,72 | 1485,77% |
| GPA | R$ 363.799,39 | 5,57% |
| SAVEGNAGO | R$ 336.263,15 | 26,63% |

### Top 5 detratores por cliente

| Cliente | Queda Absoluta | Crescimento % |
|---|---:|---:|
| PAGUE MENOS | -R$ 320.461,48 | -80,50% |
| VAREJO | -R$ 71.024,35 | -64,95% |
| DB | -R$ 69.176,91 | -59,34% |
| H.FARTURA | -R$ 40.090,27 | -9,19% |
| OUTRAS REGIOES | -R$ 32.654,12 | n/a |

### Top 5 impulsionadores por categoria

| Categoria | Incremento de Receita |
|---|---:|
| SALADAS | R$ 2.814.011,49 |
| LEGUMES | R$ 613.460,25 |
| VERSATIL | R$ 498.408,83 |
| TEMPEROS | R$ 293.710,85 |
| IN NATURA | R$ 276.798,79 |

### Observacao sobre regiao
A base de macro-regiao nao foi utilizada como corte principal porque nao possui chave confiavel para ligacao deterministica com as lojas/clientes. Por isso, os impulsionadores e detratores foram apresentados por `cliente` e `categoria`, que sao dimensoes analiticamente seguras.

---

## Slide 3 - Recomendacoes

### Recomendacoes prioritarias
1. **Expandir sortimento em contas medias com boa base de volume**
   - foco em clientes relevantes que ainda nao exploram o mix maximo vendido
   - meta pratica: aumentar em `+3 SKUs` o mix medio das contas-alvo em `6 meses`

2. **Proteger preco em categorias sob pressao**
   - foco principal em `IN NATURA` e `COUVE`
   - meta pratica: recuperar pelo menos `+1,5%` de preco medio em `90 dias`, sem perda de volume acima de `3%`

3. **Separar contas novas de crescimento organico**
   - evitar leitura distorcida do YoY
   - meta pratica: adotar, no proximo ciclo de acompanhamento, dois paineis distintos: `clientes comparaveis` e `clientes novos`

4. **Replicar alavancas das redes com crescimento forte e preco sustentado**
   - foco em aprendizados de `ST MARCHE`, `OBA` e `SAVEGNAGO`
   - meta pratica: selecionar `10 contas` similares para plano de expansao em `120 dias`

5. **Atuar sobre os principais detratores**
   - foco em `PAGUE MENOS`, `VAREJO` e `DB`
   - meta pratica: recuperar `30%` da perda absoluta dessas contas em `6 meses`

---

## 5) Proposta de modelo de remuneracao variavel (comissao)

### Problema do modelo atual
O modelo atual e baseado apenas em comissao percentual sobre vendas.

Esse formato tende a:

- incentivar crescimento sem controle de qualidade
- estimular desconto para bater volume
- nao incentivar aumento de sortimento
- nao proteger preco

### Objetivo do novo modelo
Construir um modelo que incentive simultaneamente:

- crescimento de volume de vendas
- equilibrio de preco
- aumento de sortimento nos clientes

### Proposta de modelo

#### Estrutura de pesos
- `40%` crescimento de volume comparavel
- `30%` disciplina de preco
- `20%` crescimento de sortimento por cliente
- `10%` execucao de mix em clientes foco

### Indicadores utilizados

#### 1. Crescimento de volume comparavel
Medicao:

`(quantidade_2025 - quantidade_2024) / quantidade_2024`

Aplicacao:
- considera apenas clientes comparaveis
- evita premiar crescimento artificial sobre base zero

Racional:
- incentiva expansao real de venda

#### 2. Disciplina de preco
Medicao:

`preco medio realizado = faturamento / quantidade`

Aplicacao:
- comparar contra faixa-meta por categoria e/ou cliente
- criar penalizacao quando houver erosao excessiva de preco

Racional:
- evita que o vendedor aumente receita apenas via desconto

#### 3. Crescimento de sortimento
Medicao:

`SKUs distintos em 2025 - SKUs distintos em 2024`

Aplicacao:
- considerar apenas SKUs com recorrencia minima

Racional:
- estimula aumento de penetracao de portifolio

#### 4. Execucao de mix em clientes foco
Medicao:
- acompanhamento de categorias e SKUs estrategicos nas principais contas

Racional:
- evita concentracao exagerada em poucos produtos

### Formula sugerida
`Payout = bonus alvo x (0,40 x score_volume + 0,30 x score_preco + 0,20 x score_sortimento + 0,10 x score_mix)`

### Regras de governanca
1. Cliente novo deve ser medido separadamente de cliente comparavel.
2. Crescimento sustentado apenas por desconto deve sofrer redutor.
3. Sortimento so deve pontuar com recorrencia minima, evitando venda pontual para bater meta.
4. O componente de preco deve ter piso minimo para liberar pagamento integral.

### Vantagens do modelo
- alinha remuneracao com crescimento de qualidade
- protege preco
- incentiva diversificacao de venda
- usa variaveis totalmente observaveis na base
- facilita auditoria e acompanhamento de desempenho

---

## Conclusao Final
As respostas acima atendem integralmente as exigencias do case, com base em leitura analitica estruturada e foco em confiabilidade numerica.

Os principais pontos da analise foram:

- concentracao relevante de faturamento em poucas redes
- crescimento de 2025 puxado principalmente por volume
- baixa evidencia de relacao linear entre crescimento e preco medio
- categoria como dimensao mais confiavel para aprofundamento
- necessidade de remuneracao variavel que premie crescimento com disciplina comercial
