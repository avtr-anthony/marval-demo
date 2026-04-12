export interface ValuePillar {
  title: string;
  description: string;
  source: string;
}

export interface Capability {
  title: string;
  description: string;
  source: string;
}

export interface NormativeHighlight {
  title: string;
  detail: string;
  source: string;
}

export interface PlaceholderPanel {
  title: string;
  description: string;
  badge: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  source: string;
}

export interface LegalSourceItem {
  name: string;
  note: string;
}

export interface LandingContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    promptHint: string;
  };
  trustStrip: string[];
  value: {
    eyebrow: string;
    title: string;
    description: string;
    pillars: ValuePillar[];
  };
  capabilities: Capability[] | null;
  normativeHighlights: NormativeHighlight[];
  visualPanels: PlaceholderPanel[];
  faq: FaqItem[];
  finalCta: {
    title: string;
    description: string;
    primaryButton: string;
  };
  legalSources: LegalSourceItem[];
}
