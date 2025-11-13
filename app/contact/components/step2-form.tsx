/**
 * Component: Step2Form
 * @param {UseFormReturn<ContactFormValues>} form - react-hook-form 인스턴스 [Required]
 * @param {() => void} onBack - 이전 단계로 이동 핸들러 [Required]
 * @param {boolean} isSubmitting - 제출 중 상태 [Required]
 * @param {(data: ContactFormValues) => Promise<void>} onSubmit - 폼 제출 핸들러 [Required]
 * @example <Step2Form form={form} onBack={() => setStep(1)} isSubmitting={isSubmitting} onSubmit={onSubmit} />
 */
'use client'

import { memo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FormField } from './form-field'
import type { ContactFormValues } from '../types'

interface Step2FormProps {
  form: UseFormReturn<ContactFormValues>
  onBack: () => void
  isSubmitting: boolean
  onSubmit: (data: ContactFormValues) => Promise<void>
}

export const Step2Form = memo(function Step2Form({
  form,
  onBack,
  isSubmitting,
  onSubmit,
}: Step2FormProps) {
  const { register, formState, handleSubmit } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 sm:gap-8" aria-label="상세 정보 입력 폼">
      <div className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <FormField label="참여 인원" id="participants">
            <Input
              {...register('participants')}
              placeholder="예: 25명 또는 약 30~40명"
              type="text"
              className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
            />
          </FormField>

          <FormField label="희망일자" id="date">
            <Input
              {...register('date')}
              placeholder="예: 12월 셋째 주 또는 1분기"
              type="text"
              className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <FormField label="예산 범위" id="budget">
            <div className="relative">
              <select
                {...register('budget')}
                className="w-full h-12 px-4 pr-10 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50 appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                id="budget"
              >
                <option value="" disabled hidden>
                  예산 범위를 선택하세요
                </option>
                <option value="500만 원 이하">500만 원 이하</option>
                <option value="500만 ~ 1,000만 원">500만 ~ 1,000만 원</option>
                <option value="1,000만 원 이상">1,000만 원 이상</option>
                <option value="협의 후 결정">협의 후 결정</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-light-secondary dark:text-text-dark-secondary"
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-xl">expand_more</span>
              </div>
            </div>
          </FormField>

          <FormField label="희망 프로그램 형태" id="program-type">
            <div className="relative">
              <select
                {...register('programType')}
                className="w-full h-12 px-4 pr-10 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50 appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                id="program-type"
              >
                <option value="" disabled hidden>
                  프로그램 형태를 선택하세요
                </option>
                <option value="온라인">온라인</option>
                <option value="오프라인">오프라인</option>
                <option value="혼합형">혼합형</option>
                <option value="미정">미정</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-light-secondary dark:text-text-dark-secondary"
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-xl">expand_more</span>
              </div>
            </div>
          </FormField>
        </div>

        <FormField label="문의 및 요청사항" id="inquiry">
          <Textarea
            {...register('inquiry')}
            placeholder="궁금한 점이나 특별히 요청하고 싶은 사항을 자유롭게 작성해주세요."
            rows={5}
            className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50 resize-y"
          />
        </FormField>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-light/50 dark:bg-surface-dark/50 border border-border-light dark:border-border-dark">
          <input
            {...register('privacyPolicy')}
            type="checkbox"
            id="privacy-policy"
            className="mt-0.5 h-5 w-5 rounded border-border-light dark:border-border-dark text-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-invalid={formState.errors.privacyPolicy ? 'true' : 'false'}
            aria-describedby={formState.errors.privacyPolicy ? 'privacy-policy-error' : undefined}
          />
          <label
            htmlFor="privacy-policy"
            className="flex-1 text-sm text-text-light-primary dark:text-text-dark-primary leading-relaxed cursor-pointer"
          >
            <span>개인정보 수집 및 이용에 동의합니다.</span>{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            >
              자세히 보기
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                open_in_new
              </span>
            </a>
          </label>
        </div>
        {formState.errors.privacyPolicy && (
          <p
            id="privacy-policy-error"
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              error
            </span>
            {formState.errors.privacyPolicy.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto min-w-[140px] h-12 px-6 bg-gray-100 dark:bg-gray-800 text-text-light-primary dark:text-text-dark-primary text-base font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span className="truncate">이전 단계로</span>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[140px] h-12 px-6 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span className="truncate">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-lg" aria-hidden="true">
                    sync
                  </span>
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
  )
})

