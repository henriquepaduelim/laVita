import methodologyRaw from '../../presentation_assets/source_data/s02_methodology_table.csv?raw';
import qualityRaw from '../../presentation_assets/source_data/s02_quality_snapshot.csv?raw';
import scatterRaw from '../../presentation_assets/source_data/s05_price_vs_growth.csv?raw';
import categoryRevenueRaw from '../../presentation_assets/source_data/s06_category_revenue.csv?raw';
import categoryGrowthRaw from '../../presentation_assets/source_data/s06_category_growth.csv?raw';
import categoryPriceRaw from '../../presentation_assets/source_data/s06_category_price.csv?raw';
import categoryImpactRaw from '../../presentation_assets/source_data/s08_category_impact_table.csv?raw';
import driversRaw from '../../presentation_assets/source_data/s08_drivers_diverging.csv?raw';
import networkMetricsRaw from '../../analysis_output/network_metrics.csv?raw';
import overallMetricsRaw from '../../analysis_output/overall_metrics.csv?raw';
import {
  CategoryGrowthRow,
  CategoryImpactRow,
  CategoryPriceRow,
  CategoryRevenueRow,
  DriverRow,
  MethodologyRow,
  NetworkMetricsRow,
  OverallMetricRow,
  ParetoRow,
  PriceGrowthRow,
  QualitySnapshotRow,
} from '../types/data';
import { parseCsv, toInteger, toNumber } from '../utils/csv';
import { isFiniteNumber, median, pearsonCorrelation } from '../utils/math';

const methodology = parseCsv<MethodologyRow>(methodologyRaw, (row) => ({
  decision: row.Decisao,
  criterion: row['Criterio adotado'],
  rationale: row.Justificativa,
}));

const qualitySnapshot = parseCsv<QualitySnapshotRow>(qualityRaw, (row) => ({
  indicator: row.Indicador,
  value: row.Valor,
  note: row.Observacao,
}));

const scatter = parseCsv<PriceGrowthRow>(scatterRaw, (row) => ({
  network: row.network,
  price2025: toNumber(row.price_2025),
  growthPct: toNumber(row.growth_pct),
  sales2025: toNumber(row.sales_2025),
}));

const categoryRevenue = parseCsv<CategoryRevenueRow>(categoryRevenueRaw, (row) => ({
  category: row.category,
  sales2024: toNumber(row.sales_2024),
  sales2025: toNumber(row.sales_2025),
}));

const categoryGrowth = parseCsv<CategoryGrowthRow>(categoryGrowthRaw, (row) => ({
  category: row.category,
  growthAbs: toNumber(row.growth_abs),
  growthPct: toNumber(row.growth_pct),
}));

const categoryPrice = parseCsv<CategoryPriceRow>(categoryPriceRaw, (row) => ({
  category: row.category,
  price2024: toNumber(row.price_2024),
  price2025: toNumber(row.price_2025),
  priceGrowthPct: toNumber(row.price_growth_pct),
}));

const drivers = parseCsv<DriverRow>(driversRaw, (row) => ({
  network: row.network,
  growthAbs: toNumber(row.growth_abs),
  growthPct: toNumber(row.growth_pct),
}));

const categoryImpact = parseCsv<CategoryImpactRow>(categoryImpactRaw, (row) => ({
  category: row.category,
  growthAbs: toNumber(row.growth_abs),
  growthPct: toNumber(row.growth_pct),
}));

const networkMetrics = parseCsv<NetworkMetricsRow>(networkMetricsRaw, (row) => ({
  network: row.network,
  sales2024: toNumber(row.sales_2024),
  sales2025: toNumber(row.sales_2025),
  qty2024: toNumber(row.qty_2024),
  qty2025: toNumber(row.qty_2025),
  price2024: toNumber(row.price_2024),
  price2025: toNumber(row.price_2025),
  sort2024: toNumber(row.sort_2024),
  sort2025: toNumber(row.sort_2025),
  registeredStores: toNumber(row.registered_stores),
  activeStores2024: toNumber(row.active_stores_2024),
  activeStores2025: toNumber(row.active_stores_2025),
  ticketRegistered2025: toNumber(row.ticket_registered_2025),
  ticketActive2025: toNumber(row.ticket_active_2025),
  growthAbs: toNumber(row.growth_abs),
  growthPct: toNumber(row.growth_pct),
  ticketGapPct: toNumber(row.ticket_gap_pct),
}));

const overallMetrics = parseCsv<OverallMetricRow>(overallMetricsRaw, (row) => ({
  metric: row.metric,
  value2024: toNumber(row['2024']),
  value2025: toNumber(row['2025']),
  variationAbs: toNumber(row.var_abs),
  variationPct: toNumber(row.var_pct),
}));

const qualityByIndicator = Object.fromEntries(
  qualitySnapshot.map((row) => [row.indicator, row]),
);

const overallByMetric = Object.fromEntries(
  overallMetrics.map((row) => [row.metric, row]),
);

function buildParetoRows(
  rows: NetworkMetricsRow[],
  salesKey: 'sales2024' | 'sales2025',
): ParetoRow[] {
  const rankedRows = rows
    .filter((row) => row[salesKey] > 0)
    .sort((left, right) => right[salesKey] - left[salesKey]);

  const totalSales = rankedRows.reduce((accumulator, row) => accumulator + row[salesKey], 0);
  let cumulativeShare = 0;
  const detailedRows = rankedRows.map((row) => {
    const share = totalSales > 0 ? row[salesKey] / totalSales : 0;
    const previousCumulativeShare = cumulativeShare;
    cumulativeShare += share;

    return {
      network: row.network,
      sales: row[salesKey],
      share,
      cumulativeShare,
      isClassA: previousCumulativeShare < 0.8,
    };
  });

  const classARows = detailedRows.filter((row) => row.isClassA);
  const tailRows = detailedRows.filter((row) => !row.isClassA);

  if (tailRows.length === 0) {
    return classARows;
  }

  const tailSales = tailRows.reduce((accumulator, row) => accumulator + row.sales, 0);
  const tailShare = tailRows.reduce((accumulator, row) => accumulator + row.share, 0);

  return [
    ...classARows,
    {
      network: 'Demais redes',
      sales: tailSales,
      share: tailShare,
      cumulativeShare: 1,
      isClassA: false,
    },
  ];
}

const activeNetworks = networkMetrics.filter((row) => row.sales2025 > 0);
const comparableScatter = scatter.filter(
  (row) => isFiniteNumber(row.price2025) && isFiniteNumber(row.growthPct),
);
const positiveDrivers = drivers.filter((row) => row.growthAbs > 0);
const negativeDrivers = drivers.filter((row) => row.growthAbs < 0);
const categoryRevenueActive = categoryRevenue.filter((row) => row.sales2025 > 0);
const categoryGrowthActive = categoryGrowth.filter((row) => isFiniteNumber(row.growthPct));
const categoryPriceActive = categoryPrice.filter((row) => isFiniteNumber(row.price2025));
const categoryImpactActive = categoryImpact.filter((row) => isFiniteNumber(row.growthPct));
const paretoByYear = {
  '2024': buildParetoRows(networkMetrics, 'sales2024'),
  '2025': buildParetoRows(networkMetrics, 'sales2025'),
} as const;

const networkByName = Object.fromEntries(
  activeNetworks.map((row) => [row.network, row]),
);

const highestTicket = [...activeNetworks].sort(
  (left, right) => right.ticketActive2025 - left.ticketActive2025,
)[0];
const highestVolume = [...activeNetworks].sort(
  (left, right) => right.qty2025 - left.qty2025,
)[0];
const highestGrowthPct = [...activeNetworks]
  .filter((row) => isFiniteNumber(row.growthPct) && row.sales2024 > 0)
  .sort((left, right) => right.growthPct - left.growthPct)[0];
const highestGrowthAbs = [...activeNetworks].sort(
  (left, right) => right.growthAbs - left.growthAbs,
)[0];
const highestPrice = [...activeNetworks]
  .filter((row) => isFiniteNumber(row.price2025))
  .sort((left, right) => right.price2025 - left.price2025)[0];
const maxSort = Math.max(...activeNetworks.map((row) => row.sort2025));
const highestSortNetworks = activeNetworks
  .filter((row) => row.sort2025 === maxSort)
  .map((row) => row.network);
const pareto2025 = paretoByYear['2025'];
const paretoClassA = pareto2025.filter((row) => row.isClassA);
const topCategory = [...categoryRevenueActive].sort(
  (left, right) => right.sales2025 - left.sales2025,
)[0];
const fastestCategory = [...categoryGrowthActive].sort(
  (left, right) => right.growthPct - left.growthPct,
)[0];
const strongestPriceCategory = [...categoryPriceActive].sort(
  (left, right) => right.priceGrowthPct - left.priceGrowthPct,
)[0];
const scatterCorrelation = pearsonCorrelation(
  comparableScatter.map((row) => row.price2025),
  comparableScatter.map((row) => row.growthPct),
);

export const reportData = {
  metadata: {
    title: 'Relatório Final',
    subtitle: 'Case - Analista Comercial',
    company: 'La Vita Alimentos',
    author: 'Henrique Padueli Machado',
    requestedBlocks: [
      'Concentração de faturamento (Curva ABC / Pareto)',
      'Análise comparativa por cliente',
      'Análise direcionada por dimensão de negócio',
      'Análise de crescimento de vendas (YoY) - visão consolidada',
      'Análise de crescimento de vendas (YoY) - drivers por rede',
      'Análise de crescimento de vendas (YoY) - categorias',
      'Proposta de modelo de remuneração variável',
    ],
    objective:
      'Responder integralmente aos cinco blocos do case com clareza metodológica, confiabilidade dos números e interpretação correta dos dados.',
    dataBases: [
      {
        name: 'base_faturamento.xlsx',
        detail: 'Fatos de venda de 2024 e 2025.',
      },
      {
        name: 'base_cliente.xlsx',
        detail: 'Cadastro de 2.056 lojas e 271 redes.',
      },
      {
        name: 'base_produtos.xlsx',
        detail: 'Cadastro de 52 SKUs e 8 categorias.',
      },
      {
        name: 'base_macro_regiao.xlsx',
        detail: 'Base recebida para geografia, mas sem chave confiável para conclusão.',
      },
    ],
    structuralSummary: [
      { label: 'Faturamento 2024', value: '536.056 linhas' },
      { label: 'Faturamento 2025', value: '654.996 linhas' },
      { label: 'Cadastro de clientes', value: '2.056 lojas, 271 redes' },
      { label: 'Cadastro de produtos', value: '52 SKUs, 8 categorias' },
    ],
    activeBaseNotes: [
      'Apenas 385 lojas tiveram faturamento em 2025.',
      'Apenas 66 redes tiveram faturamento em 2025.',
      'Apenas 29 SKUs tiveram venda em 2024 e 2025.',
    ],
  },
  methodology,
  qualitySnapshot,
  pareto: pareto2025,
  paretoByYear,
  scatter: comparableScatter,
  categoryRevenue: categoryRevenueActive,
  categoryGrowth: categoryGrowthActive,
  categoryPrice: categoryPriceActive,
  drivers,
  categoryImpact: categoryImpactActive,
  networkMetrics: activeNetworks,
  overallMetrics,
  references: {
    dalben: networkByName.DALBEN,
    gpa: networkByName.GPA,
    daolio: networkByName.DAOLIO,
    mQualidade: networkByName['M.QUALIDADE'],
    stMarche: networkByName['ST MARCHE'],
    db: networkByName.DB,
  },
  overview: {
    revenue: overallByMetric.Receita,
    volume: overallByMetric.Volume,
    averagePrice: overallByMetric['Preço médio'],
    assortment: overallByMetric.Sortimento,
    totalTransactions: toInteger(qualityByIndicator['Transacoes analisadas']?.value ?? ''),
    totalTransactionsLabel: qualityByIndicator['Transacoes analisadas']?.value ?? 'n/d',
    activeNetworksCount: activeNetworks.length,
    paretoClassACount: paretoClassA.length,
    paretoClassAShare: paretoClassA.at(-1)?.cumulativeShare ?? Number.NaN,
    highestTicket,
    highestVolume,
    highestGrowthPct,
    highestGrowthAbs,
    highestPrice,
    highestSortValue: maxSort,
    highestSortNetworks,
    scatterCorrelation,
    scatterMedianPrice: median(comparableScatter.map((row) => row.price2025)),
    scatterMedianGrowth: median(comparableScatter.map((row) => row.growthPct)),
    topCategory,
    fastestCategory,
    strongestPriceCategory,
    positiveDrivers,
    negativeDrivers,
  },
};
