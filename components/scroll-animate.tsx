'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

/**
 * 스크롤 애니메이션 래퍼 컴포넌트
 * 
 * @param {ReactNode} children - 애니메이션할 자식 요소
 * @param {string} animation - 애니메이션 타입 ('fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale')
 * @param {number} threshold - Intersection Observer threshold
 * @param {string} rootMargin - Intersection Observer rootMargin
 * @param {boolean} once - 한 번만 애니메이션 실행할지 여부
 * @param {string} className - 추가 CSS 클래스
 * 
 * @example
 * <ScrollAnimate animation="slide-up">
 *   <div>Content</div>
 * </ScrollAnimate>
 */
interface ScrollAnimateProps {
  children: ReactNode
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  threshold?: number
  rootMargin?: string
  once?: boolean
  className?: string
  delay?: number
}

export function ScrollAnimate({
  children,
  animation = 'fade',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  once = true,
  className = '',
  delay = 0,
}: ScrollAnimateProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold, rootMargin, once })

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-600 ease-out'
    
    if (!isVisible) {
      switch (animation) {
        case 'slide-up':
          return `${baseClasses} scroll-animate-initial`
        case 'slide-down':
          return `${baseClasses} opacity-0 -translate-y-8`
        case 'slide-left':
          return `${baseClasses} scroll-animate-initial-left`
        case 'slide-right':
          return `${baseClasses} scroll-animate-initial-right`
        case 'scale':
          return `${baseClasses} scroll-animate-initial-scale`
        case 'fade':
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} scroll-animate-visible`
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

