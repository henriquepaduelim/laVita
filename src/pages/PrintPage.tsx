import { PageFooter } from '../components/PageFooter';
import { ReportSections } from '../sections/ReportSections';

export function PrintPage() {
  return (
    <div className="executive-shell print-mode print-page">
      <main>
        <div className="mx-auto w-full max-w-7xl px-5 pt-8 text-sm text-[var(--ink-soft)] md:px-8 xl:px-10">
          Versão otimizada para exportação em PDF e leitura estática.
        </div>
        <ReportSections printMode />
      </main>
      <PageFooter />
    </div>
  );
}
