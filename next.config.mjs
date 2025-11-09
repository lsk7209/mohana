/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Cloudflare Pages 호환성 - 정적 내보내기
  output: 'export',
  distDir: '.next',
  trailingSlash: true,
  // API 라우트는 정적 내보내기에서 자동으로 제외됩니다
  // API 라우트는 Cloudflare Workers로 프록시됩니다
  // Turbopack 설정 (Next.js 16 기본)
  turbopack: {},
  // API 라우트를 빌드에서 제외하기 위한 설정
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'tsx', 'ts', 'jsx', 'js'],
}

export default nextConfig
