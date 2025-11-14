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
 * Worker URL (프로덕션에서 API 요청을 위한 외부 Worker URL)
 * Cloudflare Pages Dashboard에서 환경 변수로 설정해야 합니다
 */
const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || ''

/**
 * 전체 API URL 생성
 * @param path - API 경로
 * @returns 전체 API URL
 */
export function getApiUrl(path: string): string {
  // 프로덕션에서 Worker URL이 설정된 경우: 직접 Worker로 요청
  if (IS_PRODUCTION && WORKER_URL) {
    const baseUrl = WORKER_URL.replace(/\/$/, '')
    const apiPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${apiPath}`
  }
  
  // 개발 환경 또는 Worker URL이 없는 경우
  if (API_URL) {
    const baseUrl = API_URL.replace(/\/$/, '')
    const apiPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${apiPath}`
  }
  
  // 기본값: 상대 경로 (로컬 개발용)
  return path.startsWith('/') ? path : `/${path}`
}


