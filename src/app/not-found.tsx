import TheNotFoundPage from '@/components/the-not-found-404';
import { sanityFetch } from '@/sanity/lib/live';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';

export default async function NotFound() {
  const { data } = await sanityFetch({
    query: GetContentBlockBySlug,
    params: { slug: 'the-not-found-404' },
    tag: TAG.contentBlock,
  });

  return <TheNotFoundPage block={data} />;
}
