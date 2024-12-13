import { sanityFetch } from '@/sanity/lib/client';
import { GetCategories, GetPosts, GetProducts, GetTestimonials } from '@/sanity/lib/queries/cms';
import type {
  GetCategoriesResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
} from '@/sanity/sanity.types';

export const useEntries = async ({ isDraft }: { isDraft?: boolean }) => {
  const categories = await sanityFetch<GetCategoriesResult>({
    query: GetCategories,
    tags: ['category'],
    isDraft,
  });

  const products = await sanityFetch<GetProductsResult>({
    query: GetProducts,
    tags: ['product'],
    isDraft,
  });

  const testimonials = await sanityFetch<GetTestimonialsResult>({
    query: GetTestimonials,
    tags: ['testimonial'],
    isDraft,
  });

  const posts = await sanityFetch<GetPostsResult>({
    query: GetPosts,
    tags: ['post'],
    isDraft,
  });

  return {
    categories,
    products,
    testimonials,
    posts,
  };
};

export type Entries = {
  categories: GetCategoriesResult;
  products: GetProductsResult;
  testimonials: GetTestimonialsResult;
  posts: GetPostsResult;
};
