'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { TemplateDialog } from '@/components/admin/template-dialog'
import { getApiUrl } from '@/lib/env'
import { handleFetchError, handleNetworkError } from '@/lib/error-handler'

interface Template {
  id: string
  channel: 'email' | 'sms'
  name: string
  subject?: string
  body: string
  created_at: number
  updated_at: number
}

export function TemplatesList() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [channel, setChannel] = useState<'email' | 'sms'>('email')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

  useEffect(() => {
    fetchTemplates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]) // fetchTemplates는 안정적이므로 의존성 배열에서 제외

  async function fetchTemplates() {
    setLoading(true)
    try {
      const apiUrl = getApiUrl(`/api/templates?channel=${channel}`)
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json() as { templates?: Template[] }
        setTemplates(data.templates || [])
      } else {
        const errorMessage = await handleFetchError(response)
        toast({
          title: '오류',
          description: errorMessage,
          variant: 'destructive',
        })
      }
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '네트워크 오류',
        description: networkError.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  function handleCreate() {
    setEditingTemplate(null)
    setDialogOpen(true)
  }

  function handleEdit(template: Template) {
    setEditingTemplate(template)
    setDialogOpen(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const apiUrl = getApiUrl(`/api/templates/${id}`)
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorMessage = await handleFetchError(response)
        throw new Error(errorMessage)
      }

      toast({
        title: '삭제 완료',
        description: '템플릿이 삭제되었습니다.',
      })

      fetchTemplates()
    } catch (error) {
      const networkError = handleNetworkError(error)
      toast({
        title: '오류',
        description: networkError.message,
        variant: 'destructive',
      })
    }
  }

  function handleSuccess() {
    setDialogOpen(false)
    fetchTemplates()
  }

  if (loading) {
    return <div className="text-center py-8">로딩 중...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs value={channel} onValueChange={(v) => setChannel(v as 'email' | 'sms')}>
          <TabsList>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              이메일
            </TabsTrigger>
            <TabsTrigger value="sms">
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          새 템플릿
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center text-muted-foreground">
              템플릿이 없습니다. 새 템플릿을 만들어보세요.
            </CardContent>
          </Card>
        ) : (
          templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className="mt-2">
                      {template.channel === 'email' ? '이메일' : 'SMS'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(template.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {template.subject && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-muted-foreground">제목</p>
                    <p className="text-sm">{template.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">내용 미리보기</p>
                  <p className="text-sm line-clamp-3">{template.body.substring(0, 100)}...</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <TemplateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        channel={channel}
        template={editingTemplate}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

