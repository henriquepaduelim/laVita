import { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  description?: string;
  question?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
};

export function ChartCard({
  title,
  description,
  children,
  className = '',
  compact = false,
}: ChartCardProps) {
  return (
    <article
      className={`${
        compact
          ? 'panel-interactive rounded-[1.35rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(250,251,253,0.86))] p-[0.85rem] shadow-none backdrop-blur-sm sm:rounded-[1.55rem] sm:p-[0.95rem]'
          : 'panel panel-interactive rounded-4xl p-6 md:p-7'
      } ${className}`.trim()}
    >
      <h3 className={`font-display ${compact ? 'text-[1rem] sm:text-[1.05rem]' : 'mt-3 text-2xl'} font-semibold tracking-tight text-(--ink)`}>
        {title}
      </h3>
      {description ? (
        <p className={`mt-1.5 max-w-2xl ${compact ? 'text-[0.8rem] leading-5 sm:text-[0.82rem]' : 'text-base leading-7'} text-(--ink-soft)`}>
          {description}
        </p>
      ) : null}
      <div className={`chart-grid ${compact ? (description ? 'mt-3' : 'mt-2') : 'mt-6'}`}>{children}</div>
    </article>
  );
}
