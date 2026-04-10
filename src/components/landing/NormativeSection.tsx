import type { NormativeHighlight } from "@/types/content";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface NormativeSectionProps {
  highlights: NormativeHighlight[];
}

/**
 * Converts legal points into clear highlight cards for fast comprehension.
 */
export function NormativeSection({ highlights }: NormativeSectionProps) {
  return (
    <Container as="section" id="normativa" className="pb-[var(--space-section-y)]">
      <SectionHeading
        eyebrow="Normativa destacada"
        title="Puntos regulatorios clave priorizados para consulta rápida"
        description="Resumen técnico en formato visual para evitar lectura legal cruda en la experiencia principal."
      />
      <div className="mt-10 space-y-4">
        {highlights.map((highlight, index) => (
          <Reveal
            key={highlight.title}
            delayMs={index * 100}
            className="rounded-card border border-stroke-soft bg-panel px-6 py-5 shadow-ambient-lg"
          >
            <div className="grid gap-4 lg:grid-cols-[1.1fr_1.9fr_1fr] lg:items-start">
              <h3 className="font-serif text-2xl text-ink">{highlight.title}</h3>
              <p className="leading-relaxed text-ink-dim">{highlight.detail}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent lg:text-right">
                {highlight.source}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
