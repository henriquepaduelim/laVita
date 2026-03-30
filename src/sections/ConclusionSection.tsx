import { InsightBlock } from '../components/InsightBlock';
import { SectionShell } from '../components/SectionShell';

type ConclusionSectionProps = {
  animated?: boolean;
};

export function ConclusionSection({
  animated = true,
}: ConclusionSectionProps) {
  return (
    <SectionShell
      id="conclusion"
      eyebrow="Conclusão Final"
      title="A La Vita cresceu de forma relevante em 2025, puxada majoritariamente por volume, mas ainda com espaço claro de qualificação comercial."
      description="O fechamento abaixo replica as conclusões centrais do relatório final e encerra a apresentação com a mesma linha argumentativa do documento."
      animated={animated}
    >
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <InsightBlock title="Concentração" accent="brand">
          <p>
            A receita está concentrada em poucas redes relevantes, o que torna a
            gestão das contas-chave tema central da execução comercial.
          </p>
        </InsightBlock>
        <InsightBlock title="Preço" accent="amber">
          <p>
            O crescimento não foi sustentado principalmente por preço. A
            evidência agregada e a correlação por rede apontam para expansão
            puxada mais por volume e cobertura.
          </p>
        </InsightBlock>
        <InsightBlock title="Sortimento" accent="teal">
          <p>
            O sortimento vendido permaneceu estável no agregado, indicando espaço
            para aprofundar mix sem depender apenas da entrada de novos SKUs.
          </p>
        </InsightBlock>
        <InsightBlock title="Categorias" accent="success">
          <p>
            Algumas categorias crescem fortemente, mas com dinâmicas distintas
            entre volume e preço. A leitura correta depende de separar escala,
            aceleração e pressão de valor.
          </p>
        </InsightBlock>
        <InsightBlock title="Confiabilidade" accent="danger">
          <p>
            O acompanhamento por rede é mais confiável do que por macro-região.
            A apresentação preserva esse limite metodológico em toda a narrativa.
          </p>
        </InsightBlock>
        <InsightBlock title="Síntese executiva" accent="brand">
          <p>
            Há espaço para aprofundar mix em contas relevantes, proteger preço
            nas categorias pressionadas, tratar grandes contas com gestão
            dedicada e separar aquisição de base nova de crescimento orgânico.
          </p>
        </InsightBlock>
      </div>
    </SectionShell>
  );
}
