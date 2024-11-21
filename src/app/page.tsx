import { Suspense } from 'react';

import { sanityFetch } from '@/sanity/lib/client';
import { GetPageMeta, GetPage, GetCategories, GetProducts, GetTestimonials, GetPosts } from '@/sanity/lib/queries/cms';

import SkeletonLoader from '@/elements/skeleton-loader';
import { Metadata } from 'next';
import type {
  GetCategoriesResult,
  GetPageResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
  Page,
} from '@/sanity/sanity.types';
import contentBlockRegistry from '@/resources/content-block-registry';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await sanityFetch<Pick<Page, 'metaTitle' | 'metaDescription' | 'metaKeywords'>>({
    query: GetPageMeta,
    tags: ['page'],
    qParams: { name: 'home-page' },
  });

  return {
    title: homePage?.metaTitle || 'Lago Travel',
    description: homePage?.metaDescription || 'Lago Travel',
  };
}

export default async function Home() {
  const homePage = await sanityFetch<GetPageResult>({
    query: GetPage,
    tags: ['page', 'contentBlock'],
    qParams: { name: 'home-page' },
  });

  const categories = await sanityFetch<GetCategoriesResult>({
    query: GetCategories,
    tags: ['category'],
  });

  const products = await sanityFetch<GetProductsResult>({
    query: GetProducts,
    tags: ['product'],
  });

  const testimonials = await sanityFetch<GetTestimonialsResult>({
    query: GetTestimonials,
    tags: ['testimonial'],
  });

  const posts = await sanityFetch<GetPostsResult>({
    query: GetPosts,
    tags: ['post'],
  });

  const entries = {
    categories,
    products,
    testimonials,
    posts,
  };

  return (
    <main>
      {homePage?.layout?.map((block, index) => {
        const Component = contentBlockRegistry.get(block.slug?.current || '');
        return (
          <Suspense key={`home-page-${index}`} fallback={<SkeletonLoader />}>
            {Component ? <Component block={block} entries={entries} /> : null}
          </Suspense>
        );
      })}
    </main>
  );
}
