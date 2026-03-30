import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';
import { reportData } from '../data/reportData';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRatio,
  formatSignedCurrency,
} from '../utils/format';
import { chartPalette } from '../utils/theme';

type ClientProfileSectionProps = {
  animated?: boolean;
};

export function ClientProfileSection({
  animated = true,
}: ClientProfileSectionProps) {
  const { overview, references, scatter } = reportData;

  return (
    <SectionShell
      id="clients"
      eyebrow="Perfil das Contas"
      title="Cliente deve ser lido por mais de uma métrica."
      description="Ticket, volume, sortimento, crescimento e preço médio respondem a perguntas diferentes."
      animated={animated}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Maior ticket por loja ativa"
          value={references.dalben.network}
          detail={`${formatCurrency(references.dalben.ticketActive2025)} por loja ativa.`}
          note={`${references.dalben.activeStores2025} lojas ativas e ${formatCurrency(references.dalben.sales2025)} de receita.`}
          tone="brand"
        />
        <KpiCard
          label="Maior volume"
          value={references.gpa.network}
          detail={`${formatNumber(references.gpa.qty2025)} unidades em 2025.`}
          note={`Receita correspondente: ${formatCurrency(references.gpa.sales2025)}.`}
          tone="default"
        />
        <KpiCard
          label="Maior sortimento"
          value={references.daolio.network}
          detail={`${formatNumber(references.daolio.sort2025)} SKUs distintos em 2025.`}
          note="O teto vendido na base é 29 SKUs, então a métrica perde poder discriminatório entre contas já muito maduras."
          tone="muted"
        />
        <KpiCard
          label="Crescimento em destaque"
          value={references.stMarche.network}
          detail={`${formatSignedCurrency(references.stMarche.growthAbs)} de incremento absoluto, enquanto ${references.mQualidade.network} lidera em crescimento percentual.`}
          note={`${references.mQualidade.network}: ${formatPercent(references.mQualidade.growthPct)}.`}
          tone="accent"
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <ChartCard
          title="Preço médio versus crescimento por rede"
          description="Bubble chart com preço médio 2025 no eixo X, crescimento percentual no eixo Y e receita como tamanho da bolha."
          question="Pergunta de negócio: crescimento esteve associado a preço?"
        >
          <div className="h-[28rem]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="price2025"
                  name="Preço médio"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number | string) =>
                    `R$ ${formatRatio(Number(value), 2)}`
                  }
                />
                <YAxis
                  type="number"
                  dataKey="growthPct"
                  name="Crescimento"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number | string) =>
                    formatPercent(Number(value), 0)
                  }
                  width={84}
                />
                <ZAxis type="number" dataKey="sales2025" range={[80, 520]} />
                <Tooltip
                  cursor={{ strokeDasharray: '4 4' }}
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  formatter={(value: number | string, name: string) => {
                    const numericValue = Number(value);

                    if (name === 'growthPct') return [formatPercent(numericValue), 'Crescimento 2025 vs. 2024'];
                    if (name === 'sales2025') return [formatCurrency(numericValue), 'Receita 2025'];
                    return [formatCurrency(numericValue, 2), 'Preço médio 2025'];
                  }}
                  labelFormatter={(_, payload) => `Rede: ${payload?.[0]?.payload?.network ?? ''}`}
                />
                <ReferenceLine
                  x={overview.scatterMedianPrice}
                  stroke={chartPalette.slate}
                  strokeDasharray="4 4"
                />
                <ReferenceLine
                  y={overview.scatterMedianGrowth}
                  stroke={chartPalette.slate}
                  strokeDasharray="4 4"
                />
                <Scatter data={scatter} fill={chartPalette.navy} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="space-y-4">
          <InsightBlock title="Correlação" accent="teal">
            <p>
              Correlação de {formatRatio(overview.scatterCorrelation, 4)} entre preço médio e crescimento.
            </p>
          </InsightBlock>
          <InsightBlock title="Maior preço médio" accent="amber">
            <p>
              {references.db.network} lidera em preço médio com{' '}
              {formatCurrency(references.db.price2025, 2)} por item, mas
              não lidera crescimento.
            </p>
          </InsightBlock>
          <InsightBlock title="Leitura de performance" accent="success">
            <p>
              {references.mQualidade.network} lidera crescimento relativo
              ({formatPercent(references.mQualidade.growthPct)}), enquanto{' '}
              {references.stMarche.network} lidera contribuição real de receita
              ({formatSignedCurrency(references.stMarche.growthAbs)}).
            </p>
          </InsightBlock>
        </div>
      </div>
    </SectionShell>
  );
}
