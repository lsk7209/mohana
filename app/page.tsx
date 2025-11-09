import { PublicLayout } from "@/components/public-layout"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { SolutionSection } from "@/components/solution-section"
import { ProgramsSection } from "@/components/programs-section"
import { DataSection } from "@/components/data-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { ScrollAnimate } from "@/components/scroll-animate"

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <ScrollAnimate animation="slide-up" delay={0}>
        <PainPointsSection />
      </ScrollAnimate>
      <ScrollAnimate animation="slide-up" delay={100}>
        <SolutionSection />
      </ScrollAnimate>
      <ScrollAnimate animation="fade" delay={200}>
        <ProgramsSection />
      </ScrollAnimate>
      <ScrollAnimate animation="scale" delay={100}>
        <DataSection />
      </ScrollAnimate>
      <ScrollAnimate animation="slide-up" delay={200}>
        <TestimonialSection />
      </ScrollAnimate>
      <ScrollAnimate animation="fade" delay={100}>
        <FinalCTASection />
      </ScrollAnimate>
    </PublicLayout>
  )
}
