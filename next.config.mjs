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
  // API 라우트는 빌드 전 스크립트에서 임시로 제외됩니다
  // API 라우트는 Cloudflare Workers로 프록시됩니다
}

export default nextConfig
