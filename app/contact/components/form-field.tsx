/**
 * Component: FormField
 * @param {string} label - 필드 라벨 [Required]
 * @param {string} id - 필드 ID [Required]
 * @param {boolean} required - 필수 여부 [Optional, default=false]
 * @param {React.ReactNode} children - 입력 필드 컴포넌트 [Required]
 * @param {string | undefined} error - 에러 메시지 [Optional]
 * @param {string} autoComplete - 자동완성 속성 [Optional]
 * @example <FormField label="이메일" id="email" required error={errors.email?.message}>
 *   <Input {...register('email')} />
 * </FormField>
 */
'use client'

import React, { memo } from 'react'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
  error?: string
  autoComplete?: string
  className?: string
}

export const FormField = memo(function FormField({
  label,
  id,
  required = false,
  children,
  error,
  autoComplete,
  className,
}: FormFieldProps) {
  const childProps = {
    id,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? `${id}-error` : undefined,
    ...(autoComplete && { autoComplete }),
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label
        className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold leading-tight flex items-center gap-1"
        htmlFor={id}
      >
        {label}
        {required && (
          <span className="text-primary" aria-label="필수 항목">
            *
          </span>
        )}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children, childProps)
        : children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            error
          </span>
          {error}
        </p>
      )}
    </div>
  )
})

