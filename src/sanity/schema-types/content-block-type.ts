import { defineField, defineType } from 'sanity';

export const contentBlockType = defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'document',
  groups: [
    { name: 'detail', title: 'Detail' },
    { name: 'list', title: 'List' },
  ],
  fields: [
    defineField({
      name: 'blockType',
      title: 'Block Type',
      group: 'detail',
      type: 'string',
      options: {
        list: [
          { title: 'Basic Block', value: 'basic' },
          { title: 'List Block', value: 'list' },
          { title: 'Category List', value: 'categoryBlock' },
          { title: 'Post List', value: 'post' },
          { title: 'Testimonial List', value: 'testimonial' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'basic',
      validation: (Rule) => Rule.required(),
      description: 'Select the type of block. This will determine the structure and content options for the block.',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      group: 'detail',
      type: 'string',
      description: 'Provide a title for the content block. This title will be displayed at the top of the block.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      group: 'detail',
      type: 'slug',
      validation: (Rule) => Rule.required().error('Slug is required'),
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'This is the URL slug for the content block, which will be used for component rendering.',
    }),

    defineField({
      name: 'customAttributes',
      title: 'Custom Attributes',
      group: 'detail',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'attribute',
          title: 'Attribute',
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Enter the key for the custom attribute (e.g., "btn-text", "btn-href").',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Enter the value for the custom attribute (e.g., "/", "To Homepage").',
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
      description: 'Add any custom attributes for the content block, such as for styling or JavaScript.',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      group: 'detail',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'Enter a description for the content block. This can include details about the content and its purpose.',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      group: 'detail',
      type: 'image',
      options: { hotspot: true },
      description:
        'Upload an image to be displayed with the content block. This image will be featured within the block.',
    }),

    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: 'application/pdf,video/*,image/*',
      },
      description: 'Upload a file associated with the content block. This could be a PDF, video, or image file.',
    }),

    defineField({
      name: 'listItems',
      title: 'List of Items',
      group: 'list',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Provide a title for each item in the list.',
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
              description: 'This is the URL slug for the list item.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Provide a detailed description for the list item.',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Upload an image to be associated with this list item.',
            }),
          ],
        },
      ],
      hidden: ({ parent }) => parent.blockType !== 'list',
      description:
        'This field is for adding items to a list block. It can include titles, slugs, descriptions, and images for each item.',
    }),

    defineField({
      name: 'categoryBlock',
      title: 'Category List',
      group: 'list',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      hidden: ({ parent }) => parent.blockType !== 'categoryBlock',
      description:
        'Select categories to associate with this content block. These categories will be used to group related content.',
    }),
  ],
});
