import type { LandingContent } from "@/types/content";

import { Footer } from "../layout/Footer";
import { Navbar } from "../layout/Navbar";
import { HeroSection } from "./HeroSection";
import { PostHeroSections } from "./PostHeroSections";

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
      <main className="relative isolate overflow-hidden bg-[#050506]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(29,63,121,0.34)_0%,rgba(16,28,52,0.22)_36%,rgba(6,8,12,0.08)_62%,rgba(5,5,6,0)_82%),linear-gradient(to_bottom,#050506_0%,#040405_100%)]"
        />
        <HeroSection {...content.hero} />
        <PostHeroSections
          trustStrip={content.trustStrip}
          capabilities={content.capabilities}
          faq={content.faq}
        />
      </main>
      <Footer legalSources={content.legalSources} />
    </>
  );
}
