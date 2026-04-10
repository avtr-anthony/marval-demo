import type { PlaceholderPanel } from "@/types/content";

/**
 * Premium placeholder card used for future visual assets without breaking composition.
 */
export function VisualPlaceholderCard({ badge, title, description }: PlaceholderPanel) {
  return (
    <article className="group relative overflow-hidden rounded-panel border border-stroke-soft bg-panel p-6 shadow-ambient-lg">
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent/30 blur-3xl transition duration-500 group-hover:scale-110" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-sky-500/20 blur-3xl transition duration-500 group-hover:scale-105" />
      <span className="relative inline-flex rounded-pill border border-stroke-soft bg-panel-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        {badge}
      </span>
      <h3 className="relative mt-6 font-serif text-2xl text-ink">{title}</h3>
      <p className="relative mt-3 leading-relaxed text-ink-dim">{description}</p>
      <div className="relative mt-8 rounded-card border border-stroke-soft bg-gradient-to-br from-slate-800/60 via-slate-900/30 to-slate-950/60 p-8">
        <div className="h-40 rounded-card border border-dashed border-stroke-soft bg-[radial-gradient(circle_at_20%_20%,rgba(138,180,255,0.35),transparent_46%),radial-gradient(circle_at_80%_60%,rgba(113,126,150,0.25),transparent_40%)]" />
      </div>
    </article>
  );
}
