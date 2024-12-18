import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'tourDetails', title: 'Tour Details' },
    { name: 'destinationDetails', title: 'Destination Details' },
  ],
  fields: [
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Tour', value: 'tour' },
          { title: 'Transport', value: 'transport' },
          { title: 'Destination', value: 'destination' },
          { title: 'Ticket', value: 'ticket' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      description: 'Specify the type of product, such as a tour, transport, destination, or ticket.',
    }),

    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      description: 'Enter the name of the product.',
      validation: (Rule) => Rule.required().error('Product name is required'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required().error('Slug is required to generate a URL'),
      description: "A URL-friendly version of the product name, used to generate the product's link.",
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
      description: 'Select at least one category that best fits this product.',
      validation: (Rule) => Rule.required().min(1).error('At least one category is required'),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'tourDetails',
      validation: (Rule) => Rule.min(0).error('Price must be a positive number'),
      hidden: ({ parent }) => parent?.productType !== 'tour',
      description: 'The price of the product, applicable only for tours.',
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
            { name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { key: 'key', value: 'value' },
            prepare({ key, value }) {
              return { title: `${key}: ${value}` };
            },
          },
        },
      ],
      group: 'tourDetails',
      description: 'Define custom pricing options with a key-value pair.',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'departureDateRanges',
      description: 'Specify the range of departure dates for the tour.',
      title: 'Departure Date Ranges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'datetime',
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'datetime',
            },
          ],
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'duration',
      description: 'Enter the duration of the tour in hours or days.',
      title: 'Duration (Hours or Days)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Provide a description of the product.',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload an image for the product.',
    }),

    defineField({
      name: 'helpIcon',
      title: 'Help Icon',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Upload an icon for the destination product, visible only for destination products.',
    }),

    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      hidden: ({ parent }) => parent?.productType !== 'tour',
      description: 'Enter the URL where customers can book the tour.',
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
            { name: 'key', title: 'Key', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { key: 'key', value: 'value' },
            prepare({ key, value }) {
              return { title: `${key}: ${value}` };
            },
          },
        },
      ],
      description: 'Define key features for the product using key-value pairs.',
    }),

    defineField({
      name: 'areaName',
      title: 'Area Name',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Enter the name of the area related to the destination product.',
    }),

    defineField({
      name: 'landArea',
      title: 'Land Area',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Provide the size of the land area of the destination.',
    }),

    defineField({
      name: 'travelDuration',
      title: 'Travel Duration',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Specify the duration of the typical travel to this destination.',
    }),

    defineField({
      name: 'averageClimate',
      title: 'Average Climate',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Describe the average climate conditions of the destination.',
    }),

    defineField({
      name: 'peakSeason',
      title: 'Peak Season',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Specify the peak season of the destination, when it is most popular.',
    }),

    defineField({
      name: 'midSeason',
      title: 'Mid Season',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Provide the mid season timeframe for the destination.',
    }),

    defineField({
      name: 'monsoonSeason',
      title: 'Monsoon Season',
      type: 'string',
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Describe the monsoon season at the destination, if applicable.',
    }),

    defineField({
      name: 'travelGuide',
      title: 'Travel Guide',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'destinationDetails',
      hidden: ({ parent }) => parent?.productType !== 'destination',
      description: 'Provide a travel guide in text form for the destination.',
    }),

    defineField({
      name: 'tourSummary',
      title: 'Tour Summary',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tourSummaryItem',
          title: 'Tour Summary Item',
          fields: [
            {
              name: 'isActive',
              title: 'Is Active',
              type: 'boolean',
              options: {
                withLabel: true,
              },
              initialValue: true,
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'title', image: 'image' },
            prepare({ title, image }) {
              return { title: title || 'Tour Summary Item', media: image };
            },
          },
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
      description: 'Provide a summary of the tour with title, description, and an image.',
    }),

    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      description:
        'Provide a general overview of the tour. This can include text and images (excluding SVG) to give potential customers a preview of what to expect.',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'itineraryItem',
          title: 'Itinerary Item',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image' }],
              options: { layout: 'grid' },
            },
          ],
          preview: {
            select: { title: 'title', image: 'images.0' },
            prepare({ title, image }) {
              return {
                title: title || 'Itinerary Item',
                media: image,
              };
            },
          },
        },
      ],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
      description:
        'Provide the detailed itinerary for the tour, including titles, descriptions, and images for each item. This helps to structure the day-by-day breakdown of the tour.',
    }),

    defineField({
      name: 'transportation',
      title: 'Transportation',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
      description: 'Specify the transportation options available for the tour, such as bus, plane, or private vehicle.',
    }),

    defineField({
      name: 'accommodation',
      title: 'Accommodation',
      description:
        'Add images and descriptions of the accommodation provided during the tour. Supported image formats (excluding SVG).',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'reviews',
      title: 'Reviews',
      description:
        'Add reviews from past customers or testimonials for the tour. This helps potential customers understand the experiences of others.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }, { type: 'post' }] }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),

    defineField({
      name: 'thingsToNote',
      title: 'Things to Note',
      type: 'array',
      description:
        'Provide additional important information or notes related to the tour, such as special requirements or suggestions. Add images in supported formats (excluding SVG).',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'tourDetails',
      hidden: ({ parent }) => parent?.productType !== 'tour',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      productType: 'productType',
      image: 'image',
    },
    prepare({ title, productType, image }) {
      return {
        title: `${title} - ${productType}`,
        media: image || EarthGlobeIcon,
      };
    },
  },
});
