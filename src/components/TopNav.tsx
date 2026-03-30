import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { href: '#summary', label: 'Resumo' },
  { href: '#rigor', label: 'Metodologia' },
  { href: '#pareto', label: 'Pareto' },
  { href: '#clients', label: 'Clientes' },
  { href: '#categories', label: 'Categorias' },
  { href: '#drivers', label: 'YoY' },
  { href: '#recommendations', label: 'Recomendações' },
  { href: '#remuneration', label: 'Remuneração' },
];

export function TopNav() {
  const location = useLocation();
  const isPrintRoute = location.pathname === '/print';

  return (
    <header className="no-print sticky top-0 z-30 border-b border-[var(--border)] bg-[rgba(243,245,248,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8 xl:px-10">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            La Vita Alimentos
          </p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Apresentação executiva 2024-2025
          </p>
        </div>
        <nav className="hidden items-center gap-4 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--ink-soft)] transition-colors duration-200 hover:text-[var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Link
          to={isPrintRoute ? '/' : '/print'}
          className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--brand)] transition-colors duration-200 hover:bg-white"
        >
          {isPrintRoute ? 'Versão interativa' : 'Versão print'}
        </Link>
      </div>
    </header>
  );
}
