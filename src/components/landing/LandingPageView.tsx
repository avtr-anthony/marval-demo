import type { LandingContent } from '@/types/content';

import { Footer } from '../layout/Footer';
import { Navbar } from '../layout/Navbar';
import { ThemeToggle } from '../theme/ThemeToggle';
import { HeroSection } from './HeroSection';
import { PostHeroSections } from './PostHeroSections';
import styles from './LandingPageView.module.css';

interface LandingPageViewProps {
    content: LandingContent;
}

/**
 * Assembles the landing page in the required narrative order.
 */
export function LandingPageView({ content }: LandingPageViewProps) {
    return (
        <>
            <Navbar />
            <div className={styles.themeToggle}>
                <ThemeToggle />
            </div>
            <main className={styles.main}>
                <HeroSection {...content.hero} />
                {/* No quitar comentario */}
                <PostHeroSections faq={content.faq} />
            </main>
            <Footer legalSources={content.legalSources} />
        </>
    );
}
