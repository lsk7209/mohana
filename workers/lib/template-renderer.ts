/**
 * 템플릿 변수 렌더링 시스템
 */

import type { Lead } from '../types'

export interface TemplateVariables {
  [key: string]: string | number | boolean | undefined
}

export function renderTemplate(
  template: string,
  lead: Partial<Lead>,
  variables?: TemplateVariables
): string {
  let rendered = template

  // 기본 리드 변수
  const defaultVars: Record<string, string> = {
    'lead.name': lead.name || '담당자님',
    'lead.email': lead.email || '',
    'company': lead.company || '귀하의 회사',
    'company|회사': lead.company || '귀하의 회사',
  }

  // 모든 변수 병합
  const allVars = { ...defaultVars, ...variables }

  // 변수 치환 ({{variable}} 또는 {{variable|default}} 형식)
  rendered = rendered.replace(/\{\{([^}]+)\}\}/g, (match, varExpr) => {
    const parts = varExpr.split('|').map((p: string) => p.trim())
    const varName = parts[0]
    const defaultValue = parts[1] || ''

    // 변수명에서 . 제거하여 키로 사용
    const key = varName.replace(/\./g, '_')
    
    if (allVars[key] !== undefined) {
      return String(allVars[key])
    }

    // 직접 키로도 시도
    if (allVars[varName] !== undefined) {
      return String(allVars[varName])
    }

    // 기본값 반환
    return defaultValue || match
  })

  return rendered
}

export function extractVariables(template: string): string[] {
  const matches = template.match(/\{\{([^}]+)\}\}/g) || []
  return matches.map(match => {
    const varExpr = match.replace(/\{\{|\}\}/g, '')
    return varExpr.split('|')[0].trim()
  })
}

