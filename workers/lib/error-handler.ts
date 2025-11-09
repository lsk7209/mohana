/**
 * 에러 핸들링 및 로깅 유틸리티
 */

export interface AppError {
  code: string
  message: string
  statusCode: number
  details?: any
}

export class AppError extends Error {
  code: string
  statusCode: number
  details?: any

  constructor(code: string, message: string, statusCode: number = 500, details?: any) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}

export function handleError(error: unknown): Response {
  console.error('Error:', error)

  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
        details: error.details,
      }),
      {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  if (error instanceof Error) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Unknown error occurred' }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

export function logError(context: string, error: unknown, metadata?: Record<string, any>): void {
  const errorInfo = {
    context,
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : String(error),
    metadata,
  }

  console.error(JSON.stringify(errorInfo, null, 2))

  // 프로덕션에서는 외부 로깅 서비스로 전송
  // 예: Sentry, Logtail 등
}

