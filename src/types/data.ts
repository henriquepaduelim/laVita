export type MethodologyRow = {
  decision: string;
  criterion: string;
  rationale: string;
};

export type QualitySnapshotRow = {
  indicator: string;
  value: string;
  note: string;
};

export type ParetoRow = {
  network: string;
  sales: number;
  share: number;
  cumulativeShare: number;
  isClassA: boolean;
};

export type PriceGrowthRow = {
  network: string;
  price2025: number;
  growthPct: number;
  sales2025: number;
};

export type CategoryRevenueRow = {
  category: string;
  sales2024: number;
  sales2025: number;
};

export type CategoryGrowthRow = {
  category: string;
  growthAbs: number;
  growthPct: number;
};

export type CategoryPriceRow = {
  category: string;
  price2024: number;
  price2025: number;
  priceGrowthPct: number;
};

export type DriverRow = {
  network: string;
  growthAbs: number;
  growthPct: number;
};

export type CategoryImpactRow = {
  category: string;
  growthAbs: number;
  growthPct: number;
};

export type NetworkMetricsRow = {
  network: string;
  sales2024: number;
  sales2025: number;
  qty2024: number;
  qty2025: number;
  price2024: number;
  price2025: number;
  sort2024: number;
  sort2025: number;
  registeredStores: number;
  activeStores2024: number;
  activeStores2025: number;
  ticketRegistered2025: number;
  ticketActive2025: number;
  growthAbs: number;
  growthPct: number;
  ticketGapPct: number;
};

export type OverallMetricRow = {
  metric: string;
  value2024: number;
  value2025: number;
  variationAbs: number;
  variationPct: number;
};
