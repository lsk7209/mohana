/**
 * Component: ContactPage
 * 맞춤 제안서 요청 페이지 - 2단계 폼으로 구성된 문의 폼
 * @example <ContactPage />
 */
'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { handleNetworkError, handleFetchError } from '@/lib/error-handler'
import { getApiUrl } from '@/lib/env'
import { useRouter } from 'next/navigation'
import { PublicLayout } from '@/components/public-layout'
import { ScrollAnimate } from '@/components/scroll-animate'
import { StepIndicator, Step1Form, Step2Form } from './components'
import { contactFormSchema, type ContactFormValues } from './types'

export default function ContactPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current)
      }
    }
  }, [])

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      program: '',
      participants: '',
      date: '',
      budget: '',
      programType: '',
      inquiry: '',
      privacyPolicy: false,
    },
  })

  // Step 1 필드 목록 메모이제이션
  const step1Fields = useMemo<(keyof ContactFormValues)[]>(
    () => ['company', 'name', 'email', 'phone'],
    []
  )

  // Step 1 다음 단계 핸들러
  const handleStep1Next = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Step 1: Validate only step 1 fields
      const isValid = await form.trigger(step1Fields)

      if (!isValid) {
        toast({
          title: '입력 오류',
          description: '필수 항목을 모두 올바르게 입력해주세요.',
          variant: 'destructive',
        })
        return
      }

      // All validations passed, move to next step
      setStep(2)
    },
    [form, step1Fields]
  )

  // Step 2 제출 핸들러
  const onSubmit = useCallback(
    async (data: ContactFormValues) => {
      setIsSubmitting(true)
      const controller = new AbortController()
      let timeoutId: NodeJS.Timeout | null = null
      
      try {
        timeoutId = setTimeout(() => controller.abort(), 30000) // 30초 타임아웃

        // getApiUrl을 사용하여 프로덕션에서 Worker URL로 요청
        const apiUrl = getApiUrl('/api/leads')
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company: data.company,
            name: data.name,
            email: data.email,
            phone: data.phone,
            metadata: {
              program: data.program,
              participants: data.participants,
              date: data.date,
              budget: data.budget,
              programType: data.programType,
              inquiry: data.inquiry,
            },
          }),
          signal: controller.signal,
        })

        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }

        if (!response.ok) {
          const errorMessage = await handleFetchError(response)
          throw new Error(errorMessage)
        }

        toast({
          title: '제출 완료',
          description: '문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.',
        })

        form.reset()
        setStep(1)

        // 성공 후 2초 뒤 홈페이지로 리다이렉트
        redirectTimeoutRef.current = setTimeout(() => {
          router.push('/')
          redirectTimeoutRef.current = null
        }, 2000)
      } catch (error) {
        // 타임아웃 정리
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        
        // AbortError는 타임아웃 또는 취소된 요청
        if (error instanceof Error && error.name === 'AbortError') {
          toast({
            title: '요청 시간 초과',
            description: '요청 시간이 초과되었습니다. 네트워크 연결을 확인하고 다시 시도해주세요.',
            variant: 'destructive',
          })
          return
        }
        
        const networkError = handleNetworkError(error)
        
        toast({
          title: networkError.isNetworkError ? '네트워크 오류' : '오류 발생',
          description: networkError.message,
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [form, router]
  )

  // 이전 단계로 이동 핸들러
  const handleBack = useCallback(() => {
    setStep(1)
  }, [])


  // 현재 단계 라벨 메모이제이션
  const stepLabel = useMemo(() => (step === 1 ? '기본 정보' : '상세 정보'), [step])

  return (
    <PublicLayout>
      <main className="flex flex-1 justify-center py-10 sm:py-16 px-4" role="main">
        <div className="layout-content-container flex flex-col w-full max-w-2xl flex-1 gap-8 sm:gap-10">
          <ScrollAnimate animation="fade">
            <div className="flex flex-col text-center gap-3 sm:gap-4">
              <h1 className="text-text-light-primary dark:text-text-dark-primary text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
                맞춤 제안서 요청
              </h1>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm sm:text-base font-normal leading-relaxed max-w-xl mx-auto">
                기업의 목적과 예산에 맞는 최적의 워크샵 프로그램을 제안해 드립니다.
              </p>
            </div>
          </ScrollAnimate>

          <StepIndicator step={step} label={stepLabel} />

          <ScrollAnimate animation="slide-up" delay={100}>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 border border-border-light dark:border-border-dark">
              {step === 1 ? (
                <Step1Form form={form} onSubmit={handleStep1Next} />
              ) : (
                <Step2Form
                  form={form}
                  onBack={handleBack}
                  isSubmitting={isSubmitting}
                  onSubmit={onSubmit}
                />
              )}
            </div>
          </ScrollAnimate>
        </div>
      </main>
    </PublicLayout>
  )
}
