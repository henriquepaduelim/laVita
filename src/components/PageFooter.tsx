import { Link, useLocation } from 'react-router-dom';

export function PageFooter() {
  const location = useLocation();
  const isPrintRoute = location.pathname === '/print';

  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-[var(--ink-soft)] md:px-8 md:flex-row md:items-center md:justify-between xl:px-10">
        <p>
          Fonte: apresentação baseada no relatório final do case e nos CSVs preparados.
        </p>
        <Link to={isPrintRoute ? '/' : '/print'} className="font-semibold text-[var(--brand)]">
          {isPrintRoute ? 'Abrir experiência interativa' : 'Abrir layout para PDF'}
        </Link>
      </div>
    </footer>
  );
}
