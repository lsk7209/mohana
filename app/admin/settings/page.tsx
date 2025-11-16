'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'
import { toast } from '@/hooks/use-toast'

/**
 * 이메일/SMS 발송 설정 페이지
 * 발송 서비스 설정 및 템플릿 관리를 위한 페이지
 */
export default function AdminSettingsPage() {
  const [emailSettings, setEmailSettings] = useState({
    provider: 'resend', // 'resend' | 'mailchannels'
    apiKey: '',
    fromEmail: '',
    fromName: '모하나',
  })

  const [smsSettings, setSmsSettings] = useState({
    provider: 'solapi',
    apiKey: '',
    apiSecret: '',
    senderPhone: '',
  })

  const [loading, setLoading] = useState(false)

  async function handleSaveEmailSettings() {
    setLoading(true)
    try {
      const apiUrl = getApiUrl('/api/admin/settings/email')
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailSettings),
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '저장 완료',
        description: '이메일 설정이 저장되었습니다.',
      })
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '오류',
        description: networkError.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveSmsSettings() {
    setLoading(true)
    try {
      const apiUrl = getApiUrl('/api/admin/settings/sms')
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smsSettings),
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '저장 완료',
        description: 'SMS 설정이 저장되었습니다.',
      })
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '오류',
        description: networkError.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-light-primary dark:text-text-dark-primary">
          발송 설정
        </h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal">
          이메일 및 SMS 발송 서비스 설정을 관리합니다.
        </p>
      </header>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>이메일 발송 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-provider">발송 서비스</Label>
            <select
              id="email-provider"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={emailSettings.provider}
              onChange={(e) =>
                setEmailSettings({ ...emailSettings, provider: e.target.value as 'resend' | 'mailchannels' })
              }
            >
              <option value="resend">Resend</option>
              <option value="mailchannels">MailChannels</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-api-key">API Key</Label>
            <Input
              id="email-api-key"
              type="password"
              value={emailSettings.apiKey}
              onChange={(e) => setEmailSettings({ ...emailSettings, apiKey: e.target.value })}
              placeholder="이메일 API Key를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-from">발신 이메일</Label>
            <Input
              id="email-from"
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
              placeholder="noreply@mohana.kr"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-from-name">발신자 이름</Label>
            <Input
              id="email-from-name"
              value={emailSettings.fromName}
              onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
              placeholder="모하나"
            />
          </div>

          <Button onClick={handleSaveEmailSettings} disabled={loading}>
            {loading ? '저장 중...' : '이메일 설정 저장'}
          </Button>
        </CardContent>
      </Card>

      {/* SMS Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SMS 발송 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sms-api-key">API Key</Label>
            <Input
              id="sms-api-key"
              type="password"
              value={smsSettings.apiKey}
              onChange={(e) => setSmsSettings({ ...smsSettings, apiKey: e.target.value })}
              placeholder="SMS API Key를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sms-api-secret">API Secret</Label>
            <Input
              id="sms-api-secret"
              type="password"
              value={smsSettings.apiSecret}
              onChange={(e) => setSmsSettings({ ...smsSettings, apiSecret: e.target.value })}
              placeholder="SMS API Secret을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sms-sender">발신 번호</Label>
            <Input
              id="sms-sender"
              value={smsSettings.senderPhone}
              onChange={(e) => setSmsSettings({ ...smsSettings, senderPhone: e.target.value })}
              placeholder="01012345678"
            />
          </div>

          <Button onClick={handleSaveSmsSettings} disabled={loading}>
            {loading ? '저장 중...' : 'SMS 설정 저장'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

