import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";

import { ActionLink } from "../ui/ActionLink";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";

interface FinalCtaSectionProps {
  title: string;
  description: string;
  buttonLabel: string;
}

/**
 * Closing CTA that drives users from landing narrative into fullscreen chat.
 */
export function FinalCtaSection({ title, description, buttonLabel }: FinalCtaSectionProps) {
  return (
    <Container as="section" className="pb-[var(--space-section-y)]">
      <div className="rounded-panel border border-stroke-soft bg-panel p-8 shadow-ambient-xl sm:p-10">
        <SectionHeading eyebrow="Acción" title={title} description={description} align="center" />
        <div className="mt-8 flex justify-center">
          <ActionLink href={siteConfig.routes.chat} className="gap-2 px-6 py-3">
            {buttonLabel}
            <ArrowRight size={17} />
          </ActionLink>
        </div>
      </div>
    </Container>
  );
}
