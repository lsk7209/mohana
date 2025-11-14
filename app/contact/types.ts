import * as z from 'zod'

export const contactFormSchema = z.object({
  // Step 1
  company: z.string()
    .min(1, '회사명을 입력해주세요')
    .max(100, '회사명은 100자 이하로 입력해주세요'),
  name: z.string()
    .min(1, '담당자명을 입력해주세요')
    .max(50, '담당자명은 50자 이하로 입력해주세요'),
  email: z.string()
    .email('올바른 이메일을 입력해주세요')
    .max(255, '이메일은 255자 이하로 입력해주세요'),
  phone: z.string()
    .min(1, '휴대폰 번호를 입력해주세요')
    .max(20, '휴대폰 번호는 20자 이하로 입력해주세요')
    .regex(/^[0-9]+$/, "'-' 없이 숫자만 입력해주세요"),
  // Step 2
  program: z.string().max(200, '프로그램명은 200자 이하로 입력해주세요').optional(),
  participants: z.string().max(50, '참가 인원은 50자 이하로 입력해주세요').optional(),
  date: z.string().max(100, '날짜는 100자 이하로 입력해주세요').optional(),
  budget: z.string().max(100, '예산은 100자 이하로 입력해주세요').optional(),
  programType: z.string().max(100, '프로그램 유형은 100자 이하로 입력해주세요').optional(),
  inquiry: z.string().max(2000, '문의 내용은 2000자 이하로 입력해주세요').optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요.',
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

