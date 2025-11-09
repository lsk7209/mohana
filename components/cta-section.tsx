import { Button } from "@/components/ui/button"
import { LeadForm } from "@/components/lead-form"

export function CTASection() {
  return (
    <section className="py-20 md:py-28 my-16">
      <div
        className="rounded-lg p-10 md:p-16 text-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, #B2C7E5 0%, #A8D8C9 100%)',
        }}
      >
        <h2 className="text-dark-slate-gray text-3xl md:text-4xl font-bold mb-4">
          지금 바로 우리 팀을 위한<br />최고의 솔루션을 만나보세요
        </h2>
        <p className="text-dark-slate-gray/80 mb-8 max-w-xl mx-auto">
          간단한 정보만 남겨주시면, 전문 컨설턴트가 최적의 프로그램을 제안해 드립니다.
        </p>
        <div className="max-w-md mx-auto">
          <LeadForm />
        </div>
      </div>
    </section>
  )
}
