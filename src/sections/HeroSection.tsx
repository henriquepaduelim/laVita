import { Link } from 'react-router-dom';
import { reportData } from '../data/reportData';
import {
  formatCurrency,
  formatRatio,
} from '../utils/format';

type HeroSectionProps = {
  printMode?: boolean;
};

export function HeroSection({ printMode = false }: HeroSectionProps) {
  const { metadata, overview } = reportData;

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-10 pb-14 md:px-8 md:pt-16 md:pb-20 xl:px-10">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.8fr]">
        <div className="panel rounded-[2rem] p-7 md:p-9">
          <p className="eyebrow">Case Analista Comercial</p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[var(--ink)] md:text-6xl">
            La Vita Alimentos
            <br />
            Análise Comercial 2024-2025
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--ink-soft)] md:text-xl">
            Síntese executiva do case com foco em concentração de receita,
            desempenho por cliente, leitura por categoria, crescimento YoY e
            proposta de gestão comercial.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
              Período fechado: 2024 e 2025
            </div>
            <div className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
              Base auditada: {overview.totalTransactionsLabel} transações
            </div>
            <div className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink-soft)]">
              Dimensão escolhida: categoria
            </div>
          </div>

          {!printMode ? (
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#summary"
                className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explorar relatório
              </a>
              <Link
                to="/print"
                className="rounded-full border border-[var(--border-strong)] px-5 py-3 text-sm font-semibold text-[var(--brand)] transition-colors duration-200 hover:bg-white"
              >
                Abrir versão print
              </Link>
            </div>
          ) : null}
        </div>

        <aside className="panel-strong rounded-[2rem] p-7 md:p-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Blocos do case
          </p>
          <div className="mt-6 space-y-4">
            {metadata.requestedBlocks.map((block, index) => (
              <div
                key={block}
                className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4"
              >
                <div className="font-display min-w-9 text-2xl font-semibold tracking-tight text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="pt-1 text-base leading-7 text-white/78">{block}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
            <p className="text-sm font-medium text-white/62">Dado central de 2025</p>
            <p className="font-display mt-2 text-2xl font-semibold">
              {formatCurrency(overview.revenue.value2025)}
            </p>
            <p className="mt-2 text-sm text-white/62">
              Correlação preço x crescimento: {formatRatio(overview.scatterCorrelation, 4)}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
