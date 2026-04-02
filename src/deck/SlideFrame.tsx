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
    <section className="deck-canvas deck-scroll relative flex h-full min-h-0 flex-col overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-5">
      <p className="pointer-events-none absolute right-4 top-3 font-display text-[0.68rem] tabular-nums tracking-[0.1em] text-[var(--ink-soft)]/60 sm:right-6 sm:top-4 xl:right-12 xl:top-5">
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
            <div className="mt-1 flex flex-col gap-2.5 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
              <h1 className="font-display max-w-[17ch] text-[1.34rem] font-semibold tracking-tight leading-[1.04] text-[var(--ink)] sm:text-[1.5rem] lg:text-[1.72rem] xl:max-w-none xl:text-[1.9rem]">
                {title}
              </h1>
              <p className="max-w-[42rem] pr-10 text-[0.82rem] leading-[1.55] text-[var(--ink-soft)] sm:pr-14 sm:text-[0.84rem] xl:pt-0.5 xl:pr-0 xl:text-right xl:text-[0.88rem]">
                {summary}
              </p>
            </div>
          </div>
          <div className="mt-3 min-h-0 flex-1 pb-16 md:pb-0">{children}</div>
        </>
      )}
    </section>
  );
}
