import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

interface TrustStripProps {
  items: string[];
}

/**
 * Monochrome trust strip that highlights legal and institutional references.
 */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="pt-16">
      <Container as="div">
        <Reveal className="rounded-panel border border-stroke-soft bg-panel/60 p-5 sm:p-7">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-dim">
            Fuentes normativas y organismos considerados
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((item) => (
              <div
                key={item}
                className="rounded-card border border-stroke-soft bg-panel px-4 py-3 text-center text-xs font-medium text-ink-dim"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
