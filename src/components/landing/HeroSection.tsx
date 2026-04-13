import { MessageSquare, ShieldCheck } from 'lucide-react';

import { Container } from '../ui/Container';
import { PillBadge } from '../ui/PillBadge';
import { Reveal } from '../ui/Reveal';
import { HeroChatPrompt } from './HeroChatPrompt';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
    badge: string;
    title: string;
    subtitle: string;
    promptHint: string;
}

/**
 * Main hero block with institutional messaging and chat entry CTA.
 */
export function HeroSection({ title, subtitle, promptHint }: HeroSectionProps) {
    return (
        <section className={styles.section}>
            <Container
                as="div"
                narrow
                className={styles.container}
            >
                <Reveal
                    delayMs={80}
                    className={styles.content}
                >
                    <h1 className={`${styles.title} font-serif`}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </Reveal>

                <Reveal
                    delayMs={190}
                    className={styles.prompt}
                >
                    <HeroChatPrompt placeholder={promptHint} />
                </Reveal>

                <Reveal
                    delayMs={290}
                    className={styles.metaList}
                >
                    <PillBadge className={styles.metaPill}>
                        <ShieldCheck size={14} />
                        Trazabilidad documental
                    </PillBadge>
                    <PillBadge className={styles.metaPill}>
                        <MessageSquare size={14} />
                        Flujo conversacional persistente
                    </PillBadge>
                </Reveal>
            </Container>
        </section>
    );
}
