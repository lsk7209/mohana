'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface ExportButtonProps {
  data: any[]
  filename?: string
  onExport?: () => void
}

export function ExportButton({ data, filename = 'export', onExport }: ExportButtonProps) {
  function handleExport() {
    try {
      // CSV 변환
      if (data.length === 0) {
        toast({
          title: '오류',
          description: '내보낼 데이터가 없습니다.',
          variant: 'destructive',
        })
        return
      }

      const headers = Object.keys(data[0])
      const csvContent = [
        headers.join(','),
        ...data.map(row =>
          headers.map(header => {
            const value = row[header]
            // CSV 이스케이프
            if (value === null || value === undefined) return ''
            const stringValue = String(value)
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
              return `"${stringValue.replace(/"/g, '""')}"`
            }
            return stringValue
          }).join(',')
        ),
      ].join('\n')

      // BOM 추가 (한글 깨짐 방지)
      const BOM = '\uFEFF'
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      URL.revokeObjectURL(url)

      toast({
        title: '내보내기 완료',
        description: 'CSV 파일이 다운로드되었습니다.',
      })

      onExport?.()
    } catch (error) {
      toast({
        title: '오류',
        description: '내보내기에 실패했습니다.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      CSV 내보내기
    </Button>
  )
}

