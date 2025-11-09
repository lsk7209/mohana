import { PublicLayout } from "@/components/public-layout"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { SolutionSection } from "@/components/solution-section"
import { ProgramsSection } from "@/components/programs-section"
import { DataSection } from "@/components/data-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FinalCTASection } from "@/components/final-cta-section"

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <PainPointsSection />
      <SolutionSection />
      <ProgramsSection />
      <DataSection />
      <TestimonialSection />
      <FinalCTASection />
    </PublicLayout>
  )
}
