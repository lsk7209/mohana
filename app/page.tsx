import { PublicLayout } from "@/components/public-layout"
import { NewHeroSection } from "@/components/new-hero-section"
import { ConcernsSection } from "@/components/concerns-section"
import { ValuesSection } from "@/components/values-section"
import { NewProgramsSection } from "@/components/new-programs-section"
import { NewReviewsSection } from "@/components/new-reviews-section"
import { NewCTASection } from "@/components/new-cta-section"

/**
 * 메인 페이지 컴포넌트
 * 새로운 디자인에 맞춘 힐링워크 메인 페이지
 */
export default function Home() {
  return (
    <PublicLayout>
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewHeroSection />
        <ConcernsSection />
        <ValuesSection />
        <NewProgramsSection />
        <NewReviewsSection />
        <NewCTASection />
      </main>
    </PublicLayout>
  )
}
