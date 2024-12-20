import { getMetadata } from '@/app/metadata';
import DestinationDetailDemo from '@/components/destination-detail-demo';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPosts, GetProductBySlug, GetProductsByCategory } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

const getData = async (slug: string) => {
  const { data } = await sanityFetch({
    query: GetProductBySlug,
    params: { slug, type: 'destination' },
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

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;

  const product = await getData(slug);

  const { data: posts } = await sanityFetch({
    query: GetPosts,
    tag: TAG.post,
  });

  const { data: relatedProducts } = await sanityFetch({
    query: GetProductsByCategory,
    params: { categorySlug: 'penang' },
    tag: TAG.product,
  });

  const pathname = `/destination/${slug}`;
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const text = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { text, link: href };
  });

  breadcrumbs.unshift({ text: 'Home', link: '/' });

  return (
    <DestinationDetailDemo
      product={product}
      relatedProducts={relatedProducts}
      breadcrumbs={breadcrumbs}
      posts={posts}
    />
  );
}
