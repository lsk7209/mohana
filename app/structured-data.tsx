/**
 * 루트 레이아웃용 구조화된 데이터
 */
import { StructuredData } from '@/components/structured-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mohana.kr'

// 조직 스키마
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '모하나',
  description: '우리 팀의 성장을 위한 최고의 힐링·워크샵 솔루션',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  sameAs: [
    // 소셜 미디어 링크가 있다면 추가
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: '고객 문의',
    availableLanguage: ['Korean'],
  },
}

// 웹사이트 스키마
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '모하나',
  url: siteUrl,
  description: '검증된 전문가와 함께 조직의 잠재력을 깨우는 맞춤형 프로그램',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/programs?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// 서비스 스키마
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '기업 워크샵 및 힐링 프로그램',
  provider: {
    '@type': 'Organization',
    name: '모하나',
  },
  areaServed: {
    '@type': 'Country',
    name: 'South Korea',
  },
  description: '검증된 전문가와 함께 조직의 잠재력을 깨우는 맞춤형 힐링·워크샵 프로그램',
}

export function RootStructuredData() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={serviceSchema} />
    </>
  )
}

