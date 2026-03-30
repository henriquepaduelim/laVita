import { InsightBlock } from '../components/InsightBlock';
import { KpiCard } from '../components/KpiCard';
import { SectionShell } from '../components/SectionShell';

type RemunerationSectionProps = {
  animated?: boolean;
};

const weightCards = [
  {
    label: 'Crescimento de volume comparável',
    value: '40%',
    detail: 'Premia expansão real de vendas em base YoY comparável.',
    tone: 'brand' as const,
  },
  {
    label: 'Disciplina de preço',
    value: '30%',
    detail: 'Evita crescimento puxado apenas por desconto excessivo.',
    tone: 'default' as const,
  },
  {
    label: 'Crescimento de sortimento',
    value: '20%',
    detail: 'Incentiva aumento de penetração e venda de portfólio mais completo.',
    tone: 'muted' as const,
  },
  {
    label: 'Execução de mix em clientes foco',
    value: '10%',
    detail: 'Ajuda a evitar concentração exagerada em poucos produtos.',
    tone: 'accent' as const,
  },
];

export function RemunerationSection({
  animated = true,
}: RemunerationSectionProps) {
  return (
    <SectionShell
      id="remuneration"
      eyebrow="Remuneração Variável"
      title="O modelo sugerido remunera crescimento com qualidade, e não apenas volume vendido."
      description="Estrutura proposta para alinhar venda, preço e mix."
      animated={animated}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {weightCards.map((card) => (
          <KpiCard
            key={card.label}
            label={card.label}
            value={card.value}
            detail={card.detail}
            tone={card.tone}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <InsightBlock title="Objetivo do modelo" accent="brand">
          <p>
            Remunerar crescimento com qualidade.
          </p>
        </InsightBlock>
        <InsightBlock title="Racional executivo" accent="teal">
          <p>
            Volume premia expansão, preço protege valor, sortimento amplia penetração e mix reduz concentração.
          </p>
        </InsightBlock>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <InsightBlock title="Regras de governança" accent="amber">
          <p>
            Clientes novos devem ser medidos separadamente de clientes
            comparáveis. Crescimento baseado apenas em desconto deve ter
            redutor. Ganho de sortimento só deve contar com recorrência mínima.
          </p>
        </InsightBlock>
        <InsightBlock title="Elegibilidade" accent="danger">
          <p>
            O componente de preço deve ter piso mínimo.
          </p>
        </InsightBlock>
      </div>
    </SectionShell>
  );
}
