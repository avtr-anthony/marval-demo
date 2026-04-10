import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/**
 * Reusable section heading block used across all landing sections.
 */
export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
      {eyebrow ? (
        <span className="inline-flex rounded-pill border border-stroke-soft bg-panel-soft px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-relaxed text-ink-dim">{description}</p> : null}
    </div>
  );
}
