import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult } from '@/sanity/sanity.types';
import type { SearchParams } from '@/types/shared';

export default async function ComponentList({
  params,
  searchParams,
}: {
  searchParams: SearchParams;
  params: { slug: string };
}) {
  const isDraft = !!searchParams?.isDraft;

  const block = await sanityFetch<GetContentBlockResult>({
    query: GetContentBlockBySlug,
    tags: ['contentBlock'],
    qParams: { slug: params?.slug || 'home-banner' },
    isDraft,
  });

  const [entries, contentBlock] = await Promise.all([useEntries({ isDraft }), useContentBlocks({ isDraft })]);

  const Component = contentBlock.get(block?.slug?.current || '');
  return <main className="block-wrapper">{Component ? <Component entries={entries} block={block} /> : null}</main>;
}
