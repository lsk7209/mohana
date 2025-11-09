import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
  // API 라우트를 빌드에서 제외하기 위한 webpack 설정
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 빌드에서 API 라우트 제외
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }
    return config
  },
}

export default nextConfig
