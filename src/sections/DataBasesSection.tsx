import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';
import { reportData } from '../data/reportData';

type DataBasesSectionProps = {
  animated?: boolean;
};

export function DataBasesSection({ animated = true }: DataBasesSectionProps) {
  const { metadata } = reportData;

  return (
    <SectionShell
      id="bases"
      eyebrow="Bases Utilizadas"
      title="A apresentação parte das quatro bases originais do case e do resumo estrutural já validado."
      description="Esta seção replica o enquadramento do relatório final para deixar claro o universo analisado antes da leitura de desempenho."
      animated={animated}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metadata.dataBases.map((base, index) => (
          <KpiCard
            key={base.name}
            label={`Base ${String(index + 1).padStart(2, '0')}`}
            value={base.name}
            detail={base.detail}
            tone={index === 0 ? 'brand' : 'muted'}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {metadata.structuralSummary.map((item) => (
          <InsightBlock key={item.label} title={item.label} accent="teal">
            <p>{item.value}</p>
          </InsightBlock>
        ))}
      </div>
    </SectionShell>
  );
}
