import {
    ChevronDown,
    Database,
    FileText,
    Gavel,
    Globe,
    LockKeyhole,
    Scale,
    SearchCheck,
    ShieldCheck,
} from 'lucide-react';

import type { FaqItem } from '@/types/content';

import { Container } from '../ui/Container';
import styles from './PostHeroSections.module.css';

interface PostHeroSectionsProps {
    faq: FaqItem[];
}

const marqueeItems = [
    { icon: Scale, label: 'Marco legal' },
    { icon: FileText, label: 'Normativa vigente' },
    { icon: SearchCheck, label: 'Jurisprudencia' },
    { icon: Database, label: 'Fuentes oficiales' },
    { icon: LockKeyhole, label: 'Confidencialidad' },
    { icon: ShieldCheck, label: 'Cumplimiento' },
    { icon: Gavel, label: 'Análisis técnico' },
    { icon: Globe, label: 'Actualización diaria' },
];

/**
 * Renders the post-hero landing sections with the requested visual flow.
 */
export function PostHeroSections({ faq }: PostHeroSectionsProps) {
    return (
        <>
            <Container
                as="section"
                className={styles.marqueeSection}
            >
                <div className={styles.sectionContent}>
                    <div className={styles.marqueeViewport}>
                        <div
                            aria-hidden
                            className={styles.marqueeFadeLeft}
                        />
                        <div
                            aria-hidden
                            className={styles.marqueeFadeRight}
                        />
                        <div
                            className={`${styles.marqueeRow} ${styles.marqueeRowLeft}`}
                        >
                            {[...marqueeItems, ...marqueeItems].map(
                                (item, index) => (
                                    <div
                                        key={`left-${item.label}-${index}`}
                                        className={styles.chip}
                                    >
                                        <item.icon size={15} />
                                        <span>{item.label}</span>
                                    </div>
                                ),
                            )}
                        </div>
                        <div
                            className={`${styles.marqueeRow} ${styles.marqueeRowRight}`}
                        >
                            {[...marqueeItems, ...marqueeItems].map(
                                (item, index) => (
                                    <div
                                        key={`right-${item.label}-${index}`}
                                        className={styles.chip}
                                    >
                                        <item.icon size={15} />
                                        <span>{item.label}</span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </Container>

            <Container
                as="section"
                className={styles.faqSection}
            >
                <div className={styles.faqContent}>
                    <div className="text-center">
                        <span className={styles.faqBadge}>FAQ</span>
                        <h2 className={`${styles.faqTitle} font-serif`}>
                            Preguntas frecuentes
                        </h2>
                    </div>
                    <div className={styles.faqList}>
                        {faq.slice(0, 8).map((item, index) => (
                            <details
                                key={item.question}
                                className={styles.faqItem}
                            >
                                <summary className={styles.faqSummary}>
                                    <span className={styles.faqIndex}>
                                        {index + 1}
                                    </span>
                                    <p className={styles.faqQuestion}>
                                        {item.question}
                                    </p>
                                    <ChevronDown
                                        size={15}
                                        className={styles.faqIcon}
                                    />
                                </summary>
                                <div className={styles.faqBody}>
                                    <p className={styles.faqAnswer}>
                                        {item.answer}
                                    </p>
                                    <p className={styles.faqSource}>
                                        {item.source}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}
