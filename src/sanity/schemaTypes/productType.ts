import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Product name is required'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required().error('Slug is required to generate a URL'),
    }),

    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tour', value: 'tour' },
          { title: 'Transport', value: 'transport' },
          { title: 'Ticket', value: 'ticket' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('At least one category is required'),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.min(0).error('Price must be a positive number'),
    }),

    defineField({
      name: 'customPrices',
      title: 'Custom Prices',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'price',
          title: 'Price',
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              key: 'key',
              value: 'value',
            },
            prepare({ key, value }) {
              return {
                title: `${key}: ${value}`,
              };
            },
          },
        },
      ],
    }),

    defineField({
      name: 'availableDate',
      title: 'Available Date',
      type: 'datetime',
    }),

    defineField({
      name: 'duration',
      title: 'Duration (Hours or Days)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
    }),

    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          title: 'Feature',
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              key: 'key',
              value: 'value',
            },
            prepare({ key, value }) {
              return {
                title: `${key}: ${value}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      productType: 'productType',
      price: 'price',
      image: 'image',
    },
    prepare({ title, productType, price, image }) {
      return {
        title: `${title} - ${productType}`,
        subtitle: `Price: $${price}`,
        media: image || EarthGlobeIcon,
      };
    },
  },
});
