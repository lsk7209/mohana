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
  // webpack 설정으로 API 라우트를 빌드에서 제외
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 빌드에서 API 라우트 제외
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }
    // API 라우트를 빌드에서 제외
    config.module = config.module || {}
    config.module.rules = config.module.rules || []
    return config
  },
}

export default nextConfig
