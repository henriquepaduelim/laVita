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
    <div className="executive-shell h-[100dvh] overflow-hidden">
      <a
        href="#deck-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--brand)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {/* Minimal brand indicator — top left, barely visible */}
      <div className="no-print pointer-events-none absolute left-7 top-4 z-30 flex items-center gap-2">
        <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink)] opacity-30">
          La Vita
        </p>
        <span className="h-px w-3 bg-[var(--ink)] opacity-20" />
        <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink)] opacity-20">
          {String(activeIndex + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(deckSlides.length).padStart(2, '0')}
        </p>
      </div>

      <div className="no-print pointer-events-none absolute inset-y-0 left-0 right-0 z-20">
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

      {/* Main slide — fills full viewport */}
      <main id="deck-main" className="h-full">
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
            className="h-full"
          >
            <activeSlide.component index={activeIndex} total={deckSlides.length} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimal dot navigation — bottom center */}
      <div className="no-print pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center">
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
                    ? 'h-[5px] w-[18px] bg-[var(--brand)] opacity-50'
                    : 'h-[5px] w-[5px] bg-[var(--ink)] opacity-20 hover:opacity-40'
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
