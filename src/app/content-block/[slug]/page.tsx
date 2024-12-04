import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/client';
import { GetContentBlockBySlug, GetContentBlocks } from '@/sanity/lib/queries/cms';
import type { GetContentBlockResult, GetContentBlocksResult } from '@/sanity/sanity.types';

import FloatingActionButton from '@/components/floating-action-button';

type contentBlockSlugItem = {
  slug: string | null | undefined;
  title: string | null;
  isActive: boolean;
};

export default async function ContentBlockPage({ params }: { params: { slug: string } }) {
  const block = await sanityFetch<GetContentBlockResult>({
    query: GetContentBlockBySlug,
    tags: ['contentBlock'],
    qParams: { slug: params?.slug || 'home-banner' },
  });

  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);

  const contentBlocks = await sanityFetch<GetContentBlocksResult>({
    query: GetContentBlocks,
    tags: ['contentBlock'],
  });

  const contentBlockSlugList: contentBlockSlugItem[] = [];

  if (contentBlocks) {
    const filteredContentBlocks = contentBlocks.filter((block) => {
      if (!block.slug?.current) return false;
      return block;
    });
    filteredContentBlocks.forEach(({ title, slug }) => {
      contentBlockSlugList.push({ title, slug: slug?.current, isActive: slug?.current === params.slug });
    });
  }

  const Component = contentBlock.get(block?.slug?.current || '');
  return (
    <main className="block-wrapper">
      <FloatingActionButton contentBlockSlugList={contentBlockSlugList} />
      {Component ? <Component entries={entries} block={block} /> : null}
    </main>
  );
}
