import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  icon: DocumentIcon,
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'detail', title: 'Detail' },
    { name: 'block', title: 'Block' },
    { name: 'seo', title: 'SEO' },
    { name: 'variants', title: 'Variants', hidden: ({ document }) => document?.pageType !== 'multiple' },
  ],
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'detail',
      options: {
        list: [
          { title: 'Single', value: 'single' },
          { title: 'Multiple', value: 'multiple' },
        ],
        layout: 'radio',
      },
      readOnly: true,
      initialValue: 'single',
      description: 'Choose whether this page is a single page or multiple pages layout.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      group: 'detail',
      type: 'string',
      description: 'Enter the title of the page. This will be displayed as the main heading on the page.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      group: 'detail',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'This is the URL-friendly version of the title, used in the web address (e.g., /page-title).',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      group: 'detail',
      type: 'image',
      options: { hotspot: true },
      description:
        'Logo header and footer images should be in SVG format for proper display. Other image formats may not display correctly.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      group: 'detail',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'Enter a description for the page content. This can also be used for footer descriptions, such as "Ⓒ2024. XXX PTE. LTD. ALL RIGHTS RESERVED.".',
    }),
    defineField({
      name: 'layout',
      title: 'Page Layout',
      group: 'block',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'contentBlock' }],
        },
      ],
      description: 'Select the content blocks that define the layout of the page.',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('SEO titles are better when they’re under 60 characters.'),
      description: 'Enter the meta title for SEO purposes. This will be shown in search engine results.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      validation: (Rule) => Rule.max(160).warning('SEO descriptions are better when they’re under 160 characters.'),
      description:
        'Enter a brief meta description for SEO. This will be shown in search engine results under the title.',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
      description: 'Enter keywords related to this page for SEO purposes.',
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      group: 'variants',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      hidden: ({ document }) => document?.pageType !== 'multiple',
      description:
        'Select variants for the page if the page type is set to "multiple". These could be different categories or types of content.',
    }),
  ],
});
