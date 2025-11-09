'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MessageDetail } from '@/components/admin/message-detail'

interface MessageDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  messageId: string
}

export function MessageDetailDialog({
  open,
  onOpenChange,
  messageId,
}: MessageDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>메시지 상세</DialogTitle>
        </DialogHeader>
        <MessageDetail messageId={messageId} />
      </DialogContent>
    </Dialog>
  )
}

