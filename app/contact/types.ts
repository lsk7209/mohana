import * as z from 'zod'

export const contactFormSchema = z.object({
  // Step 1
  company: z.string().min(1, '회사명을 입력해주세요'),
  name: z.string().min(1, '담당자명을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().min(1, '휴대폰 번호를 입력해주세요').regex(/^[0-9]+$/, "'-' 없이 숫자만 입력해주세요"),
  // Step 2
  program: z.string().optional(),
  participants: z.string().optional(),
  date: z.string().optional(),
  budget: z.string().optional(),
  programType: z.string().optional(),
  inquiry: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요.',
  }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

