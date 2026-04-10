"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { FaqItem } from "@/types/content";
import { cn } from "@/utils/cn";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

interface FaqSectionProps {
  items: FaqItem[];
}

/**
 * FAQ accordion with concise answers tied to documentary sources.
 */
export function FaqSection({ items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Container as="section" id="faq" className="pb-[var(--space-section-y)]">
      <SectionHeading
        eyebrow="FAQ"
        title="Preguntas frecuentes para acelerar decisiones operativas"
        description="Respuestas breves basadas en la normativa cargada y en el uso esperado del chat."
      />
      <div className="mt-10 space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <Reveal key={item.question} delayMs={index * 80}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full rounded-card border border-stroke-soft bg-panel p-5 text-left shadow-ambient-sm transition-colors hover:bg-panel-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-ink sm:text-lg">{item.question}</h3>
                  <ChevronDown
                    className={cn("mt-1 shrink-0 text-ink-dim transition-transform", isOpen && "rotate-180")}
                    size={18}
                  />
                </div>
                {isOpen ? (
                  <div className="mt-4 space-y-3 border-t border-stroke-soft pt-4">
                    <p className="leading-relaxed text-ink-dim">{item.answer}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-accent">{item.source}</p>
                  </div>
                ) : null}
              </button>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
