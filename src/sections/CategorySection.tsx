import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { InsightBlock } from '../components/InsightBlock';
import { SectionShell } from '../components/SectionShell';
import { reportData } from '../data/reportData';
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
  formatSignedPercent,
} from '../utils/format';
import { chartPalette } from '../utils/theme';

type CategorySectionProps = {
  animated?: boolean;
};

export function CategorySection({ animated = true }: CategorySectionProps) {
  const { categoryGrowth, categoryPrice, categoryRevenue, overview } = reportData;

  return (
    <SectionShell
      id="categories"
      eyebrow="Categoria Como Alavanca"
      title="Categoria foi a dimensão escolhida para aprofundamento."
      description="É o recorte com chave confiável e melhor capacidade explicativa."
      animated={animated}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <InsightBlock title="Liderança" accent="brand">
          <p>
            {overview.topCategory.category} domina o faturamento com{' '}
            {formatCompactCurrency(overview.topCategory.sales2025)} em 2025 e
            segue como principal categoria da companhia.
          </p>
        </InsightBlock>
        <InsightBlock title="Aceleração" accent="success">
          <p>
            {overview.fastestCategory.category} apresenta o maior crescimento
            percentual ({formatPercent(overview.fastestCategory.growthPct)}) em
            uma base ainda menor, sinalizando oportunidade de escala com controle.
          </p>
        </InsightBlock>
        <InsightBlock title="Preço" accent="amber">
          <p>
            {overview.strongestPriceCategory.category} foi a categoria com maior
            avanço relativo de preço ({formatSignedPercent(overview.strongestPriceCategory.priceGrowthPct)}).
          </p>
        </InsightBlock>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <ChartCard
          title="Receita por categoria"
          description="Comparação direta entre 2024 e 2025 para evidenciar escala e hierarquia do portfólio."
          question="Pergunta de negócio: quais categorias sustentam o faturamento?"
          className="xl:col-span-2"
        >
          <div className="h-[27rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryRevenue} margin={{ top: 20, right: 24, left: 10, bottom: 6 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={86}
                  tickFormatter={(value: number | string) =>
                    formatCompactCurrency(Number(value))
                  }
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  formatter={(value: number | string, name: string) => [
                    formatCurrency(Number(value)),
                    name === 'sales2024' ? 'Receita 2024' : 'Receita 2025',
                  ]}
                />
                <Legend
                  formatter={(value) =>
                    value === 'sales2024' ? 'Receita 2024' : 'Receita 2025'
                  }
                />
                <Bar dataKey="sales2024" fill={chartPalette.slateSoft} radius={[8, 8, 0, 0]} />
                <Bar dataKey="sales2025" fill={chartPalette.navy} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Crescimento por categoria"
          description="Ranking percentual para separar categorias maduras de categorias acelerando acima da média."
          question="Pergunta de negócio: onde o crescimento foi mais intenso?"
        >
          <div className="h-[24rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...categoryGrowth].sort((left, right) => right.growthPct - left.growthPct)}
                layout="vertical"
                margin={{ top: 10, right: 12, left: 30, bottom: 10 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number | string) =>
                    formatPercent(Number(value), 0)
                  }
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  formatter={(value: number | string, name: string) => {
                    const numericValue = Number(value);

                    if (name === 'growthPct') return [formatPercent(numericValue), 'Crescimento'];
                    return [formatCurrency(numericValue), 'Incremento absoluto'];
                  }}
                />
                <Bar dataKey="growthPct" fill={chartPalette.teal} radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Preço médio por categoria"
          description="Séries de 2024 e 2025 para identificar erosão ou ganho de preço por família."
          question="Pergunta de negócio: onde houve disciplina de preço?"
        >
          <div className="h-[24rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={categoryPrice} margin={{ top: 18, right: 18, left: 0, bottom: 6 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={76}
                  tickFormatter={(value: number | string) => `R$ ${Number(value).toFixed(1)}`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '1rem',
                    border: '1px solid rgba(20,32,51,0.12)',
                    boxShadow: '0 18px 40px rgba(18,31,49,0.12)',
                  }}
                  formatter={(value: number | string, name: string) => [
                    formatCurrency(Number(value), 2),
                    name === 'price2024' ? 'Preço médio 2024' : 'Preço médio 2025',
                  ]}
                />
                <Legend
                  formatter={(value) =>
                    value === 'price2024' ? 'Preço médio 2024' : 'Preço médio 2025'
                  }
                />
                <Line
                  type="monotone"
                  dataKey="price2024"
                  stroke={chartPalette.slate}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="price2025"
                  stroke={chartPalette.amber}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <InsightBlock title="SALADAS" accent="brand">
          <p>
            Principal categoria, com crescimento saudável.
          </p>
        </InsightBlock>
        <InsightBlock title="IN NATURA e COUVE" accent="danger">
          <p>
            Crescem com pressão de preço.
          </p>
        </InsightBlock>
        <InsightBlock title="TEMPEROS" accent="success">
          <p>
            Cresce com melhora simultânea de volume e preço.
          </p>
        </InsightBlock>
      </div>
    </SectionShell>
  );
}
