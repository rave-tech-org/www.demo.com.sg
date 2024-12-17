import pageRegistry from '@/resources/page-registry';
import { type PresentationPluginOptions, defineLocations } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: pageRegistry.get(doc?.slug) ?? '/',
          },
        ],
      }),
    }),

    contentBlock: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/component-list/${doc?.slug}`,
          },
        ],
      }),
    }),

    product: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
        productType: 'productType',
      },
      resolve: (doc) => {
        const productTypePaths: Record<string, string> = {
          tour: `/tour/${doc?.slug}`,
          destination: `/destination/${doc?.slug}`,
        };

        return {
          locations: [
            {
              title: doc?.title || 'Untitled',
              href: productTypePaths[doc?.productType],
            },
          ],
        };
      },
    }),

    testimonial: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => {
        return { locations: [{ title: doc?.title || 'Untitled', href: '/component-list/full-testimonials' }] };
      },
    }),

    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/post/${doc?.slug}`,
          },
        ],
      }),
    }),
  },
};
