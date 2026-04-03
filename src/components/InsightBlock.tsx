import { ReactNode } from 'react';

type InsightBlockProps = {
  title: string;
  children: ReactNode;
  accent?: 'brand' | 'teal' | 'success' | 'danger' | 'amber';
  className?: string;
  compact?: boolean;
};

const accentClassNames = {
  brand: 'bg-[rgba(15,33,53,0.1)] text-[var(--brand)]',
  teal: 'bg-[rgba(46,85,121,0.12)] text-[var(--accent)]',
  success: 'bg-[rgba(55,89,76,0.12)] text-[var(--success)]',
  danger: 'bg-[rgba(123,64,59,0.12)] text-[var(--danger)]',
  amber: 'bg-[rgba(124,91,50,0.12)] text-[var(--warning)]',
};

export function InsightBlock({
  title,
  children,
  accent = 'brand',
  className = '',
  compact = false,
}: InsightBlockProps) {
  if (compact) {
    return (
      <article className={`group flex h-full flex-col border-t border-[var(--border)] pt-2.5 transition-all duration-200 hover:border-[var(--border-strong)] hover:translate-x-[2px] ${className}`.trim()}>
        <div
          className={`inline-flex rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 group-hover:saturate-125 ${accentClassNames[accent]}`}
        >
          {title}
        </div>
        <div className="mt-2.5 flex-1 text-[0.84rem] leading-5 text-[var(--ink-soft)]">{children}</div>
      </article>
    );
  }

  return (
    <article className={`panel-muted panel-interactive rounded-[1.75rem] p-5 ${className}`.trim()}>
      <div
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${accentClassNames[accent]}`}
      >
        {title}
      </div>
      <div className="mt-4 text-base leading-7 text-[var(--ink-soft)]">
        {children}
      </div>
    </article>
  );
}
