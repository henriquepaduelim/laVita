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
    <section className="deck-canvas deck-scroll flex h-full min-h-0 flex-col overflow-y-auto px-6 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-5">
      {hideHeader ? (
        <div className="min-h-0 flex-1">{children}</div>
      ) : (
        <>
          <div className="max-w-none">
            <div className="flex flex-wrap items-center gap-y-1">
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <div className="mt-1.5 flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <h1 className="font-display max-w-[18ch] text-[1.5rem] font-semibold tracking-tight leading-[1.04] text-[var(--ink)] lg:text-[1.72rem] xl:max-w-none xl:text-[1.9rem]">
                  {title}
                </h1>
                <p className="font-display pb-0.5 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </p>
              </div>
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
