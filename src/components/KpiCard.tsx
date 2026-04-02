type KpiCardTone = 'default' | 'brand' | 'accent' | 'success' | 'danger' | 'muted';

type KpiCardProps = {
  label: string;
  value: string;
  detail: string;
  note?: string;
  tone?: KpiCardTone;
  className?: string;
  compact?: boolean;
};

const toneClassNames: Record<KpiCardTone, string> = {
  default: 'panel text-[var(--ink)]',
  brand: 'panel-strong',
  accent: 'panel text-[var(--ink)]',
  success: 'panel text-[var(--ink)]',
  danger: 'panel text-[var(--ink)]',
  muted: 'panel-muted text-[var(--ink)]',
};

const accentBorders: Record<KpiCardTone, string> = {
  default: 'border-transparent',
  brand: 'border-white/10',
  accent: 'border-[rgba(58,143,18,0.22)]',
  success: 'border-[rgba(45,122,58,0.22)]',
  danger: 'border-[rgba(192,57,43,0.22)]',
  muted: 'border-[var(--border)]',
};

export function KpiCard({
  label,
  value,
  detail,
  note,
  tone = 'default',
  className = '',
  compact = false,
}: KpiCardProps) {
  const compactClassName =
    tone === 'brand'
      ? 'panel-interactive rounded-[1.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(160,30,28,0.98),rgba(128,20,18,0.94))] p-[0.8rem] text-white shadow-none sm:rounded-[1.3rem] sm:p-[0.9rem]'
      : tone === 'muted'
        ? 'panel-interactive rounded-[1.15rem] border border-[var(--border)] bg-[rgba(250,251,253,0.76)] p-[0.8rem] text-[var(--ink)] shadow-none sm:rounded-[1.3rem] sm:p-[0.9rem]'
        : 'panel-interactive rounded-[1.15rem] border border-[var(--border)] bg-[rgba(255,255,255,0.62)] p-[0.8rem] text-[var(--ink)] shadow-none backdrop-blur-sm sm:rounded-[1.3rem] sm:p-[0.9rem]';

  return (
    <article
      className={`${
        compact
          ? compactClassName
          : `panel-interactive rounded-[1.75rem] border p-6 ${toneClassNames[tone]} ${accentBorders[tone]}`
      } ${className}`.trim()}
    >
      <p
        className={`font-display text-[0.68rem] font-semibold uppercase tracking-[0.17em] sm:text-xs sm:tracking-[0.18em] ${
          tone === 'brand' ? 'text-white/70' : 'text-[var(--ink-soft)]'
        }`}
      >
        {label}
      </p>
      <div
        className={`font-display ${compact ? 'mt-2.5 text-[1.5rem] sm:mt-3 sm:text-[1.8rem] md:text-[2rem]' : 'mt-5 text-3xl md:text-4xl'} font-semibold tracking-tight ${
          tone === 'brand' ? 'text-white' : 'text-[var(--ink)]'
        }`}
      >
        {value}
      </div>
      <p
        className={`mt-2 ${compact ? 'text-[0.8rem] leading-5 sm:text-[0.84rem]' : 'text-base leading-7'} ${
          tone === 'brand' ? 'text-white/78' : 'text-[var(--ink-soft)]'
        }`}
      >
        {detail}
      </p>
      {note ? (
        <p
          className={`mt-4 border-t pt-4 text-sm leading-6 ${
            tone === 'brand'
              ? 'border-white/12 text-white/62'
              : 'border-[var(--border)] text-[var(--ink-soft)]'
          }`}
        >
          {note}
        </p>
      ) : null}
    </article>
  );
}
