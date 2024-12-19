import TheNotFoundPage from '@/components/the-not-found-404';
import { sanityFetch } from '@/sanity/lib/live';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';

export default async function NotFound() {
  const { data } = await sanityFetch({
    query: GetContentBlockBySlug,
    params: { slug: 'the-not-found-404' },
  });
  return <TheNotFoundPage block={data} />;
}
