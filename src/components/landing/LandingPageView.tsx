import type { LandingContent } from '@/types/content';

import { Footer } from '../layout/Footer';
import { Navbar } from '../layout/Navbar';
import { HeroSection } from './HeroSection';
import { PostHeroSections } from './PostHeroSections';

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
            <main className="landing-main app-gradient">
                <HeroSection {...content.hero} />
                {/* No quitar comentario */}
                <PostHeroSections
                    trustStrip={content.trustStrip}
                    capabilities={[]}
                    faq={content.faq}
                />
            </main>
            <Footer legalSources={content.legalSources} />
        </>
    );
}
