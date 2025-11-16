import { notFound } from 'next/navigation'
import { ProgramDetailClient } from './program-detail-client'

/**
 * 프로그램 정보 조회
 * 
 * 현재는 정적 데이터를 사용하고 있습니다.
 * 실제 API 연동 시 아래와 같이 구현하세요:
 * 
 * async function getProgram(slug: string) {
 *   try {
 *     const response = await fetch(`/api/programs/${slug}`)
 *     if (!response.ok) return null
 *     const data = await response.json()
 *     return data.program
 *   } catch (error) {
 *     console.error('Error fetching program:', error)
 *     return null
 *   }
 * }
 */
function getProgram(slug: string) {
  // 임시 데이터
  const programs: Record<string, any> = {
    'communication-skill': {
      id: 'communication-skill',
      slug: 'communication-skill',
      title: '[소통 레벨업] 우리 팀을 하나로 만드는 커뮤니케이션 스킬',
      subtitle: '갈등을 해결하고 시너지를 만드는 대화법을 배웁니다.',
      summary: '갈등을 해결하고 시너지를 만드는 대화법을 배웁니다.',
      description:
        '효과적인 커뮤니케이션 스킬을 배우고 조직 내 소통 문화를 개선합니다. 다양한 상황에서의 대화 기법과 갈등 해결 방법을 실습을 통해 익힙니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABHLbnc27KeCiOGP8b7tWeCEEREKV6iLBaT-DZSDELQmLjOqk6bdLpVmcAppaZDdg8veOmbkuycsSB0L13ZKfEJ8ikxKcjCxgnNn22IgWQ5hqUJK1GF7iKRZ9wYtDxtOA0vV09s8Bz3jBRjenruKUOS5pgEtuRm_MJIIvK2wT4tVqMUZ-QY1TaJcfu_pdxRdxQZe_HC8si3ys18y8gwwA2YfTegYhX8KCOTb8bby8Gf639rX279tqpC9mhui0MWcIbCzoFrERgtXQ_',
      duration: 4,
      headcount: '10-30명',
      price: '1인당 8만원 ~',
      theme: '소통',
      curriculum: [
        '1시간: 소통의 기본 원리와 갈등 이해',
        '1시간: 효과적인 대화 기법 실습',
        '1시간: 팀 내 갈등 해결 워크샵',
        '1시간: 실전 적용 및 피드백',
      ],
      effects: [
        '팀 내 소통 효율성 40% 향상',
        '갈등 해결 시간 50% 단축',
        '팀원 간 신뢰도 증가',
        '프로젝트 협업 성공률 향상',
      ],
      faq: [
        {
          question: '온라인으로도 진행 가능한가요?',
          answer: '네, 온라인과 오프라인 모두 가능합니다. 팀의 상황에 맞게 선택하실 수 있습니다.',
        },
        {
          question: '최소 인원은 몇 명인가요?',
          answer: '최소 10명부터 시작 가능하며, 최대 30명까지 참여 가능합니다.',
        },
        {
          question: '프로그램 시간을 조정할 수 있나요?',
          answer: '네, 팀의 일정에 맞춰 시간을 조정할 수 있습니다. 별도 문의 부탁드립니다.',
        },
      ],
      instructor: {
        name: '김민준',
        title: '커뮤니케이션 전문가 | 조직개발 컨설턴트',
        bio: '20년 이상의 조직 개발 경험을 바탕으로 효과적인 커뮤니케이션 방법론을 개발했습니다. 다양한 기업의 팀 빌딩과 갈등 해결을 도왔습니다.',
        quote: '진정한 소통은 말하는 것이 아니라 듣는 것에서 시작됩니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['소통', '갈등관리', '팀빌딩'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '팀 내 효과적인 소통 문화를 구축하고 갈등을 건설적으로 해결하는 능력을 기릅니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '팀 내 소통 문제로 어려움을 겪는 조직, 갈등 해결이 필요한 팀에게 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '소통 효율성 향상과 갈등 해결 시간 단축을 통해 팀의 생산성을 크게 향상시킵니다.',
        },
      ],
      reviews: [
        {
          company: 'TechCorp',
          companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrDvkd1KYs5WKfqS8EBJt7ym-hx6vY2HqhEm9NNRIDRWmnWPN6Pm8GU4fUrdjimYdarP-H6s4pfUW2iXK_-AJQw4nbw8T3Kijds7FmBUFYhAw3ZxGYupMGoeacwqBdIkeuUYuK-Em5MD0DZIDaQfccGOBoHpV_Z8TbA_arakVYmcREhwc-8WpHApHRRMIZ6xSzUnK4ST-JmztgnwqopnOlH9z42x9PuC6vPpBrXsw9ufeiAa8RdHucps4_FM6r2OeOTz5zZuHNTuU8',
          name: '이영희',
          role: '팀장',
          rating: 5,
          badge: '소통지수 +45%',
          comment: '"실제 업무 상황에 바로 적용할 수 있는 구체적인 방법들을 배울 수 있어서 매우 유용했습니다."',
        },
      ],
      relatedPrograms: [
        { slug: 'leadership', title: '리더십 강화 워크샵', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIUMM26laspc11pkIu8VeSJp3c5RO_Go34HBsJa8b1h2R1XniQUErrfmyrnIIhfKK1CS3_ERraRvFN1trB1iAe6Ywj5FVk6xTp_F1u1ScOoFgdukLX5F6tSe_pzda-usVTnkQBcHPJXwxUvINx2YH7gaf_vu1v0H_m9bCAKicTXO0lfhki-CJ3mB9pNVer_klIKAsTJZbg6QmL78nYrmmJQQdtOJtsZ0DdxcM_FqwbQNB1lCEEuuWOdQF4dSEE1nRMwrXDIbsSVPK' },
        { slug: 'teambuilding', title: '팀빌딩 어드벤처', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMapGqJHe0gKAidOxHGP2FWEBKeh41Uh3GIXPUQkQVHr_4AX9KHUZRJ4_9Q1R6yxbiPiwW0wLf4NZb6aLOwZtfTtuNtZcA1WHNtOGmPiqt9Bd54CT_P_ypz3_KZrIokdAWt5da6IZKJtTXJ9go3Ej9WwFazubYl_3Z68A4p5YgmKufd5DJWXQpOrk0MKfAnOLrpx6_CzpKVPzKqic1FRzRXgaYIBI_jG6iDNLDtTCLq2As2PKVFw761XLSCfhAJitmHdCcKlxArIE3' },
      ],
    },
    leadership: {
      id: 'leadership',
      slug: 'leadership',
      title: '[리더십 강화] 성공하는 리더의 핵심 역량',
      subtitle: '변화의 시대, 팀을 이끄는 리더의 조건을 탐구합니다.',
      summary: '변화의 시대, 팀을 이끄는 리더의 조건을 탐구합니다.',
      description:
        '리더십 역량 개발과 효과적인 팀 관리 방법을 학습합니다. 현대 조직에서 요구되는 리더의 역할과 역량을 체계적으로 개발합니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIUMM26laspc11pkIu8VeSJp3c5RO_Go34HBsJa8b1h2R1XniQUErrfmyrnIIhfKK1CS3_ERraRvFN1trB1iAe6Ywj5FVk6xTp_F1u1ScOoFgdukLX5F6tSe_pzda-usVTnkQBcHPJXwxUvINx2YH7gaf_vu1v0H_m9bCAKicTXO0lfhki-CJ3mB9pNVer_klIKAsTJZbg6QmL78nYrmmJQQdtOJtsZ0DdxcM_FqwbQNB1lCEEuuWOdQF4dSEE1nRMwrXDIbsSVPK',
      duration: 8,
      headcount: '10-20명',
      price: '1인당 15만원 ~',
      theme: '리더십',
      curriculum: [
        '2시간: 리더십의 본질과 현대적 리더의 역할',
        '2시간: 비전 수립과 목표 설정',
        '2시간: 팀 동기부여와 성과 관리',
        '2시간: 변화 관리와 리더십 실전',
      ],
      effects: [
        '리더십 역량 50% 향상',
        '팀 성과 35% 개선',
        '팀원 만족도 증가',
        '조직 변화 관리 능력 향상',
      ],
      faq: [
        {
          question: '신입 리더도 참여할 수 있나요?',
          answer: '네, 리더십 경험이 적은 분들도 참여 가능합니다. 기초부터 체계적으로 학습할 수 있습니다.',
        },
        {
          question: '프로그램 기간은 얼마나 되나요?',
          answer: '총 8시간이며, 하루 종일 또는 여러 날에 나누어 진행할 수 있습니다.',
        },
      ],
      instructor: {
        name: '이수진',
        title: '리더십 전문가 | 경영 컨설턴트',
        bio: '다수의 글로벌 기업에서 리더십 개발 프로그램을 진행해왔으며, 수백 명의 리더를 양성했습니다.',
        quote: '진정한 리더는 팀을 이끄는 것이 아니라 함께 성장하는 사람입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['리더십', '역량강화', '경영'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '현대 조직에 필요한 리더십 역량을 개발하고 효과적인 팀 관리 능력을 기릅니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '신입 리더부터 경력 리더까지, 리더십 역량을 향상시키고 싶은 모든 리더에게 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '리더십 역량 향상과 팀 성과 개선을 통해 조직의 전반적인 경쟁력을 높입니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'communication-skill', title: '소통 레벨업', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABHLbnc27KeCiOGP8b7tWeCEEREKV6iLBaT-DZSDELQmLjOqk6bdLpVmcAppaZDdg8veOmbkuycsSB0L13ZKfEJ8ikxKcjCxgnNn22IgWQ5hqUJK1GF7iKRZ9wYtDxtOA0vV09s8Bz3jBRjenruKUOS5pgEtuRm_MJIIvK2wT4tVqMUZ-QY1TaJcfu_pdxRdxQZe_HC8si3ys18y8gwwA2YfTegYhX8KCOTb8bby8Gf639rX279tqpC9mhui0MWcIbCzoFrERgtXQ_' },
        { slug: 'healing', title: '스트레스 클리닉', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN' },
      ],
    },
    teambuilding: {
      id: 'teambuilding',
      slug: 'teambuilding',
      title: '[팀빌딩 어드벤처] 함께 성장하는 우리 팀',
      subtitle: '도전적인 미션을 통해 최고의 팀워크를 구축합니다.',
      summary: '도전적인 미션을 통해 최고의 팀워크를 구축합니다.',
      description:
        '다양한 팀 활동을 통해 협업 능력을 향상시키고 팀원 간 신뢰를 구축합니다. 야외 활동과 실내 워크샵을 결합한 프로그램입니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMapGqJHe0gKAidOxHGP2FWEBKeh41Uh3GIXPUQkQVHr_4AX9KHUZRJ4_9Q1R6yxbiPiwW0wLf4NZb6aLOwZtfTtuNtZcA1WHNtOGmPiqt9Bd54CT_P_ypz3_KZrIokdAWt5da6IZKJtTXJ9go3Ej9WwFazubYl_3Z68A4p5YgmKufd5DJWXQpOrk0MKfAnOLrpx6_CzpKVPzKqic1FRzRXgaYIBI_jG6iDNLDtTCLq2As2PKVFw761XLSCfhAJitmHdCcKlxArIE3',
      duration: 6,
      headcount: '20-50명',
      price: '1인당 12만원 ~',
      theme: '팀워크',
      curriculum: [
        '2시간: 팀워크 기초와 신뢰 구축',
        '2시간: 협업 미션 및 도전 활동',
        '2시간: 팀 성찰 및 개선 방안 도출',
      ],
      effects: [
        '팀워크 지수 40% 향상',
        '협업 효율성 35% 증가',
        '팀원 간 신뢰도 향상',
        '프로젝트 성공률 증가',
      ],
      faq: [
        {
          question: '야외 활동이 필수인가요?',
          answer: '아니요, 실내에서도 진행 가능합니다. 팀의 선호도에 맞춰 조정할 수 있습니다.',
        },
        {
          question: '대규모 팀도 참여 가능한가요?',
          answer: '네, 최대 50명까지 참여 가능하며, 그 이상의 인원은 별도 협의가 필요합니다.',
        },
      ],
      instructor: {
        name: '박서준',
        title: '팀빌딩 전문가 | 어드벤처 코치',
        bio: '15년간 다양한 기업의 팀빌딩 프로그램을 기획하고 진행해왔습니다.',
        quote: '진정한 팀워크는 함께 어려움을 극복할 때 만들어집니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['팀워크', '어드벤처', '협업'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '팀원 간 신뢰를 구축하고 효과적인 협업 문화를 만듭니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '새로운 팀 구성이나 팀워크 개선이 필요한 모든 조직에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '팀워크 향상과 협업 효율성 증가를 통해 조직의 전반적인 성과를 개선합니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'communication-skill', title: '소통 레벨업', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABHLbnc27KeCiOGP8b7tWeCEEREKV6iLBaT-DZSDELQmLjOqk6bdLpVmcAppaZDdg8veOmbkuycsSB0L13ZKfEJ8ikxKcjCxgnNn22IgWQ5hqUJK1GF7iKRZ9wYtDxtOA0vV09s8Bz3jBRjenruKUOS5pgEtuRm_MJIIvK2wT4tVqMUZ-QY1TaJcfu_pdxRdxQZe_HC8si3ys18y8gwwA2YfTegYhX8KCOTb8bby8Gf639rX279tqpC9mhui0MWcIbCzoFrERgtXQ_' },
        { slug: 'leadership', title: '리더십 강화', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIUMM26laspc11pkIu8VeSJp3c5RO_Go34HBsJa8b1h2R1XniQUErrfmyrnIIhfKK1CS3_ERraRvFN1trB1iAe6Ywj5FVk6xTp_F1u1ScOoFgdukLX5F6tSe_pzda-usVTnkQBcHPJXwxUvINx2YH7gaf_vu1v0H_m9bCAKicTXO0lfhki-CJ3mB9pNVer_klIKAsTJZbg6QmL78nYrmmJQQdtOJtsZ0DdxcM_FqwbQNB1lCEEuuWOdQF4dSEE1nRMwrXDIbsSVPK' },
      ],
    },
    innovation: {
      id: 'innovation',
      slug: 'innovation',
      title: '[창의력 발전소] 아이디어가 샘솟는 브레인스토밍',
      subtitle: '고정관념을 깨고 새로운 아이디어를 발견하는 시간.',
      summary: '고정관념을 깨고 새로운 아이디어를 발견하는 시간.',
      description:
        '디자인 씽킹, 브레인스토밍 등 다양한 기법을 통해 혁신적 아이디어를 도출하는 프로그램입니다. 창의적 사고와 문제 해결 능력을 기릅니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmh6E8cgJp0d-03iIiTYxo5ocwktP0qe0YyzPeFqBrEZxzTzfKrV3IY0sgE5sDDBJ0rxi-nwXV1daSpUEz9Z6phi5P3mFO4card5B7ut6wTjwkapGpkYSBzyIOunUZvFV07v-5yLLpbFS1gGi7x_ys2imS3KYcxKlq2VQsHPXm7txAKEtMjnTovhv9gyD6-A02WRyvzV9c5iCHi-Cos1yuE4Ly7dplqGiGt7jv0vRuKOa-YKp-tycatL8nlTMqI34caM3JhLR8BqFC',
      duration: 3,
      headcount: '15-40명',
      price: '1인당 7만원 ~',
      theme: '창의력',
      curriculum: [
        '1시간: 창의적 사고 기법 소개',
        '1시간: 디자인 씽킹 워크샵',
        '1시간: 아이디어 발굴 및 정제',
      ],
      effects: [
        '아이디어 발굴 능력 50% 향상',
        '혁신 프로젝트 성공률 증가',
        '창의적 문제 해결 능력 향상',
      ],
      faq: [
        {
          question: '온라인으로 진행 가능한가요?',
          answer: '네, 온라인으로도 효과적으로 진행 가능합니다.',
        },
      ],
      instructor: {
        name: '최유리',
        title: '창의성 전문가 | 혁신 컨설턴트',
        bio: '다수의 스타트업과 대기업의 혁신 프로젝트를 이끌어왔습니다.',
        quote: '창의성은 타고나는 것이 아니라 훈련하는 것입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['창의력', '브레인스토밍', '혁신'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '창의적 사고 능력을 개발하고 혁신적 아이디어를 도출하는 방법을 학습합니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '새로운 아이디어가 필요한 팀, 혁신 프로젝트를 진행하는 조직에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '창의적 문제 해결 능력 향상과 혁신 프로젝트 성공률 증가를 기대할 수 있습니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'healing', title: '스트레스 클리닉', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN' },
      ],
    },
    healing: {
      id: 'healing',
      slug: 'healing',
      title: '성과보다 중요한 건, 팀의 에너지입니다.',
      subtitle: '팀원들의 소진(번아웃)을 방치하면, 기업의 미래도 소진됩니다. 이제 팀의 에너지를 충전할 시간입니다.',
      summary: '명상, 요가, 숲 치유 등으로 몸과 마음의 안정을 찾습니다.',
      description:
        '본 프로그램은 팀원 간의 깊이 있는 이해와 공감을 바탕으로 긍정적인 관계를 형성하고, 이를 통해 조직 전체의 시너지를 극대화하는 것을 목표로 합니다. 다년간의 현장 경험과 전문적인 이론을 바탕으로 설계된 맞춤형 활동을 통해 참여자들은 자연스럽게 서로에게 마음을 열고, 공동의 목표를 향해 나아가는 즐거움을 경험하게 될 것입니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Rr42oFg4FL0HrTtaAclfRL02w2gEITv7AYoExXWwb6QNe5m-AUvfaf2I4_OBTru6CnzLzMFLVwDs4YGCQYF3LWM4w-aHxgS9Bg7-CMuOjNUnFV9mwgipiIa6tZtbCja6oj432GXwr70eB8dGM7qN0ECjenWS8fmE_zZ6hnc51pRBuYBrycNZNNGYahf81y-R55zXGda-7nGgnDvYXxi7-1h2cdMOCKrNpVhCQYf16lbTHe0OIuu5nAUAqYS95T850p4nZ6H4X2qC',
      duration: 4,
      headcount: '10 ~ 30명',
      price: '1인당 10만원 ~',
      theme: '힐링',
      curriculum: [
        '1시간: 마음 챙김과 스트레스 이해',
        '1시간: 명상 및 요가 실습',
        '1시간: 팀 힐링 활동',
        '1시간: 회복 계획 수립',
      ],
      effects: [
        '스트레스 수준 40% 감소',
        '팀 에너지 회복',
        '번아웃 예방',
        '업무 몰입도 향상',
      ],
      faq: [
        {
          question: '명상 경험이 없어도 참여할 수 있나요?',
          answer: '네, 초보자도 쉽게 따라할 수 있도록 안내합니다.',
        },
        {
          question: '온라인으로도 진행 가능한가요?',
          answer: '네, 온라인으로도 진행 가능하며 효과적입니다.',
        },
      ],
      instructor: {
        name: '김민준',
        title: '조직 심리 전문가 | (주)마음성장연구소 대표',
        bio: '글로벌 IT 기업의 HRD 팀장으로 일하며 번아웃으로 무너지는 동료들을 수없이 마주했습니다. 개인의 의지만으로 해결할 수 없는 조직의 문제를 깨닫고, 사람이 중심이 되는 조직 문화를 만들기 위해 (주)마음성장연구소를 설립했습니다. 수년간의 현장 경험과 전문 코칭 역량을 바탕으로, 지쳐있는 당신의 팀에게 가장 필요한 회복의 시간을 선물하겠습니다.',
        quote: '사람이 회복될 때, 성과도 회복됩니다.',
        photo:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['리더십', '조직문화', '커뮤니케이션'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: "'함께'의 가치를 회복하여 소통과 협업의 시너지를 극대화하고, 긍정적인 팀 문화를 만듭니다.",
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '팀워크가 무너져 활력이 필요한 팀, 새로운 성장을 위해 재충전이 필요한 모든 팀에게 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '개인의 번아웃 해소는 물론, 팀 전체의 몰입도 상승과 퇴사율 감소 효과를 기대할 수 있습니다.',
        },
      ],
      reviews: [
        {
          company: 'Notion Korea',
          companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrDvkd1KYs5WKfqS8EBJt7ym-hx6vY2HqhEm9NNRIDRWmnWPN6Pm8GU4fUrdjimYdarP-H6s4pfUW2iXK_-AJQw4nbw8T3Kijds7FmBUFYhAw3ZxGYupMGoeacwqBdIkeuUYuK-Em5MD0DZIDaQfccGOBoHpV_Z8TbA_arakVYmcREhwc-8WpHApHRRMIZ6xSzUnK4ST-JmztgnwqopnOlH9z42x9PuC6vPpBrXsw9ufeiAa8RdHucps4_FM6r2OeOTz5zZuHNTuU8',
          name: '김유진',
          role: '매니저',
          rating: 5,
          badge: '참여도 +48%',
          comment: '"딱딱한 강의가 아니라 모두가 참여하는 활동 위주여서 팀원들의 만족도가 매우 높았습니다. 정말 유익한 시간이었어요."',
        },
        {
          company: 'Toss',
          companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh6jP3JSp36-76jxjkRSQRMJjSdrfBdgk5Y3PPRj-JbLo_GNP3j61wfnCW-qOzFiBbVDuYxJqEeiLcxuzVnzZ6w1OCGyTFzfD8PRHZQ4kq088e_GTrhzNnon3HoOEXJbJxJvHLG-rCXsX433H7yY96kOLNx2_jTyl1xZjJyewlBWUyi33M3nj5Bak0rrK0KRw-IlmQCL-uV9SemzbWip79QxnOc3D6JC3wZNZC2whhqtyCDxUesqtBX0wzuQV5trgcujliKjB951nS',
          name: '박서준',
          role: '팀장',
          rating: 5,
          badge: '팀워크 +35%',
          comment: '"새로 합류한 팀원들과 기존 팀원들이 자연스럽게 어울릴 기회가 되었습니다. 강사님의 매끄러운 진행이 인상적이었습니다."',
        },
        {
          company: 'Musinsa',
          companyLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqnC3iyAV1kXaxPC-36ujLeC3F3zVyzO9fHZP58JZxr79qQs65Ziu1DN2gbX8JvqSmM8SiI86iQ_vQs_b3_G8n_avEBUY_IBfr1JR1X0B-uAJ8O1Dqc3fzLiPTx-arWty7HaKDQ-10DM1D0wm4WN8Mq-F4yivBJSsE-z88MUdENBpCYIPuN_ePpkLzRDNthqiiYW0S5Q3CtgoA2dI8baNFh8fe6y7_d0BsedB3qvhVi_EiHOpsSwiZLiK7r85Y-NscfH7ql2ZzEQcB',
          name: '이하나',
          role: '파트장',
          rating: 4,
          badge: '소통지수 +27%',
          comment: '"프로그램 내용은 좋았으나, 온라인으로 진행하다 보니 약간의 아쉬움은 있었습니다. 오프라인이었다면 더 좋았을 것 같아요."',
        },
      ],
      relatedPrograms: [
        {
          slug: 'leadership',
          title: '리더십 강화 워크샵',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBUVZ8NXWd5ZX4yu4QXD9Vv3K1T6Tv0VAQlhHhJLH-37K7HeWpADHHZbG6ETsxyBBq-p3sniIoTKrS7a-w2GRmrW2KEihoJl5V1J1k72ncA23DFN785vZICqaj1yMuEsBxiCbBWPNsLDdybmVI8vXH3lzPunb1XnzzL34KP9I9PXQ9fo5BQ5UmWoz34xfx5qBj4Pi0HNR6GTYk7kr6PkvM1ssL00QNW-4CwVJUiyCHqHsQab6S-NYjguOJoW7aPX_guJKnPvHmhHnz',
        },
        {
          slug: 'onboarding',
          title: '신입사원 온보딩 프로그램',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrhUejX3oG2mK_YWyn1sD8dklo9oH2hYUvVpk6YX2bghBYsOsJ1iuttNf0ec9lYbd77h-7_iutq_X_nNo1LtR7PGLk7jaqX-P5VwSwDim8QI2OJjfqOwX_1g9T58s_nWByLlyhqK5gAYcJrhlCDkSDGUrFe8A7dbRma3lq8SIu5xSYeWGkfedS5HUeCScE3EkSDelFno21S0sa53UR9f4bMEqoPyrUwEMpAV3JRLAHEIKPvOSUWPDmC0BBbJuQvF7IzrpcqdFJm5u2',
        },
        {
          slug: 'stress-management',
          title: '스트레스 관리 & 힐링',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhQiESEscmsQIKIogeA2jJeF2ioPegG9pTBWrAbZujqPd2P_gZYJZYdgqAUSezhQVnWZ_PAdx3Ed8LMlsZWqWdaHngvgJEfYh1BDEolSDhOhx1EUi47DQs3iJRzSw8fLVxa7jeyxn1Mmtv4iU2VtREm685N_n_bWqsAwuNjWu4y27_9DaHtPEY4jJEQXbe4AV4cuyPrGVEDSXGjmHYOBllmSV81K_99AJFNQyYubk2iY68AGJ4NbfCZt6B8AQY_hYpUVjSBlwIYQ3d',
        },
      ],
    },
    digital: {
      id: 'digital',
      slug: 'digital',
      title: '[디지털 전환] 스마트 워크를 위한 필수 도구',
      subtitle: '업무 효율을 극대화하는 협업 툴 활용법을 익힙니다.',
      summary: '업무 효율을 극대화하는 협업 툴 활용법을 익힙니다.',
      description:
        '디지털 도구를 활용한 업무 효율성 향상 프로그램입니다. 최신 협업 도구와 디지털 워크플로우를 학습합니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwyZ3mtqiAhrD6WBao4t7iEe949xOrTvniV8DFZSycUlceV0gO5rTDW-Eyd1AePToB8M4fE4s3nxbncDUbsF3Z9uglEncl7cONxlcFKvJypST9xZPDGo9qqQ7ZT9W5v-5Pqrzt6whhEjZmIjdgLvNBteegBunleRo4WlCsDE84Nn4AnwVPlqOuIwwj24tfKBS3lUS7VuMSiAiZcT7cshum4F698Pz8wsDUa6Ip_6vhaltbMQb-Aw3knUVkZ9aGniH6kxl76VUBkqnW',
      duration: 4,
      headcount: '30-100명',
      price: '1인당 6만원 ~',
      theme: '업무효율',
      curriculum: [
        '1시간: 디지털 워크플로우 이해',
        '1시간: 협업 도구 실습',
        '1시간: 자동화 및 효율화 방법',
        '1시간: 팀 적용 전략',
      ],
      effects: [
        '업무 효율성 30% 향상',
        '협업 도구 활용 능력 향상',
        '디지털 전환 가속화',
      ],
      faq: [
        {
          question: '특정 도구에 집중하나요?',
          answer: '아니요, 다양한 도구를 소개하고 팀에 맞는 도구를 선택할 수 있도록 도와드립니다.',
        },
      ],
      instructor: {
        name: '윤지혜',
        title: '디지털 전환 전문가 | 프로젝트 매니저',
        bio: '다수의 기업의 디지털 전환 프로젝트를 이끌어왔습니다.',
        quote: '올바른 도구는 업무 방식을 근본적으로 바꿉니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['업무효율', '스마트워크', '디지털전환'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '디지털 도구를 활용하여 업무 효율성을 크게 향상시킵니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '디지털 전환을 추진하는 조직, 업무 효율 개선이 필요한 팀에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '업무 효율성 향상과 협업 도구 활용 능력 향상을 통해 조직의 생산성을 높입니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'innovation', title: '창의력 발전소', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmh6E8cgJp0d-03iIiTYxo5ocwktP0qe0YyzPeFqBrEZxzTzfKrV3IY0sgE5sDDBJ0rxi-nwXV1daSpUEz9Z6phi5P3mFO4card5B7ut6wTjwkapGpkYSBzyIOunUZvFV07v-5yLLpbFS1gGi7x_ys2imS3KYcxKlq2VQsHPXm7txAKEtMjnTovhv9gyD6-A02WRyvzV9c5iCHi-Cos1yuE4Ly7dplqGiGt7jv0vRuKOa-YKp-tycatL8nlTMqI34caM3JhLR8BqFC' },
      ],
    },
    'art-therapy': {
      id: 'art-therapy',
      slug: 'art-therapy',
      title: '[아트 테라피] 창의적 표현을 통한 감정 해소',
      subtitle: '그림, 조각, 공예를 통해 스트레스를 해소하고 창의성을 발휘합니다.',
      summary: '그림, 조각, 공예를 통해 스트레스를 해소하고 창의성을 발휘합니다.',
      description:
        '다양한 예술 활동을 통해 스트레스를 해소하고 창의성을 발휘하는 프로그램입니다. 예술을 통한 감정 표현과 치유를 경험합니다.',
      heroImage: 'https://via.placeholder.com/400x225',
      duration: 4,
      headcount: '10-20명',
      price: '1인당 9만원 ~',
      theme: '창의성',
      curriculum: [
        '1시간: 아트 테라피 소개 및 기초',
        '1시간: 창의적 표현 활동',
        '1시간: 작품 공유 및 해석',
        '1시간: 감정 정리 및 회복',
      ],
      effects: [
        '스트레스 해소',
        '창의성 향상',
        '감정 표현 능력 향상',
      ],
      faq: [
        {
          question: '예술 경험이 없어도 참여할 수 있나요?',
          answer: '네, 예술 경험이 없어도 누구나 참여할 수 있습니다. 결과보다 과정이 중요합니다.',
        },
      ],
      instructor: {
        name: '정미라',
        title: '아트 테라피스트 | 예술 치료 전문가',
        bio: '10년 이상 아트 테라피 프로그램을 진행해왔습니다.',
        quote: '예술은 말로 표현하지 못한 감정을 드러내는 가장 아름다운 방법입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['창의성', '힐링', '예술'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '예술을 통한 감정 표현과 스트레스 해소를 통해 창의성을 발휘합니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '스트레스 해소가 필요한 팀, 창의성 향상을 원하는 조직에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '스트레스 해소와 창의성 향상을 통해 팀의 에너지를 회복합니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'healing', title: '스트레스 클리닉', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN' },
      ],
    },
    cooking: {
      id: 'cooking',
      slug: 'cooking',
      title: '[쿠킹 클래스] 함께 요리하며 협업과 소통을 경험',
      subtitle: '팀원들과 함께 요리를 만들며 자연스럽게 협업을 배웁니다.',
      summary: '팀원들과 함께 요리를 만들며 자연스럽게 협업을 배웁니다.',
      description:
        '요리를 통한 협업과 소통을 경험하는 프로그램입니다. 함께 요리하며 자연스럽게 팀워크를 형성합니다.',
      heroImage: 'https://via.placeholder.com/400x225',
      duration: 3,
      headcount: '8-20명',
      price: '1인당 8만원 ~',
      theme: '협업',
      curriculum: [
        '1시간: 요리 기초 및 안전 수칙',
        '1시간: 팀별 요리 실습',
        '1시간: 결과 공유 및 회고',
      ],
      effects: [
        '팀워크 향상',
        '소통 능력 향상',
        '협업 경험 축적',
      ],
      faq: [
        {
          question: '요리 경험이 없어도 참여할 수 있나요?',
          answer: '네, 요리 경험이 없어도 참여 가능합니다. 쉬운 요리부터 시작합니다.',
        },
      ],
      instructor: {
        name: '한요리',
        title: '셰프 | 팀빌딩 전문가',
        bio: '요리를 통한 팀빌딩 프로그램을 다수 진행해왔습니다.',
        quote: '함께 만든 음식은 더 맛있습니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['협업', '소통', '요리'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '요리를 통한 협업 경험을 통해 자연스럽게 팀워크를 형성합니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '팀워크 향상이 필요한 조직, 즐겁게 협업을 배우고 싶은 팀에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '팀워크 향상과 소통 능력 향상을 통해 협업 효율성을 높입니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'teambuilding', title: '팀빌딩 어드벤처', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMapGqJHe0gKAidOxHGP2FWEBKeh41Uh3GIXPUQkQVHr_4AX9KHUZRJ4_9Q1R6yxbiPiwW0wLf4NZb6aLOwZtfTtuNtZcA1WHNtOGmPiqt9Bd54CT_P_ypz3_KZrIokdAWt5da6IZKJtTXJ9go3Ej9WwFazubYl_3Z68A4p5YgmKufd5DJWXQpOrk0MKfAnOLrpx6_CzpKVPzKqic1FRzRXgaYIBI_jG6iDNLDtTCLq2As2PKVFw761XLSCfhAJitmHdCcKlxArIE3' },
      ],
    },
    growth: {
      id: 'growth',
      slug: 'growth',
      title: '[성장 마인드셋] 지속적인 학습과 성장 문화 구축',
      subtitle: '고정 마인드셋에서 벗어나 성장을 추구하는 문화를 만듭니다.',
      summary: '고정 마인드셋에서 벗어나 성장을 추구하는 문화를 만듭니다.',
      description:
        '지속적인 학습과 성장을 추구하는 문화를 만드는 프로그램입니다. 성장 마인드셋을 개발하고 학습 조직을 만듭니다.',
      heroImage: 'https://via.placeholder.com/400x225',
      duration: 4,
      headcount: '10-25명',
      price: '1인당 8만원 ~',
      theme: '성장',
      curriculum: [
        '1시간: 성장 마인드셋 이해',
        '1시간: 학습 조직 구축 방법',
        '1시간: 피드백 문화 만들기',
        '1시간: 성장 계획 수립',
      ],
      effects: [
        '성장 마인드셋 형성',
        '학습 문화 구축',
        '개인 및 조직 성장',
      ],
      faq: [
        {
          question: '어떤 수준의 참여자가 적합한가요?',
          answer: '성장을 추구하는 모든 구성원이 참여할 수 있습니다.',
        },
      ],
      instructor: {
        name: '박성장',
        title: '조직 개발 전문가 | 학습 컨설턴트',
        bio: '학습 조직 구축과 성장 문화 형성에 전문성을 가지고 있습니다.',
        quote: '성장은 선택이 아니라 필수입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['성장', '학습', '조직개발'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '성장 마인드셋을 개발하고 지속적인 학습 문화를 만듭니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '성장 문화를 만들고 싶은 조직, 학습 조직을 구축하려는 팀에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '성장 마인드셋 형성과 학습 문화 구축을 통해 조직의 지속적 성장을 이끕니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'leadership', title: '리더십 강화', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBIUMM26laspc11pkIu8VeSJp3c5RO_Go34HBsJa8b1h2R1XniQUErrfmyrnIIhfKK1CS3_ERraRvFN1trB1iAe6Ywj5FVk6xTp_F1u1ScOoFgdukLX5F6tSe_pzda-usVTnkQBcHPJXwxUvINx2YH7gaf_vu1v0H_m9bCAKicTXO0lfhki-CJ3mB9pNVer_klIKAsTJZbg6QmL78nYrmmJQQdtOJtsZ0DdxcM_FqwbQNB1lCEEuuWOdQF4dSEE1nRMwrXDIbsSVPK' },
      ],
    },
    wellness: {
      id: 'wellness',
      slug: 'wellness',
      title: '[웰니스 프로그램] 건강한 라이프스타일 형성',
      subtitle: '운동, 영양, 수면 등 건강한 라이프스타일을 형성합니다.',
      summary: '운동, 영양, 수면 등 건강한 라이프스타일을 형성합니다.',
      description:
        '건강한 라이프스타일을 형성하고 유지하는 방법을 배우는 프로그램입니다. 운동, 영양, 수면 관리를 종합적으로 다룹니다.',
      heroImage: 'https://via.placeholder.com/400x225',
      duration: 6,
      headcount: '10-30명',
      price: '1인당 12만원 ~',
      theme: '웰빙',
      curriculum: [
        '2시간: 건강한 라이프스타일 이해',
        '2시간: 운동 및 스트레칭 실습',
        '1시간: 영양 관리 방법',
        '1시간: 수면 및 회복 전략',
      ],
      effects: [
        '건강 지표 개선',
        '에너지 수준 향상',
        '업무 집중도 향상',
      ],
      faq: [
        {
          question: '운동 경험이 없어도 참여할 수 있나요?',
          answer: '네, 운동 경험이 없어도 참여 가능합니다. 개인의 체력 수준에 맞춰 진행합니다.',
        },
      ],
      instructor: {
        name: '이웰빙',
        title: '웰니스 전문가 | 건강 컨설턴트',
        bio: '건강한 라이프스타일 형성을 위한 프로그램을 다수 진행해왔습니다.',
        quote: '건강은 최고의 투자입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['웰빙', '건강', '라이프스타일'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '건강한 라이프스타일을 형성하고 유지하는 방법을 학습합니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '건강 관리가 필요한 조직, 웰빙 문화를 만들고 싶은 팀에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '건강 지표 개선과 에너지 수준 향상을 통해 업무 집중도를 높입니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'healing', title: '스트레스 클리닉', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN' },
      ],
    },
    music: {
      id: 'music',
      slug: 'music',
      title: '[음악 치료] 음악을 통한 감정 표현과 팀 하모니',
      subtitle: '함께 연주하고 노래하며 팀의 조화와 협력을 경험합니다.',
      summary: '함께 연주하고 노래하며 팀의 조화와 협력을 경험합니다.',
      description:
        '음악을 통한 감정 표현과 소통을 경험하는 프로그램입니다. 함께 음악을 만들며 팀의 하모니를 형성합니다.',
      heroImage: 'https://via.placeholder.com/400x225',
      duration: 4,
      headcount: '10-20명',
      price: '1인당 9만원 ~',
      theme: '예술',
      curriculum: [
        '1시간: 음악 치료 소개',
        '1시간: 악기 체험 및 연주',
        '1시간: 팀 합주 활동',
        '1시간: 공연 및 공유',
      ],
      effects: [
        '감정 표현 능력 향상',
        '팀 하모니 형성',
        '스트레스 해소',
      ],
      faq: [
        {
          question: '음악 경험이 없어도 참여할 수 있나요?',
          answer: '네, 음악 경험이 없어도 참여 가능합니다. 쉬운 악기부터 시작합니다.',
        },
      ],
      instructor: {
        name: '최음악',
        title: '음악 치료사 | 음악 교육 전문가',
        bio: '음악을 통한 치료와 팀빌딩 프로그램을 다수 진행해왔습니다.',
        quote: '음악은 마음을 하나로 만드는 가장 아름다운 언어입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['예술', '힐링', '음악'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '음악을 통한 감정 표현과 팀 하모니를 형성합니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '감정 표현이 필요한 팀, 즐겁게 협력을 배우고 싶은 조직에 추천합니다.',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '감정 표현 능력 향상과 팀 하모니 형성을 통해 팀의 조화를 만듭니다.',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'art-therapy', title: '아트 테라피', image: 'https://via.placeholder.com/400x225' },
      ],
    },
    'self-discovery': {
      id: 'self-discovery',
      slug: 'self-discovery',
      title: '나를 찾아가는 자기변화 레슨 – 명상·상담',
      subtitle: '일과 관계 속에서 흔들리는 나를 돌아보고, 진짜 내가 원하는 삶의 방향을 함께 찾아가는 내면 성장 프로그램입니다.',
      summary: '일과 관계 속에서 흔들리는 나를 돌아보고, 진짜 내가 원하는 삶의 방향을 함께 찾아가는 내면 성장 프로그램입니다.',
      description:
        '빠르게 변하는 환경 속에서 많은 직장인들이 "열심히는 사는데, 내가 정말 원하는 삶인지"를 고민합니다. 하지만 정작 나 자신을 진지하게 돌아볼 시간과 구조는 부족합니다. 이 프로그램은 잠시 멈춰 서서 지금 이 순간의 나를 바라보고, 철학·심리·명상이라는 렌즈를 통해 "나는 누구인지, 앞으로 어떻게 살고 싶은지"를 스스로 정리해보는 내면 변화 레슨입니다.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN',
      duration: 4,
      headcount: '10-30명',
      price: '1인당 12만원 ~',
      theme: '자기계발',
      curriculum: [
        '1시간: 나를 비추는 거울 - 아이스브레이킹, "요즘 나를 한 단어로 표현하기", 일·관계·건강·성장 등 삶의 영역을 간단 워크시트로 진단',
        '1시간: 철학·심리로 보는 "나" - 동서양 철학·심리가 말하는 나·행복·관계 개념 소개, 짧은 영상·텍스트를 보고 느낌·생각 나누기',
        '1시간: 수사학적 글쓰기와 대화 - "지금까지의 나" / "앞으로 되고 싶은 나"를 글로 써보는 시간, 짝 또는 소그룹과 함께 공감적 대화(원하는 범위에서만 공유)',
        '1시간: 명상과 실행 계획 - 호흡·이미지 명상으로 마음을 가라앉히고 내면의 목소리 듣기, 앞으로 1개월간 실천할 작은 변화 2~3가지 정리 및 마무리 나눔',
      ],
      effects: [
        '내 감정·생각·가치를 언어로 정리하는 메타인지 능력 향상',
        '관계·일·미래에 대한 관점을 재구성하며 심리적 여유와 안정감 확보',
        '명상·글쓰기·대화를 통한 감정 정리와, 현실적인 실행 계획 초안 마련',
      ],
      faq: [
        {
          question: '명상이나 철학 공부를 해본 적이 없어도 괜찮나요?',
          answer: '네. 어려운 이론 강의가 아니라, 일상 언어로 풀어 설명하고 간단한 명상·실습 중심으로 진행합니다.',
        },
        {
          question: '개인적인 이야기를 꼭 나누어야 하나요?',
          answer: '아닙니다. 나눔은 전적으로 선택 사항이며, 편안한 수준에서만 이야기하도록 구조를 설계합니다.',
        },
        {
          question: '한 번 참여해도 도움이 될까요, 아니면 연속 과정이어야 하나요?',
          answer: '한 번만으로도 "지금의 나를 정리하는 경험"을 할 수 있고, 원할 경우 연속 과정으로 확장해 더 깊게 다루는 것도 가능합니다.',
        },
      ],
      instructor: {
        name: '김상완',
        title: '나를 찾아가는 여행의 멘토 | 명상·철학·심리 결합 강의',
        bio: '동서양 철학, 종교, 심리, 명상 등을 바탕으로 "나를 인지하고 찾아가는" 수업을 다수 진행해온 내면 성장 특화 강사입니다. 금융·교육·청년 아카데미 등 다양한 현장에서 강의와 상담을 병행해 왔습니다.',
        quote: '내 마음을 이해하는 순간, 삶의 방향도 함께 보입니다.',
        photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFh3uoqHzFgKNmBye5VqXUI1AmTbcNWltAeg9JK5qh_qw0t-tZSW67tA3lZTfKrTkN0KtWb10o2EhXNJrTFz-9Infsxs_U2WibjlvPkQ-AtGJ_DW0uVF_RYNd7HMhp72A5W6T3OkTNAkaI8QrzZ2wPBbbN2A6or1Zk5Begnd-_QchWhszXf-c3CLbfa9HqTHmWseixkq6HPven-ajOgNk7B1oCriqd_2vifzSz7Wu2VXPVaTi_dVBlQ75ykDtvyzlpbYHjuembJwsP',
        skills: ['심리', '자기계발', '명상'],
      },
      goals: [
        {
          icon: 'workspace_premium',
          title: '주요 목표',
          description: '나의 감정·생각·가치를 정리하고, 스스로 삶의 방향을 설계할 수 있는 기반을 만듭니다. 동서양 철학·심리·명상 관점을 통해 나를 더 깊이 이해하도록 돕습니다.',
        },
        {
          icon: 'groups',
          title: '추천 대상',
          description: '번아웃·혼란감으로 마음 정리가 필요한 직장인, "나는 누구인가, 어떻게 살아야 하지?"를 자주 떠올리는 조직 구성원, 팀원들의 정서적 회복과 자기이해를 돕고 싶은 조직, HR·교육 담당자',
        },
        {
          icon: 'trending_up',
          title: '기대 효과',
          description: '자신에 대한 이해와 자존감 향상, 관계와 일에 대한 관점을 재정리하며 정서적 여유 확보, 삶의 우선순위·가치 재정렬을 통해 현실적인 실행 계획 수립',
        },
      ],
      reviews: [],
      relatedPrograms: [
        { slug: 'healing', title: '스트레스 클리닉', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqhBqXIQzPsK1lK3pywejEUvmuyXssPaLQopMeAc51HrDPH3Xb1ihtyIdEahGfBVrTIYO6BXmp41_gzdYtxo4JCXuTfcQBRzCXetFlq6dpb8hIQPAmh6XDuDtpIVRKbWnLMiNopw6H8HreWlhx2g-TjRjlIjSC_p1D3IJwIfDFCY-9zd-jEnFyyybTaeOvjeLw0dFyGU4aKhV2Og9Ziv5g_ntVTbrm2NTlxqpjXPt2ayNTMGG8byZny9iPg1HB8H_aJxSxj76W0iN' },
        { slug: 'growth', title: '성장 마인드셋', image: 'https://via.placeholder.com/400x225' },
      ],
    },
  }

  return programs[slug] || null
}

export const dynamic = 'force-static'
// Cloudflare Pages 호환성: 정적으로 생성되지 않은 경로에 대한 동적 요청 비활성화
export const dynamicParams = false

// 정적 내보내기를 위한 generateStaticParams
export async function generateStaticParams() {
  // 모든 프로그램 slug 반환
  return [
    { slug: 'communication-skill' },
    { slug: 'leadership' },
    { slug: 'teambuilding' },
    { slug: 'innovation' },
    { slug: 'healing' },
    { slug: 'self-discovery' },
    { slug: 'digital' },
    { slug: 'art-therapy' },
    { slug: 'cooking' },
    { slug: 'growth' },
    { slug: 'wellness' },
    { slug: 'music' },
  ]
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgram(slug)

  if (!program) {
    notFound()
  }

  return <ProgramDetailClient program={program} />
}
