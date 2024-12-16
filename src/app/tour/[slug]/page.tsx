import TourDetailLago from '@/components/tour-detail-lago';
import type { SearchParams } from '@/types/shared';

export default async function TourDetailPage({
  params,
  searchParams,
}: {
  searchParams: SearchParams;
  params: { slug: string };
}) {
  const slug = params?.slug as string;
  return <TourDetailLago slug={slug} isDraft={!!searchParams?.isDraft} />;
}
