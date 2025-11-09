import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readdirSync, statSync, existsSync } from 'fs'

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
  // API 라우트를 빌드에서 제외하기 위한 webpack 설정
  webpack: (config, { isServer, webpack }) => {
    // API 라우트를 빌드에서 제외
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }
    // API 라우트 파일을 무시
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/app\/api\/.*\/route\.ts$/,
      })
    )
    return config
  },
}

export default nextConfig
