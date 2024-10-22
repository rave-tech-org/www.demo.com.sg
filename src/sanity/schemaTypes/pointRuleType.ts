import { defineType, defineField } from 'sanity';

export const pointRuleType = defineType({
  name: 'pointRule',
  title: 'Point Rule',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Rule Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'pointsPerDollar',
      title: 'Points per Dollar',
      type: 'number',
      description: 'The number of points awarded per dollar spent',
      validation: (Rule) => Rule.min(0).error('Points per dollar must be positive'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pointsPerDollar',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Points per dollar: ${subtitle}`,
      };
    },
  },
});
