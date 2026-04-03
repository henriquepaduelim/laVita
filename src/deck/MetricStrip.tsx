type MetricStripItem = {
  label: string;
  value: string;
  detail: string;
  emphasis?: 'brand' | 'accent' | 'muted';
};

type MetricStripProps = {
  items: MetricStripItem[];
  columns?: 4 | 3;
};

function resolveTone(emphasis: MetricStripItem['emphasis']) {
  if (emphasis === 'brand') {
    return 'bg-[linear-gradient(180deg,rgba(15,33,53,0.98),rgba(15,33,53,0.94))] text-white';
  }

  if (emphasis === 'accent') {
    return 'bg-[rgba(46,85,121,0.08)]';
  }

  if (emphasis === 'muted') {
    return 'bg-[rgba(15,33,53,0.03)]';
  }

  return 'bg-transparent';
}

export function MetricStrip({ items, columns = 4 }: MetricStripProps) {
  const gridClassName = columns === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4';

  return (
    <div className="overflow-hidden rounded-[1.55rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(248,250,252,0.92))] backdrop-blur-sm">
      <div className={`grid ${gridClassName}`}>
        {items.map((item, index) => (
          <div
            key={item.label}
            data-emphasis={item.emphasis ?? 'default'}
            className={`metric-cell flex min-h-[8.85rem] flex-col justify-between px-3 py-3 sm:px-4 sm:py-4 ${resolveTone(item.emphasis)} ${
              index > 0 ? 'border-t border-[var(--border)] xl:border-t-0 xl:border-l' : ''
            } border-[var(--border)]`}
          >
            <p
              className={`font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] sm:text-[0.72rem] sm:tracking-[0.18em] ${
                item.emphasis === 'brand' ? 'text-white/70' : 'text-[var(--ink-soft)]'
              }`}
            >
              {item.label}
            </p>
            <div
              className={`font-display mt-2.5 text-[1.42rem] font-semibold tracking-tight sm:mt-3 sm:text-[1.72rem] ${
                item.emphasis === 'brand' ? 'text-white' : 'text-[var(--ink)]'
              }`}
            >
              {item.value}
            </div>
            <p
              className={`mt-2 text-[0.8rem] leading-5 sm:text-[0.84rem] ${
                item.emphasis === 'brand' ? 'text-white/76' : 'text-[var(--ink-soft)]'
              }`}
            >
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
