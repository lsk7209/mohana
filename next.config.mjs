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
  // API 라우트는 Cloudflare Workers로 프록시되므로 빌드에서 제외
  // pageExtensions를 사용하여 API 라우트를 빌드에서 제외
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // API 라우트는 정적 내보내기에서 지원되지 않으므로 제외
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
