'use client'

/**
 * 대표 프로그램 섹션 컴포넌트
 * 힐링워크의 주요 프로그램을 소개하는 섹션
 */
export function NewProgramsSection() {
  const programs = [
    {
      id: 'healing',
      icon: 'self_improvement',
      title: '힐링 프로그램',
      description: '명상, 요가, 숲 치유 등으로 몸과 마음의 안정을 찾습니다.'
    },
    {
      id: 'teambuilding',
      icon: 'groups',
      title: '팀빌딩 프로그램',
      description: '협업 게임과 액티비티를 통해 팀워크를 강화합니다.'
    },
    {
      id: 'communication',
      icon: 'chat',
      title: '소통 프로그램',
      description: '서로를 더 깊이 이해하고 긍정적인 관계를 형성합니다.'
    },
    {
      id: 'leadership',
      icon: 'school',
      title: '리더십 프로그램',
      description: '리더의 역량을 강화하고, 효과적인 팀 관리를 돕습니다.'
    }
  ]

  return (
    <section className="py-16 md:py-24" id="programs" aria-labelledby="programs-heading">
      <h2 id="programs-heading" className="text-dark-slate-gray dark:text-white text-center text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5">
        대표 프로그램
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {programs.map((program) => (
          <div 
            key={program.id}
            className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                {program.icon}
              </span>
            </div>
            <h3 className="text-dark-slate-gray dark:text-white font-bold text-lg">
              {program.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {program.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

