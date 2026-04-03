# Relatório Final
## Case - Analista Comercial
## La Vita Alimentos

### 1. Objetivo
Este relatório apresenta a análise do case para a posição de Analista Comercial da La Vita Alimentos, com foco em clareza metodológica, confiabilidade dos números e interpretação correta dos dados.

O material foi estruturado para responder integralmente aos cinco blocos solicitados no case:

1. Concentração de faturamento (Curva ABC / Pareto)
2. Análise comparativa por cliente
3. Análise direcionada por dimensão de negócio
4. Análise de crescimento de vendas (YoY)
5. Proposta de modelo de remuneração variável

O objetivo principal desta entrega não é apenas apontar insights comerciais, mas demonstrar capacidade analítica, definição correta de métricas e leitura precisa dos dados.

### 2. Bases Utilizadas
Foram utilizadas quatro bases:

- `base_faturamento.xlsx`
- `base_cliente.xlsx`
- `base_produtos.xlsx`
- `base_macro_regiao.xlsx`

Resumo estrutural:

- Faturamento 2024: 536.056 linhas
- Faturamento 2025: 654.996 linhas
- Cadastro de clientes: 2.056 lojas, 271 redes
- Cadastro de produtos: 52 SKUs, 8 categorias

### 3. Critérios Metodológicos
Antes de iniciar os cálculos, foram definidas premissas metodológicas para evitar distorções analíticas.

#### 3.1 Definição de cliente
Para efeito deste relatório, `cliente` foi tratado como `rede`, e `loja` como `NM_REDUZIDO`.

Essa escolha foi feita porque o case pede:

- análise comparativa por cliente
- ticket médio por loja

Isso pressupõe um agrupamento acima da loja.

#### 3.2 Definição de preço médio
O preço médio foi calculado como:

`Preço médio = Receita total / Quantidade total`

Essa abordagem evita viés estatístico de média simples de preços por linha.

#### 3.3 Definição de crescimento
Foram utilizadas duas leituras complementares:

- crescimento percentual: para comparar desempenho relativo
- crescimento absoluto: para medir impacto financeiro real

Para evitar distorção por base zero, o ranking principal de crescimento percentual considera apenas clientes comparáveis com venda em 2024.

#### 3.4 Dimensão escolhida para aprofundamento
A dimensão escolhida foi `categoria`.

A base de macro-região não foi utilizada como dimensão principal porque não possui chave confiável para relacionamento determinístico com cliente/loja.

### 4. Validação de Qualidade dos Dados
Antes da interpretação, foi feita validação estrutural das bases.

#### 4.1 Cobertura de junções
- Faturamento -> clientes: 100,00%
- Faturamento -> produtos: 99,9999%

Foi identificado apenas 1 código de produto sem correspondência cadastral:

- `LVI.0014.000004`

O impacto financeiro dessa inconsistência é residual e não altera a leitura geral.

#### 4.2 Faixa temporal
- 2024: 02/01/2024 a 30/12/2024
- 2025: 02/01/2025 a 31/12/2025

Como ambos os anos cobrem praticamente o calendário completo, a comparação YoY é válida como ano fechado contra ano fechado.

#### 4.3 Observações relevantes
- Apenas 385 lojas tiveram faturamento em 2025
- Apenas 66 redes tiveram faturamento em 2025
- Apenas 29 SKUs tiveram venda em 2024 e 2025

Isso é importante porque qualquer análise por loja ou por sortimento deve considerar base ativa, não cadastro total.

### 5. Concentração de Faturamento - Curva ABC / Pareto
Foi realizada a ordenação das redes por faturamento de 2025, seguida do cálculo do percentual acumulado.

#### 5.1 Resultado principal
10 redes concentram 81,17% do faturamento de 2025.

Isso representa 15,15% das 66 redes ativas no ano.

#### 5.2 Faturamento total de 2025
`R$ 25.011.150,22`

#### 5.3 Top 10 redes por faturamento em 2025

| Rede | Receita 2025 | % Acumulado |
|---|---:|---:|
| GPA | R$ 6.891.306,20 | 27,55% |
| OBA | R$ 2.827.616,16 | 38,86% |
| COVABRA | R$ 2.764.298,44 | 49,91% |
| SAVEGNAGO | R$ 1.599.039,19 | 56,30% |
| ST MARCHE | R$ 1.485.000,72 | 62,24% |
| CARREFOUR | R$ 1.322.112,07 | 67,53% |
| MAMBO | R$ 1.283.428,32 | 72,66% |
| ENXUTO | R$ 1.034.334,99 | 76,79% |
| DALBEN | R$ 551.622,40 | 79,00% |
| BOA | R$ 542.556,10 | 81,17% |

#### 5.4 Leitura analítica
A concentração não está distribuída por centenas de clientes com relevância parecida. Ela está concentrada em poucas redes de alto impacto.

Portanto, a leitura mais correta é:

- existe dependência relevante de poucas contas
- essas contas devem ser tratadas como estratégicas
- a cauda longa pode ser trabalhada para aumento de mix e penetração

### 6. Análise Comparativa por Cliente
Nesta etapa, o cliente foi tratado no nível de rede.

#### 6.1 Ticket médio por loja
Fórmula utilizada:

`Ticket médio por loja = faturamento da rede em 2025 / número de lojas ativas da rede em 2025`

Resultado:

- maior ticket médio por loja: `DALBEN`
- valor: `R$ 183.874,13`

Observação:
Essa métrica é sensível ao número de lojas ativas e deve ser interpretada com cautela, porque redes pequenas podem aparecer muito bem posicionadas.

#### 6.2 Volume de compra
Resultado:

- maior volume em 2025: `GPA`
- volume: `1.668.495` unidades

#### 6.3 Sortimento
Resultado:

- maior sortimento em 2025: empate entre `CASA DELIZA`, `CUBATAO`, `DAOLIO`, `PONTO NOVO`, `SAVEGNAGO` e `VAREJO`
- total: `29` SKUs

Observação:
O teto vendido na base é 29 SKUs. Portanto, essa métrica tem baixo poder discriminatório entre os clientes que já atingiram o mix máximo vendido.

#### 6.4 Crescimento
Resultado principal em crescimento percentual comparável:

- `M.QUALIDADE`
- crescimento: `1525,12%`

Porém, em termos de impacto absoluto de receita, o principal destaque foi:

- `ST MARCHE`
- crescimento absoluto: `R$ 1.321.707,87`

Leitura correta:

- `M.QUALIDADE` lidera crescimento relativo
- `ST MARCHE` lidera crescimento em contribuição real para a receita

#### 6.5 Preço médio x crescimento
Maior preço médio em 2025:

- `DB`
- `R$ 4,41` por item

Já o cliente com maior crescimento percentual comparável foi:

- `M.QUALIDADE`
- `R$ 3,65` por item

Conclusão:

- o cliente que mais cresceu não é o de maior preço médio
- a correlação entre crescimento percentual e preço médio é praticamente nula: `0,0257`

Isso indica que, na base analisada, crescimento e preço não apresentam relação linear relevante no nível de rede.

### 7. Análise por Dimensão de Negócio
#### 7.1 Dimensão escolhida
Foi escolhida a dimensão `categoria`, por apresentar chave confiável e boa capacidade explicativa.

#### 7.2 Resultado por categoria

| Categoria | Receita 2025 | Crescimento YoY | Variação de Volume | Variação de Preço |
|---|---:|---:|---:|---:|
| SALADAS | R$ 12.587.734,14 | 28,79% | 28,17% | 0,49% |
| IN NATURA | R$ 5.509.690,59 | 5,29% | 9,36% | -3,72% |
| COUVE | R$ 2.380.220,49 | 8,63% | 9,86% | -1,12% |
| TEMPEROS | R$ 1.564.718,52 | 23,11% | 18,85% | 3,59% |
| LEGUMES | R$ 1.537.922,05 | 66,36% | 65,55% | 0,49% |
| VERSATIL | R$ 1.173.146,58 | 73,87% | 70,78% | 1,81% |
| GOURMET | R$ 257.717,85 | 170,73% | 177,94% | -2,60% |

#### 7.3 Leitura analítica
- `SALADAS` é a principal categoria da companhia e segue crescendo de forma saudável
- `IN NATURA` e `COUVE` crescem com pressão de preço
- `TEMPEROS` cresce com melhora simultânea de volume e preço
- `LEGUMES` e `VERSATIL` apresentam crescimento forte, puxado principalmente por volume
- `GOURMET` tem crescimento percentual muito alto, mas base de receita ainda pequena

### 8. Análise de Crescimento de Vendas (YoY)
Este bloco resume o conteúdo que sustentaria os três slides exigidos pelo case, porém apresentado em formato de relatório.

#### 8.1 Visão Geral

| Métrica | 2024 | 2025 | Variação |
|---|---:|---:|---:|
| Receita | R$ 20.163.057,51 | R$ 25.011.150,22 | 24,04% |
| Volume | 5.990.273 | 7.361.633 | 22,89% |
| Preço médio | R$ 3,37 | R$ 3,40 | 0,94% |
| Sortimento vendido | 29 | 29 | 0,00% |

#### 8.2 Interpretação da visão geral
O crescimento de 2025 foi majoritariamente sustentado por volume.

Justificativa:

- volume cresceu `22,89%`
- preço médio cresceu apenas `0,94%`
- sortimento total vendido permaneceu estável

Ou seja, houve expansão de vendas, mas sem aumento relevante de mix e com contribuição limitada de preço.

#### 8.3 Impulsionadores e Detratores
##### Top 5 impulsionadores por incremento absoluto de receita

| Rede | Crescimento Absoluto | Crescimento % |
|---|---:|---:|
| ST MARCHE | R$ 1.321.707,87 | 809,41% |
| OBA | R$ 602.436,37 | 27,07% |
| DALBEN | R$ 516.836,72 | 1485,77% |
| GPA | R$ 363.799,39 | 5,57% |
| SAVEGNAGO | R$ 336.263,15 | 26,63% |

##### Top 5 detratores por queda absoluta de receita

| Rede | Queda Absoluta | Crescimento % |
|---|---:|---:|
| PAGUE MENOS | -R$ 320.461,48 | -80,50% |
| VAREJO | -R$ 71.024,35 | -64,95% |
| DB | -R$ 69.176,91 | -59,34% |
| H.FARTURA | -R$ 40.090,27 | -9,19% |
| OUTRAS REGIOES | -R$ 32.654,12 | n/a |

##### Principais categorias impulsionadoras

| Categoria | Incremento de Receita |
|---|---:|
| SALADAS | R$ 2.814.011,49 |
| LEGUMES | R$ 613.460,25 |
| VERSATIL | R$ 498.408,83 |
| TEMPEROS | R$ 293.710,85 |
| IN NATURA | R$ 276.798,79 |

#### 8.4 Recomendações Prioritárias
Com base na leitura dos dados, as prioridades sugeridas são:

1. Expandir sortimento em contas médias com volume relevante, mas mix abaixo do teto observado de 29 SKUs na base vendida.
2. Proteger preço nas categorias em que o volume cresce, mas o preço médio cai, especialmente `IN NATURA` e `COUVE`.
3. Tratar separadamente contas novas e contas comparáveis, para evitar distorção na leitura de performance.
4. Replicar padrões comerciais das redes que cresceram com manutenção de preço médio saudável.
5. Acompanhar de forma dedicada as contas detratoras com maior perda absoluta de receita.

### 9. Proposta de Modelo de Remuneração Variável
O modelo atual, baseado apenas em comissão sobre venda, tende a incentivar volume sem controle de preço e sem estímulo ao mix.

#### 9.1 Objetivo do novo modelo
Remunerar crescimento com qualidade, considerando simultaneamente:

- crescimento de volume
- disciplina de preço
- aumento de sortimento

#### 9.2 Modelo sugerido

##### Estrutura de pesos
- 40%: crescimento de volume comparável YoY
- 30%: disciplina de preço
- 20%: crescimento de sortimento por cliente
- 10%: execução de mix em clientes foco

#### 9.3 Racional
##### Crescimento de volume
Premia expansão real de vendas.

##### Disciplina de preço
Evita que a remuneração estimule crescimento via desconto excessivo.

##### Sortimento
Incentiva aumento de penetração e venda de portfólio mais completo.

##### Execução de mix
Ajuda a evitar concentração exagerada em poucos produtos.

#### 9.4 Regras de governança recomendadas
- clientes novos devem ser medidos separadamente de clientes comparáveis
- crescimento baseado apenas em desconto deve ter redutor
- ganho de sortimento só deve contar com recorrência mínima
- componente de preço deve ter piso mínimo de elegibilidade

### 10. Conclusão Final
Os dados indicam que a La Vita cresceu de forma relevante em 2025 contra 2024, com aumento de receita de 24,04%, puxado majoritariamente por volume.

Os principais pontos da análise são:

- a receita está concentrada em poucas redes relevantes
- o crescimento não foi sustentado principalmente por preço
- o sortimento vendido permaneceu estável no agregado
- algumas categorias apresentam crescimento forte, mas com dinâmicas diferentes entre volume e preço
- o acompanhamento por rede é mais confiável do que por macro-região

Em termos analíticos, a principal conclusão é que a empresa cresceu, mas ainda há espaço para:

- aprofundar mix em contas relevantes
- proteger preço em categorias mais pressionadas
- tratar grandes contas com gestão dedicada
- separar aquisição de base nova de crescimento orgânico

### 11. Observação Final
Este relatório foi construído com foco em consistência metodológica e confiabilidade dos números. Os resultados podem ser usados como base para apresentação executiva, discussão com gestor e defesa técnica da análise.
