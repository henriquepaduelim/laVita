import { InsightBlock } from '../components/InsightBlock';
import { SectionShell } from '../components/SectionShell';

type RecommendationsSectionProps = {
  animated?: boolean;
};

export function RecommendationsSection({
  animated = true,
}: RecommendationsSectionProps) {
  return (
    <SectionShell
      id="recommendations"
      eyebrow="Recomendações"
      title="Principais recomendações."
      description="Prioridades objetivas para discussão com o gestor."
      animated={animated}
    >
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <InsightBlock title="1. Expandir sortimento" accent="brand">
          <p>
            Expandir sortimento em contas médias com volume relevante, mas mix
            abaixo do teto observado de 29 SKUs na base vendida.
          </p>
        </InsightBlock>
        <InsightBlock title="2. Proteger preço" accent="danger">
          <p>
            Proteger preço nas categorias em que o volume cresce, mas o preço
            médio cai, especialmente IN NATURA e COUVE.
          </p>
        </InsightBlock>
        <InsightBlock title="3. Separar bases" accent="amber">
          <p>
            Tratar separadamente contas novas e contas comparáveis, para evitar
            distorção na leitura de performance.
          </p>
        </InsightBlock>
        <InsightBlock title="4. Replicar padrões saudáveis" accent="success">
          <p>
            Replicar padrões comerciais das redes que cresceram com manutenção
            de preço médio saudável.
          </p>
        </InsightBlock>
        <InsightBlock title="5. Tratar detratores" accent="teal">
          <p>
            Acompanhar de forma dedicada as contas detratoras com maior perda
            absoluta de receita.
          </p>
        </InsightBlock>
      </div>
    </SectionShell>
  );
}
