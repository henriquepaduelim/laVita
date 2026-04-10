import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PriceGrowthRow } from '../types/data';
import { formatCompactCurrency, formatCurrency, formatPercent, formatRatio } from '../utils/format';
import { chartPalette } from '../utils/theme';

type PriceGrowthScatterChartProps = {
  data: PriceGrowthRow[];
  medianPrice: number;
  medianGrowth: number;
  highlightedNetworks: string[];
};

type ScatterShapeProps = {
  cx?: number;
  cy?: number;
  payload?: PriceGrowthRow & { color?: string };
};

const Y_CAP = 2.0; // cap at +200% — outliers shown as footnote
const highlightPalette = [chartPalette.navy, chartPalette.teal, chartPalette.amber, chartPalette.success];

function bubbleRadius(sales: number, minS: number, maxS: number): number {
  if (maxS === minS) return 7;
  const normalized = (Math.sqrt(sales) - Math.sqrt(minS)) / (Math.sqrt(maxS) - Math.sqrt(minS));
  return 4 + normalized * 14; // radius 4–18px
}

function makeBasePoint(minS: number, maxS: number) {
  return function BasePoint({ cx = 0, cy = 0, payload }: ScatterShapeProps) {
    const r = bubbleRadius(payload?.sales2025 ?? minS, minS, maxS);
    return <circle cx={cx} cy={cy} r={r} fill="rgba(122, 138, 152, 0.38)" />;
  };
}

function makeHighlightPoint(minS: number, maxS: number) {
  return function HighlightPoint({ cx = 0, cy = 0, payload }: ScatterShapeProps) {
    const color = payload?.color ?? chartPalette.navy;
    const r = bubbleRadius(payload?.sales2025 ?? minS, minS, maxS);
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.82} stroke="white" strokeWidth={2} />
        <text
          x={cx + r + 5}
          y={cy - r * 0.4}
          fontSize="11"
          fontWeight="700"
          fill="var(--ink)"
          fontFamily="'Source Sans 3', sans-serif"
        >
          {payload?.network}
        </text>
      </g>
    );
  };
}

export function PriceGrowthScatterChart({
  data,
  medianPrice,
  medianGrowth,
  highlightedNetworks,
}: PriceGrowthScatterChartProps) {
  const highlightSet = new Set(highlightedNetworks);

  const allSales = data.map((d) => d.sales2025);
  const minS = Math.min(...allSales);
  const maxS = Math.max(...allSales);

  const outliers = data.filter((row) => row.growthPct > Y_CAP);
  const chartData = data.filter((row) => row.growthPct <= Y_CAP);

  const baseData = chartData.filter((row) => !highlightSet.has(row.network));
  const highlightedData = highlightedNetworks
    .map((network, index) => {
      const row = chartData.find((entry) => entry.network === network);
      if (!row) return null;
      return { ...row, color: highlightPalette[index % highlightPalette.length] };
    })
    .filter((row): row is PriceGrowthRow & { color: string } => row !== null);

  const BasePoint = makeBasePoint(minS, maxS);
  const HighlightPoint = makeHighlightPoint(minS, maxS);

  return (
    <div className="flex h-full min-h-0 min-w-0 w-full max-w-full flex-col">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--ink-soft)]">
        <p>Tamanho da bolha proporcional à receita 2025.</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'rgba(122, 138, 152, 0.55)' }} />
            <span>Base</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartPalette.navy }} />
            <span>Destaque</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 min-w-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 18, right: 34, left: 4, bottom: 8 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="price2025"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number | string) => `R$ ${formatRatio(Number(value), 2)}`}
            />
            <YAxis
              type="number"
              dataKey="growthPct"
              tickLine={false}
              axisLine={false}
              width={78}
              domain={[-0.8, Y_CAP]}
              tickFormatter={(value: number | string) => formatPercent(Number(value), 0)}
            />
            <Tooltip
              cursor={{ strokeDasharray: '4 4' }}
              contentStyle={{
                borderRadius: '1rem',
                border: '1px solid rgba(20,32,51,0.12)',
                boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
              }}
              formatter={(value: number | string, name: string) => {
                const numericValue = Number(value);
                if (name === 'growthPct') return [formatPercent(numericValue), 'Crescimento'];
                if (name === 'sales2025') return [formatCompactCurrency(numericValue), 'Receita 2025'];
                return [formatCurrency(numericValue, 2), 'Preço médio'];
              }}
              labelFormatter={(_, payload) => `Rede: ${payload?.[0]?.payload?.network ?? ''}`}
            />
            <ReferenceLine
              x={medianPrice}
              stroke={chartPalette.slate}
              strokeDasharray="4 4"
              label={{ value: 'Mediana de preço', position: 'insideTopRight', fill: '#44586b', fontSize: 11 }}
            />
            <ReferenceLine
              y={medianGrowth}
              stroke={chartPalette.slate}
              strokeDasharray="4 4"
              label={{ value: 'Mediana de crescimento', position: 'insideTopLeft', fill: '#44586b', fontSize: 11 }}
            />
            <Scatter name="Base" data={baseData} shape={<BasePoint />} />
            <Scatter name="Destaque" data={highlightedData} shape={<HighlightPoint />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {outliers.length > 0 && (
        <p className="mt-1 text-[0.72rem] leading-[1.4] text-[var(--ink-soft)]/70">
          <span className="font-semibold">Fora da escala (acima de +200%):</span>{' '}
          {outliers.map((o) => `${o.network} (${formatPercent(o.growthPct, 1)})`).join(', ')}.
          {' '}Crescimento sobre base pequena — peso absoluto limitado.
        </p>
      )}
    </div>
  );
}
