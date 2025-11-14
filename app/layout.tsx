import type React from "react"
import type { Metadata } from "next"
import { RootStructuredData } from "./structured-data"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

// Vercel Analytics는 Cloudflare Pages에서 작동하지 않으므로 조건부로 로드
// 환경 변수로 제어 가능 (선택사항)
// 정적 생성 호환성을 위해 dynamic import 사용
async function loadAnalytics() {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
    return null
  }
  
  try {
    // dynamic import를 사용하여 정적 생성 시 안전성 확보
    const analyticsModule = await import("@vercel/analytics/next")
    return analyticsModule.Analytics
  } catch (error) {
    // Analytics 모듈이 없거나 로드 실패 시 무시
    return null
  }
}

export const metadata: Metadata = {
  title: "모하나 - 우리 팀의 성장을 위한 최고의 힐링·워크샵 솔루션",
  description: "검증된 전문가와 함께 조직의 잠재력을 깨우는 맞춤형 프로그램을 만나보세요.",
  keywords: ["워크샵", "힐링", "팀빌딩", "기업교육", "조직개발", "모하나"],
  authors: [{ name: "모하나" }],
  creator: "모하나",
  publisher: "모하나",
  generator: "Next.js",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohana.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: '모하나',
    title: '모하나 - 우리 팀의 성장을 위한 최고의 힐링·워크샵 솔루션',
    description: '검증된 전문가와 함께 조직의 잠재력을 깨우는 맞춤형 프로그램을 만나보세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '모하나 - 힐링·워크샵 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '모하나 - 우리 팀의 성장을 위한 최고의 힐링·워크샵 솔루션',
    description: '검증된 전문가와 함께 조직의 잠재력을 깨우는 맞춤형 프로그램을 만나보세요.',
    images: ['/og-image.png'],
    creator: '@mohana',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Analytics 컴포넌트를 비동기로 로드
  const AnalyticsComponent = await loadAnalytics()
  
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        <RootStructuredData />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        {AnalyticsComponent && <AnalyticsComponent />}
      </body>
    </html>
  )
}
