import { getMetadata } from '@/app/metadata';
import TourDetailDemo from '@/components/tour-detail-demo';
import { sanityFetch } from '@/sanity/lib/live';
import { GetProductBySlug } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

const getData = async (slug: string) => {
  const { data } = await sanityFetch({
    query: GetProductBySlug,
    params: { slug, type: 'tour' },
    tag: TAG.product,
  });

  return data;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getData(slug);

  return getMetadata({
    imageUrl: product?.imageUrl,
    title: product?.metaTitle ?? product?.name,
    description: product?.metaDescription,
    keywords: product?.metaKeywords,
  });
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getData(slug);

  return <TourDetailDemo product={product} />;
}
