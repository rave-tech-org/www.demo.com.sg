import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Category name is required'),
      description: 'Enter the name of the category. This will be used to identify and display the category.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required().error('Slug is required'),
      description:
        'The slug will be used to create a URL-friendly version of the category name. It is automatically generated based on the category name, but can be customized.',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'Provide a short description of the category. This can help users understand what the category is about.',
    }),

    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description:
        'Select the parent category if this category is a subcategory. This helps to create a hierarchical structure of categories.',
    }),

    defineField({
      name: 'customAttributes',
      title: 'Custom Attributes',
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
              description: 'Enter the key for the custom attribute, such as "color" or "size".',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Enter the value for the custom attribute, such as "red" or "#000000".',
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
      description:
        'Add any custom attributes for the category. These can be additional details that help define the category.',
    }),
  ],
});
