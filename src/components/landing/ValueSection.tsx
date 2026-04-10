import type { ValuePillar } from "@/types/content";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface ValueSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  pillars: ValuePillar[];
}

/**
 * Explains the value proposition and core institutional outcomes of the platform.
 */
export function ValueSection({ eyebrow, title, description, pillars }: ValueSectionProps) {
  return (
    <Container as="section" id="propuesta" className="py-[var(--space-section-y)]">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Reveal
            key={pillar.title}
            delayMs={index * 120}
            className="rounded-card border border-stroke-soft bg-panel p-6 shadow-ambient-lg"
          >
            <h3 className="font-serif text-2xl text-ink">{pillar.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-dim">{pillar.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{pillar.source}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
