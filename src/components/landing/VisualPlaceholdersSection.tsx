import type { PlaceholderPanel } from "@/types/content";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { VisualPlaceholderCard } from "../ui/VisualPlaceholderCard";

interface VisualPlaceholdersSectionProps {
  panels: PlaceholderPanel[];
}

/**
 * Holds premium placeholders for future product imagery and mockups.
 */
export function VisualPlaceholdersSection({ panels }: VisualPlaceholdersSectionProps) {
  return (
    <Container as="section" className="pb-[var(--space-section-y)]">
      <SectionHeading
        eyebrow="Sección visual"
        title="Espacios listos para integrar activos finales sin romper la estética"
        description="Estos paneles abstractos reemplazan mockups o capturas hasta contar con recursos gráficos definitivos."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {panels.map((panel) => (
          <VisualPlaceholderCard key={panel.title} {...panel} />
        ))}
      </div>
    </Container>
  );
}
