import { useEntries } from '@/hooks/local/use-entries';
import contentBlockRegistry from '@/resources/content-block-registry';
import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult } from '@/sanity/sanity.types';

export default async function ContentBlockPage({ params }: { params: { slug: string } }) {
  const block = await sanityFetch<GetContentBlockResult>({
    query: GetContentBlockBySlug,
    tags: ['contentBlock'],
    qParams: { slug: params?.slug || 'home-banner' },
  });

  console.log(block);
  const entries = await useEntries();

  const Component = contentBlockRegistry.get(block?.slug?.current || '');
  return <main className="block-wrapper">{Component ? <Component entries={entries} block={block} /> : null}</main>;
}
