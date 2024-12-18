import TourDetailDemo from '@/components/tour-detail-demo';
import { sanityFetch } from '@/sanity/lib/live';
import { GetProductBySlug } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: product } = await sanityFetch({
    query: GetProductBySlug,
    params: { slug, type: 'tour' },
    tag: TAG.product,
  });

  return <TourDetailDemo product={product} />;
}
