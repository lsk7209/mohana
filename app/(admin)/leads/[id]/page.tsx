import { notFound } from 'next/navigation'
import { LeadDetail } from '@/components/admin/lead-detail'

export const dynamic = 'force-static'

// 정적 내보내기를 위한 빈 generateStaticParams
export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <LeadDetail leadId={id} />
    </div>
  )
}

