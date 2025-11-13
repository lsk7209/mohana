/**
 * Component: StepIndicator
 * @param {number} step - 현재 단계 (1 또는 2) [Required]
 * @param {string} label - 현재 단계 라벨 [Required]
 * @example <StepIndicator step={1} label="기본 정보" />
 */
'use client'

import { memo } from 'react'

interface StepIndicatorProps {
  step: number
  label: string
}

export const StepIndicator = memo(function StepIndicator({
  step,
  label,
}: StepIndicatorProps) {
  const progressWidth = step === 1 ? '50%' : '100%'

  return (
    <div className="flex flex-col gap-3" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={2} aria-label={`${label} - 단계 ${step} / 2`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-text-light-primary dark:text-text-dark-primary">
          {label}
        </span>
        <span className="text-text-light-secondary dark:text-text-dark-secondary font-medium">
          {step} / 2
        </span>
      </div>
      <div className="relative h-2 w-full rounded-full bg-border-light dark:bg-border-dark overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out shadow-sm"
          style={{ width: progressWidth }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
})

