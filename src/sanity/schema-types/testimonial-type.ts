import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the person giving the testimonial.',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'The URL-friendly version of the name, used for reference.',
    }),

    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      description: 'The main testimonial content provided by the person.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'A photo of the person giving the testimonial.',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5 provided by the person (optional).',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: 'dateTime',
      title: 'Date Time',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'The date and time when the testimonial was given.',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),

    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Select the product this testimonial is related to.',
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required().error('Product reference is required'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      product: 'product.name',
      rating: 'rating',
      media: 'image',
    },
    prepare({ title, product, rating, media }) {
      return {
        title,
        subtitle: `Product: ${product || 'No product selected'} | Rating: ${rating || 'No rating'}`,
        media,
      };
    },
  },
});
