import { MessageSquare, ShieldCheck } from 'lucide-react';

import { Container } from '../ui/Container';
import { PillBadge } from '../ui/PillBadge';
import { Reveal } from '../ui/Reveal';
import { HeroChatPrompt } from './HeroChatPrompt';

interface HeroSectionProps {
    badge: string;
    title: string;
    subtitle: string;
    promptHint: string;
}

/**
 * Main hero block with institutional messaging and chat entry CTA.
 */
export function HeroSection({
    badge,
    title,
    subtitle,
    promptHint,
}: HeroSectionProps) {
    return (
        <section className="hero-section-shell relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32">
            <Container
                as="div"
                narrow
                className="relative max-w-[68rem] pb-12 sm:pb-16"
            >
                <Reveal
                    delayMs={80}
                    className="space-y-7 text-center"
                >
                    {/* <PillBadge className="hero-badge">{badge}</PillBadge> */}
                    <h1 className="hero-title font-serif text-[clamp(2.2rem,5vw,4.7rem)] leading-[1.06]">
                        {title}
                    </h1>
                    <p className="hero-subtitle mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
                        {subtitle}
                    </p>
                </Reveal>

                <Reveal
                    delayMs={190}
                    className="mx-auto mt-10 max-w-2xl"
                >
                    <HeroChatPrompt placeholder="Escribe tu consulta..." />
                </Reveal>

                <Reveal
                    delayMs={290}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
                >
                    <PillBadge className="hero-meta-pill gap-2">
                        <ShieldCheck size={14} />
                        Trazabilidad documental
                    </PillBadge>
                    <PillBadge className="hero-meta-pill gap-2">
                        <MessageSquare size={14} />
                        Flujo conversacional persistente
                    </PillBadge>
                </Reveal>
            </Container>
        </section>
    );
}
