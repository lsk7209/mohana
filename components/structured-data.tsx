/**
 * Component: StructuredData
 * 구조화된 데이터 (JSON-LD) 컴포넌트
 * @param {object} data - JSON-LD 데이터 [Required]
 * @example <StructuredData data={organizationSchema} />
 */
'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    script.id = 'structured-data'
    
    // 기존 스크립트가 있으면 제거
    const existing = document.getElementById('structured-data')
    if (existing) {
      existing.remove()
    }
    
    document.head.appendChild(script)
    
    return () => {
      const scriptToRemove = document.getElementById('structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data])

  return null
}


