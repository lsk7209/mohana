/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // 타입 안정성을 위해 빌드 에러 확인
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true, // Cloudflare Pages static export 제약
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  // Cloudflare Pages 호환성 - 정적 내보내기
  output: 'export',
  // distDir은 기본값 사용 (.next)
  trailingSlash: true,
  // API 라우트는 빌드 전 스크립트에서 임시로 제외됩니다
  // API 라우트는 Cloudflare Workers로 프록시됩니다
  
  // 빌드 최적화 설정
  compress: true,
  poweredByHeader: false,
  
  // Cloudflare Pages 호환성 강화
  experimental: {
    // 정적 내보내기 최적화
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
