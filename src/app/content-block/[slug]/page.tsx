import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import { GetContentBlockResult } from '@/sanity/sanity.types';
import contentBlockRegistry from '@/resources/content-block-registry';

export default async function ContentBlockPage({ params }: { params: { slug: string } }) {
  const block = await sanityFetch<GetContentBlockResult>({
    query: GetContentBlockBySlug,
    tags: ['contentBlock'],
    qParams: { slug: params?.slug || 'home-banner' },
  });

  const Component = contentBlockRegistry.get(block?.slug?.current || '');
  return <main className="block-wrapper">{Component ? <Component block={block} /> : null}</main>;
}
