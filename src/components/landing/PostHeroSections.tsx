import {
  ChevronDown,
  CirclePlay,
  Database,
  FileText,
  Gavel,
  Globe,
  LockKeyhole,
  Scale,
  SearchCheck,
  ShieldCheck
} from "lucide-react";

import type { Capability, FaqItem } from "@/types/content";
import { siteConfig } from "@/config/site";

import { ActionLink } from "../ui/ActionLink";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

interface PostHeroSectionsProps {
  trustStrip: string[];
  capabilities: Capability[];
  faq: FaqItem[];
}

const marqueeItems = [
  { icon: Scale, label: "Marco legal" },
  { icon: FileText, label: "Normativa vigente" },
  { icon: SearchCheck, label: "Jurisprudencia" },
  { icon: Database, label: "Fuentes oficiales" },
  { icon: LockKeyhole, label: "Confidencialidad" },
  { icon: ShieldCheck, label: "Cumplimiento" },
  { icon: Gavel, label: "Análisis técnico" },
  { icon: Globe, label: "Actualización diaria" }
];

/**
 * Renders the post-hero landing sections with the requested visual flow.
 */
export function PostHeroSections({ trustStrip, capabilities, faq }: PostHeroSectionsProps) {
  const rows = capabilities.slice(0, 5);

  return (
    <>
      <Container as="section" className="pt-16">
        <div className="relative space-y-3 overflow-hidden py-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#050506] via-[#050506]/85 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#050506] via-[#050506]/85 to-transparent"
          />
          <div className="marquee-track-left flex w-max items-center gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={`left-${item.label}-${index}`}
                className="inline-flex items-center gap-2 rounded-pill border border-stroke-soft bg-transparent px-4 py-2 text-sm text-ink"
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="marquee-track-right flex w-max items-center gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                key={`right-${item.label}-${index}`}
                className="inline-flex items-center gap-2 rounded-pill border border-stroke-soft bg-transparent px-4 py-2 text-sm text-ink"
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container as="section" className="py-[var(--space-section-y)]">
        <Reveal className="space-y-8">
          <div className="grid grid-cols-2 gap-4 text-center text-xs uppercase tracking-[0.16em] text-ink-dim md:grid-cols-5">
            {trustStrip.slice(0, 5).map((item) => (
              <div key={item} className="rounded-card border border-stroke-soft bg-transparent px-3 py-4 text-ink">
                {item}
              </div>
            ))}
          </div>
          <div className="group relative mx-auto w-full max-w-4xl">
            <div className="aspect-[16/9] w-full overflow-hidden bg-[linear-gradient(145deg,#2a2d33_0%,#191c22_45%,#101216_100%)]">
              <div className="h-full w-full bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.18),transparent_40%),linear-gradient(to_bottom,rgba(0,0,0,0.28),rgba(0,0,0,0.45))]" />
            </div>
            <button
              type="button"
              className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-950 shadow-ambient-lg transition-transform duration-300 group-hover:scale-105"
            >
              <CirclePlay size={30} />
            </button>
          </div>
        </Reveal>
      </Container>

      <Container as="section" className="pb-[calc(var(--space-section-y)*1.15)]">
        <Reveal className="bg-transparent p-8 text-center sm:p-12">
          <span className="inline-flex rounded-pill border border-stroke-soft bg-transparent px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink">
            Seguridad
          </span>
          <h2 className="mt-5 font-serif text-4xl text-ink sm:text-5xl">Seguridad y confidencialidad</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim">
            Tratamiento de información con estándares estrictos para operaciones legales y fiscales.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["ISO 27001", "ISO 42001", "SOC2 TYPE II", "Protección de datos"].map((item) => (
              <div key={item} className="rounded-card border border-stroke-soft bg-white/[0.03] p-4">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-stroke-soft bg-transparent p-3 text-sm font-semibold text-ink">
                  {item.split(" ").slice(0, 2).join(" ")}
                </div>
                <p className="mt-3 text-sm text-ink-dim">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <Container as="section" className="space-y-36 pb-[calc(var(--space-section-y)*1.35)]">
        {rows.map((row, index) => {
          const imageFirst = index % 2 === 1;

          return (
            <Reveal key={row.title} className="grid items-center gap-14 lg:grid-cols-2">
              <div className={imageFirst ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                <h3 className="font-serif text-5xl text-ink">{row.title}</h3>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-dim">{row.description}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.16em] text-ink-dim">{row.source}</p>
              </div>
              <div className={imageFirst ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                <div className="overflow-hidden rounded-panel border border-stroke-soft bg-white shadow-ambient-xl">
                  <div className="flex items-center gap-2 border-b border-slate-300 px-5 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="space-y-4 px-6 py-6">
                    <div className="h-8 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-11/12 rounded bg-slate-200" />
                    <div className="h-4 w-5/6 rounded bg-slate-200" />
                    <div className="mt-6 h-[18rem] rounded bg-slate-100" />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </Container>

      <Container as="section" className="pb-[calc(var(--space-section-y)*1.1)]">
        <Reveal className="overflow-hidden rounded-panel border border-stroke-soft bg-panel shadow-ambient-xl">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.6fr]">
            <div className="relative p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_80%,rgba(255,255,255,0.28),transparent_45%)]" />
              <div className="relative">
                <p className="text-lg font-semibold text-ink">¿Listo para probar?</p>
                <h3 className="mt-4 font-serif text-6xl leading-none text-ink">Empieza gratis</h3>
                <p className="mt-6 max-w-sm text-2xl leading-relaxed text-ink-dim">
                  Probá consultas en segundos y validá resultados con tu equipo.
                </p>
                <ActionLink href={siteConfig.routes.chat} className="mt-8 bg-white px-6 py-3 text-slate-900 hover:bg-slate-100">
                  Probar ahora
                </ActionLink>
              </div>
            </div>
            <div className="min-h-[320px] bg-[radial-gradient(circle_at_20%_30%,#f1eee8,#cec7bd_45%,#90877a_100%)]" />
          </div>
        </Reveal>
      </Container>

      <Container as="section" className="pb-[calc(var(--space-section-y)*1.15)]">
        <div className="mx-auto max-w-2xl">
          <span className="mx-auto inline-flex rounded-pill bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-900">
            FAQ
          </span>
          <h2 className="mt-5 text-center font-serif text-3xl text-ink sm:text-4xl">Preguntas frecuentes</h2>
          <div className="mt-10 space-y-1">
            {faq.slice(0, 8).map((item, index) => (
              <details
                key={item.question}
                className="group border-b border-white/10"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 py-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-stroke-soft bg-transparent text-[11px] font-semibold text-ink">
                    {index + 1}
                  </span>
                  <p className="flex-1 text-sm font-medium text-ink sm:text-base">
                    {item.question}
                  </p>
                  <ChevronDown
                    size={15}
                    className="text-slate-400 transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <div className="pb-5 pl-10 pr-6">
                  <p className="text-xs leading-relaxed text-ink-dim sm:text-sm">{item.answer}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-400">{item.source}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
