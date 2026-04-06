import { ReactElement, useState } from 'react';
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
  hideFromAgenda?: boolean;
  component: (props: { index: number; total: number }) => ReactElement;
};

function shortenLabel(label: string | number) {
  const text = String(label);
  return text.length > 10 ? `${text.slice(0, 10)}…` : text;
}

function variationTone(v: number): string {
  if (v > 0) return chartPalette.teal;
  if (v < 0) return chartPalette.red;
  return chartPalette.amber;
}

function buildCoverAgendaItems(slides: DeckSlideDefinition[]) {
  const items: { id: string; label: string }[] = [];

  slides.slice(1).forEach((slide) => {
    if (slide.hideFromAgenda) return;
    const label = slide.coverAgendaLabel ?? slide.agendaLabel ?? slide.label;
    const previous = items.at(-1);

    if (previous?.label === label) return;
    items.push({ id: slide.id, label });
  });

  return items;
}

function CoverSlide({ index, total }: { index: number; total: number }) {
  const { overview, metadata } = reportData;
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
            className="h-auto w-[10.5rem] object-contain"
          />
        </div>

        <div className="grid min-h-0 flex-1 gap-8 xl:grid-cols-[1.04fr_0.96fr]">
          {/* Left: headline + stats */}
          <div className="flex h-full min-h-0 flex-col pb-4 pt-1">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
              <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                Case · Analista Comercial · {metadata.author}
              </p>
              <p className="text-[0.72rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                2024 vs. 2025
              </p>
            </div>
            <div className="mt-6 max-w-[52rem]">
              <h1 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--ink)] lg:max-w-[18ch] lg:text-[2.45rem] xl:text-[2.7rem]">
                2025 cresceu com volume, mas a receita segue concentrada em poucas redes.
              </h1>
              <p className="mt-3 max-w-[36rem] text-[0.92rem] leading-6 text-[var(--ink-soft)] lg:text-[0.98rem]">
                Receita +24,0%, com 81,17% do faturamento nas 10 maiores redes.
              </p>
            </div>

            <div className="mt-auto border-t border-[var(--border)] pt-5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Receita 2025</p>
                  <p className="font-display mt-1.5 text-[1.42rem] font-semibold leading-none text-[var(--ink)]">
                    {formatCurrency(overview.revenue.value2025)}
                  </p>
                </div>
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Crescimento YoY</p>
                  <p className="font-display mt-1.5 text-[1.42rem] font-semibold leading-none text-[var(--ink)]">
                    {formatSignedPercent(overview.revenue.variationPct)}
                  </p>
                </div>
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Crescimento de volume</p>
                  <p className="font-display mt-1.5 text-[1.42rem] font-semibold leading-none text-[var(--ink)]">
                    {formatSignedPercent(overview.volume.variationPct)}
                  </p>
                </div>
                <div>
                  <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">Redes analisadas</p>
                  <p className="font-display mt-1.5 text-[1.42rem] font-semibold leading-none text-[var(--ink)]">
                    {formatNumber(overview.activeNetworksCount)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: agenda */}
          <div className="flex h-full min-h-0 flex-col pb-4 pt-1">
            <div className="pb-3 border-b border-[var(--border)]">
              <p className="font-display text-[0.84rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Agenda
              </p>
            </div>
            <div className="flex min-h-0 flex-1 flex-col divide-y divide-[var(--border)]">
              {agendaItems.map((block, blockIndex) => (
                <Link
                  key={block.id}
                  to={`/?slide=${block.id}`}
                  className="group flex min-h-0 flex-1 items-center gap-4 py-1 transition-opacity duration-200 hover:opacity-60"
                >
                  <div className="font-display min-w-8 text-[1.9rem] font-semibold leading-none text-[var(--brand)] transition-transform duration-200 group-hover:translate-x-0.5">
                    {String(blockIndex + 1).padStart(2, '0')}
                  </div>
                  <p className="font-display text-[1.08rem] font-medium leading-[1.28] tracking-[-0.014em] text-[var(--ink)] lg:text-[1.15rem]">
                    {block.label}
                  </p>
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
  const [selectedYear, setSelectedYear] = useState<'2024' | '2025'>('2025');
  const { pareto, paretoByYear, overview } = reportData;
  const paretoChartData = paretoByYear[selectedYear];
  const topPriorityNetworks = pareto.filter((row) => row.isClassA).slice(0, 5);
  const methodologySteps = [
    'Somar o faturamento por rede em 2025.',
    'Ordenar do maior para o menor.',
    'Calcular o share de cada rede.',
    'Acumular os percentuais.',
    'Classe A: redes até o corte de 80%.',
  ];

  return (
    <SlideFrame
      eyebrow="Concentração de Receita"
      title="Curva ABC / Pareto"
      summary="Top 10 = 81,17% do faturamento."
      index={index}
      total={total}
    >
      <div className="grid h-full min-h-0 gap-3 xl:grid-cols-[0.68fr_1.32fr]">
        {/* Left column — self-start so it shrinks to content, no empty stretch */}
        <div className="flex flex-col gap-2 self-start">
          {/* Insight */}
          <div className="rounded-xl border border-[rgba(58,143,18,0.18)] bg-[rgba(58,143,18,0.06)] px-3 py-2.5">
            <p className="text-[0.88rem] leading-[1.4] text-[var(--ink)]">
              <strong className="font-semibold">{overview.paretoClassACount} redes respondem por {formatPercent(overview.paretoClassAShare)}</strong> do faturamento em 2025.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white/42">
            <div className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] gap-3 border-b border-[var(--border)] px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              <p>Pos.</p>
              <p>Rede</p>
              <p className="text-right">Share</p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {topPriorityNetworks.map((row, rowIndex) => (
                <div key={row.network} className="grid grid-cols-[2rem_minmax(0,1fr)_4.5rem] items-center gap-3 px-3 py-1.5">
                  <p className="font-display text-[0.88rem] font-semibold text-[var(--brand)]">
                    {String(rowIndex + 1).padStart(2, '0')}
                  </p>
                  <p className="truncate font-display text-[0.86rem] font-medium text-[var(--ink)]">
                    {row.network}
                  </p>
                  <p className="text-right text-[0.8rem] font-semibold text-[var(--ink-soft)]">
                    {formatPercent(row.share)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Implication */}
          <div className="border-t border-[var(--border)] pt-2">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]/70">
              Implicação
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.4] text-[var(--ink)]">
              <strong className="font-semibold">As 10 redes da Classe A justificam acompanhamento dedicado.</strong> As demais têm espaço para avançar em mix e cobertura.
            </p>
          </div>

          {/* Methodology — bottom corner, fully discrete */}
          <div className="pt-1">
            <p className="mb-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]/50">
              Metodologia
            </p>
            <ol className="space-y-0">
              {methodologySteps.map((step, stepIndex) => (
                <li key={step} className="flex gap-1 text-[0.65rem] leading-[1.35] text-[var(--ink-soft)]/60">
                  <span className="shrink-0 font-semibold">{stepIndex + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right column — chart fills height */}
        <div className="flex h-full min-h-0 flex-col">
          <ChartCard compact title="Curva ABC de faturamento" description="Receita por rede e participação acumulada.">
            <div className="mb-2 flex items-center justify-end">
              <label className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                <span>Ano</span>
                <select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(event.target.value as '2024' | '2025')}
                  className="rounded-full border border-[var(--border)] bg-white/90 px-3 py-1.5 text-[0.82rem] font-semibold tracking-normal text-[var(--ink)] outline-none transition-colors duration-200 hover:border-[var(--border-strong)] focus:border-[var(--brand)]"
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </label>
            </div>
            <div className="min-h-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={paretoChartData} margin={{ top: 10, right: 16, left: 8, bottom: 16 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="network" tickLine={false} axisLine={false} interval={0} angle={-24} dy={8} height={52} tickFormatter={shortenLabel} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} width={82} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatPercent(Number(value), 0)} />
                  <Tooltip
                    contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)', boxShadow: '0 18px 40px rgba(18,31,49,0.12)' }}
                    formatter={(value: number | string, name: string) => name === 'sales' ? [formatCurrency(Number(value)), `Receita ${selectedYear}`] : [formatPercent(Number(value)), 'Participação acumulada']}
                    labelFormatter={(label) => `Rede: ${label}`}
                  />
                  <Legend formatter={(value) => value === 'sales' ? `Receita ${selectedYear}` : 'Participação acumulada'} />
                  <ReferenceLine yAxisId="right" y={0.8} stroke={chartPalette.red} strokeDasharray="4 4" label={{ value: 'Limite Classe A — 80%', position: 'insideTopRight', fontSize: 10, fill: chartPalette.red }} />
                  <Bar yAxisId="left" dataKey="sales" radius={[6, 6, 0, 0]}>
                    {paretoChartData.map((entry) => <Cell key={entry.network} fill={entry.isClassA ? chartPalette.navy : chartPalette.slate} />)}
                  </Bar>
                  <Line yAxisId="right" type="monotone" dataKey="cumulativeShare" stroke={chartPalette.teal} strokeWidth={3} dot={{ r: 3, fill: chartPalette.teal }} activeDot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </SlideFrame>
  );
}

function ClientSlide({ index, total }: { index: number; total: number }) {
  const { overview, references, scatter } = reportData;
  const sortLeadersLabel = overview.highestSortNetworks.length > 1
    ? `${formatNumber(overview.highestSortNetworks.length)} redes`
    : overview.highestSortNetworks[0];
  const sortLeadersDetail = overview.highestSortNetworks.length > 1
    ? `empate em ${formatNumber(overview.highestSortValue)} SKUs`
    : `${formatNumber(overview.highestSortValue)} SKUs`;
  const highlightedNetworks = [
    references.gpa.network,
    references.stMarche.network,
    references.mQualidade.network,
    references.db.network,
  ];

  return (
    <SlideFrame
      eyebrow="Análise por Cliente"
      title="Análise comparativa por cliente."
      summary="Volume, preço, sortimento e crescimento."
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
            label: overview.highestSortNetworks.length > 1 ? 'Teto de sortimento' : 'Maior sortimento',
            value: sortLeadersLabel,
            detail: sortLeadersDetail,
            emphasis: 'muted',
          },
          {
            label: 'Maior crescimento %',
            value: references.mQualidade.network,
            detail: formatSignedPercent(references.mQualidade.growthPct),
            emphasis: 'accent',
          },
        ]}
      />
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <ChartCard compact title="Preço médio x crescimento por rede" description="Cada ponto é uma rede.">
          <div className="h-[16rem] xl:h-[19rem]">
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
            Leitura executiva
          </p>
          <ul className="mt-4 space-y-3 text-[0.95rem] leading-6 text-[var(--ink)]">
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
              <p>
                <strong className="font-semibold">{references.mQualidade.network}</strong> liderou o crescimento percentual: <strong className="font-semibold">{formatPercent(references.mQualidade.growthPct)}</strong>.
                {' '}
                Em valor, o ganho foi de <strong className="font-semibold">{formatSignedCurrency(references.mQualidade.growthAbs)}</strong>.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
              <p>
                Seis redes atingiram o teto de <strong className="font-semibold">{formatNumber(overview.highestSortValue)} SKUs</strong>: <strong className="font-semibold">CASA DELIZA, CUBATAO, DAOLIO, PONTO NOVO, SAVEGNAGO</strong> e <strong className="font-semibold">VAREJO</strong>.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
              <p>
                <strong className="font-semibold">{references.db.network}</strong> tem o maior preço médio da base: <strong className="font-semibold">{formatCurrency(references.db.price2025, 2)}</strong> por item.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
              <p>
                Preço e crescimento têm correlação de <strong className="font-semibold">{formatRatio(overview.scatterCorrelation, 2)}</strong> na base. O preço, por si só, não determina o desempenho de uma rede.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
              <p>
                <strong className="font-semibold">{references.stMarche.network}</strong> foi o maior ganho absoluto: <strong className="font-semibold">{formatSignedCurrency(references.stMarche.growthAbs)}</strong>.
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
      title="Categoria"
      summary="Escala, preço e crescimento por categoria."
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
        <ChartCard compact className="flex h-full flex-col" title="Receita por categoria" description="2024 x 2025.">
          <div className="h-[17.5rem] xl:h-[19.5rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...categoryRevenue].sort((left, right) => right.sales2025 - left.sales2025)} layout="vertical" margin={{ top: 6, right: 10, left: 8, bottom: 6 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  itemStyle={{ color: '#1f2d3d' }}
                  formatter={(value: number | string, name: string) => [
                    <span style={{ color: name === 'sales2024' ? '#5c6977' : chartPalette.navy, fontWeight: 600 }}>
                      {formatCurrency(Number(value))}
                    </span>,
                    name === 'sales2024' ? 'Receita 2024' : 'Receita 2025',
                  ]}
                />
                <Legend formatter={(value: string) => value === 'sales2024' ? 'Receita 2024' : 'Receita 2025'} />
                <Bar
                  dataKey="sales2024"
                  fill={chartPalette.slateSoft}
                  radius={[0, 4, 4, 0]}
                  activeBar={{ fill: chartPalette.slate, stroke: '#94a1ad', strokeWidth: 1 }}
                />
                <Bar
                  dataKey="sales2025"
                  fill={chartPalette.navy}
                  radius={[0, 8, 8, 0]}
                  activeBar={{ fill: chartPalette.navySoft, stroke: chartPalette.navy, strokeWidth: 1 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard compact className="flex h-full flex-col" title="Crescimento por categoria" description="Ranking percentual.">
          <div className="h-[17.5rem] xl:h-[19.5rem]">
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
        <ChartCard compact className="flex h-full flex-col" title="Variação de preço" description="Variação % do preço médio por categoria.">
          <div className="h-[17.5rem] xl:h-[19.5rem]">
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
          <p><strong className="font-semibold text-[var(--ink)]">SALADAS</strong> lidera em receita e segue crescendo.</p>
        </InsightBlock>
        <InsightBlock compact title="Pressão de preço" accent="danger">
          <p><strong className="font-semibold text-[var(--ink)]">IN NATURA</strong> e <strong className="font-semibold text-[var(--ink)]">COUVE</strong> cresceram com perda de preço.</p>
        </InsightBlock>
        <InsightBlock compact title="Equilíbrio" accent="success">
          <p><strong className="font-semibold text-[var(--ink)]">TEMPEROS</strong> cresceu em volume com preço subindo.</p>
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
      value2024: formatCurrency(overview.revenue.value2024),
      value2025: formatCurrency(overview.revenue.value2025),
      variation: overview.revenue.variationPct,
      tone: chartPalette.navy,
    },
    {
      metric: 'Volume',
      value2024: formatNumber(overview.volume.value2024),
      value2025: formatNumber(overview.volume.value2025),
      variation: overview.volume.variationPct,
      tone: chartPalette.teal,
    },
    {
      metric: 'Preço médio',
      value2024: formatCurrency(overview.averagePrice.value2024, 2),
      value2025: formatCurrency(overview.averagePrice.value2025, 2),
      variation: overview.averagePrice.variationPct,
      tone: chartPalette.amber,
    },
    {
      metric: 'Sortimento',
      value2024: formatNumber(overview.assortment.value2024),
      value2025: formatNumber(overview.assortment.value2025),
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
      eyebrow="Crescimento YoY I"
      title="Visão Geral"
      summary="Preço subiu pouco; portfólio estável."
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
            <div className="mobile-table-scroll mt-3">
              <div className="mobile-table-inner">
                <div className="grid grid-cols-[minmax(0,1.15fr)_8.2rem_8.2rem_5.5rem] items-center gap-3 border-b border-[var(--border)] px-1 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  <p>Métrica</p>
                  <p className="text-right">2024</p>
                  <p className="text-right">2025</p>
                  <p className="text-right">YoY</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                {yoySnapshot.map((row) => (
                  <div
                    key={row.metric}
                    className="grid grid-cols-[minmax(0,1.15fr)_8.2rem_8.2rem_5.5rem] items-center gap-3 px-1 py-2.5"
                  >
                    <p className="font-display text-[0.96rem] font-medium text-[var(--ink)]">{row.metric}</p>
                    <p className="text-right text-[0.94rem] text-[var(--ink-soft)] [font-variant-numeric:tabular-nums]">{row.value2024}</p>
                    <p className="text-right text-[0.94rem] font-semibold text-[var(--ink)] [font-variant-numeric:tabular-nums]">{row.value2025}</p>
                    <p className="ml-auto min-w-[4.75rem] rounded-full px-2.5 py-1 text-center text-[0.82rem] font-semibold [font-variant-numeric:tabular-nums]" style={{ color: variationTone(row.variation), backgroundColor: `${variationTone(row.variation)}18` }}>
                      {formatSignedPercent(row.variation)}
                    </p>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="grid gap-4 content-start">
          <ChartCard compact className="flex h-full flex-col" title="Mecânica do crescimento" description="Base 2024 = 100, comparativo por dimensão.">
          <div className="h-[16rem] xl:h-[18rem]">
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
                    contentStyle={{
                      borderRadius: '1rem',
                      border: '1px solid rgba(20,32,51,0.12)',
                      boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                    }}
                    itemStyle={{ color: '#1f2d3d' }}
                    formatter={(value: number | string, name: string) => [
                      <span style={{ color: name === 'base' ? '#5c6977' : '#1f2d3d', fontWeight: 600 }}>
                        {name === 'base' ? '100' : `${value} (+${Number(value) - 100}%)`}
                      </span>,
                      name === 'base' ? '2024 (base)' : '2025 (índice)',
                    ]}
                  />
                  <Legend formatter={(value: string) => value === 'base' ? '2024 (base = 100)' : '2025 (índice)'} />
                  <ReferenceLine y={100} stroke={chartPalette.slate} strokeDasharray="4 3" label={{ value: 'base 2024', position: 'insideTopRight', fontSize: 10, fill: '#7a8a98' }} />
                  <Bar
                    dataKey="base"
                    fill={chartPalette.slateSoft}
                    radius={[6, 6, 0, 0]}
                    activeBar={{ fill: chartPalette.slate, stroke: '#94a1ad', strokeWidth: 1 }}
                  />
                  <Bar
                    dataKey="idx"
                    radius={[6, 6, 0, 0]}
                    activeBar={{ stroke: '#1f2d3d', strokeWidth: 1 }}
                  >
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
                Principal alavanca
              </p>
              <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-6 text-[var(--ink)]">
                <li className="flex gap-3">
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
                  <p>
                    <strong className="font-semibold">Volume cresceu {formatSignedPercent(overview.volume.variationPct)}</strong> e foi o principal responsável pelo crescimento de receita.
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
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
                  <p>
                    <strong className="font-semibold">Preço médio cresceu apenas {formatSignedPercent(overview.averagePrice.variationPct)}</strong>, com contribuição limitada sobre o resultado total.
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
                  <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
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
  const { categoryImpact, overview } = reportData;
  const topPositive = [...overview.positiveDrivers]
    .sort((left, right) => right.growthAbs - left.growthAbs)
    .slice(0, 5);
  const topNegative = [...overview.negativeDrivers]
    .sort((left, right) => left.growthAbs - right.growthAbs)
    .slice(0, 5);
  const topCategoryImpact = [...categoryImpact]
    .sort((left, right) => right.growthAbs - left.growthAbs)
    .slice(0, 5);
  const driverHighlights = [...topNegative, ...topPositive].sort(
    (left, right) => left.growthAbs - right.growthAbs,
  );

  return (
    <SlideFrame
      eyebrow="Crescimento YoY II"
      title="Impulsionadores e Detratores"
      summary="Top 5 por rede e por categoria."
        index={index}
      total={total}
    >
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <ChartCard compact className="flex h-full flex-col" title="Top 5 impulsionadores e detratores por rede" description="Impacto absoluto em receita vs. 2024.">
          <div className="flex h-full min-h-[26rem] flex-col xl:min-h-0">
            <div className="min-h-0 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverHighlights} layout="vertical" margin={{ top: 6, right: 10, left: 20, bottom: 6 }} barCategoryGap={10}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                  <YAxis type="category" dataKey="network" tickLine={false} axisLine={false} width={106} tick={{ fontSize: 12 }} />
                  <ReferenceLine x={0} stroke={chartPalette.slate} strokeDasharray="3 3" />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedCurrency(Number(value)), 'Impacto']} labelFormatter={(label) => `Rede: ${label}`} />
                  <Bar dataKey="growthAbs" radius={[0, 8, 8, 0]} barSize={24}>
                    {driverHighlights.map((entry) => <Cell key={entry.network} fill={entry.growthAbs >= 0 ? chartPalette.success : chartPalette.red} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 border-t border-[var(--border)] pt-3 text-[0.9rem] leading-6 text-[var(--ink-soft)]">
              <strong className="font-semibold text-[var(--ink)]">{topPositive[0]?.network}</strong> foi a rede com maior contribuição positiva: <strong className="font-semibold text-[var(--success)]">{formatSignedCurrency(topPositive[0]?.growthAbs ?? 0)}</strong>. <strong className="font-semibold text-[var(--ink)]">{topNegative[0]?.network}</strong> registrou a maior queda: <strong className="font-semibold text-[var(--danger)]">{formatSignedCurrency(topNegative[0]?.growthAbs ?? 0)}</strong>.
            </p>
          </div>
        </ChartCard>
        <div className="grid gap-4 content-start">
          <ChartCard compact className="flex h-full flex-col" title="Top 5 categorias por impacto" description="Contribuição absoluta para o crescimento de receita.">
            <div className="h-[14rem] xl:h-[15rem]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCategoryImpact} layout="vertical" margin={{ top: 6, right: 10, left: 12, bottom: 6 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value: number | string) => formatCompactCurrency(Number(value))} />
                  <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} width={82} />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }} formatter={(value: number | string) => [formatSignedCurrency(Number(value)), 'Impacto']} labelFormatter={(label) => `Categoria: ${label}`} />
                  <Bar dataKey="growthAbs" fill={chartPalette.teal} radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <article className="panel rounded-[1.6rem] p-4">
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Contexto
            </p>
            <ul className="mt-3 space-y-2.5 text-[0.9rem] leading-6 text-[var(--ink)]">
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
                <p>Detratores estão concentrados em poucas redes; por categoria, todos os impactos foram positivos em 2025.</p>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
                <p>A análise por macro-região não foi incluída porque a base geográfica disponível não permite o cruzamento com a carteira ativa de forma confiável.</p>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#1a5c28]" />
                <p>O foco deve ser preservar as redes que cresceram e direcionar esforço comercial para recuperar as que mais perderam.</p>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </SlideFrame>
  );
}

function YoYRecommendationsSlide({ index, total }: { index: number; total: number }) {
  const recommendationItems = [
    {
      step: '01',
      title: 'Expandir sortimento em contas B',
      rationale: 'Essas redes já têm volume relevante, mas concentram os pedidos em poucos itens. Ampliar o mix dentro de uma conta ativa é menos custoso do que conquistar uma nova e contribui para proteger a margem.',
      target: 'Acrescentar 3 SKUs por rede priorizando as maiores contas, no prazo de 6 meses.',
      accent: 'neutral' as const,
    },
    {
      step: '02',
      title: 'Proteger preço em IN NATURA e COUVE',
      rationale: 'As duas categorias cresceram em volume, mas o preço médio recuou junto. Crescimento acompanhado de queda de preço compromete a rentabilidade e tende a criar uma referência comercial difícil de corrigir.',
      target: 'Recuperar 1,5 ponto percentual no preço médio em 90 dias, sem perda superior a 3% do volume.',
      accent: 'neutral' as const,
    },
    {
      step: '03',
      title: 'Separar base comparável de clientes novos',
      rationale: 'Clientes que entraram ao longo do ano apresentam variação elevada por não terem histórico anterior. Consolidar esses dados com a base estabelecida distorce o indicador e obscurece o desempenho real da carteira.',
      target: 'Publicar relatório separado por base de clientes a partir do próximo fechamento mensal.',
      accent: 'neutral' as const,
    },
    {
      step: '04',
      title: 'Replicar o que funcionou nas melhores redes',
      rationale: 'ST MARCHE, OBA e SAVEGNAGO cresceram acima da média. Compreender o que diferencia essas redes e aplicar em contas com perfil semelhante é uma oportunidade com custo de implementação baixo.',
      target: 'Aplicar o padrão identificado em 10 redes com perfil similar no prazo de 4 meses.',
      accent: 'neutral' as const,
    },
    {
      step: '05',
      title: 'Recuperar os principais detratores',
      rationale: 'A maior parte da queda está concentrada em poucas redes, o que torna o problema tratável de forma direcionada. Recuperar os principais casos já representa impacto relevante no resultado consolidado.',
      target: 'Recuperar 30% da perda absoluta gerada pelos três maiores detratores em até 6 meses.',
      accent: 'neutral' as const,
    },
  ];
  const recommendationStyles = {
    neutral: {
      chip: 'bg-[rgba(204,45,42,0.10)] text-[var(--brand)]',
      border: 'border-[rgba(204,45,42,0.16)]',
      wash: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(252,248,248,0.96))]',
      step: 'text-[var(--brand)]',
      meta: 'border border-[rgba(204,45,42,0.22)] text-[var(--brand)]/70',
    },
  } as const;

  return (
    <SlideFrame
      eyebrow="Crescimento YoY III"
      title="Recomendações"
      summary="Cinco ações para o próximo ciclo."
      index={index}
      total={total}
    >
      <div className="grid h-full auto-rows-fr gap-2.5 grid-cols-6">
        {recommendationItems.map((item, i) => (
          <article
            key={item.title}
            className={`panel flex h-full flex-col rounded-[1.25rem] border p-4 ${i < 2 ? 'col-span-3' : 'col-span-2'} ${recommendationStyles[item.accent].border} ${recommendationStyles[item.accent].wash}`}
          >
            <div className="m-auto flex w-full flex-col items-center gap-3">
              <div className={`font-display text-[2rem] font-bold leading-none tracking-[-0.05em] ${recommendationStyles[item.accent].step}`}>
                {item.step}
              </div>
              <p className="font-display text-[1.05rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
                {item.title}
              </p>
              <p className="text-center text-[0.86rem] leading-[1.56] text-[var(--ink-soft)]">
                {item.rationale}
              </p>
              <div className={`w-full rounded-[0.9rem] px-3.5 py-2.5 text-center text-[0.76rem] font-medium leading-[1.48] ${recommendationStyles[item.accent].meta}`}>
                {item.target}
              </div>
            </div>
          </article>
        ))}
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
      rationale: 'Incentiva vender mais itens por rede.',
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
      eyebrow="Proposta"
      title="Modelo de Remuneração Variável"
      summary="40% volume, 30% preço, 20% sortimento, 10% mix."
      index={index}
      total={total}
    >
      <div className="grid items-start gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Esquerda: estrutura */}
        <div className="panel rounded-[1.9rem] p-4 lg:p-5">
          <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Estrutura de pesos
          </p>

          <div className="chart-grid mt-3 h-[4.5rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stackedComposition}
                layout="vertical"
                margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
                barSize={30}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="bucket" hide />
                <Tooltip
                  contentStyle={{ borderRadius: '1rem', border: '1px solid rgba(20,32,51,0.12)' }}
                  formatter={(value: number | string, name: string) => [`${value}%`, name]}
                  cursor={{ fill: 'rgba(15,27,42,0.04)' }}
                />
                {incentiveComposition.map((item, i) => (
                  <Bar
                    key={item.label}
                    dataKey={item.label}
                    stackId="composition"
                    fill={item.fill}
                    radius={
                      i === 0
                        ? [10, 0, 0, 10]
                        : i === incentiveComposition.length - 1
                          ? [0, 10, 10, 0]
                          : [0, 0, 0, 0]
                    }
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2.5">
            {incentiveComposition.map((item) => (
              <div key={item.label} className="rounded-[0.9rem] border border-[var(--border)] bg-white/72 px-2.5 py-2.5 text-center">
                <p className="font-display text-[0.98rem] font-semibold leading-none text-[var(--accent)]">
                  {item.weight}%
                </p>
                <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 divide-y divide-[var(--border)] overflow-hidden rounded-[1.2rem] border border-[var(--border)] bg-white/56">
            {incentiveComposition.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_2fr] items-center gap-0 px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.fill }} />
                  <p className="font-display text-[0.88rem] font-medium text-[var(--ink)]">{item.label}</p>
                </div>
                <p className="text-[0.82rem] leading-[1.4] text-[var(--ink-soft)]">{item.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Direita: raciocínio */}
        <div className="panel rounded-[1.9rem] p-4 lg:p-5">
          <p className="font-display text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Por que esse modelo
          </p>
          <p className="mt-3 text-[0.88rem] leading-[1.56] text-[var(--ink-soft)]">
            O crescimento de 2025 foi expressivo, mas veio concentrado em poucas redes e em parte sustentado por queda de preço. Um modelo que remunera só volume incentiva exatamente esse caminho: mais pedido, menos margem.
          </p>
          <div className="mt-4 space-y-3.5">
            {[
              {
                title: 'Volume comparável recebe o maior peso',
                body: 'Medir só clientes da base ativa elimina o efeito de novos entrantes, que infla o YoY sem representar crescimento real da carteira.',
              },
              {
                title: 'Preço entra como guardrail',
                body: 'Com 30% do bônus atrelado à disciplina de preço, o vendedor tem razão objetiva para não conceder desconto além do necessário.',
              },
              {
                title: 'Sortimento e mix reforçam penetração',
                body: 'As redes já ativas têm espaço para comprar mais itens. Premiar quem amplia o mix por conta cria um vetor de crescimento que não depende de abrir novas contas.',
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-[var(--accent)] pl-3.5">
                <p className="font-display text-[0.88rem] font-semibold leading-[1.2] text-[var(--ink)]">{item.title}</p>
                <p className="mt-1 text-[0.8rem] leading-[1.5] text-[var(--ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function ThankYouSlide({ index, total }: { index: number; total: number }) {
  return (
    <SlideFrame eyebrow="" title="" summary="" index={index} total={total} hideHeader>
      <div className="flex h-full flex-col">
        {/* Header: logo */}
        <div className="shrink-0">
          <img
            src={lavitaLogo}
            alt="La Vita"
            className="h-auto w-[9rem] object-contain opacity-90"
          />
        </div>

        {/* Centro: Obrigado */}
        <div className="flex flex-1 items-center justify-center">
          <h1 className="font-display text-[4.5rem] font-semibold leading-none tracking-[-0.04em] text-[var(--ink)] sm:text-[5.5rem] lg:text-[6.5rem]">
            Obrigado.
          </h1>
        </div>

        {/* Rodapé: assinatura */}
        <div className="shrink-0 pb-2">
          <p className="text-[0.82rem] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
            Henrique Padueli Machado
          </p>
        </div>
      </div>
    </SlideFrame>
  );
}

export const deckSlides: DeckSlideDefinition[] = [
  { id: 'cover', label: 'Capa', component: CoverSlide },
  {
    id: 'pareto',
    label: 'Pareto',
    agendaLabel: 'Concentração de faturamento',
    coverAgendaLabel: 'Curva ABC / Pareto',
    component: ParetoSlide,
  },
  {
    id: 'clients',
    label: 'Clientes',
    agendaLabel: 'Comparativo por cliente',
    coverAgendaLabel: 'Comparativo por cliente',
    component: ClientSlide,
  },
  {
    id: 'dimension',
    label: 'Dimensão',
    agendaLabel: 'Dimensão de negócio',
    coverAgendaLabel: 'Dimensão de negócio - Categoria',
    component: CategorySlide,
  },
  {
    id: 'yoy-overview',
    label: 'YoY I',
    agendaLabel: 'YoY consolidado - Visão Geral',
    coverAgendaLabel: 'YoY consolidado - Visão Geral',
    component: YoYOverviewSlide,
  },
  {
    id: 'yoy-drivers',
    label: 'YoY II',
    agendaLabel: 'YoY por rede - Impulsionadores e detratores',
    coverAgendaLabel: 'YoY por rede - Impulsionadores e detratores',
    component: YoYDriversSlide,
  },
  {
    id: 'yoy-recommendations',
    label: 'YoY III',
    agendaLabel: 'Conclusões do YoY',
    coverAgendaLabel: 'YoY - Recomendações',
    component: YoYRecommendationsSlide,
  },
  {
    id: 'compensation',
    label: 'Remuneração',
    agendaLabel: 'Proposta - Modelo de Remuneração Variável',
    coverAgendaLabel: 'Proposta - Modelo de Remuneração Variável',
    component: RemunerationSlide,
  },
  { id: 'thanks', label: 'Obrigado', hideFromAgenda: true, component: ThankYouSlide },
];
