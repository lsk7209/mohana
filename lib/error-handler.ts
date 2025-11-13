/**
 * 네트워크 에러 처리 유틸리티
 */

export interface NetworkError {
  message: string
  status?: number
  statusText?: string
  isNetworkError: boolean
  isTimeout: boolean
}

/**
 * 네트워크 에러를 처리하고 사용자 친화적인 메시지를 반환합니다.
 * @param error - 발생한 에러
 * @returns 사용자 친화적인 에러 메시지
 */
export function handleNetworkError(error: unknown): NetworkError {
  // 네트워크 연결 오류
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      message: '네트워크 연결을 확인해주세요. 인터넷 연결이 불안정할 수 있습니다.',
      isNetworkError: true,
      isTimeout: false,
    }
  }

  // 타임아웃 오류
  if (error instanceof Error && error.name === 'TimeoutError') {
    return {
      message: '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.',
      isNetworkError: true,
      isTimeout: true,
    }
  }

  // 일반 에러
  if (error instanceof Error) {
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      isNetworkError: false,
      isTimeout: false,
    }
  }

  return {
    message: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    isNetworkError: false,
    isTimeout: false,
  }
}

/**
 * Fetch 응답의 에러를 처리합니다.
 * @param response - Fetch 응답 객체
 * @returns 에러 메시지
 */
export async function handleFetchError(response: Response): Promise<string> {
  let errorMessage = '요청 처리 중 오류가 발생했습니다.'

  try {
    const errorData = await response.json() as { error?: string; message?: string }
    errorMessage = errorData.error || errorData.message || errorMessage
  } catch {
    // JSON 파싱 실패 시 상태 코드 기반 메시지
    switch (response.status) {
      case 400:
        errorMessage = '잘못된 요청입니다. 입력 정보를 확인해주세요.'
        break
      case 401:
        errorMessage = '인증이 필요합니다. 다시 로그인해주세요.'
        break
      case 403:
        errorMessage = '접근 권한이 없습니다.'
        break
      case 404:
        errorMessage = '요청한 리소스를 찾을 수 없습니다.'
        break
      case 429:
        errorMessage = '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'
        break
      case 500:
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        break
      case 503:
        errorMessage = '서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.'
        break
      default:
        errorMessage = `요청 처리 중 오류가 발생했습니다. (${response.status})`
    }
  }

  return errorMessage
}

