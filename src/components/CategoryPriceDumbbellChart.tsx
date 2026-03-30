import { CategoryPriceRow } from '../types/data';
import { formatCurrency, formatSignedPercent } from '../utils/format';
import { chartPalette } from '../utils/theme';

type CategoryPriceDumbbellChartProps = {
  data: CategoryPriceRow[];
};

export function CategoryPriceDumbbellChart({
  data,
}: CategoryPriceDumbbellChartProps) {
  const rows = [...data]
    .filter((row) => Number.isFinite(row.price2024) && Number.isFinite(row.price2025))
    .sort((left, right) => right.price2025 - left.price2025);

  const allValues = rows.flatMap((row) => [row.price2024, row.price2025]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const spread = Math.max(maxValue - minValue, 0.2);
  const domainMin = Math.max(0, minValue - spread * 0.14);
  const domainMax = maxValue + spread * 0.18;
  const domainSpan = domainMax - domainMin;

  const width = 1120;
  const labelWidth = 220;
  const plotStart = 270;
  const plotWidth = 700;
  const topPadding = 36;
  const rowGap = 46;
  const bottomPadding = 24;
  const height = topPadding + rows.length * rowGap + bottomPadding;
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1);
    return domainMin + domainSpan * ratio;
  });

  function xFor(value: number) {
    return plotStart + ((value - domainMin) / domainSpan) * plotWidth;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-[var(--ink-soft)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartPalette.slate }} />
            <span>2024</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartPalette.amber }} />
            <span>2025</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Preço médio por categoria em 2024 e 2025"
        >
          {ticks.map((tick) => {
            const x = xFor(tick);

            return (
              <g key={tick}>
                <line
                  x1={x}
                  y1={topPadding - 12}
                  x2={x}
                  y2={height - bottomPadding + 4}
                  stroke="rgba(16, 29, 45, 0.08)"
                  strokeDasharray="4 6"
                />
                <text
                  x={x}
                  y={26}
                  textAnchor="middle"
                  fontSize="13"
                  fill="var(--ink-soft)"
                  fontFamily="'Source Sans 3', sans-serif"
                >
                  {formatCurrency(tick, 2)}
                </text>
              </g>
            );
          })}

          {rows.map((row, index) => {
            const y = topPadding + index * rowGap;
            const x2024 = xFor(row.price2024);
            const x2025 = xFor(row.price2025);
            const positive = row.price2025 >= row.price2024;
            const changeColor = positive ? chartPalette.amber : chartPalette.red;

            return (
              <g key={row.category}>
                <line
                  x1={plotStart}
                  y1={y}
                  x2={plotStart + plotWidth}
                  y2={y}
                  stroke="rgba(16, 29, 45, 0.06)"
                />
                <text
                  x={labelWidth}
                  y={y + 5}
                  textAnchor="end"
                  fontSize="14"
                  fontWeight="600"
                  fill="var(--ink)"
                  fontFamily="'Lexend', sans-serif"
                >
                  {row.category}
                </text>

                <line
                  x1={x2024}
                  y1={y}
                  x2={x2025}
                  y2={y}
                  stroke={changeColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle cx={x2024} cy={y} r="5" fill={chartPalette.slate} />
                <circle cx={x2025} cy={y} r="6" fill={changeColor} />

                <text
                  x={x2024 - 10}
                  y={y - 10}
                  textAnchor="end"
                  fontSize="12"
                  fill="var(--ink-soft)"
                  fontFamily="'Source Sans 3', sans-serif"
                >
                  {formatCurrency(row.price2024, 2)}
                </text>

                <text
                  x={x2025 + 10}
                  y={y + 16}
                  textAnchor="start"
                  fontSize="12.25"
                  fill={changeColor}
                  fontWeight="600"
                  fontFamily="'Source Sans 3', sans-serif"
                >
                  {formatCurrency(row.price2025, 2)} · {formatSignedPercent(row.priceGrowthPct)}
                </text>

                <title>
                  {`${row.category}: ${formatCurrency(row.price2024, 2)} em 2024, ${formatCurrency(row.price2025, 2)} em 2025 (${formatSignedPercent(row.priceGrowthPct)})`}
                </title>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
