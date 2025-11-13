/**
 * 환경 변수 유틸리티
 * 타입 안전한 환경 변수 접근을 제공합니다.
 */

/**
 * 사이트 기본 URL
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mohana.kr'

/**
 * API 기본 URL (개발 환경에서만 사용)
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

/**
 * CDN URL (선택적)
 */
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || ''

/**
 * 환경이 프로덕션인지 확인
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

/**
 * 환경이 개발인지 확인
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

/**
 * 전체 API URL 생성
 * @param path - API 경로
 * @returns 전체 API URL
 */
export function getApiUrl(path: string): string {
  // 프로덕션에서는 상대 경로 사용 (Cloudflare Pages _redirects가 처리)
  if (IS_PRODUCTION || !API_URL) {
    return path.startsWith('/') ? path : `/${path}`
  }
  // 개발 환경에서는 절대 URL 사용
  const baseUrl = API_URL.replace(/\/$/, '')
  const apiPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${apiPath}`
}

