# Metodo De Analise Usado Para Chegar Aos Slides

## Objetivo do documento
Este documento explica, de forma detalhada, o metodo de analise de dados usado para chegar aos resultados apresentados nos slides da apresentacao do case `Analista Comercial - La Vita Alimentos`.

O foco aqui nao e apenas descrever os numeros finais, mas mostrar o raciocinio que levou a eles. O processo foi organizado em 6 passos:

1. definicao do objetivo
2. escolha dos dados
3. regua de Pareto
4. visualizacao dos dados
5. questionamentos
6. formulacao de teorias

Tambem e explicado o que foi calculado no pipeline analitico e o que foi apenas apresentado na camada de slides.

---

## Visao geral do metodo
O metodo usado foi de `analise comercial orientada por perguntas de negocio`.

Isso significa que a analise nao comecou pelos graficos. Ela comecou pelo enunciado do case e pelas perguntas que precisavam ser respondidas:

- onde a receita esta concentrada
- quais clientes se destacam por ticket, volume, sortimento, crescimento e preco
- qual dimensao explica melhor a performance
- como 2025 se compara a 2024
- quais acoes comerciais fazem sentido
- como transformar esse aprendizado em um modelo de remuneracao variavel

O fluxo pratico foi:

1. ler o case e traduzir as exigencias em perguntas analiticas
2. identificar quais bases permitiam responder cada pergunta
3. definir regras metodologicas para evitar distorcoes
4. calcular os indicadores
5. transformar os calculos em leituras executivas
6. organizar essas leituras em slides

---

## Passo 1 - Definicao do objetivo

### O que foi feito
O primeiro passo foi definir com precisao `qual problema os dados precisavam resolver`.

O objetivo nao era explorar a base de forma aberta. O objetivo era responder integralmente aos blocos pedidos no case:

- concentracao de faturamento
- analise comparativa por cliente
- analise por dimensao de negocio
- crescimento YoY
- recomendacoes praticas
- modelo de remuneracao variavel

### Como isso foi traduzido em objetivo analitico
O objetivo operacional ficou assim:

`usar uma base consolidada de vendas para identificar concentracao, desempenho relativo entre redes, drivers de crescimento e implicacoes comerciais acionaveis, com metodologia auditavel`

### Por que esse passo foi importante
Sem uma definicao clara do objetivo, seria facil cair em dois erros:

- fazer uma analise bonita, mas sem responder ao case
- responder com muitos numeros e pouca conclusao executiva

Foi por isso que a analise foi guiada por perguntas fechadas e nao por curiosidade exploratoria generica.

### Como isso aparece nos slides
- slide de Pareto: responde a pergunta de concentracao
- slide de clientes: responde a comparacao entre redes
- slide de categoria: responde a analise por dimensao
- slides YoY: respondem crescimento, drivers e plano de acao
- slide de remuneracao: transforma diagnostico em mecanismo de gestao

---

## Passo 2 - Escolha dos dados

### O que foi feito
Depois de definir o objetivo, foi necessario decidir `quais dados eram confiaveis para responder cada pergunta`.

As fontes usadas foram:

- `base_faturamento.xlsx`: fatos de venda de 2024 e 2025
- `base_cliente.xlsx`: cadastro de lojas e redes
- `base_produtos.xlsx`: cadastro de SKUs e categorias
- `base_macro_regiao.xlsx`: base geografica recebida, mas com problema de ligacao

Na apresentacao em TypeScript, os dados ja entram por arquivos consolidados e preparados:

- `analysis_output/network_metrics.csv`
- `analysis_output/overall_metrics.csv`
- `presentation_assets/source_data/s03_pareto_chart.csv`
- `presentation_assets/source_data/s05_price_vs_growth.csv`
- `presentation_assets/source_data/s06_category_revenue.csv`
- `presentation_assets/source_data/s06_category_growth.csv`
- `presentation_assets/source_data/s06_category_price.csv`
- `presentation_assets/source_data/s08_drivers_diverging.csv`
- `presentation_assets/source_data/s08_category_impact_table.csv`

### Regras metodologicas adotadas
Algumas definicoes foram necessarias para que a leitura fizesse sentido:

- `cliente = rede`
- `loja = NM_REDUZIDO`
- `preco medio = faturamento / quantidade`
- `crescimento % = (receita_2025 - receita_2024) / receita_2024`
- crescimento percentual principal considera apenas redes comparaveis com `receita_2024 > 0`
- crescimento absoluto considera todas as redes com receita em 2025
- `sortimento = quantidade de SKUs distintos vendidos`
- `categoria` foi escolhida como dimensao principal do aprofundamento
- `macro-regiao` foi descartada da leitura conclusiva por falta de chave confiavel de ligacao

Essas regras aparecem formalmente no material metodologico preparado para o projeto:

- `Cliente -> Rede (DS_REDE)`
- `Loja -> NM_REDUZIDO`
- `Preco medio -> Receita / Quantidade`
- `Crescimento % -> so redes comparaveis`
- `Dimensao -> Categoria`
- `Macro-regiao -> descartada`

### Por que esse passo foi importante
Esse foi o passo que protegeu a analise contra erros de interpretacao.

Exemplos:

- se `cliente` fosse tratado como loja, o case deixaria de responder a comparacao entre redes
- se crescimento percentual considerasse base zero, apareceriam crescimentos artificialmente explosivos
- se macro-regiao fosse usada sem uma chave segura, qualquer conclusao geografica seria fraca

### Como isso aparece nos slides
- o slide de categoria existe porque essa foi a dimensao com join confiavel
- o slide de YoY por drivers nao usa macro-regiao como corte principal
- o slide de clientes separa crescimento percentual de impacto absoluto

---

## Passo 3 - Regua de Pareto

### O que e a regua de Pareto
A regua de Pareto foi usada para responder:

`quais clientes concentram a maior parte da receita`

O principio e simples:

- ordenar os clientes do maior faturamento para o menor
- calcular quanto cada um representa da receita total
- calcular a participacao acumulada
- marcar o ponto em que o acumulado chega a 80%

Essa e a base da `Curva ABC`.

### Como a regua foi aplicada neste caso
Foi usada a receita de 2025 por rede.

O procedimento foi:

1. somar o faturamento de 2025 por rede
2. ordenar em ordem decrescente
3. calcular `share = faturamento_da_rede / faturamento_total`
4. calcular `share acumulado`
5. classificar como `Classe A` as redes ate o limite de 80%

### Resultado encontrado
A regua mostrou que:

- `10 redes` concentram `81,17%` da receita de 2025
- isso acontece dentro de uma base ativa de `66 redes`

A leitura executiva foi:

- poucas contas carregam grande parte do negocio
- essas contas exigem gestao dedicada
- a cauda longa deve ser tratada com foco em mix e penetracao

### Por que a regua de Pareto foi importante
Sem esse passo, a analise ficaria horizontal, como se todos os clientes tivessem peso parecido.

Com a regua, ficou claro que:

- o risco comercial esta concentrado
- a prioridade de gestao nao deve ser igual para todas as contas
- contas A e cauda longa exigem estrategias diferentes

### Como isso aparece nos slides
No slide de Pareto, o deck mostra:

- barras de faturamento por rede
- linha de participacao acumulada
- linha de referencia no corte de `80%`
- destaque visual das redes `Classe A`
- texto metodologico resumindo como a curva foi montada

---

## Passo 4 - Visualizacao dos dados

### O que significa visualizacao neste contexto
Visualizacao aqui nao foi apenas um recurso estetico. Ela foi usada como ferramenta de interpretacao.

Cada grafico foi escolhido para responder uma pergunta especifica.

### Visualizacoes usadas e racional

#### 1. Pareto
Grafico combinado de barras + linha.

Usado para mostrar ao mesmo tempo:

- receita individual por rede
- acumulado da receita total

Esse tipo de visualizacao e o mais adequado para Curva ABC.

#### 2. Preco medio x crescimento
Scatter plot.

Usado para investigar:

- se redes com maior preco medio tambem sao as que mais crescem
- se ha alguma relacao visivel entre as duas variaveis

No pipeline, essa leitura foi reforcada pelo calculo de correlacao de Pearson.

#### 3. Receita por categoria
Barras comparando `2024 x 2025`.

Usado para mostrar:

- escala
- hierarquia entre categorias
- mudanca anual

#### 4. Crescimento por categoria
Barras horizontais por crescimento percentual.

Usado para destacar:

- quais categorias cresceram mais rapido
- quais categorias sao maduras, mas relevantes

#### 5. Variacao de preco por categoria
Barras com referencia em zero.

Usado para mostrar:

- onde houve ganho de preco
- onde houve erosao

#### 6. YoY consolidado
Quadro-resumo e grafico indexado `base 100`.

Usado para comparar:

- receita
- volume
- preco medio
- sortimento

Isso permite separar crescimento puxado por volume de crescimento puxado por preco.

#### 7. Drivers e detratores
Barras divergentes e ranking.

Usado para mostrar:

- top 5 impulsionadores por rede
- top 5 detratores por rede
- top 5 categorias por impacto absoluto

#### 8. Recomendacoes
Nao e um grafico classico, mas uma traducao da analise em prioridades com metas.

Essa etapa fecha a passagem de `diagnostico` para `acao`.

### Por que esse passo foi importante
Os calculos so ficam executivos quando viram leitura visual clara.

Foi a visualizacao que permitiu perceber rapidamente:

- a concentracao do negocio
- a fragilidade da relacao entre preco e crescimento
- o papel do volume no YoY
- onde agir primeiro

---

## Passo 5 - Questionamentos

### O que foi feito
Depois dos calculos e antes das conclusoes, a analise passou por uma etapa de `questionamento`.

Essa e a fase em que o analista pergunta:

- esse numero realmente significa o que parece significar?
- existe alguma distorcao metodologica?
- o indicador responde a pergunta certa?
- o crescimento e sustentavel ou e enganoso?

### Perguntas-chave feitas no processo

#### 1. O cliente que mais cresce e realmente o mais relevante?
Nem sempre.

Por isso foi feita a separacao entre:

- `crescimento percentual`
- `crescimento absoluto`

Resultado:

- `M.QUALIDADE` lidera em crescimento percentual
- `ST MARCHE` lidera em impacto absoluto

#### 2. Maior preco medio implica maior crescimento?
Nao necessariamente.

Essa pergunta levou ao uso de:

- scatter plot
- correlacao entre preco e crescimento

Resultado:

- correlacao praticamente nula
- preco isolado nao explica crescimento

#### 3. O sortimento diferencia bem as contas?
Nem sempre.

O questionamento revelou que o teto observado de sortimento era `29 SKUs`, e varias redes maduras ja operavam perto disso.

Leitura:

- sortimento e util como indicador
- mas isoladamente perde poder discriminatorio em contas maduras

#### 4. Macro-regiao pode ser usada com seguranca?
Nao.

O problema nao era a ideia de usar geografia. O problema era a qualidade do join.

Leitura:

- melhor descartar uma dimensao fragil do que construir uma analise aparentemente sofisticada, mas pouco auditavel

#### 5. O crescimento de 2025 veio de onde?
Essa foi a pergunta central do bloco YoY.

Os indicadores mostraram:

- receita subiu `24,04%`
- volume subiu `22,89%`
- preco medio subiu `0,94%`
- sortimento ficou estavel

Leitura:

- o crescimento veio principalmente de volume
- nao de preco
- nem de expansao de mix

### Por que esse passo foi importante
Questionar evitou conclusoes superficiais.

Exemplos de conclusoes erradas que foram evitadas:

- achar que maior crescimento percentual significa maior importancia financeira
- achar que preco alto impulsiona crescimento
- achar que macro-regiao estava pronta para ser usada
- achar que mais receita significa automaticamente mais qualidade comercial

---

## Passo 6 - Formulacao de teorias

### O que significa formular teorias aqui
Neste contexto, teoria nao significa algo abstrato ou academico.

Significa propor uma `explicacao plausivel de negocio` a partir dos dados.

Depois de medir e questionar, o analista precisa responder:

- por que isso aconteceu?
- o que provavelmente esta por tras do numero?
- como isso deve orientar a acao comercial?

### Teorias formuladas a partir da analise

#### 1. O crescimento de 2025 foi puxado por volume
Base:

- receita cresceu forte
- volume cresceu quase na mesma magnitude
- preco cresceu pouco
- sortimento ficou estavel

Teoria:

- a companhia vendeu mais unidades para a base atual, sem uma expansao relevante de valor por item ou de portifolio

#### 2. O crescimento nao dependeu de um posicionamento sistematicamente mais alto de preco
Base:

- cliente com maior crescimento nao e o de maior preco medio
- correlacao entre preco e crescimento foi praticamente nula

Teoria:

- crescimento dependeu mais de cobertura, volume e execucao comercial do que de premiumizacao ampla

#### 3. A carteira e concentrada e exige gestao desigual
Base:

- 10 redes concentram mais de 80% da receita

Teoria:

- a estrategia comercial nao pode tratar todas as contas de forma igual
- contas A precisam de gestao dedicada
- a cauda longa precisa de estrategia de desenvolvimento

#### 4. Categoria explica melhor a dinamica comercial do que macro-regiao
Base:

- join confiavel produto -> categoria
- join geografico fragil
- categoria ajuda a explicar escala, crescimento e preco

Teoria:

- categoria e a lente mais segura para encontrar oportunidades acionaveis nesta base

#### 5. O modelo de comissao atual pode induzir comportamento errado
Base:

- o crescimento observado mostra tensao entre volume, preco e mix
- o modelo atual baseado apenas em vendas nao protege qualidade de receita

Teoria:

- um modelo melhor precisa combinar:
  - volume comparavel
  - disciplina de preco
  - sortimento
  - execucao de mix

### Como as teorias viraram recomendacoes
As teorias nao ficaram so no diagnostico. Elas foram convertidas em acoes:

- expandir sortimento em contas medias
- proteger preco em categorias sob pressao
- separar clientes novos de base comparavel
- replicar alavancas das redes que crescem com qualidade
- recuperar os principais detratores

Esse foi o caminho que levou ao slide final de recomendacoes.

---

## Metodo pratico usado para chegar aos resultados dos slides

### 1. Preparacao analitica fora da camada visual
Os slides em TypeScript nao fazem toda a analise bruta do zero.

O que acontece e:

- parte do trabalho analitico ja foi consolidada em CSVs derivados
- a camada `reportData.ts` importa esses CSVs
- o TypeScript organiza, filtra e calcula metricas complementares para exibir no deck

Ou seja:

- o `pipeline analitico` prepara as tabelas
- o `deck` organiza e apresenta os resultados

### 2. O que o TypeScript faz na pratica
Na camada dos slides, o projeto:

- faz parse dos CSVs
- converte strings em numeros
- filtra redes ativas
- separa positivos e negativos
- encontra maximos e medianas
- calcula correlacao entre preco e crescimento
- monta rankings e destaques executivos

Exemplos:

- `activeNetworks = redes com receita em 2025`
- `highestTicket = maior ticket por loja ativa`
- `highestVolume = maior volume`
- `highestGrowthPct = maior crescimento percentual entre redes comparaveis`
- `highestPrice = maior preco medio`
- `paretoClassA = redes ate a faixa de 80%`
- `scatterCorrelation = correlacao entre preco medio e crescimento`

### 3. Como cada bloco dos slides foi montado

#### Slide de Pareto
Base usada:

- faturamento por rede em 2025
- share
- share acumulado

Metodo:

- Curva ABC com corte em 80%

#### Slide de clientes
Base usada:

- metricas por rede

Metodo:

- ranking por ticket
- ranking por volume
- ranking por sortimento
- ranking por crescimento percentual
- comparacao entre preco medio e crescimento

#### Slide de categoria
Base usada:

- receita por categoria
- crescimento por categoria
- preco medio por categoria

Metodo:

- comparacao entre 2024 e 2025
- leitura de escala, crescimento e erosao de preco

#### Slide YoY consolidado
Base usada:

- metricas gerais de receita, volume, preco medio e sortimento

Metodo:

- comparacao direta entre 2024 e 2025
- leitura indexada para separar vetor de crescimento

#### Slide YoY de drivers
Base usada:

- crescimento absoluto por rede
- crescimento absoluto por categoria

Metodo:

- top 5 impulsionadores
- top 5 detratores
- top 5 categorias por impacto

#### Slide YoY de recomendacoes
Base usada:

- sintese dos achados anteriores

Metodo:

- converter diagnostico em acoes com metas objetivas

#### Slide de remuneracao variavel
Base usada:

- conclusoes do diagnostico comercial

Metodo:

- transformar o que explica crescimento saudavel em componentes de incentivo

---

## Conclusao
O metodo usado para chegar ao resultado final dos slides foi `estruturado, sequencial e orientado por decisao`.

Ele seguiu esta logica:

1. definir exatamente o que o case queria responder
2. selecionar apenas os dados confiaveis para isso
3. aplicar uma regua de concentracao para entender prioridade comercial
4. visualizar os dados com graficos adequados a cada pergunta
5. questionar as leituras para evitar conclusoes fracas
6. formular teorias e transforma-las em recomendacoes e modelo de gestao

Em resumo:

- os `dados` mostraram o que aconteceu
- os `questionamentos` ajudaram a entender por que aconteceu
- as `teorias` permitiram propor o que fazer a partir disso

Esse foi o caminho metodologico que sustentou os slides apresentados.
