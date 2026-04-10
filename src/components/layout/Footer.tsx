import type { LegalSourceItem } from "@/types/content";

import { siteConfig } from "@/config/site";

import { BrandLogo } from "./BrandLogo";
import { Container } from "../ui/Container";

interface FooterProps {
  legalSources: LegalSourceItem[];
}

/**
 * Institutional footer with documentary sources and legal framing.
 */
export function Footer({ legalSources }: FooterProps) {
  return (
    <footer className="border-t border-stroke-soft bg-panel/30 py-14">
      <Container as="div" className="space-y-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-xl text-sm leading-relaxed text-ink-dim">
              Demo frontend institucional para experiencias de consulta tributaria de Neuquén.
              Esta interfaz no reemplaza dictámenes formales ni asesoramiento profesional.
            </p>
          </div>
          <div className="rounded-card border border-stroke-soft bg-transparent px-5 py-4 text-xs uppercase tracking-[0.16em] text-ink">
            {siteConfig.brand.legalName}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {legalSources.map((item) => (
            <article key={item.name} className="rounded-card border border-stroke-soft bg-transparent px-5 py-4">
              <h3 className="text-sm font-semibold text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.note}</p>
            </article>
          ))}
        </div>

        <p className="border-t border-stroke-soft pt-6 text-xs text-ink-dim">
          © {new Date().getFullYear()} {siteConfig.brand.name}. Demo técnica para validación de UX y
          arquitectura frontend.
        </p>
      </Container>
    </footer>
  );
}
