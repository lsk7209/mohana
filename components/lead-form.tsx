'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'

const leadFormSchema = z.object({
  company: z.string().min(1, '회사명을 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().min(10, '연락처를 입력해주세요'),
  headcount: z.string().optional(),
  theme: z.string().optional(),
  memo: z.string().optional(),
})

type LeadFormValues = z.infer<typeof leadFormSchema>

interface LeadFormProps {
  onSuccess?: () => void
  defaultTheme?: string
  className?: string
}

export function LeadForm({ onSuccess, defaultTheme, className }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      headcount: undefined,
      theme: defaultTheme || '',
      memo: '',
    },
  })

  async function onSubmit(data: LeadFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          headcount: data.headcount ? parseInt(data.headcount) : undefined,
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
      onSuccess?.()
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
    <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">회사명 *</Label>
            <Input
              id="company"
              {...form.register('company')}
              placeholder="예: (주)모하나"
            />
            {form.formState.errors.company && (
              <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">담당자명 *</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder="홍길동"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일 *</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="contact@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">연락처 *</Label>
            <Input
              id="phone"
              {...form.register('phone')}
              placeholder="010-1234-5678"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="headcount">인원 수</Label>
            <Select
              value={form.watch('headcount')}
              onValueChange={(value) => form.setValue('headcount', value)}
            >
              <SelectTrigger id="headcount">
                <SelectValue placeholder="인원 수 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10명 이하</SelectItem>
                <SelectItem value="30">11-30명</SelectItem>
                <SelectItem value="50">31-50명</SelectItem>
                <SelectItem value="100">51-100명</SelectItem>
                <SelectItem value="200">101-200명</SelectItem>
                <SelectItem value="500">201-500명</SelectItem>
                <SelectItem value="1000">500명 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">관심 주제</Label>
            <Select
              value={form.watch('theme')}
              onValueChange={(value) => form.setValue('theme', value)}
            >
              <SelectTrigger id="theme">
                <SelectValue placeholder="관심 주제 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healing">힐링 프로그램</SelectItem>
                <SelectItem value="teambuilding">팀빌딩</SelectItem>
                <SelectItem value="communication">소통 프로그램</SelectItem>
                <SelectItem value="leadership">리더십</SelectItem>
                <SelectItem value="custom">맞춤형 프로그램</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="memo">추가 문의사항</Label>
          <Textarea
            id="memo"
            {...form.register('memo')}
            placeholder="원하시는 프로그램이나 특별 요청사항을 입력해주세요"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '무료 상담 신청하기'}
        </Button>
      </div>
    </form>
  )
}

