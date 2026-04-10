import { startTransition, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { deckSlides } from './slides';

function clampIndex(index: number) {
  return Math.max(0, Math.min(deckSlides.length - 1, index));
}

export function SlideDeck() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [direction, setDirection] = useState(1);
  const currentSlideId = searchParams.get('slide') ?? deckSlides[0].id;
  const activeIndex = clampIndex(
    deckSlides.findIndex((slide) => slide.id === currentSlideId),
  );

  useEffect(() => {
    if (!deckSlides.some((slide) => slide.id === currentSlideId)) {
      startTransition(() => {
        setSearchParams({ slide: deckSlides[0].id }, { replace: true });
      });
    }
  }, [currentSlideId, setSearchParams]);

  const activeSlide = deckSlides[activeIndex];

  function goToSlide(nextIndex: number) {
    const resolvedIndex = clampIndex(nextIndex);
    if (resolvedIndex === activeIndex) return;
    setDirection(resolvedIndex > activeIndex ? 1 : -1);
    startTransition(() => {
      setSearchParams({ slide: deckSlides[resolvedIndex].id }, { replace: true });
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="executive-shell flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden">
      <a
        href="#deck-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--brand)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <div className="no-print pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden md:block">
        <button
          type="button"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="pointer-events-auto absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white/52 text-[1rem] text-[var(--ink-soft)] shadow-none backdrop-blur-sm transition-colors duration-200 hover:bg-white/78 hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-0"
          aria-label="Slide anterior"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => goToSlide(activeIndex + 1)}
          disabled={activeIndex === deckSlides.length - 1}
          className="pointer-events-auto absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-white/52 text-[1rem] text-[var(--ink-soft)] shadow-none backdrop-blur-sm transition-colors duration-200 hover:bg-white/78 hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-0"
          aria-label="Próximo slide"
        >
          ›
        </button>
      </div>

      {/* Main slide — scrolls on small screens; fixed viewport on md+ */}
      <main
        id="deck-main"
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto max-md:overscroll-y-contain max-md:pb-[calc(7rem+env(safe-area-inset-bottom,0px))] md:h-full md:overflow-hidden md:pb-0"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSlide.id}
            custom={direction}
            initial={{ opacity: 0, y: 8, scale: 0.994 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.994 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -400) goToSlide(activeIndex + 1);
              if (info.offset.x > 80 || info.velocity.x > 400) goToSlide(activeIndex - 1);
            }}
            className="w-full min-w-0 max-w-full max-md:min-h-min md:h-full md:min-h-0"
          >
            <activeSlide.component index={activeIndex} total={deckSlides.length} />
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="no-print pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-1 md:hidden">
        <div className="pointer-events-auto grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-[1.1rem] border border-[var(--border)] bg-white/78 px-3 py-2.5 shadow-[0_10px_24px_rgba(8,18,29,0.08)] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex min-h-11 items-center justify-start rounded-[0.9rem] px-3 text-sm font-semibold text-[var(--ink)] transition-colors duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-35"
            aria-label="Slide anterior"
          >
            Anterior
          </button>
          <p className="text-center text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(deckSlides.length).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === deckSlides.length - 1}
            className="flex min-h-11 items-center justify-end rounded-[0.9rem] px-3 text-sm font-semibold text-[var(--ink)] transition-colors duration-200 hover:bg-white disabled:pointer-events-none disabled:opacity-35"
            aria-label="Próximo slide"
          >
            Próximo
          </button>
        </div>
      </div>

      {/* Minimal dot navigation — bottom center */}
      <div className="no-print pointer-events-none absolute inset-x-0 bottom-[calc(4.65rem+env(safe-area-inset-bottom,0px))] z-30 flex justify-center md:bottom-3 md:pb-0">
        <div className="pointer-events-auto flex items-center gap-[5px]">
          {deckSlides.map((slide, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  active
                    ? 'h-[6px] w-[22px] bg-[var(--brand)] opacity-55'
                    : 'h-[6px] w-[6px] bg-[var(--ink)] opacity-20 hover:opacity-40'
                }`}
                aria-label={`Ir para ${slide.label}`}
                aria-current={active ? 'step' : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
