/**
 * Component: ErrorBoundary
 * React 에러 바운더리 컴포넌트
 * @param {React.ReactNode} children - 자식 컴포넌트 [Required]
 * @param {React.ReactNode} fallback - 에러 발생 시 표시할 컴포넌트 [Optional]
 * @param {() => void} onError - 에러 발생 시 호출될 콜백 [Optional]
 * @example <ErrorBoundary fallback={<ErrorFallback />}><App /></ErrorBoundary>
 */
'use client'

import React, { Component, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-16 h-16 text-destructive mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            문제가 발생했습니다
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mb-6 text-left max-w-2xl w-full">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                에러 상세 정보 (개발 모드)
              </summary>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-xs overflow-auto">
                {this.state.error.toString()}
                {this.state.error.stack && `\n\n${this.state.error.stack}`}
              </pre>
            </details>
          )}
          <div className="flex gap-4">
            <Button onClick={this.handleReset} variant="outline">
              다시 시도
            </Button>
            <Button
              onClick={() => {
                window.location.reload()
              }}
            >
              페이지 새로고침
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

