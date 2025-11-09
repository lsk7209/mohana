import { SequencesList } from '@/components/admin/sequences-list'

export default function SequencesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">시퀀스 관리</h1>
        <p className="text-muted-foreground">자동화 시퀀스를 생성하고 관리하세요</p>
      </div>

      <SequencesList />
    </div>
  )
}

