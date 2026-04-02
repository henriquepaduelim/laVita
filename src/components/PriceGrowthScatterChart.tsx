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

const highlightPalette = [chartPalette.navy, chartPalette.teal, chartPalette.amber, chartPalette.success];

function BasePoint({ cx = 0, cy = 0 }: ScatterShapeProps) {
  return <circle cx={cx} cy={cy} r={4.5} fill="rgba(122, 138, 152, 0.62)" />;
}

function HighlightPoint({ cx = 0, cy = 0, payload }: ScatterShapeProps) {
  const color = payload?.color ?? chartPalette.navy;

  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={color} stroke="white" strokeWidth={2.5} />
      <text
        x={cx + 10}
        y={cy - 10}
        fontSize="11"
        fontWeight="700"
        fill="var(--ink)"
        fontFamily="'Source Sans 3', sans-serif"
      >
        {payload?.network}
      </text>
    </g>
  );
}

export function PriceGrowthScatterChart({
  data,
  medianPrice,
  medianGrowth,
  highlightedNetworks,
}: PriceGrowthScatterChartProps) {
  const highlightSet = new Set(highlightedNetworks);
  const baseData = data.filter((row) => !highlightSet.has(row.network));
  const highlightedData = highlightedNetworks
    .map((network, index) => {
      const row = data.find((entry) => entry.network === network);

      if (!row) {
        return null;
      }

      return {
        ...row,
        color: highlightPalette[index % highlightPalette.length],
      };
    })
    .filter((row): row is PriceGrowthRow & { color: string } => row !== null);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--ink-soft)]">
        <p>Quadrantes definidos pelas medianas de preço e crescimento para facilitar a leitura executiva.</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'rgba(122, 138, 152, 0.62)' }} />
            <span>Base</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartPalette.navy }} />
            <span>Redes destacadas</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
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
            <Scatter name="Redes destacadas" data={highlightedData} shape={<HighlightPoint />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
