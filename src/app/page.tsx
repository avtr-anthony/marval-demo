import { LandingPageView } from "@/components/landing/LandingPageView";
import { buildLandingContent } from "@/services/document-content.service";

/**
 * Home route that renders the institutional landing with documentary-based content.
 */
export default async function HomePage() {
  const content = await buildLandingContent();

  return <LandingPageView content={content} />;
}
