import TourDetailDemo from '@/components/tour-detail-demo';

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug as string;
  return <TourDetailDemo slug={slug} />;
}
