/**
 * Component: Step1Form
 * @param {UseFormReturn<ContactFormValues>} form - react-hook-form 인스턴스 [Required]
 * @param {(e: React.FormEvent) => Promise<void>} onSubmit - 폼 제출 핸들러 [Required]
 * @example <Step1Form form={form} onSubmit={handleStep1Next} />
 */
'use client'

import { memo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormField } from './form-field'
import type { ContactFormValues } from '../types'

interface Step1FormProps {
  form: UseFormReturn<ContactFormValues>
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export const Step1Form = memo(function Step1Form({
  form,
  onSubmit,
}: Step1FormProps) {
  const { register, formState } = form

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 sm:gap-8" aria-label="기본 정보 입력 폼">
      <div className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <FormField
            label="회사명"
            id="company-name"
            required
            error={formState.errors.company?.message}
            autoComplete="organization"
          >
            <Input
              {...register('company')}
              placeholder="회사명을 입력해주세요"
              type="text"
              className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
            />
          </FormField>

          <FormField
            label="담당자명"
            id="contact-person"
            required
            error={formState.errors.name?.message}
            autoComplete="name"
          >
            <Input
              {...register('name')}
              placeholder="담당자명을 입력해주세요"
              type="text"
              className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <FormField
            label="이메일"
            id="email"
            required
            error={formState.errors.email?.message}
            autoComplete="email"
          >
            <Input
              {...register('email')}
              placeholder="이메일 주소를 입력해주세요"
              type="email"
              className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
            />
          </FormField>

          <FormField
            label="휴대폰 번호"
            id="phone"
            required
            error={formState.errors.phone?.message}
            autoComplete="tel"
          >
            <Input
              {...register('phone')}
              placeholder="'-' 없이 숫자만 입력"
              type="tel"
              className="w-full h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:border-primary/50"
            />
          </FormField>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <Button
            type="submit"
            className="w-full sm:w-auto min-w-[140px] h-12 px-6 bg-primary text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <span className="truncate">다음 단계로</span>
            <span className="material-symbols-outlined ml-2 text-lg" aria-hidden="true">
              arrow_forward
            </span>
          </Button>
        </div>
      </div>
    </form>
  )
})

