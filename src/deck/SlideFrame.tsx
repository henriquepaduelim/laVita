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
    <section className="deck-canvas relative flex h-auto min-h-0 w-full min-w-0 max-w-full flex-col overflow-visible px-4 py-3 sm:px-6 sm:py-4 md:h-full md:overflow-hidden lg:px-8 lg:py-5 xl:px-10 xl:py-5">
      <p className="pointer-events-none absolute right-4 top-3 font-display text-[0.64rem] tabular-nums tracking-[0.1em] text-[var(--ink-soft)]/60 sm:right-6 sm:top-4 xl:right-10 xl:top-5">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      {hideHeader ? (
        <div className="min-h-0 flex-1 overflow-visible md:overflow-hidden">{children}</div>
      ) : (
        <>
          <div className="max-w-none pr-10 xl:pr-0">
            <div className="flex flex-wrap items-center gap-y-1">
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <div className="mt-1 grid gap-2 xl:grid-cols-[max-content_minmax(0,1fr)] xl:items-start xl:gap-8">
              <h1 className="font-display text-[1.48rem] font-semibold tracking-tight leading-[1.02] text-[var(--ink)] sm:text-[1.66rem] lg:text-[1.92rem] xl:whitespace-nowrap xl:text-[2.16rem]">
                {title}
              </h1>
              <p className="w-full min-w-0 text-[0.9rem] leading-[1.48] text-[var(--ink-soft)] sm:text-[0.92rem] xl:whitespace-nowrap xl:pt-1 xl:text-right xl:text-[0.96rem]">
                {summary}
              </p>
            </div>
          </div>
          <div className="mt-3 min-h-0 flex-1 overflow-visible md:overflow-hidden">{children}</div>
        </>
      )}
    </section>
  );
}
