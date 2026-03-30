import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  animated?: boolean;
};

const animationProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  animated = true,
}: SectionShellProps) {
  const content = (
    <>
      <div className="mb-8 max-w-3xl md:mb-12">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
          {description}
        </p>
      </div>
      {children}
    </>
  );

  const baseClassName =
    `mx-auto w-full max-w-7xl px-5 py-14 md:px-8 md:py-20 xl:px-10 ${className}`.trim();

  if (!animated) {
    return (
      <section id={id} className={baseClassName}>
        {content}
      </section>
    );
  }

  return (
    <motion.section id={id} className={baseClassName} {...animationProps}>
      {content}
    </motion.section>
  );
}
