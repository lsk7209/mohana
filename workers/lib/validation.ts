/**
 * 입력 검증 유틸리티
 */

import { AppError } from './error-handler'

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // 한국 전화번호 형식 (010-1234-5678 등)
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateLeadData(data: {
  email: string
  company?: string
  name?: string
  phone?: string
}): void {
  if (!data.email || !validateEmail(data.email)) {
    throw new AppError('INVALID_EMAIL', '올바른 이메일 주소를 입력해주세요', 400)
  }

  if (data.phone && !validatePhone(data.phone)) {
    throw new AppError('INVALID_PHONE', '올바른 전화번호 형식을 입력해주세요', 400)
  }

  if (!data.company || data.company.trim().length === 0) {
    throw new AppError('MISSING_COMPANY', '회사명을 입력해주세요', 400)
  }

  if (!data.name || data.name.trim().length === 0) {
    throw new AppError('MISSING_NAME', '담당자명을 입력해주세요', 400)
  }
}

export function sanitizeInput(input: string): string {
  // 기본 XSS 방지
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

