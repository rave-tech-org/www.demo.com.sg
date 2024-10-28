import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { sanityFetch } from '@/sanity/lib/client';
import { GET_HOME_PAGE, GET_HOME_PAGE_META } from '@/sanity/lib/queries/cms';

import BannerCarousel from '@/elements/banner-carousel';
import SkeletonLoader from '@/elements/skeleton-loader';
import HotDealsCarousel from '@/elements/hot-deals-carousel';
// const HotDealsCarousel = dynamic(() => import('@/elements/hot-deals-carousel'), {
// ssr: false,
// loading: () => <SkeletonLoader />
// })
import DestinationCarousel from '@/elements/destination-carousel';
import TravelInterestGroup from '@/elements/travel-interest-group';
import ContentBackground from '@/elements/content-background';
import { Metadata } from 'next';
import { ContentBlock, Page } from '@/sanity/sanity.types';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<Pick<Page, 'metaTitle' | 'metaDescription' | 'metaKeywords'>>({
    query: GET_HOME_PAGE_META,
    tags: ['page.home.meta'],
  });

  return {
    title: homePage.metaTitle || 'Lago Travel',
    description: homePage.metaDescription || 'Lago Travel',
  };
}

type PageType = Omit<Page, 'layout'> & { layout: ContentBlock[] };

export default async function Home() {
  const homePage = await sanityFetch<PageType>({
    query: GET_HOME_PAGE,
    tags: ['page.home'],
  });

  const layout: ContentBlock[] = homePage.layout;

  const contentMapping = new Map([
    ['hot-deals', HotDealsCarousel],
    // ['home-banner', BannerCarousel],
    ['destination-carousel', DestinationCarousel],
    ['travel-interest-group', TravelInterestGroup],
    ['content-background', ContentBackground],
  ]);

  return (
    <main>
      {layout.map((block, index) => {
        const Component = contentMapping.get(block.slug?.current || '');
        return (
          <Suspense key={`home-page-${index}`} fallback={<SkeletonLoader />}>
            {Component ? <Component block={block} /> : null}
          </Suspense>
        );
      })}
    </main>
  );
}
