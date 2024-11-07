import { sanityFetch } from '@/sanity/lib/client';
import { GET_CONTENT_BLOCK_BY_SLUG } from '@/sanity/lib/queries/cms';
import { ContentBlock } from '@/sanity/sanity.types';
import contentBlockRegistry from '@/resources/content-block-registry';

export default async function ContentBlockPage({ params }: { params: { slug: string } }) {
  const block = await sanityFetch<ContentBlock>({
    query: GET_CONTENT_BLOCK_BY_SLUG(params.slug || 'home-banner'),
    tags: ['contentBlock'],
  });

  const Component = contentBlockRegistry.get(block.slug?.current || '');
  return <main className="block-wrapper">{Component ? <Component block={block} /> : null}</main>;
}
