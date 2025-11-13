/**
 * Component: VideoWithFallback
 * 비디오 로딩 실패 시 fallback 이미지를 표시하는 비디오 컴포넌트
 * @param {string} src - 비디오 소스 URL [Required]
 * @param {string} fallbackImage - Fallback 이미지 URL [Required]
 * @param {string} alt - 이미지 대체 텍스트 [Required]
 * @param {boolean} autoPlay - 자동 재생 여부 [Optional, default=false]
 * @param {boolean} loop - 반복 재생 여부 [Optional, default=true]
 * @param {boolean} muted - 음소거 여부 [Optional, default=true]
 * @param {string} className - 추가 CSS 클래스 [Optional]
 * @example <VideoWithFallback src="/video.mp4" fallbackImage="/image.jpg" alt="비디오 설명" />
 */
'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface VideoWithFallbackProps {
  src: string
  fallbackImage: string
  alt: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  className?: string
  onLoadStart?: () => void
  onLoadedData?: () => void
  onError?: () => void
}

export function VideoWithFallback({
  src,
  fallbackImage,
  alt,
  autoPlay = false,
  loop = true,
  muted = true,
  playsInline = true,
  className,
  onLoadStart,
  onLoadedData,
  onError,
}: VideoWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
      onError?.()
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      setHasError(false)
      onLoadStart?.()
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      onLoadedData?.()
    }

    video.addEventListener('error', handleError)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [onError, onLoadStart, onLoadedData])

  // 에러 발생 시 fallback 이미지 표시
  if (hasError) {
    return (
      <img
        src={fallbackImage}
        alt={alt}
        className={cn('w-full h-full object-cover', className)}
        aria-label={`${alt} (비디오 로딩 실패로 이미지로 대체)`}
      />
    )
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10"
          role="status"
          aria-label="비디오 로딩 중"
        >
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        className={cn('w-full h-full object-cover', isLoading && 'opacity-0', className)}
        aria-label={alt}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        {/* 브라우저가 비디오를 지원하지 않을 경우 fallback */}
        <img src={fallbackImage} alt={alt} className="w-full h-full object-cover" />
      </video>
    </div>
  )
}

