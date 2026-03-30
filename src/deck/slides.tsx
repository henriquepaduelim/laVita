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
      title="Receita de 2025 concentrada em poucas redes."
      summary="As 10 maiores contas respondem por 81,17% do faturamento."
      index={index}
      total={total}
    >
      <div className="grid gap-4 xl:grid-cols-[0.68fr_1.32fr]">
        <div className="content-start">
          <article className="panel rounded-[1.65rem] border border-[var(--border-strong)] bg-white/30 p-4 shadow-none">
            <div className="rounded-[1rem] border border-[rgba(58,143,18,0.14)] bg-[rgba(58,143,18,0.06)] px-3 py-3">
              <p className="mt-1.5 text-[0.95rem] leading-5 text-[var(--ink)]">
                <strong className="font-semibold">{overview.paretoClassACount} redes concentram {formatPercent(overview.paretoClassAShare)}</strong> da receita de 2025 e exigem gestão comercial dedicada.
              </p>
            </div>

            <div className="mt-3 overflow-hidden rounded-[1.1rem] border border-[var(--border)] bg-white/42">
              <div className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] gap-3 border-b border-[var(--border)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                <p>Pos.</p>
                <p>Rede</p>
                <p className="text-right">Share</p>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {topPriorityNetworks.map((row, rowIndex) => (
                  <div key={row.network} className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] items-center gap-3 px-4 py-2.5">
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
            </div>

            <div className="mt-3 border-t border-[var(--border)] pt-3">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                Implicação
              </p>
              <p className="mt-1.5 text-[0.9rem] leading-5 text-[var(--ink)]">
                <strong className="font-semibold">Classe A é carteira estratégica.</strong> A cauda longa deve ser trabalhada para ganho de mix e cobertura.
              </p>
            </div>
          </article>
        </div>
        <ChartCard compact title="Curva ABC de faturamento" description="Receita por rede e participação acumulada.">
          <div className="h-[21rem] xl:h-[25rem]">
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
                <ReferenceLine yAxisId="right" y={0.8} stroke={chartPalette.red} strokeDasharray="4 4" label={{ value: 'Limite Classe A — 80%', position: 'insideTopLeft', fontSize: 10, fill: chartPalette.red }} />
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
      title="Desempenho segue perfil, não porte."
      summary="Volume, preço, sortimento e crescimento precisam ser lidos em conjunto."
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
        <ChartCard compact title="Preço médio x crescimento por rede" description="Correlação entre preço e crescimento.">
          <div className="h-[18rem] xl:h-[22rem]">
            <PriceGrowthScatterChart
              data={scatter}
              medianPrice={overview.scatterMedianPrice}
              medianGrowth={overview.scatterMedianGrowth}
              highlightedNetworks={highlightedNetworks}
            />
          </div>
        </ChartCard>
        <div className="content-start border-t border-[var(--border)] pt-4">
          <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Pontos-chave
          </p>
          <ul className="mt-4 space-y-4 text-[0.98rem] leading-6 text-[var(--ink)]">
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--success)]" />
              <p>
                <strong className="font-semibold">{references.mQualidade.network}</strong> registrou o maior crescimento percentual, com
                {' '}
                <strong className="font-semibold">{formatPercent(references.mQualidade.growthPct)}</strong>.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--warning)]" />
              <p>
                <strong className="font-semibold">{references.db.network}</strong> tem o maior preço médio, em
                {' '}
                <strong className="font-semibold">{formatCurrency(references.db.price2025, 2)}</strong>
                {' '}
                por item.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <p>
                A correlação entre preço e crescimento é
                {' '}
                <strong className="font-semibold">{formatRatio(overview.scatterCorrelation, 2)}</strong>,
                {' '}
                indicando relação fraca.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
              <p>
                As redes destacadas no quadrante superior mostram que o avanço depende da combinação de preço, execução e sortimento.
              </p>
            </li>
          </ul>
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
      title="Categoria revela escala, preço e crescimento."
      summary="O recorte por categoria organiza a leitura do desempenho."
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
      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        <ChartCard compact title="Receita por categoria" description="2024 x 2025.">
          <div className="h-[18rem] xl:h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...categoryRevenue].sort((left, right) => right.sales2025 - left.sales2025)} layout="vertical" margin={{ top: 6, right: 10, left: 8, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string, name: string) => [formatCurrency(Number(value)), name === 'sales2024' ? 'Receita 2024' : 'Receita 2025']} />
                <Legend formatter={(value: string) => value === 'sales2024' ? 'Receita 2024' : 'Receita 2025'} />
                <Bar dataKey="sales2024" fill={chartPalette.slateSoft} radius={[0, 4, 4, 0]} />
                <Bar dataKey="sales2025" fill={chartPalette.navy} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard compact title="Crescimento por categoria" description="Ranking percentual.">
          <div className="h-[18rem] xl:h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...categoryGrowth].sort((left, right) => right.growthPct - left.growthPct)} layout="vertical" margin={{ top: 6, right: 10, left: 8, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatPercent(Number(value), 0)} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatPercent(Number(value)), 'Crescimento']} />
                <Bar dataKey="growthPct" fill={chartPalette.teal} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard compact title="Variação de preço" description="Variação % do preço médio por categoria.">
          <div className="h-[18rem] xl:h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...categoryPrice].sort((left, right) => right.priceGrowthPct - left.priceGrowthPct)} layout="vertical" margin={{ top: 6, right: 10, left: 8, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatSignedPercent(Number(value), 0)} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedPercent(Number(value)), 'Variação de preço']} />
                <ReferenceLine x={0} stroke={chartPalette.slate} strokeDasharray="3 3" />
                <Bar dataKey="priceGrowthPct" radius={[0, 8, 8, 0]}>
                  {[...categoryPrice].sort((left, right) => right.priceGrowthPct - left.priceGrowthPct).map((entry) => (
                    <Cell key={entry.category} fill={entry.priceGrowthPct >= 0 ? chartPalette.amber : chartPalette.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        <InsightBlock compact title="Escala" accent="brand">
          <p><strong className="font-semibold text-[var(--ink)]">SALADAS</strong> lidera a receita e mantém crescimento saudável.</p>
        </InsightBlock>
        <InsightBlock compact title="Pressão de preço" accent="danger">
          <p><strong className="font-semibold text-[var(--ink)]">IN NATURA</strong> e <strong className="font-semibold text-[var(--ink)]">COUVE</strong> cresceram com perda de preço.</p>
        </InsightBlock>
        <InsightBlock compact title="Equilíbrio" accent="success">
          <p><strong className="font-semibold text-[var(--ink)]">TEMPEROS</strong> combina ganho de volume e melhora de preço.</p>
        </InsightBlock>
      </div>
    </SlideFrame>
  );
}

function YoYOverviewSlide({ index, total }: { index: number; total: number }) {
  const { overview } = reportData;
  const yoySnapshot = [
    {
      metric: 'Receita',
      value: formatCurrency(overview.revenue.value2025),
      variation: overview.revenue.variationPct,
      tone: chartPalette.navy,
    },
    {
      metric: 'Volume',
      value: formatNumber(overview.volume.value2025),
      variation: overview.volume.variationPct,
      tone: chartPalette.teal,
    },
    {
      metric: 'Preço médio',
      value: formatCurrency(overview.averagePrice.value2025, 2),
      variation: overview.averagePrice.variationPct,
      tone: chartPalette.amber,
    },
    {
      metric: 'Sortimento',
      value: formatNumber(overview.assortment.value2025),
      variation: overview.assortment.variationPct,
      tone: chartPalette.slate,
    },
  ];
  const yoyComparison = [
    { metric: 'Receita', base: 100, idx: Math.round(100 * (1 + overview.revenue.variationPct)), tone: chartPalette.navy },
    { metric: 'Volume', base: 100, idx: Math.round(100 * (1 + overview.volume.variationPct)), tone: chartPalette.teal },
    { metric: 'Preço médio', base: 100, idx: Math.round(100 * (1 + overview.averagePrice.variationPct)), tone: chartPalette.amber },
    { metric: 'Sortimento', base: 100, idx: Math.round(100 * (1 + overview.assortment.variationPct)), tone: chartPalette.slate },
  ];

  return (
    <SlideFrame
      eyebrow="Year over Year I"
      title="Crescimento de 2025 veio quase todo de volume."
      summary="Preço subiu marginalmente; portfólio estável."
      index={index}
      total={total}
    >
      <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-4 content-start">
          <article className="panel-strong rounded-[1.9rem] border p-5 lg:p-6">
            <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/70">
              Ganho absoluto de receita
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-[2.15rem] font-semibold tracking-tight text-white lg:text-[2.6rem]">
                  {formatSignedCurrency(overview.revenue.variationAbs)}
                </p>
                <p className="mt-2 text-[0.94rem] leading-6 text-white/78">
                  Receita de 2025 fechou em {formatCurrency(overview.revenue.value2025)}.
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-white/10 bg-white/8 px-4 py-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/66">
                  Volume incremental
                </p>
                <p className="font-display mt-1 text-[1.55rem] font-semibold text-white">
                  {formatNumber(overview.volume.variationAbs)}
                </p>
                <p className="mt-1 text-[0.82rem] text-white/72">unidades adicionais</p>
              </div>
            </div>
          </article>

          <article className="panel rounded-[1.8rem] p-5">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
              <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Quadro-resumo
              </p>
              <p className="text-[0.76rem] text-[var(--ink-soft)]">2025 vs. 2024</p>
            </div>
            <div className="mt-2 divide-y divide-[var(--border)]">
              {yoySnapshot.map((row) => (
                <div key={row.metric} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 py-3">
                  <p className="font-display text-[0.92rem] font-medium text-[var(--ink)]">{row.metric}</p>
                  <p className="text-right text-[0.92rem] font-semibold text-[var(--ink)]">{row.value}</p>
                  <p className="text-right text-[0.9rem] font-semibold" style={{ color: row.tone }}>
                    {formatSignedPercent(row.variation)}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="grid gap-4 content-start">
          <ChartCard compact title="Mecânica do crescimento" description="2024 = base 100 — comparativo indexado por vetor.">
            <div className="h-[15rem] xl:h-[17rem]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={yoyComparison}
                  margin={{ top: 8, right: 18, left: 10, bottom: 0 }}
                  barCategoryGap={22}
                  barGap={3}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="metric" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={36} domain={[0, 140]} tickFormatter={(value: number | string) => String(Number(value))} />
                  <Tooltip
                    contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }}
                    formatter={(value: number | string, name: string) => [
                      name === 'base' ? '100' : `${value} (+${Number(value) - 100}%)`,
                      name === 'base' ? '2024 (base)' : '2025 (índice)',
                    ]}
                  />
                  <Legend formatter={(value: string) => value === 'base' ? '2024 (base = 100)' : '2025 (índice)'} />
                  <ReferenceLine y={100} stroke={chartPalette.slate} strokeDasharray="4 3" label={{ value: 'base 2024', position: 'insideTopRight', fontSize: 10, fill: '#7a8a98' }} />
                  <Bar dataKey="base" fill={chartPalette.slateSoft} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="idx" radius={[6, 6, 0, 0]}>
                    {yoyComparison.map((row) => (
                      <Cell key={row.metric} fill={row.tone} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="grid gap-3 xl:grid-cols-3">
            <div className="border-t border-[var(--border)] pt-3">
              <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Principal driver
              </p>
              <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-6 text-[var(--ink)]">
                <li className="flex gap-3">
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <p>
                    <strong className="font-semibold">Volume cresceu {formatSignedPercent(overview.volume.variationPct)}</strong> e sustentou o avanço da receita.
                  </p>
                </li>
              </ul>
            </div>
            <div className="border-t border-[var(--border)] pt-3">
              <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--warning)]">
                Papel do preço
              </p>
              <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-6 text-[var(--ink)]">
                <li className="flex gap-3">
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--warning)]" />
                  <p>
                    <strong className="font-semibold">Preço médio subiu só {formatSignedPercent(overview.averagePrice.variationPct)}</strong>, com contribuição marginal.
                  </p>
                </li>
              </ul>
            </div>
            <div className="border-t border-[var(--border)] pt-3">
              <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                Portfólio
              </p>
              <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-6 text-[var(--ink)]">
                <li className="flex gap-3">
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--ink-soft)]" />
                  <p>
                    <strong className="font-semibold">Sortimento permaneceu em {formatNumber(overview.assortment.value2025)} itens</strong>, sem explicar o crescimento.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
      title="Poucas redes explicam o crescimento de 2025."
      summary="Top 3 impulsionadores e top 3 detratores por impacto absoluto."
      index={index}
      total={total}
    >
      <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <ChartCard compact title="Impacto YoY por rede" description="Impacto absoluto por rede.">
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
                Impulsionadores
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {topPositive.map((row) => (
                <div key={row.network} className="flex items-start justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--ink)]">{row.network}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{formatSignedPercent(row.growthPct)}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-[var(--success)]">{formatSignedCurrency(row.growthAbs)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border-strong)] bg-white/30">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--danger)]">
                Detratores
              </p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {topNegative.map((row) => (
                <div key={row.network} className="flex items-start justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--ink)]">{row.network}</p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{formatSignedPercent(row.growthPct)}</p>
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
  const sortedByAbs = [...categoryImpact].sort((left, right) => right.growthAbs - left.growthAbs);
  const sortedByPct = [...categoryImpact].sort((left, right) => right.growthPct - left.growthPct);

  return (
    <SlideFrame
      eyebrow="Year over Year III"
      title="Todas as categorias cresceram em valor em 2025."
      summary="SALADAS lidera em impacto absoluto; GOURMET em crescimento percentual."
      index={index}
      total={total}
    >
      <MetricStrip
        columns={3}
        items={[
          {
            label: 'Crescimento total',
            value: formatSignedCurrency(overview.revenue.variationAbs),
            detail: 'Incremento vs 2024.',
            emphasis: 'brand',
          },
          {
            label: 'Maior contribuição absoluta',
            value: sortedByAbs[0]?.category ?? '—',
            detail: formatSignedCurrency(sortedByAbs[0]?.growthAbs ?? 0),
            emphasis: 'accent',
          },
          {
            label: 'Maior crescimento %',
            value: overview.fastestCategory.category,
            detail: formatSignedPercent(overview.fastestCategory.growthPct),
            emphasis: 'muted',
          },
        ]}
      />
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ChartCard compact title="Impacto absoluto por categoria" description="Crescimento em R$ — quem mais contribuiu.">
          <div className="h-[18rem] xl:h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedByAbs} layout="vertical" margin={{ top: 6, right: 10, left: 20, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedCurrency(Number(value)), 'Impacto']} labelFormatter={(label) => `Categoria: ${label}`} />
                <Bar dataKey="growthAbs" radius={[0, 8, 8, 0]}>
                  {sortedByAbs.map((entry) => <Cell key={entry.category} fill={entry.growthAbs >= 0 ? chartPalette.success : chartPalette.red} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard compact title="Crescimento % por categoria" description="Taxa de crescimento — quem cresceu mais rápido.">
          <div className="h-[18rem] xl:h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedByPct} layout="vertical" margin={{ top: 6, right: 10, left: 20, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatPercent(Number(value), 0)} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedPercent(Number(value)), 'Crescimento']} labelFormatter={(label) => `Categoria: ${label}`} />
                <Bar dataKey="growthPct" fill={chartPalette.teal} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        <InsightBlock compact title="Nenhuma caiu" accent="teal">
          <p>Todas as categorias cresceram em valor absoluto em 2025.</p>
        </InsightBlock>
        <InsightBlock compact title="Maior escala" accent="brand">
          <p><strong className="font-semibold text-[var(--ink)]">{sortedByAbs[0]?.category}</strong> concentrou o maior impacto em R$.</p>
        </InsightBlock>
        <InsightBlock compact title="Maior velocidade" accent="success">
          <p><strong className="font-semibold text-[var(--ink)]">{overview.fastestCategory.category}</strong> liderou em % apesar da escala menor.</p>
        </InsightBlock>
      </div>
    </SlideFrame>
  );
}

function RemunerationSlide({ index, total }: { index: number; total: number }) {
  const incentiveComposition = [
    {
      label: 'Volume comparável',
      weight: 40,
      rationale: 'Premia expansão real de vendas.',
      fill: chartPalette.navy,
    },
    {
      label: 'Preço',
      weight: 30,
      rationale: 'Evita crescimento via desconto excessivo.',
      fill: chartPalette.teal,
    },
    {
      label: 'Sortimento',
      weight: 20,
      rationale: 'Incentiva aumento de penetração e portfólio.',
      fill: chartPalette.amber,
    },
    {
      label: 'Mix',
      weight: 10,
      rationale: 'Ajuda a evitar concentração em poucos produtos.',
      fill: chartPalette.slate,
    },
  ];
  const stackedComposition = [
    incentiveComposition.reduce<Record<string, string | number>>(
      (acc, item) => {
        acc[item.label] = item.weight;
        return acc;
      },
      { bucket: 'Composição' },
    ),
  ];

  return (
    <SlideFrame
      eyebrow="Remuneração Variável"
      title="Proposta para crescimento com disciplina comercial."
      index={index}
      total={total}
    >
      <div className="grid gap-5 xl:grid-cols-[1.14fr_0.86fr]">
        <article className="panel rounded-[1.9rem] p-5 lg:p-6">
          <div className="max-w-[34rem]">
            <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Estrutura de pesos
            </p>
            <h3 className="font-display mt-2 text-[1.42rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--ink)] lg:text-[1.66rem]">
              40% volume comparável YoY, 30% disciplina de preço, 20% crescimento de sortimento por cliente e 10% execução de mix em clientes foco.
            </h3>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-white/56 p-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              Composição do bônus
            </p>

            <div className="chart-grid mt-4 h-[5.5rem]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stackedComposition}
                  layout="vertical"
                  margin={{ top: 6, right: 6, left: 6, bottom: 6 }}
                  barSize={34}
                >
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="bucket" hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }}
                    formatter={(value: number | string, name: string) => [`${value}%`, name]}
                    cursor={{ fill: 'rgba(15,27,42,0.04)' }}
                  />
                  {incentiveComposition.map((item, index) => (
                    <Bar
                      key={item.label}
                      dataKey={item.label}
                      stackId="composition"
                      fill={item.fill}
                      radius={
                        index === 0
                          ? [10, 0, 0, 10]
                          : index === incentiveComposition.length - 1
                            ? [0, 10, 10, 0]
                            : [0, 0, 0, 0]
                      }
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {incentiveComposition.map((item) => (
                <div key={item.label} className="rounded-[0.9rem] border border-[var(--border)] bg-white/72 px-3 py-3 text-center">
                  <p className="font-display text-[1.14rem] font-semibold leading-none" style={{ color: item.fill }}>
                    {item.weight}%
                  </p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-white/56">
            <div className="grid grid-cols-[1.15fr_1.85fr] gap-0 border-b border-[var(--border)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              <p>Componente</p>
              <p>Racional</p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {incentiveComposition.map((item) => (
                <div key={item.label} className="grid grid-cols-[1.15fr_1.85fr] items-center gap-0 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <p className="font-display text-[0.95rem] font-medium text-[var(--ink)]">{item.label}</p>
                  </div>
                  <p className="text-[0.88rem] leading-5 text-[var(--ink-soft)]">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="panel rounded-[1.9rem] p-5 lg:p-6">
          <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Objetivo e governança
          </p>
          <div className="border-b border-[var(--border)] pb-4">
            
            <ul className="mt-3 space-y-2.5 text-[0.98rem] leading-6 text-[var(--ink)]">
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                <p>Remunerar crescimento com qualidade.</p>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <p>Considerar simultaneamente crescimento de volume, disciplina de preço e aumento de sortimento.</p>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              Regras de governança recomendadas
            </p>
            <ul className="mt-3 space-y-3 text-[0.98rem] leading-6 text-[var(--ink)]">
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <p>Clientes novos devem ser medidos separadamente de clientes comparáveis.</p>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--warning)]" />
                <p>Crescimento baseado apenas em desconto deve ter redutor.</p>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--ink-soft)]" />
                <p>Ganho de sortimento só deve contar com recorrência mínima.</p>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]" />
                <p>O componente de preço deve ter piso mínimo de elegibilidade.</p>
              </li>
            </ul>
          </div>
        </article>
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
