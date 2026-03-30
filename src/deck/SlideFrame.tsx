import { ReactNode } from 'react';

type SlideFrameProps = {
  eyebrow: string;
  title: string;
  summary: string;
  index: number;
  total: number;
  children: ReactNode;
  hideHeader?: boolean;
};

export function SlideFrame({
  eyebrow,
  title,
  summary,
  index,
  total,
  children,
  hideHeader = false,
}: SlideFrameProps) {
  return (
    <section className="deck-canvas deck-scroll relative flex h-full min-h-0 flex-col overflow-y-auto px-6 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-5">
      <p className="pointer-events-none absolute right-6 top-4 font-display text-[0.7rem] tabular-nums tracking-[0.1em] text-[var(--ink-soft)]/60 xl:right-12 xl:top-5">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      {hideHeader ? (
        <div className="min-h-0 flex-1">{children}</div>
      ) : (
        <>
          <div className="max-w-none">
            <div className="flex flex-wrap items-center gap-y-1">
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <div className="mt-1.5 flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
              <h1 className="font-display max-w-[18ch] text-[1.5rem] font-semibold tracking-tight leading-[1.04] text-[var(--ink)] lg:text-[1.72rem] xl:max-w-none xl:text-[1.9rem]">
                {title}
              </h1>
              <p className="max-w-[42rem] text-[0.84rem] leading-[1.65] text-[var(--ink-soft)] xl:pt-0.5 xl:text-right xl:text-[0.88rem]">
                {summary}
              </p>
            </div>
          </div>
          <div className="mt-3 min-h-0 flex-1">{children}</div>
        </>
      )}
    </section>
  );
}
