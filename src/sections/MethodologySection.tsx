import { reportData } from '../data/reportData';
import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';

type MethodologySectionProps = {
  animated?: boolean;
};

function resolveQualityTone(indicator: string) {
  if (indicator.includes('Join')) {
    return 'success' as const;
  }

  if (indicator.includes('Período')) {
    return 'accent' as const;
  }

  return 'muted' as const;
}

export function MethodologySection({
  animated = true,
}: MethodologySectionProps) {
  const { methodology, qualitySnapshot, overview, metadata } = reportData;

  return (
    <SectionShell
      id="rigor"
      eyebrow="Metodologia"
      title="Premissas e qualidade dos dados."
      description="Critérios adotados para evitar distorções de leitura."
      animated={animated}
    >
      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.9fr]">
        <div className="panel rounded-[2rem] overflow-hidden">
          <div className="border-b border-[var(--border)] bg-[var(--brand)] px-6 py-5 text-white">
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Decisões metodológicas adotadas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[var(--surface-muted)] text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-[var(--ink-soft)]">
                    Decisão
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[var(--ink-soft)]">
                    Critério adotado
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[var(--ink-soft)]">
                    Justificativa
                  </th>
                </tr>
              </thead>
              <tbody>
                {methodology.map((row, index) => (
                  <tr
                    key={row.decision}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-[var(--surface-muted)]'}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-[var(--ink)]">
                      {row.decision}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-semibold ${
                        row.criterion === 'Descartada'
                          ? 'text-[var(--danger)]'
                          : 'text-[var(--accent)]'
                      }`}
                    >
                      {row.criterion}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--ink-soft)]">
                      {row.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          {qualitySnapshot
            .filter((row) => row.indicator !== 'Transacoes analisadas')
            .map((row) => (
              <KpiCard
                key={row.indicator}
                label={row.indicator}
                value={row.value}
                detail={row.note}
                tone={resolveQualityTone(row.indicator)}
              />
            ))}
          <KpiCard
            label="Transações analisadas"
            value={overview.totalTransactionsLabel}
            detail="Volume-base consolidado do estudo."
            note="As leituras executivas desta interface utilizam a mesma base já reconciliada no pipeline analítico."
            tone="brand"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="grid gap-4 lg:grid-cols-3">
          {metadata.activeBaseNotes.map((note, index) => (
            <InsightBlock
              key={note}
              title={`Base ativa ${String(index + 1).padStart(2, '0')}`}
              accent={index === 2 ? 'amber' : 'teal'}
            >
              <p>{note}</p>
            </InsightBlock>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <InsightBlock title="Limite metodológico" accent="danger">
          <p>
            A macro-região foi descartada da análise conclusiva porque a chave de
            junção não sustenta segmentação auditável. O único código de produto
            sem cadastro foi LVI.0014.000004, com impacto residual na leitura
            geral.
          </p>
        </InsightBlock>
      </div>
    </SectionShell>
  );
}
