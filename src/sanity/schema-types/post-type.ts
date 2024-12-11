import { StringIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  icon: StringIcon,
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
      description: 'Enter the title of the post. This will be displayed as the main heading for the post.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required().error('Slug is required to generate a URL'),
      description:
        'This is the URL-friendly version of the post title. It is automatically generated from the title, but you can modify it.',
    }),

    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error('Published date is required'),
      description: 'Set the date and time when the post was or will be published. This will be shown on the post.',
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description:
        'A short summary of the post that will be shown in previews or search results. Keep it under 200 characters.',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload an image to represent the post. This image will be featured on the post page and previews.',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required().error('Content is required'),
      description:
        'Add the full content of the post here. You can use various text formatting options and embed images, links, etc.',
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
      description: 'Add tags related to the post. Tags help categorize and improve the discoverability of the post.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      publishedDate: 'publishedDate',
    },
    prepare({ title, media, publishedDate }) {
      const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date';
      return {
        title,
        subtitle: `${formattedDate}`,
        media,
      };
    },
  },
});
