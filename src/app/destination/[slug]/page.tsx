import DestinationDetailDemo from '@/components/destination-detail-demo';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPosts, GetProductBySlug, GetProductsByCategory } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const pathname = `/destination/${slug}`;
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const { data: product } = await sanityFetch({
    query: GetProductBySlug,
    params: { slug, type: 'destination' },
    tag: TAG.product,
  });

  const { data: posts } = await sanityFetch({
    query: GetPosts,
    tag: TAG.post,
  });

  const { data: relatedProducts } = await sanityFetch({
    query: GetProductsByCategory,
    params: { categorySlug: 'penang' },
    tag: TAG.product,
  });

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
