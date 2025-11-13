import Image from 'next/image'

export function TestimonialSection() {
  return (
    <section id="reviews" className="px-4 py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-16 sm:gap-24">
        <div className="w-full flex flex-col gap-12 items-center">
          <div className="text-center flex flex-col gap-2">
            <p className="text-primary font-bold">고객의 목소리</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-normal text-gray-900 dark:text-white">
              실제 경험이 신뢰를 만듭니다
            </h2>
          </div>
          <div className="relative w-full max-w-3xl flex flex-col items-center justify-center gap-6 p-8 sm:p-10 rounded-xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="absolute -top-5 -left-5 text-7xl text-primary/20 dark:text-primary/30">
              <span className="material-symbols-outlined text-7xl">format_quote</span>
            </div>
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <Image
                alt="Photo of a female manager smiling"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCPWcawrZcctLmNYXBnUS5jvHNb_MOVc5NluXZh5yBqg1-0m_6lOYrKk59RMLdWiu4Im_5slgbgMYa5P136qVIcgpnu3RGI6GIhxxaLhegsnACyrpXs3kKSXzcdRSdEbu_pC6mofT_McmRoTf-064A_2E84CZgihnoUPOm3kW2iRdRyAeyQIqpt7shgHFzfSraATfmqNJzlYoAND0fFd0sbFVTKneUbVWlXIJmTGcDdcTw5K8q0B1juY2keS0JnzRbMWrS92VeXT6z"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex flex-col gap-4 text-center">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                "단순한 회식이 아니라, 팀원들이 서로의 마음을 이해하고 공감하는 시간이었습니다. 모하나 덕분에 정말 의미있는 워크샵을 진행할 수 있었어요."
              </p>
              <div className="mt-2">
                <p className="font-bold text-gray-900 dark:text-white">김민지 매니저</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">주식회사 성장</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
