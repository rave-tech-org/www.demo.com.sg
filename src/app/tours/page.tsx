import SkeletonLoader from '@/elements/skeleton-loader';
import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const { data: toursPage } = await sanityFetch({
    query: GetPageMeta,
    params: { name: 'tour-search-page' },
  });

  return {
    title: toursPage?.metaTitle || 'Demo Travel',
    description: toursPage?.metaDescription || 'Demo Travel',
  };
}

export default async function Tours() {
  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);
  const { data: toursPage } = await sanityFetch({ query: GetPage, params: { name: 'tour-search-page' } });

  return (
    <article>
      {toursPage?.layout?.map((block, index) => {
        const Component = contentBlock.get(block.slug?.current || '');

        return (
          <Suspense key={`home-page-${index}`} fallback={<SkeletonLoader />}>
            {Component ? <Component block={block} entries={entries} /> : null}
          </Suspense>
        );
      })}
    </article>
  );
}
