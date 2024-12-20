import SkeletonLoader from '@/elements/skeleton-loader';
import { useContentBlocks } from '@/hooks/local/use-content-blocks';
import { useEntries } from '@/hooks/local/use-entries';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPage, GetPageMeta } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getMetadata } from '../metadata';

export async function generateMetadata(): Promise<Metadata> {
  const { data: toursPage } = await sanityFetch({
    query: GetPageMeta,
    params: { name: 'tour-search-page' },
    tag: TAG.page,
  });

  return await getMetadata({
    title: toursPage?.metaTitle ?? '',
    description: toursPage?.metaDescription ?? '',
  });
}

export default async function Tours() {
  const [entries, contentBlock] = await Promise.all([useEntries(), useContentBlocks()]);
  const { data: toursPage } = await sanityFetch({
    query: GetPage,
    params: { name: 'tour-search-page' },
    tag: TAG.page,
  });

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
