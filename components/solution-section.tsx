import Image from 'next/image'

export function SolutionSection() {
  return (
    <section className="bg-white dark:bg-gray-900 px-4 pt-48 sm:pt-56 lg:pt-64 pb-16 sm:pb-24">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-normal text-gray-900 dark:text-white">
            우리는 회복을 디자인합니다.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            단순한 이벤트가 아닌, 팀의 지속가능한 성장을 위한 솔루션입니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <div className="text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">spa</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">힐링 기반 프로그램</h3>
                <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                  데이터를 기반으로 팀의 현재 상태를 진단하고, 맞춤형 힐링 프로그램을 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">검증된 강사진</h3>
                <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                  각 분야 최고의 전문가, 엄선된 파트너와 함께 최고의 경험을 만듭니다.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-primary mt-1">
                <span className="material-symbols-outlined text-2xl">autorenew</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">지속가능한 팀 케어</h3>
                <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                  일회성 이벤트가 아닌, 워크샵 이후에도 지속되는 사후 코칭을 지원합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                alt="A team collaborating happily in a workshop."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADziTGgAnE37DlsQ_gp_uKQcrpVZFDMlSFznkK_adk1tyXWo-ao2tzrtkntpaIuYv74uYUNEW9AgDLd0bWe-IZis6P4UUqwzuoXTWNB1YqY2aVIxr8lg6OzR3KwLIdIb8OfIXFJCdsbYbwGZFUfdhaqFLEihzcFlFVZEWWQ7dAC-eNJmeJ-TNH0-eNHKbDuPpWduUGGnTU_vh4Ek_NsJAyZMl3YEna-Hfjh77okcAxRsqTf_nWGjOQLyDB_O4E2drdE7ioB4q0c9mK"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

