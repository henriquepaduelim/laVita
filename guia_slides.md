# Guia de Montagem dos Slides
## Case Analista Comercial — La Vita Alimentos

> Siga slide a slide. Cada bloco indica o que colocar, onde colocar e qual visual usar.
> Cores de referência: Navy #1B3A6B | Teal #048A81 | Verde #27AE60 | Vermelho #C0392B | Laranja #E67E22

---

## SLIDE 1 — CAPA

**Objetivo:** identificação da apresentação e das 5 entregas do case.

**Layout:** fundo navy escuro, texto branco, destaque em teal.

**O que colocar:**

| Elemento | Conteúdo |
|---|---|
| Título principal (grande) | La Vita Alimentos |
| Linha separadora | linha horizontal em teal |
| Subtítulo | Análise Comercial |
| Linha menor | Case – Analista Comercial Pleno |
| Linha menor | Período analisado: 2024 e 2025 |
| Data | Março 2026 |

**Coluna direita — lista das entregas:**
```
ENTREGAS

01  Concentração de Faturamento (ABC / Pareto)
02  Análise Comparativa por Cliente
03  Análise por Categoria
04  Crescimento de Vendas YoY
05  Modelo de Remuneração Variável
```

**Visual:** nenhum gráfico. Só texto + formas geométricas (retângulo navy, linha teal).

---

## SLIDE 2 — METODOLOGIA E QUALIDADE DOS DADOS

**Objetivo:** mostrar rigor metodológico antes dos números. Isso demonstra capacidade analítica.

**Layout:** 2 colunas. Cabeçalho navy com título branco.

---

### Coluna esquerda (±60%) — Tabela de decisões

**Tipo de visual:** tabela com 3 colunas, cabeçalho navy, linhas alternadas cinza/branco.

| Decisão | Critério adotado | Justificativa |
|---|---|---|
| Cliente | Rede (DS_REDE) | análise acima da loja individual |
| Loja | NM_REDUZIDO | menor granularidade disponível |
| Preço médio | Receita ÷ Quantidade | evita viés da média simples |
| Crescimento % | Só redes comparáveis (2024 > 0) | exclui distorção de base zero |
| Crescimento R$ | Todas as redes com receita em 2025 | mede impacto financeiro real |
| Dimensão (E3) | Categoria | join 100% confiável |
| Macro-região | **Descartada** | sem coluna de município para join |

> Coluna "Critério" em teal bold. "Descartada" em vermelho.

---

### Coluna direita (±35%) — Cards de qualidade

**Tipo de visual:** 4 cards empilhados com borda colorida na esquerda + 1 card navy no rodapé.

```
[verde] Join lojas       → 100,0000%   "em ambos os anos"
[verde] Join produtos    → 99,9999%    "1 código sem cadastro"
[teal]  Período 2024     → jan/24 → dez/24   "ano fechado"
[teal]  Período 2025     → jan/25 → dez/25   "ano fechado"

[card navy]
  1.191.052
  transações analisadas
```

---

## SLIDE 3 — ENTREGA 1: CURVA ABC / PARETO

**Objetivo:** mostrar que 10 redes concentram 81% do faturamento.
**Mensagem principal do slide:** "Alta concentração de receita exige gestão dedicada das contas A."

**Layout:** coluna KPI à esquerda (25%) + gráfico de Pareto à direita (72%).

---

### Coluna esquerda — Cards KPI

**Tipo de visual:** caixas/cards empilhados.

```
┌─────────────────────────────┐
│  10                          │  ← número enorme, branco, fundo navy
│  redes                       │  ← teal
│  concentram 81% da receita  │  ← cinza
└─────────────────────────────┘

10 de 66 redes ativas = 15%

─────────────────────────────
Faturamento total 2025
R$ 25,0M
─────────────────────────────
Insight
"Gestão dedicada para contas A
é crítica para a receita"
```

---

### Coluna direita — Gráfico de Pareto

**Tipo de visual:** gráfico de barras horizontais + linha de % acumulado no eixo secundário.

**Dados para o gráfico (ordem de cima pra baixo):**

| Rede | Receita 2025 | % Acumulado |
|---|---:|---:|
| GPA | R$ 6.891.306 | 27,6% |
| OBA | R$ 2.827.616 | 38,9% |
| COVABRA | R$ 2.764.298 | 49,9% |
| SAVEGNAGO | R$ 1.599.039 | 56,3% |
| ST MARCHE | R$ 1.485.001 | 62,2% |
| CARREFOUR | R$ 1.322.112 | 67,5% |
| MAMBO | R$ 1.283.428 | 72,7% |
| ENXUTO | R$ 1.034.335 | 76,8% |
| DALBEN | R$ 551.622 | 79,0% |
| BOA | R$ 542.556 | 81,2% |
| *(demais redes em cinza)* | ... | ... |

**Instruções de montagem:**
- Barras das 10 primeiras: navy
- Barras das demais: cinza
- Linha de % acumulado: vermelha, com marcadores
- Linha tracejada vermelha em 80% no eixo secundário
- Legenda: "Classe A (≤ 80%)" e "Demais redes"

---

## SLIDE 4 — ENTREGA 2: COMPARATIVO POR CLIENTE

**Objetivo:** responder as 5 perguntas comparativas do case (a, b, c, d, e).
**Mensagem principal:** "Clientes se diferenciam em perfil, não só em tamanho."

**Layout:** grade 2×2 com 4 cards grandes.

**Tipo de visual:** cards com destaque de número + nome do vencedor.

---

### CARD 1 — Ticket Médio por Loja (cor: teal)

```
TICKET MÉDIO POR LOJA
─────────────────────
Vencedor:   DALBEN
Valor:      R$ 183.874 / loja ativa
Detalhe:    3 lojas ativas em 2025
            Receita total: R$ 551.622
─────────────────────
Como calculado:
Receita da rede ÷ lojas ativas em 2025
```

---

### CARD 2 — Volume de Compras (cor: navy)

```
VOLUME DE COMPRAS
─────────────────────
Vencedor:   GPA
Valor:      1.668.495 unidades
Detalhe:    Receita: R$ 6,9M
─────────────────────
Como calculado:
Soma da coluna QUANTIDADE
```

---

### CARD 3 — Sortimento (cor: laranja)

```
MAIOR SORTIMENTO
─────────────────────
Vencedor:   DAOLIO
Valor:      29 SKUs
Detalhe:    Teto do portfólio vendido: 29 SKUs
            Vários clientes atingiram o teto
            → métrica tem baixo poder
              discriminatório no topo
─────────────────────
Como calculado:
Contagem de SKUs distintos em 2025
```

---

### CARD 4 — Crescimento (cor: verde)

```
MAIOR CRESCIMENTO
─────────────────────
Crescimento %:   M.QUALIDADE   +1.525%
  (base pequena em 2024)

Crescimento R$:  ST MARCHE     +R$ 1.321.708
  (maior impacto financeiro real)

─────────────────────
Observação importante:
% mede performance relativa
R$ mede impacto na receita
As duas métricas são complementares
─────────────────────
Como calculado:
(receita_2025 − receita_2024) / receita_2024
Apenas redes com receita em 2024
```

---

### Resposta à pergunta 2e do case (preço médio × crescimento)

> Esta resposta pode aparecer no slide 4 ou no slide 5.

```
Maior preço médio 2025:   DB → R$ 4,41 / unidade
Maior crescimento %:      M.QUALIDADE → R$ 3,65 / unidade

→ O cliente que mais cresceu NÃO é o de maior preço médio.

Correlação entre crescimento e preço: 0,026
→ Relação praticamente nula
→ O crescimento dependeu de volume/cobertura, não de preço
```

---

## SLIDE 5 — ENTREGA 2: PREÇO MÉDIO × CRESCIMENTO

**Objetivo:** aprofundar a análise da pergunta 2e com gráfico.
**Mensagem principal:** "Crescimento em 2025 foi independente do preço praticado."

**Layout:** gráfico de dispersão à esquerda (65%) + caixas de insight à direita (32%).

---

### Gráfico de dispersão (scatter plot)

**Tipo de visual:** gráfico XY / dispersão.

- Eixo X: Preço médio 2025 (R$)
- Eixo Y: Crescimento de receita (%) — 2024 vs 2025
- Cada ponto = uma rede
- Linha tracejada horizontal em y = 0%
- Rótulos nos destaques: DB, M.QUALIDADE, GPA, OBA, ST MARCHE, PAGUE MENOS
- Caixa de texto sobre o gráfico: **"Correlação de Pearson: 0,026"**

> Se não tiver ferramenta de scatter, substitua por uma tabela simples
> com as colunas: Rede | Preço médio 2025 | Crescimento % e destaque
> as extremidades (maior preço e maior crescimento).

---

### Caixas de insight (direita)

```
[vermelho]
Correlação: 0,026
"Relação praticamente nula entre
preço médio e crescimento"

[teal]
Maior preço médio
DB → R$ 4,41 / un

[navy]
Maior crescimento %
M.QUALIDADE → preço R$ 3,65

[laranja]
Implicação
"O modelo atual de comissão não
protege preço médio"
```

---

## SLIDE 6 — ENTREGA 3: ANÁLISE POR CATEGORIA

**Objetivo:** análise aprofundada da dimensão Categoria (escolhida por ter join 100% confiável).
**Mensagem principal:** "Saladas lidera, Legumes e Versátil aceleram — IN NATURA perde margem."

**Layout:** 3 gráficos no topo + 4 cards de insight no rodapé.

---

### Gráfico 1 — Receita por Categoria (barras agrupadas)

**Tipo de visual:** gráfico de barras horizontais agrupadas (2024 cinza | 2025 navy).

| Categoria | Receita 2024 | Receita 2025 |
|---|---:|---:|
| SALADAS | R$ 9.773.723 | R$ 12.587.734 |
| IN NATURA | R$ 5.232.892 | R$ 5.509.691 |
| COUVE | R$ 2.190.129 | R$ 2.380.220 |
| TEMPEROS | R$ 1.271.008 | R$ 1.564.719 |
| LEGUMES | R$ 924.462 | R$ 1.537.922 |
| VERSATIL | R$ 674.738 | R$ 1.173.147 |
| GOURMET | R$ 95.109 | R$ 257.718 |

---

### Gráfico 2 — Variação de Receita YoY (barras simples)

**Tipo de visual:** gráfico de barras horizontais simples. Verde = positivo.

| Categoria | Δ Receita |
|---|---:|
| GOURMET | +170,7% |
| VERSATIL | +73,9% |
| LEGUMES | +66,4% |
| TEMPEROS | +23,1% |
| SALADAS | +28,8% |
| COUVE | +8,6% |
| IN NATURA | +5,3% |

---

### Gráfico 3 — Variação de Preço Médio YoY (barras simples)

**Tipo de visual:** gráfico de barras horizontais. Verde = preço subiu | Vermelho = preço caiu.

| Categoria | Δ Preço Médio |
|---|---:|
| TEMPEROS | +3,59% |
| VERSATIL | +1,81% |
| LEGUMES | +0,49% |
| SALADAS | +0,49% |
| COUVE | −1,12% |
| GOURMET | −2,60% |
| IN NATURA | −3,72% |

---

### Cards de insight no rodapé

```
[navy]    SALADAS    → "Maior categoria (+50% da receita total).
                        Crescimento saudável: vol +28%, preço estável."

[vermelho] IN NATURA → "Volume cresce +9,4% mas preço cai -3,7%.
                        Pressão de margem."

[verde]   TEMPEROS   → "Cresce volume E preço (+3,6%).
                        Melhor posicionamento relativo."

[teal]    LEGUMES    → "Aceleração forte (+66% receita).
                        Expansão puxada por volume."
```

---

## SLIDE 7 — ENTREGA 4 / SLIDE 1: VISÃO GERAL YoY

**Objetivo:** visão macro de 2024 vs 2025 com os 4 indicadores principais.
**Mensagem principal:** "Receita cresceu 24% — quase tudo por volume."

**Layout:** 4 cards em linha (área principal) + banner de mensagem no rodapé.

---

### 4 Cards KPI

**Tipo de visual:** cards com número grande, variação % e valor do ano anterior.

| Card | Métrica | 2025 | Variação | 2024 | Tag |
|---|---|---|---|---|---|
| 1 (navy) | RECEITA | R$ 25.011.150 | **+24,0%** ↑ | R$ 20.163.058 | Crescimento real |
| 2 (teal) | VOLUME | 7.361.633 un | **+22,9%** ↑ | 5.990.273 un | Principal driver |
| 3 (laranja) | PREÇO MÉDIO | R$ 3,40 | **+0,9%** → | R$ 3,37 | Quase estável |
| 4 (cinza) | SORTIMENTO | 29 SKUs | **0,0%** = | 29 SKUs | Sem expansão |

> Variações positivas em verde. Variação neutra em cinza.

---

### Banner de mensagem (rodapé, fundo navy)

```
"Receita cresceu +24% — mas 23 pp vieram de volume e menos de 1 pp de preço."
"O sortimento total vendido ficou estável. A empresa vendeu mais, não diferente."
```

---

## SLIDE 8 — ENTREGA 4 / SLIDE 2: DRIVERS E DETRATORES

**Objetivo:** identificar quem puxou o crescimento e quem puxou para baixo.
**Mensagem principal:** "ST Marche e OBA lideram o crescimento; Pague Menos é o maior detrator."

**Layout:** gráfico divergente à esquerda (58%) + tabela de categorias à direita (38%).

---

### Gráfico de barras divergente (esquerda)

**Tipo de visual:** gráfico de barras horizontais com eixo central em zero.
Barras para a direita (verde) = impulsionadores.
Barras para a esquerda (vermelho) = detratores.

**Top 5 impulsionadores (valores positivos → direita):**

| Rede | Δ Receita R$ | Δ Receita % |
|---|---:|---:|
| ST MARCHE | +R$ 1.321.708 | +809% |
| OBA | +R$ 602.436 | +27% |
| DALBEN | +R$ 516.837 | +1.486% |
| GPA | +R$ 363.799 | +6% |
| SAVEGNAGO | +R$ 336.263 | +27% |

**Top 4 detratores (valores negativos → esquerda):**

| Rede | Δ Receita R$ | Δ Receita % |
|---|---:|---:|
| PAGUE MENOS | −R$ 320.461 | −80% |
| VAREJO | −R$ 71.024 | −65% |
| DB | −R$ 69.177 | −59% |
| H.FARTURA | −R$ 40.090 | −9% |

> Mostrar os valores em R$ na ponta de cada barra.

---

### Tabela de impacto por categoria (direita)

**Tipo de visual:** tabela simples com 3 colunas. Cabeçalho navy. Linhas alternadas.

| Categoria | Δ Receita | Var% |
|---|---:|---:|
| SALADAS | +R$ 2.814.011 | +29% |
| LEGUMES | +R$ 613.460 | +66% |
| VERSATIL | +R$ 498.409 | +74% |
| TEMPEROS | +R$ 293.711 | +23% |
| IN NATURA | +R$ 276.799 | +5% |
| COUVE | +R$ 189.091 | +9% |
| GOURMET | +R$ 162.609 | +171% |

> Valores positivos em verde.

---

## SLIDE 9 — ENTREGA 4 / SLIDE 3: RECOMENDAÇÕES

**Objetivo:** 5 ações prioritárias com metas concretas ancoradas nos dados.
**Mensagem principal:** "5 ações para 2026 com metas claras e base nos números."

**Layout:** 5 cards numerados organizados em 2 linhas (3 + 2).

**Tipo de visual:** cards com círculo numerado colorido, título, descrição e caixa de meta.

---

### Card 1 — cor teal — Sortimento

```
① Expandir sortimento em contas médias

"Redes relevantes abaixo do teto de 29 SKUs"

→ Meta: +3 SKUs no mix médio das contas-alvo em 6 meses
```

**Ancoragem nos dados:** sortimento vendido estável em 29 SKUs; espaço para expansão em contas que ainda não atingiram o teto.

---

### Card 2 — cor vermelho — Preço

```
② Proteger preço em IN NATURA e COUVE

"Volume cresce, mas preço cai — erosão de margem"
IN NATURA: vol +9,4% | preço −3,7%
COUVE:     vol +9,9% | preço −1,1%

→ Meta: +1,5% de preço médio em 90 dias, volume −3% máx.
```

---

### Card 3 — cor navy — Comparabilidade

```
③ Separar contas novas de crescimento orgânico

"ST Marche (+809%) e Dalben (+1.486%) são entradas novas,
não crescimento orgânico"

→ Meta: dois painéis distintos — comparáveis | novos —
   no próximo ciclo de acompanhamento
```

---

### Card 4 — cor verde — Replicação

```
④ Replicar alavancas das redes saudáveis

"OBA (+27%) e Savegnago (+27%) cresceram
com preço firme e base comparável"

→ Meta: selecionar 10 contas similares para plano
   de expansão em 120 dias
```

---

### Card 5 — cor laranja — Detratores

```
⑤ Recuperar receita dos detratores

Pague Menos: −R$ 320K (−80%)
Varejo:      −R$ 71K  (−65%)
DB:          −R$ 69K  (−59%)

→ Meta: recuperar 30% da perda absoluta
   dessas contas em 6 meses
```

---

## SLIDE 10 — ENTREGA 5: MODELO DE REMUNERAÇÃO VARIÁVEL

**Objetivo:** proposta de novo modelo de comissão que incentiva volume, preço e sortimento.
**Mensagem principal:** "Premiar crescimento com qualidade — não só volume."

**Layout:** fórmula no topo + barra de pesos proporcional + 4 cards de indicadores.

---

### Fórmula (topo, centralizada)

**Tipo de visual:** caixa de texto com fórmula navy bold.

```
Payout = Bônus-alvo × ( 0,40 × S_vol + 0,30 × S_preço + 0,20 × S_sort + 0,10 × S_mix )
```

---

### Barra de pesos proporcional

**Tipo de visual:** retângulo dividido em 4 segmentos coloridos lado a lado (como barra 100%).

```
│←────── 40% navy ──────→│←── 30% teal ──→│←─ 20% laranja ─→│← 10% cinza →│
│  Crescimento de Volume  │ Disciplina de   │   Sortimento     │  Mix foco   │
│         40%             │    Preço 30%    │      20%         │    10%      │
```

---

### 4 Cards de indicadores

**Tipo de visual:** cards com borda colorida, peso em destaque, como medir e lógica.

---

**Card A — navy — Crescimento de Volume — 40%**
```
Como medir:
(qtd_2025 − qtd_2024) / qtd_2024

Regra:
Redes comparáveis; base zero excluída

Lógica:
Premia expansão real de vendas
```

---

**Card B — teal — Disciplina de Preço — 30%**
```
Como medir:
Preço médio realizado vs faixa-meta por categoria

Regra:
Redutor quando erosão > threshold definido

Lógica:
Evita crescimento via desconto
```

**Ancoragem nos dados:** correlação crescimento × preço = 0,026 → modelo atual não protege margem.

---

**Card C — laranja — Crescimento de Sortimento — 20%**
```
Como medir:
Δ SKUs distintos com ≥ 4 semanas de recorrência

Regra:
Evita venda pontual para bater meta

Lógica:
Incentiva penetração de portfólio
```

**Ancoragem nos dados:** sortimento estável em 29 SKUs nos dois anos — espaço real para crescimento.

---

**Card D — cinza — Execução de Mix — 10%**
```
Como medir:
Cobertura de SKUs estratégicos nas contas A

Regra:
Acompanhado mensalmente por conta

Lógica:
Evita concentração em poucos produtos
```

---

### Rodapé do slide 10 — Regras de governança

**Tipo de visual:** lista simples ou 4 ícones pequenos com texto.

```
• Contas novas → medição separada das comparáveis
• Crescimento via desconto excessivo → redutor no componente de preço
• Sortimento conta só com recorrência mínima (≥ 4 semanas)
• Componente de preço tem piso mínimo para liberar pagamento integral
```

---

## Resumo rápido de visuais por slide

| Slide | Visual principal | Complexidade |
|---|---|---|
| 1 — Capa | Texto + formas | Simples |
| 2 — Metodologia | Tabela + cards | Média |
| 3 — Pareto | Barras horizontais + linha acumulado | Alta |
| 4 — Comparativo | 4 cards | Simples |
| 5 — Preço × Crescimento | Scatter + cards | Alta |
| 6 — Categoria | 3 gráficos de barras + 4 cards | Alta |
| 7 — YoY Visão Geral | 4 KPI cards + banner | Simples |
| 8 — Drivers | Barras divergentes + tabela | Alta |
| 9 — Recomendações | 5 cards numerados | Média |
| 10 — Remuneração | Fórmula + barra + 4 cards | Média |

> Slides com complexidade **Alta** têm imagens de referência prontas em `_slides_tmp/`.
> Use-as como modelo visual ao montar no Canva ou PowerPoint.
