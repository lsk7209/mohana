export function PainPointsSection() {
  return (
    <section className="relative px-4 -mt-24 sm:-mt-32 lg:-mt-40">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="text-center text-3xl font-bold tracking-normal text-gray-900 dark:text-white">
          혹시, 요즘 팀의 얼굴인가요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mb-48 sm:-mb-56 lg:-mb-64">
          <div className="flex flex-1 flex-col gap-4 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">침체된 분위기</h3>
              <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                소통이 줄고, 팀원들의 표정이 어두워졌나요?
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">짧은 리프레시 효과</h3>
              <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                비싼 워크샵 이후, 효과가 금방 사라지진 않나요?
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">battery_alert</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white">지친 리더</h3>
              <p className="text-sm font-normal leading-normal text-gray-600 dark:text-gray-400">
                팀의 성과와 팀원의 행복 사이에서 고민하고 있나요?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
