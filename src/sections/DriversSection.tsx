import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';
import { reportData } from '../data/reportData';
import {
  formatCompactCurrency,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatSignedCurrency,
  formatSignedPercent,
} from '../utils/format';
import { chartPalette } from '../utils/theme';

type DriversSectionProps = {
  animated?: boolean;
};

export function DriversSection({ animated = true }: DriversSectionProps) {
  const { categoryImpact, drivers, overview } = reportData;

  return (
    <SectionShell
      id="drivers"
      eyebrow="Year over Year"
      title="2025 cresceu 24,04% em receita, puxado majoritariamente por volume."
      description="Visão geral do ano, impulsionadores e detratores."
      animated={animated}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Receita"
          value={formatCurrency(overview.revenue.value2025)}
          detail={`${formatSignedCurrency(overview.revenue.variationAbs)} versus 2024.`}
          note={`${formatPercent(overview.revenue.variationPct)} de crescimento.`}
          tone="brand"
        />
        <KpiCard
          label="Volume"
          value={formatNumber(overview.volume.value2025)}
          detail={`${formatNumber(overview.volume.variationAbs)} unidades adicionais no ano.`}
          note={`${formatPercent(overview.volume.variationPct)} de crescimento.`}
          tone="default"
        />
        <KpiCard
          label="Preço médio"
          value={formatCurrency(overview.averagePrice.value2025, 2)}
          detail={`Variação de ${formatCurrency(overview.averagePrice.variationAbs, 2)} no indicador agregado.`}
          note={`${formatPercent(overview.averagePrice.variationPct)} frente a 2024.`}
          tone="muted"
        />
        <KpiCard
          label="Sortimento"
          value={formatNumber(overview.assortment.value2025)}
          detail="Portfólio estável entre os anos."
          note="Não houve expansão relevante de SKUs vendidos no consolidado."
          tone="muted"
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartCard
          title="Drivers e detratores por rede"
          description="Barras divergentes destacando o impacto absoluto de receita em 2025 versus 2024."
          question="Pergunta de negócio: quem puxou o avanço e quem destruiu valor?"
        >
          <div className="h-[27rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drivers} layout="vertical" margin={{ top: 10, right: 16, left: 24, bottom: 10 }}>
                <CartesianGrid horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number | string) =>
                    formatCompactCurrency(Number(value))
                  }
                />
                <YAxis
                  type="category"
                  dataKey="network"
                  tickLine={false}
                  axisLine={false}
                  width={110}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  formatter={(value: number | string) => [
                    formatSignedCurrency(Number(value)),
                    'Impacto absoluto',
                  ]}
                  labelFormatter={(label) => `Rede: ${label}`}
                />
                <Bar dataKey="growthAbs" radius={[0, 10, 10, 0]}>
                  {drivers.map((entry) => (
                    <Cell
                      key={entry.network}
                      fill={entry.growthAbs >= 0 ? chartPalette.success : chartPalette.red}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="panel rounded-[2rem] p-6 md:p-7">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Impacto por categoria
          </p>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">
            Contribuição das categorias para o crescimento
          </h3>
          <p className="mt-2 text-base leading-7 text-[var(--ink-soft)]">
            Nenhuma categoria apresentou queda absoluta de receita em 2025.
          </p>

          <div className="mt-6 space-y-4">
            {categoryImpact.map((row) => (
              <div key={row.category} className="rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-semibold text-[var(--ink)]">
                      {row.category}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">
                      {formatSignedPercent(row.growthPct)} vs. 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold text-[var(--brand)]">
                      {formatSignedCurrency(row.growthAbs)}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">impacto absoluto</p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.max(10, (row.growthAbs / categoryImpact[0].growthAbs) * 100)}%`,
                      backgroundColor: chartPalette.teal,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
