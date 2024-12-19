import { sanityFetch } from '@/sanity/lib/live';
import { GetCategories, GetPosts, GetProducts, GetTestimonials } from '@/sanity/lib/queries/cms';
import { TAG } from '@/sanity/lib/tag';
import type {
  GetCategoriesResult,
  GetPostsResult,
  GetProductsResult,
  GetTestimonialsResult,
} from '@/sanity/sanity.types';

export const useEntries = async () => {
  const { data: categories } = await sanityFetch({ query: GetCategories, tag: TAG.category });
  const { data: products } = await sanityFetch({ query: GetProducts, tag: TAG.product });
  const { data: testimonials } = await sanityFetch({ query: GetTestimonials, tag: TAG.testimonial });
  const { data: posts } = await sanityFetch({ query: GetPosts, tag: TAG.post });

  return { categories, products, testimonials, posts };
};

export type Entries = {
  categories: GetCategoriesResult;
  products: GetProductsResult;
  testimonials: GetTestimonialsResult;
  posts: GetPostsResult;
};
