import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoryPriceDumbbellChart } from '../components/CategoryPriceDumbbellChart';
import { ChartCard } from '../components/ChartCard';
import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { PriceGrowthScatterChart } from '../components/PriceGrowthScatterChart';
import lavitaLogo from '../assets/lavita-logo.png';
import { reportData } from '../data/reportData';
import { formatCompactCurrency, formatCurrency, formatNumber, formatPercent, formatRatio, formatSignedCurrency, formatSignedPercent } from '../utils/format';
import { chartPalette } from '../utils/theme';
import { MetricStrip } from './MetricStrip';
import { SlideFrame } from './SlideFrame';

export type DeckSlideDefinition = {
  id: string;
  label: string;
  agendaLabel?: string;
  coverAgendaLabel?: string;
  component: (props: { index: number; total: number }) => ReactElement;
};

function shortenLabel(label: string | number) {
  const text = String(label);
  return text.length > 10 ? `${text.slice(0, 10)}…` : text;
}

function buildCoverAgendaItems(slides: DeckSlideDefinition[]) {
  const items: { id: string; label: string }[] = [];

  slides.slice(1).forEach((slide) => {
    const label = slide.coverAgendaLabel ?? slide.agendaLabel ?? slide.label;
    const previous = items.at(-1);

    if (previous?.label === label) return;
    items.push({ id: slide.id, label });
  });

  return items;
}

function CoverSlide({ index, total }: { index: number; total: number }) {
  const { overview } = reportData;
  const agendaItems = buildCoverAgendaItems(deckSlides);

  return (
    <SlideFrame
      eyebrow=""
      title=""
      summary=""
      index={index}
      total={total}
      hideHeader
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="shrink-0">
          <img
            src={lavitaLogo}
            alt="La Vita"
            className="h-auto w-[9rem] object-contain"
          />
        </div>

        <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[1.04fr_0.96fr]">
          <div className="flex h-full min-h-0 flex-col rounded-[2rem] border border-[var(--border-strong)] bg-transparent p-6 shadow-none lg:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                Case Analista Comercial
                </p>
              </div>
              <h1 className="font-display mt-5 max-w-[14ch] text-[2.15rem] font-semibold leading-[1.02] tracking-tight text-[var(--ink)] lg:text-[2.55rem]">
              Crescimento relevante em 2025, puxado por volume e concentrado em poucas redes.
              </h1>
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <div className="rounded-full border border-[var(--border)] bg-white/60 px-4 py-2.5">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Receita 2025</p>
                <p className="font-display mt-1 text-xl font-semibold text-[var(--ink)]">
                  {formatCurrency(overview.revenue.value2025)}
                </p>
              </div>
              <div className="rounded-full border border-[var(--border)] bg-white/60 px-4 py-2.5">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Variação YoY</p>
                <p className="font-display mt-1 text-xl font-semibold text-[var(--ink)]">
                  {formatSignedPercent(overview.revenue.variationPct)}
                </p>
              </div>
            </div>
          </div>

          <div className="panel flex h-full min-h-0 flex-col rounded-[2rem] p-5 lg:p-6">
            <p className="font-display text-[0.84rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Agenda
            </p>
            <div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-white/60">
              {agendaItems.map((block, blockIndex) => (
                <Link
                  key={block.id}
                  to={`/?slide=${block.id}`}
                  className={`group flex min-h-0 flex-1 items-center gap-4 px-4 py-3.5 transition-colors duration-200 hover:bg-white/70 ${
                    blockIndex > 0 ? 'border-t border-[var(--border)]' : ''
                  }`}
                >
                  <div className="font-display min-w-8 text-[1.9rem] font-semibold leading-none text-[var(--brand)] transition-transform duration-200 group-hover:translate-x-0.5">
                    {String(blockIndex + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-display text-[1.08rem] font-medium leading-[1.28] tracking-[-0.014em] text-[var(--ink)] transition-colors duration-200 group-hover:text-[var(--brand-strong)] lg:text-[1.15rem]">
                      {block.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function ParetoSlide({ index, total }: { index: number; total: number }) {
  const { pareto, overview } = reportData;
  const topPriorityNetworks = pareto.filter((row) => row.isClassA).slice(0, 5);

  return (
    <SlideFrame
      eyebrow="Concentração de Receita"
      title="A receita de 2025 está concentrada em poucas redes."
      summary="As 10 maiores contas respondem por 81,17% do faturamento. Esse grupo precisa de gestão prioritária e plano comercial dedicado."
      index={index}
      total={total}
    >
      <div className="grid gap-4 xl:grid-cols-[0.7fr_1.3fr]">
        <div className="grid gap-4 content-start">
          <article className="panel rounded-[1.55rem] border border-[var(--border-strong)] bg-white/30 p-4 shadow-none">
            <div className="flex items-end justify-between gap-3 border-b border-[var(--border)] pb-3">
              <div>
                <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                  Contas A
                </p>
                <h3 className="font-display mt-1 text-[1.05rem] font-semibold tracking-tight text-[var(--ink)]">
                  Redes que sustentam a concentração
                </h3>
              </div>
              <p className="text-right text-[0.76rem] leading-4 text-[var(--ink-soft)]">
                {overview.paretoClassACount} redes
                <br />
                {formatPercent(overview.paretoClassAShare)} da receita
              </p>
            </div>

            <div className="mt-2 divide-y divide-[var(--border)]">
              {topPriorityNetworks.map((row, rowIndex) => (
                <div key={row.network} className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] items-center gap-3 py-2.5">
                  <p className="font-display text-[0.95rem] font-semibold text-[var(--brand)]">
                    {String(rowIndex + 1).padStart(2, '0')}
                  </p>
                  <p className="truncate font-display text-[0.92rem] font-medium text-[var(--ink)]">
                    {row.network}
                  </p>
                  <p className="text-right text-[0.84rem] font-semibold text-[var(--ink-soft)]">
                    {formatPercent(row.share)}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3 border-t border-[var(--border)] pt-3 text-[0.78rem] leading-5 text-[var(--ink-soft)]">
              As cinco primeiras redes já representam <strong className="font-semibold text-[var(--ink)]">{formatPercent(topPriorityNetworks.reduce((sum, row) => sum + row.share, 0))}</strong> da receita de 2025.
            </p>
          </article>
          <KpiCard compact label="Receita consolidada" value={formatCompactCurrency(overview.revenue.value2025)} detail="Base usada na leitura do Pareto." tone="muted" />
          <InsightBlock compact title="Mensagem principal" accent="teal">
            <p><strong className="font-semibold text-[var(--ink)]">Classe A é carteira estratégica.</strong> A cauda longa é espaço para ganho de mix e cobertura.</p>
          </InsightBlock>
        </div>
        <ChartCard compact question="Onde a receita se concentra?" title="Curva ABC de faturamento" description="As barras mostram receita por rede; a linha mostra a participação acumulada no total de 2025.">
          <div className="h-[20rem] xl:h-[24rem]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={pareto} margin={{ top: 14, right: 16, left: 8, bottom: 18 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="network" tickLine={false} axisLine={false} interval={0} angle={-24} dy={8} height={58} tickFormatter={shortenLabel} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} width={82} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatPercent(Number(value), 0)} />
                <Tooltip
                  contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)', boxShadow: '0 18px 40px rgba(18,31,49,0.12)' }}
                  formatter={(value: number | string, name: string) => name === 'sales2025' ? [formatCurrency(Number(value)), 'Receita 2025'] : [formatPercent(Number(value)), 'Participação acumulada']}
                  labelFormatter={(label) => `Rede: ${label}`}
                />
                <Legend formatter={(value) => value === 'sales2025' ? 'Receita 2025' : 'Participação acumulada'} />
                <ReferenceLine yAxisId="right" y={0.8} stroke={chartPalette.red} strokeDasharray="4 4" />
                <Bar yAxisId="left" dataKey="sales2025" radius={[10, 10, 0, 0]}>
                  {pareto.map((entry) => <Cell key={entry.network} fill={entry.isClassA ? chartPalette.navy : chartPalette.slate} />)}
                </Bar>
                <Line yAxisId="right" type="monotone" dataKey="cumulativeShare" stroke={chartPalette.teal} strokeWidth={3} dot={{ r: 3, fill: chartPalette.teal }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </SlideFrame>
  );
}

function ClientSlide({ index, total }: { index: number; total: number }) {
  const { overview, references, scatter } = reportData;
  const highlightedNetworks = [
    references.gpa.network,
    references.stMarche.network,
    references.mQualidade.network,
    references.db.network,
  ];

  return (
    <SlideFrame
      eyebrow="Análise por Cliente"
      title="O desempenho varia mais por perfil de rede do que por porte."
      summary="Cada cliente combina volume, preço, sortimento e crescimento de maneira distinta. A comparação conjunta é o que torna a leitura útil."
      index={index}
      total={total}
    >
      <MetricStrip
        items={[
          {
            label: 'Maior ticket por loja',
            value: references.dalben.network,
            detail: formatCurrency(references.dalben.ticketActive2025),
            emphasis: 'brand',
          },
          {
            label: 'Maior volume',
            value: references.gpa.network,
            detail: `${formatNumber(references.gpa.qty2025)} unidades`,
          },
          {
            label: 'Maior sortimento',
            value: references.daolio.network,
            detail: `${formatNumber(references.daolio.sort2025)} SKUs`,
            emphasis: 'muted',
          },
          {
            label: 'Maior ganho absoluto',
            value: references.stMarche.network,
            detail: formatSignedCurrency(references.stMarche.growthAbs),
            emphasis: 'accent',
          },
        ]}
      />
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <ChartCard compact question="Preço mais alto acelera crescimento?" title="Preço médio x crescimento por rede" description="A dispersão compara preço médio e crescimento para mostrar que a correlação entre os dois é fraca.">
          <div className="h-[18rem] xl:h-[22rem]">
            <PriceGrowthScatterChart
              data={scatter}
              medianPrice={overview.scatterMedianPrice}
              medianGrowth={overview.scatterMedianGrowth}
              highlightedNetworks={highlightedNetworks}
            />
          </div>
        </ChartCard>
        <div className="grid gap-4 content-start">
          <InsightBlock compact title="Maior crescimento %" accent="success">
            <p><strong className="font-semibold text-[var(--ink)]">{references.mQualidade.network}</strong> avançou <strong className="font-semibold text-[var(--ink)]">{formatPercent(references.mQualidade.growthPct)}</strong>.</p>
          </InsightBlock>
          <InsightBlock compact title="Maior preço médio" accent="amber">
            <p><strong className="font-semibold text-[var(--ink)]">{references.db.network}</strong> lidera com <strong className="font-semibold text-[var(--ink)]">{formatCurrency(references.db.price2025, 2)}</strong> por item.</p>
          </InsightBlock>
          <InsightBlock compact title="Correlação" accent="teal">
            <p><strong className="font-semibold text-[var(--ink)]">Preço x crescimento</strong> registra correlação de <strong className="font-semibold text-[var(--ink)]">{formatRatio(overview.scatterCorrelation, 4)}</strong>.</p>
          </InsightBlock>
          <InsightBlock compact title="Leitura principal" accent="brand">
            <p><strong className="font-semibold text-[var(--ink)]">Preço não explica sozinho o avanço.</strong> A rede que mais cresce não é a de maior preço médio.</p>
          </InsightBlock>
        </div>
      </div>
    </SlideFrame>
  );
}

function CategorySlide({ index, total }: { index: number; total: number }) {
  const { categoryGrowth, categoryPrice, categoryRevenue, overview } = reportData;

  return (
    <SlideFrame
      eyebrow="Dimensão de Negócio"
      title="Categoria é a melhor lente para explicar o desempenho."
      summary="Esse recorte organiza escala, crescimento e preço de forma comparável, sem perder clareza executiva."
      index={index}
      total={total}
    >
      <MetricStrip
        columns={3}
        items={[
          {
            label: 'Maior receita',
            value: overview.topCategory.category,
            detail: `${formatCompactCurrency(overview.topCategory.sales2025)} em 2025.`,
            emphasis: 'brand',
          },
          {
            label: 'Maior crescimento %',
            value: overview.fastestCategory.category,
            detail: formatPercent(overview.fastestCategory.growthPct),
            emphasis: 'accent',
          },
          {
            label: 'Maior alta de preço',
            value: overview.strongestPriceCategory.category,
            detail: formatSignedPercent(overview.strongestPriceCategory.priceGrowthPct),
            emphasis: 'muted',
          },
        ]}
      />
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <ChartCard compact question="Quais categorias concentram receita?" title="Receita por categoria" description="Comparação direta entre 2024 e 2025 para leitura de escala.">
          <div className="h-[15rem] xl:h-[16rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...categoryRevenue].sort((left, right) => right.sales2025 - left.sales2025)} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={72} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string, name: string) => [formatCurrency(Number(value)), name === 'sales2024' ? 'Receita 2024' : 'Receita 2025']} />
                <Bar dataKey="sales2024" fill={chartPalette.slateSoft} radius={[6, 6, 0, 0]} />
                <Bar dataKey="sales2025" fill={chartPalette.navy} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard compact question="Quais categorias crescem mais?" title="Crescimento por categoria" description="Ranking percentual para destacar aceleração relativa.">
          <div className="h-[15rem] xl:h-[16rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...categoryGrowth].sort((left, right) => right.growthPct - left.growthPct)} layout="vertical" margin={{ top: 8, right: 8, left: 18, bottom: 0 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatPercent(Number(value), 0)} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={88} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatPercent(Number(value)), 'Crescimento']} />
                <Bar dataKey="growthPct" fill={chartPalette.teal} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-4">
        <ChartCard compact question="Onde o preço mudou?" title="Preço médio por categoria" description="Dumbbell 2024 x 2025 para leitura direta da variação por categoria.">
          <div className="h-[19rem] xl:h-[20rem]">
            <CategoryPriceDumbbellChart data={categoryPrice} />
          </div>
        </ChartCard>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <InsightBlock title="Escala" accent="brand">
          <p><strong className="font-semibold text-[var(--ink)]">SALADAS</strong> concentra a maior receita do portfólio e ainda cresce em ritmo saudável.</p>
        </InsightBlock>
        <InsightBlock title="Pressão de preço" accent="danger">
          <p><strong className="font-semibold text-[var(--ink)]">IN NATURA</strong> e <strong className="font-semibold text-[var(--ink)]">COUVE</strong> cresceram com perda de preço médio, o que pede atenção de margem.</p>
        </InsightBlock>
        <InsightBlock title="Melhor equilíbrio" accent="success">
          <p><strong className="font-semibold text-[var(--ink)]">TEMPEROS</strong> combina ganho de volume com melhora de preço e representa a dinâmica mais equilibrada do slide.</p>
        </InsightBlock>
      </div>
    </SlideFrame>
  );
}

function YoYOverviewSlide({ index, total }: { index: number; total: number }) {
  const { overview } = reportData;

  return (
    <SlideFrame
      eyebrow="Year over Year I"
      title="O crescimento de 2025 veio quase todo de volume."
      summary="A receita subiu 24,04%, muito próxima do avanço de volume. Preço médio e sortimento tiveram papel limitado na expansão."
      index={index}
      total={total}
    >
      <MetricStrip
        items={[
          {
            label: 'Receita',
            value: formatCurrency(overview.revenue.value2025),
            detail: `${formatPercent(overview.revenue.variationPct)} vs. 2024`,
            emphasis: 'brand',
          },
          {
            label: 'Volume',
            value: formatNumber(overview.volume.value2025),
            detail: `${formatPercent(overview.volume.variationPct)} vs. 2024`,
          },
          {
            label: 'Preço médio',
            value: formatCurrency(overview.averagePrice.value2025, 2),
            detail: `${formatPercent(overview.averagePrice.variationPct)} vs. 2024`,
            emphasis: 'muted',
          },
          {
            label: 'Sortimento',
            value: formatNumber(overview.assortment.value2025),
            detail: 'Portfólio estável no consolidado.',
            emphasis: 'muted',
          },
        ]}
      />
      <div className="mt-5 grid gap-4 xl:grid-cols-4">
        <KpiCard
          compact
          label="Receita incremental"
          value={formatSignedCurrency(overview.revenue.variationAbs)}
          detail="Incremento absoluto versus 2024."
          tone="brand"
        />
        <KpiCard
          compact
          label="Volume incremental"
          value={formatNumber(overview.volume.variationAbs)}
          detail="Unidades adicionais versus 2024."
          tone="accent"
        />
        <InsightBlock compact title="Mecânica" accent="teal">
          <p><strong className="font-semibold text-[var(--ink)]">Receita e volume caminharam juntos.</strong> O ganho de preço foi marginal.</p>
        </InsightBlock>
        <InsightBlock compact title="Leitura principal" accent="amber">
          <p><strong className="font-semibold text-[var(--ink)]">O avanço não veio de ampliar portfólio.</strong> O consolidado cresceu com base na execução do mix atual.</p>
        </InsightBlock>
      </div>
    </SlideFrame>
  );
}

function YoYDriversSlide({ index, total }: { index: number; total: number }) {
  const { drivers, overview } = reportData;
  const sortedDrivers = [...drivers].sort((left, right) => right.growthAbs - left.growthAbs);
  const topPositive = [...overview.positiveDrivers]
    .sort((left, right) => right.growthAbs - left.growthAbs)
    .slice(0, 3);
  const topNegative = [...overview.negativeDrivers]
    .sort((left, right) => left.growthAbs - right.growthAbs)
    .slice(0, 3);

  return (
    <SlideFrame
      eyebrow="Year over Year II"
      title="O avanço ficou concentrado em poucas redes."
      summary="Os principais ganhos e perdas vieram de um grupo pequeno de contas, reforçando a dependência da carteira."
      index={index}
      total={total}
    >
      <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <ChartCard compact question="Quais redes explicam o YoY?" title="Impacto YoY por rede" description="Barras positivas mostram quem puxou o crescimento; barras negativas mostram onde houve retração.">
          <div className="h-[19rem] xl:h-[22rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedDrivers} layout="vertical" margin={{ top: 6, right: 10, left: 20, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <YAxis type="category" dataKey="network" tickLine={false} axisLine={false} width={106} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedCurrency(Number(value)), 'Impacto']} labelFormatter={(label) => `Rede: ${label}`} />
                <Bar dataKey="growthAbs" radius={[0, 8, 8, 0]}>
                  {sortedDrivers.map((entry) => <Cell key={entry.network} fill={entry.growthAbs >= 0 ? chartPalette.success : chartPalette.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <div className="grid gap-4 content-start">
          <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border-strong)] bg-white/30">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--success)]">
                Quem puxou o crescimento
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {topPositive.map((row) => (
                <div key={row.network} className="flex items-start justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--ink)]">{row.network}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{formatSignedPercent(row.growthPct)} versus 2024</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-[var(--success)]">{formatSignedCurrency(row.growthAbs)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border-strong)] bg-white/30">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--danger)]">
                Quem freou o resultado
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {topNegative.map((row) => (
                <div key={row.network} className="flex items-start justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--ink)]">{row.network}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{formatSignedPercent(row.growthPct)} versus 2024</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-[var(--danger)]">{formatSignedCurrency(row.growthAbs)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function YoYCategoriesSlide({ index, total }: { index: number; total: number }) {
  const { categoryImpact, overview } = reportData;
  const sortedCategoryImpact = [...categoryImpact].sort((left, right) => right.growthAbs - left.growthAbs);

  return (
    <SlideFrame
      eyebrow="Year over Year III"
      title="Todas as categorias cresceram em valor em 2025."
      summary="SALADAS lidera a contribuição absoluta, enquanto TEMPEROS se destaca pela aceleração percentual."
      index={index}
      total={total}
    >
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.16fr_0.84fr]">
        <ChartCard compact question="Quais categorias sustentaram o YoY?" title="Impacto YoY por categoria" description="Leitura do ganho absoluto de receita por categoria em 2025 versus 2024.">
          <div className="h-[18rem] xl:h-[22rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedCategoryImpact} layout="vertical" margin={{ top: 6, right: 10, left: 20, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={110} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedCurrency(Number(value)), 'Impacto']} labelFormatter={(label) => `Categoria: ${label}`} />
                <Bar dataKey="growthAbs" radius={[0, 8, 8, 0]}>
                  {sortedCategoryImpact.map((entry) => <Cell key={entry.category} fill={entry.growthAbs >= 0 ? chartPalette.success : chartPalette.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <div className="grid gap-4 content-start">
          <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border-strong)] bg-white/30">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Maiores contribuições
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {sortedCategoryImpact.slice(0, 4).map((row) => (
                <div key={row.category} className="flex items-start justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--ink)]">{row.category}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{formatSignedPercent(row.growthPct)} versus 2024</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-[var(--brand)]">{formatSignedCurrency(row.growthAbs)}</p>
                </div>
              ))}
            </div>
          </div>
          <InsightBlock compact title="Leitura central" accent="teal">
            <p><strong className="font-semibold text-[var(--ink)]">Nenhuma categoria caiu em valor absoluto.</strong> O crescimento foi disseminado no portfólio.</p>
          </InsightBlock>
          <InsightBlock compact title="Maior crescimento %" accent="amber">
            <p><strong className="font-semibold text-[var(--ink)]">{overview.fastestCategory.category}</strong> lidera a expansão percentual entre as categorias.</p>
          </InsightBlock>
        </div>
      </div>
    </SlideFrame>
  );
}

function RemunerationSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideFrame
      eyebrow="Remuneração Variável"
      title="O incentivo precisa premiar crescimento com qualidade."
      summary="A proposta separa expansão real de volume, disciplina de preço, ganho de sortimento e execução de mix."
      index={index}
      total={total}
    >
      <MetricStrip
        items={[
          {
            label: 'Volume comparável',
            value: '40%',
            detail: 'Premia expansão real de vendas.',
            emphasis: 'brand',
          },
          {
            label: 'Preço',
            value: '30%',
            detail: 'Evita crescimento via desconto excessivo.',
          },
          {
            label: 'Sortimento',
            value: '20%',
            detail: 'Aumenta penetração de portfólio.',
            emphasis: 'muted',
          },
          {
            label: 'Mix',
            value: '10%',
            detail: 'Reduz concentração em poucos produtos.',
            emphasis: 'accent',
          },
        ]}
      />
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <InsightBlock compact title="Princípio" accent="brand">
          <p><strong className="font-semibold text-[var(--ink)]">Pagar por qualidade de crescimento</strong>, e não apenas por volume vendido.</p>
        </InsightBlock>
        <InsightBlock compact title="Lógica" accent="teal">
          <p>Volume premia expansão, preço protege valor, sortimento amplia penetração e mix melhora execução.</p>
        </InsightBlock>
        <InsightBlock compact title="Governança" accent="amber">
          <p><strong className="font-semibold text-[var(--ink)]">Clientes novos devem ser medidos à parte</strong>, e ganho de sortimento só deve contar com recorrência mínima.</p>
        </InsightBlock>
        <InsightBlock compact title="Regra crítica" accent="danger">
          <p><strong className="font-semibold text-[var(--ink)]">Preço precisa de piso mínimo</strong> para evitar pagamento integral com erosão de valor.</p>
        </InsightBlock>
      </div>
    </SlideFrame>
  );
}

export const deckSlides: DeckSlideDefinition[] = [
  { id: 'cover', label: 'Capa', component: CoverSlide },
  {
    id: 'pareto',
    label: 'Pareto',
    agendaLabel: 'Concentração de faturamento (Curva ABC / Pareto)',
    coverAgendaLabel: 'Concentração de faturamento (Curva ABC / Pareto)',
    component: ParetoSlide,
  },
  {
    id: 'clients',
    label: 'Clientes',
    agendaLabel: 'Análise comparativa por cliente',
    coverAgendaLabel: 'Análise comparativa por cliente',
    component: ClientSlide,
  },
  {
    id: 'dimension',
    label: 'Dimensão',
    agendaLabel: 'Análise direcionada por dimensão de negócio',
    coverAgendaLabel: 'Análise direcionada por dimensão de negócio',
    component: CategorySlide,
  },
  {
    id: 'yoy-overview',
    label: 'YoY I',
    agendaLabel: 'Análise de crescimento de vendas (YoY) - visão consolidada',
    coverAgendaLabel: 'Análise de crescimento de vendas (YoY)',
    component: YoYOverviewSlide,
  },
  {
    id: 'yoy-drivers',
    label: 'YoY II',
    agendaLabel: 'Análise de crescimento de vendas (YoY) - drivers por rede',
    coverAgendaLabel: 'Análise de crescimento de vendas (YoY)',
    component: YoYDriversSlide,
  },
  {
    id: 'yoy-categories',
    label: 'YoY III',
    agendaLabel: 'Análise de crescimento de vendas (YoY) - categorias',
    coverAgendaLabel: 'Análise de crescimento de vendas (YoY)',
    component: YoYCategoriesSlide,
  },
  {
    id: 'compensation',
    label: 'Remuneração',
    agendaLabel: 'Proposta de modelo de remuneração variável',
    coverAgendaLabel: 'Proposta de modelo de remuneração variável',
    component: RemunerationSlide,
  },
];
