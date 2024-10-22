import { defineField, defineType } from 'sanity';

export const purchaseHistoryType = defineType({
  name: 'purchaseHistory',
  title: 'Purchase History',
  type: 'document',
  fields: [
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }],
      validation: (Rule) => Rule.required().error('Customer reference is required'),
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required().error('Product reference is required'),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: (Rule) => Rule.min(1).error('Quantity must be at least 1'),
    }),
    defineField({
      name: 'totalSpent',
      title: 'Total Spent',
      type: 'number',
      description: 'Total amount spent on this product',
      validation: (Rule) => Rule.min(0).error('Total spent must be a positive number'),
    }),
    defineField({
      name: 'purchaseDate',
      title: 'Purchase Date',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('Purchase date is required'),
    }),
  ],
  preview: {
    select: {
      customer: 'customer.fullName',
      product: 'product.name',
      quantity: 'quantity',
      totalSpent: 'totalSpent',
    },
    prepare({ customer, product, quantity, totalSpent }) {
      return {
        title: `${product} (${quantity}x)`,
        subtitle: `Customer: ${customer}, Total Spent: $${totalSpent}`,
      };
    },
  },
});
