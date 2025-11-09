'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { PublicLayout } from '@/components/public-layout'
import { ScrollAnimate } from '@/components/scroll-animate'

const contactFormSchema = z.object({
  // Step 1
  company: z.string().min(1, '회사명을 입력해주세요'),
  name: z.string().min(1, '담당자명을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().min(1, '휴대폰 번호를 입력해주세요').regex(/^[0-9]+$/, "'-' 없이 숫자만 입력해주세요"),
  // Step 2
  program: z.string().optional(),
  participants: z.string().optional(),
  date: z.string().optional(),
  budget: z.string().optional(),
  programType: z.string().optional(),
  inquiry: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요.',
  }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

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

  const handleStep1Next = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Step 1: Validate only step 1 fields
    const step1Fields: (keyof ContactFormValues)[] = ['company', 'name', 'email', 'phone']
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
  }

  async function onSubmit(data: ContactFormValues) {
    // Step 2 - Submit only
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
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
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '제출에 실패했습니다')
      }

      toast({
        title: '제출 완료',
        description: '문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.',
      })

      form.reset()
      setStep(1)
    } catch (error) {
      toast({
        title: '오류 발생',
        description: error instanceof Error ? error.message : '다시 시도해주세요',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <main className="flex flex-1 justify-center py-10 sm:py-16 px-4">
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

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                  {step === 1 ? '기본 정보' : '상세 정보'}
                </span>
                <span className="text-text-light-secondary dark:text-text-dark-secondary font-medium">{step} / 2</span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-border-light dark:bg-border-dark overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out shadow-sm"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                ></div>
              </div>
            </div>

            <ScrollAnimate animation="slide-up" delay={100}>
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 border border-border-light dark:border-border-dark">
                {step === 1 ? (
                <form onSubmit={handleStep1Next} className="flex flex-col gap-6 sm:gap-8">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight flex items-center gap-1"
                          htmlFor="company-name"
                        >
                          회사명
                          <span className="text-primary">*</span>
                        </label>
                        <input
                          {...form.register('company')}
                          autoComplete="organization"
                          className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
                          id="company-name"
                          placeholder="회사명을 입력해주세요"
                          type="text"
                        />
                        {form.formState.errors.company && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {form.formState.errors.company.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight flex items-center gap-1"
                          htmlFor="contact-person"
                        >
                          담당자명
                          <span className="text-primary">*</span>
                        </label>
                        <input
                          {...form.register('name')}
                          autoComplete="name"
                          className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
                          id="contact-person"
                          placeholder="담당자명을 입력해주세요"
                          type="text"
                        />
                        {form.formState.errors.name && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight flex items-center gap-1"
                          htmlFor="email"
                        >
                          이메일
                          <span className="text-primary">*</span>
                        </label>
                        <input
                          {...form.register('email')}
                          autoComplete="email"
                          className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
                          id="email"
                          placeholder="이메일 주소를 입력해주세요"
                          type="email"
                        />
                        {form.formState.errors.email && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight flex items-center gap-1"
                          htmlFor="phone"
                        >
                          휴대폰 번호
                          <span className="text-primary">*</span>
                        </label>
                        <input
                          {...form.register('phone')}
                          autoComplete="tel"
                          className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
                          id="phone"
                          placeholder="'-' 없이 숫자만 입력"
                          type="tel"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto min-w-[140px] h-12 px-6 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="truncate">다음 단계로</span>
                        <span className="material-symbols-outlined ml-2 text-lg">arrow_forward</span>
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 sm:gap-8">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight"
                          htmlFor="participants"
                        >
                          참여 인원
                        </label>
                        <input
                          {...form.register('participants')}
                          className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
                          id="participants"
                          placeholder="예: 25명 또는 약 30~40명"
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight"
                          htmlFor="date"
                        >
                          희망일자
                        </label>
                        <input
                          {...form.register('date')}
                          className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
                          id="date"
                          placeholder="예: 12월 셋째 주 또는 1분기"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight"
                          htmlFor="budget"
                        >
                          예산 범위
                        </label>
                        <div className="relative">
                          <select
                            {...form.register('budget')}
                            className="w-full h-12 px-4 pr-10 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50 appearance-none cursor-pointer"
                            id="budget"
                          >
                            <option value="" disabled hidden>예산 범위를 선택하세요</option>
                            <option value="500만 원 이하">500만 원 이하</option>
                            <option value="500만 ~ 1,000만 원">500만 ~ 1,000만 원</option>
                            <option value="1,000만 원 이상">1,000만 원 이상</option>
                            <option value="협의 후 결정">협의 후 결정</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-light-secondary dark:text-text-dark-secondary">
                            <span className="material-symbols-outlined text-xl">expand_more</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight"
                          htmlFor="program-type"
                        >
                          희망 프로그램 형태
                        </label>
                        <div className="relative">
                          <select
                            {...form.register('programType')}
                            className="w-full h-12 px-4 pr-10 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50 appearance-none cursor-pointer"
                            id="program-type"
                          >
                            <option value="" disabled hidden>프로그램 형태를 선택하세요</option>
                            <option value="온라인">온라인</option>
                            <option value="오프라인">오프라인</option>
                            <option value="혼합형">혼합형</option>
                            <option value="미정">미정</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-light-secondary dark:text-text-dark-secondary">
                            <span className="material-symbols-outlined text-xl">expand_more</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight"
                        htmlFor="inquiry"
                      >
                        문의 및 요청사항
                      </label>
                      <textarea
                        {...form.register('inquiry')}
                        className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50 resize-y"
                        id="inquiry"
                        placeholder="궁금한 점이나 특별히 요청하고 싶은 사항을 자유롭게 작성해주세요."
                        rows={5}
                      ></textarea>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light dark:border-border-dark">
                      <input
                        {...form.register('privacyPolicy')}
                        type="checkbox"
                        id="privacy-policy"
                        className="mt-0.5 h-5 w-5 rounded border-border-light dark:border-border-dark text-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-0 cursor-pointer transition-colors"
                      />
                      <label
                        htmlFor="privacy-policy"
                        className="flex-1 text-sm text-text-light-primary dark:text-text-dark-primary leading-relaxed cursor-pointer"
                      >
                        <span>개인정보 수집 및 이용에 동의합니다.</span>{' '}
                        <a
                          href="#"
                          target="_blank"
                          className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                        >
                          자세히 보기
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                      </label>
                    </div>
                    {form.formState.errors.privacyPolicy && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {form.formState.errors.privacyPolicy.message}
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                      <Button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full sm:w-auto min-w-[140px] h-12 px-6 bg-gray-100 dark:bg-gray-800 text-text-light-primary dark:text-text-dark-primary text-base font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="truncate">이전 단계로</span>
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[140px] h-12 px-6 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <span className="truncate">
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                              제출 중...
                            </span>
                          ) : (
                            '제안서 요청하기'
                          )}
                        </span>
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              </div>
            </ScrollAnimate>
          </div>
        </main>
    </PublicLayout>
  )
}

