import { createFileRoute } from "@tanstack/react-router";

import { MarketingLayout } from "@/layouts/MarketingLayout";
import { Hero } from "@/components/landing/Hero";
import { HeroVisual } from "@/components/landing/HeroVisual";
import { ValueStrip } from "@/components/landing/ValueStrip";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { IntelligenceSection } from "@/components/landing/IntelligenceSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { FinalCta } from "@/components/landing/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LearnLens AI — Turn any YouTube video into a learning path" },
      {
        name: "description",
        content:
          "LearnLens transforms educational YouTube videos into summaries, smart notes, quizzes, knowledge graphs, AI tutoring and a personalized learning path.",
      },
      { property: "og:title", content: "LearnLens AI — Turn any YouTube video into a learning path" },
      {
        property: "og:description",
        content:
          "Stop just watching. Analyze any educational video and get summaries, quizzes, a knowledge graph and an AI tutor built from it.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MarketingLayout>
      <Hero />
      <div className="mx-auto -mt-6 max-w-[1360px] px-5 md:px-8">
        <HeroVisual />
      </div>
      <ValueStrip />
      <ProblemSection />
      <FeatureShowcase />
      <HowItWorks />
      <IntelligenceSection />
      <ProductPreview />
      <FinalCta />
    </MarketingLayout>
  );
}
