import { reportData } from '../data/reportData';
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRatio,
  formatSignedPercent,
} from '../utils/format';
import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';

type ExecutiveSummarySectionProps = {
  animated?: boolean;
};

export function ExecutiveSummarySection({
  animated = true,
}: ExecutiveSummarySectionProps) {
  const { overview } = reportData;

  return (
    <SectionShell
      id="summary"
      eyebrow="Resumo Executivo"
      title="Quatro sinais resumem a leitura do case."
      description="Crescimento puxado por volume, concentração relevante em poucas redes, estabilidade de sortimento e pouca relação entre preço e crescimento."
      animated={animated}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Receita 2025"
          value={formatCurrency(overview.revenue.value2025)}
          detail={`${formatSignedPercent(overview.revenue.variationPct)} vs. 2024.`}
          tone="brand"
        />
        <KpiCard
          label="Volume 2025"
          value={formatNumber(overview.volume.value2025)}
          detail={`${formatPercent(overview.volume.variationPct)} vs. 2024.`}
          tone="default"
        />
        <KpiCard
          label="Preço Médio"
          value={formatCurrency(overview.averagePrice.value2025, 2)}
          detail={`${formatPercent(overview.averagePrice.variationPct)} vs. 2024.`}
          tone="default"
        />
        <KpiCard
          label="Pareto"
          value={`${overview.paretoClassACount} redes`}
          detail={`${formatPercent(overview.paretoClassAShare)} da receita de 2025.`}
          tone="muted"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <InsightBlock title="Leitura 1" accent="brand">
          <p>O crescimento de 2025 foi majoritariamente sustentado por volume.</p>
        </InsightBlock>
        <InsightBlock title="Leitura 2" accent="teal">
          <p>
            A receita depende de poucas redes relevantes, com {overview.paretoClassACount} contas concentrando a maior parte do resultado.
          </p>
        </InsightBlock>
        <InsightBlock title="Leitura 3" accent="amber">
          <p>
            Preço e crescimento têm relação praticamente nula no nível de rede: correlação de {formatRatio(overview.scatterCorrelation, 4)}.
          </p>
        </InsightBlock>
      </div>
    </SectionShell>
  );
}
