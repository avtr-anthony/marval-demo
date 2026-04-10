import type { Capability } from "@/types/content";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface CapabilitiesSectionProps {
  capabilities: Capability[];
}

/**
 * Displays prioritized functional capabilities extracted from documentary context.
 */
export function CapabilitiesSection({ capabilities }: CapabilitiesSectionProps) {
  return (
    <Container as="section" id="capacidades" className="pb-[var(--space-section-y)]">
      <SectionHeading
        eyebrow="Capacidades"
        title="Qué puede resolver la experiencia conversacional"
        description="Funcionalidades orientadas a cumplimiento, regularización y análisis de normativa con enfoque práctico."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal
            key={capability.title}
            delayMs={index * 90}
            className="rounded-card border border-stroke-soft bg-panel-soft p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="font-serif text-2xl text-ink">{capability.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{capability.description}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.15em] text-accent">{capability.source}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
