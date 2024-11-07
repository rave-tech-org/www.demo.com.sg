import { Suspense } from 'react';

import { sanityFetch } from '@/sanity/lib/client';
import { GET_HOME_PAGE, GET_HOME_PAGE_META } from '@/sanity/lib/queries/cms';

import SkeletonLoader from '@/elements/skeleton-loader';
import { Metadata } from 'next';
import { ContentBlock, Page } from '@/sanity/sanity.types';
import { PageType } from '@/components/layout/main-layout/type';
import contentBlockRegistry from '@/resources/content-block-registry';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<Pick<Page, 'metaTitle' | 'metaDescription' | 'metaKeywords'>>({
    query: GET_HOME_PAGE_META,
    tags: ['page'],
  });

  return {
    title: homePage.metaTitle || 'Lago Travel',
    description: homePage.metaDescription || 'Lago Travel',
  };
}

export default async function Home() {
  const homePage = await sanityFetch<PageType>({
    query: GET_HOME_PAGE,
    tags: ['page', 'contentBlock'],
  });

  const layout: ContentBlock[] = homePage.layout;

  return (
    <main>
      {layout.map((block, index) => {
        const Component = contentBlockRegistry.get(block.slug?.current || '');
        return (
          <Suspense key={`home-page-${index}`} fallback={<SkeletonLoader />}>
            {Component ? <Component block={block} /> : null}
          </Suspense>
        );
      })}
    </main>
  );
}
