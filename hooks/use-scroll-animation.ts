'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * 스크롤 애니메이션 훅
 * Intersection Observer를 사용하여 요소가 뷰포트에 들어올 때 애니메이션을 트리거합니다.
 * 
 * @param {Object} options - 애니메이션 옵션
 * @param {number} options.threshold - 요소가 얼마나 보여야 트리거할지 (0-1)
 * @param {string} options.rootMargin - 루트 마진 (예: "0px 0px -100px 0px")
 * @param {boolean} options.once - 한 번만 애니메이션 실행할지 여부
 * @returns {Object} ref와 isVisible 상태
 * 
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
 * <div ref={ref} className={isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}>
 *   Content
 * </div>
 */
export function useScrollAnimation(options: {
  threshold?: number
  rootMargin?: string
  once?: boolean
} = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px', once = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

/**
 * 여러 요소에 대한 스크롤 애니메이션 훅
 * 
 * @param {number} count - 애니메이션할 요소 개수
 * @param {Object} options - 애니메이션 옵션
 * @returns {Array} refs와 isVisible 배열
 * 
 * @example
 * const { refs, isVisible } = useMultipleScrollAnimation(3)
 * items.map((item, i) => (
 *   <div key={i} ref={refs[i]} className={isVisible[i] ? 'animate-in' : 'animate-out'}>
 *     {item}
 *   </div>
 * ))
 */
export function useMultipleScrollAnimation(
  count: number,
  options: {
    threshold?: number
    rootMargin?: string
    once?: boolean
    stagger?: number // 요소 간 지연 시간 (ms)
  } = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px', once = true, stagger = 100 } = options
  const [isVisible, setIsVisible] = useState<boolean[]>(new Array(count).fill(false))
  const refs = useRef<(HTMLElement | null)[]>(new Array(count).fill(null))

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    refs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsVisible((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
                if (once) {
                  observer.unobserve(element)
                }
              }, stagger * index)
            } else if (!once) {
              setIsVisible((prev) => {
                const newState = [...prev]
                newState[index] = false
                return newState
              })
            }
          })
        },
        {
          threshold,
          rootMargin,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => {
        observer.disconnect()
      })
    }
  }, [threshold, rootMargin, once, stagger, count])

  return { refs, isVisible }
}

