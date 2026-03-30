import {
  Bar,
  Cell,
  ComposedChart,
  CartesianGrid,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';
import { reportData } from '../data/reportData';
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from '../utils/format';
import { chartPalette } from '../utils/theme';

type ParetoSectionProps = {
  animated?: boolean;
};

function shortenLabel(label: string | number) {
  const text = String(label);

  if (text === 'Demais redes') {
    return 'Demais';
  }

  return text.length > 10 ? `${text.slice(0, 10)}…` : text;
}

export function ParetoSection({ animated = true }: ParetoSectionProps) {
  const { pareto, overview } = reportData;

  return (
    <SectionShell
      id="pareto"
      eyebrow="Concentração de Receita"
      title="10 redes concentram 81,17% da receita de 2025."
      description="A leitura principal é dependência relevante de poucas contas."
      animated={animated}
    >
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-4">
          <KpiCard
            label="Classe A"
            value={`${overview.paretoClassACount} redes`}
            detail={`Concentram ${formatPercent(overview.paretoClassAShare)} da receita de 2025.`}
            note={`Base ativa: ${overview.activeNetworksCount} redes com faturamento em 2025.`}
            tone="brand"
          />
          <KpiCard
            label="Receita total 2025"
            value={formatCompactCurrency(overview.revenue.value2025)}
            detail="A leitura de concentração foi feita sobre o ano fechado."
            note="O foco executivo aqui é dependência de contas, não dispersão por loja."
            tone="muted"
          />
          <InsightBlock title="Insight" accent="teal">
            <p>
              As contas A devem ser tratadas como estratégicas. A cauda longa
              fica como espaço de aumento de mix e penetração.
            </p>
          </InsightBlock>
        </div>

        <ChartCard
          title="Pareto de redes em 2025"
          description="Barras para receita e linha para participação acumulada."
          question="Pergunta de negócio: quanto da receita depende das principais redes?"
        >
          <div className="h-[26rem]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={pareto} margin={{ top: 24, right: 24, left: 10, bottom: 18 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="network"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-25}
                  dy={10}
                  height={64}
                  tickFormatter={shortenLabel}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  width={84}
                  tickFormatter={(value: number | string) =>
                    formatCompactCurrency(Number(value))
                  }
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 1]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number | string) =>
                    formatPercent(Number(value), 0)
                  }
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  formatter={(value: number | string, name: string) => {
                    const numericValue = Number(value);

                    if (name === 'sales2025') {
                      return [formatCurrency(numericValue), 'Receita 2025'];
                    }

                    return [formatPercent(numericValue), 'Participação acumulada'];
                  }}
                  labelFormatter={(label) => `Rede: ${label}`}
                />
                <Legend
                  formatter={(value) => {
                    if (value === 'sales2025') return 'Receita 2025';
                    if (value === 'cumulativeShare') return 'Participação acumulada';
                    return value;
                  }}
                />
                <ReferenceLine
                  yAxisId="right"
                  y={0.8}
                  stroke={chartPalette.red}
                  strokeDasharray="4 4"
                />
                <Bar yAxisId="left" dataKey="sales2025" radius={[10, 10, 0, 0]}>
                  {pareto.map((entry) => (
                    <Cell
                      key={entry.network}
                      fill={entry.isClassA ? chartPalette.navy : chartPalette.slate}
                    />
                  ))}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulativeShare"
                  stroke={chartPalette.teal}
                  strokeWidth={3}
                  dot={{ r: 3, fill: chartPalette.teal }}
                  activeDot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </SectionShell>
  );
}
