import { ALL_PATHS, getUrl } from '@/app/urls';
import { sanityFetch } from '@/sanity/lib/live';
import { GetPosts, GetProductsByType } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type { MetadataRoute } from 'next';

const getEntry = (path: string) => ({ url: getUrl({ path }), lastModified: new Date() });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: destination } = await sanityFetch({
    query: GetProductsByType,
    params: { type: 'destination' },
    tag: TAG.product,
  });

  const { data: tour } = await sanityFetch({
    query: GetProductsByType,
    params: { type: 'tour' },
    tag: TAG.product,
  });

  const { data: post } = await sanityFetch({
    query: GetPosts,
    tag: TAG.post,
  });

  const destinationPaths = destination?.map((e) => `/destination/${e.slug?.current}`) || [];
  const tourPaths = tour?.map((e) => `/tour/${e.slug?.current}`) || [];
  const postPaths = post?.map((e) => `/post/${e.slug?.current}`) || [];

  return [...ALL_PATHS, ...destinationPaths, ...tourPaths, ...postPaths].map(getEntry);
}
