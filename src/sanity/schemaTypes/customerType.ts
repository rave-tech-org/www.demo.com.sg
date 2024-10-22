import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const customerType = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Full name is required'),
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required().error('Email is required'),
    }),

    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required().error('Phone number is required'),
    }),

    defineField({
      name: 'dob',
      title: 'Date of Birth',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required().error('Date of birth is required'),
    }),

    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      options: {
        list: [
          { title: 'American', value: 'american' },
          { title: 'British', value: 'british' },
          { title: 'Canadian', value: 'canadian' },
          { title: 'Chinese', value: 'chinese' },
          { title: 'French', value: 'french' },
          { title: 'German', value: 'german' },
          { title: 'Indian', value: 'indian' },
          { title: 'Japanese', value: 'japanese' },
          { title: 'Korean', value: 'korean' },
          { title: 'Malaysian', value: 'malaysian' },
          { title: 'Singaporean', value: 'singaporean' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required().error('Nationality is required'),
    }),

    defineField({
      name: 'passportNumber',
      title: 'Passport Number',
      type: 'string',
    }),

    defineField({
      name: 'passportExpiry',
      title: 'Passport Expiry Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),

    defineField({
      name: 'visaInfo',
      title: 'Visa Information',
      type: 'text',
      description: 'Any relevant visa details (optional)',
    }),

    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'zipCode', title: 'Zip Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    }),

    defineField({
      name: 'emergencyContact',
      title: 'Emergency Contact',
      type: 'object',
      fields: [
        { name: 'name', title: 'Contact Name', type: 'string' },
        { name: 'relation', title: 'Relation', type: 'string' },
        { name: 'phone', title: 'Contact Phone Number', type: 'string' },
      ],
    }),

    defineField({
      name: 'travelHistory',
      title: 'Travel History',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'A list of previous bookings or travels by this customer',
    }),
    defineField({
      name: 'pointsBalance',
      title: 'Points Balance',
      type: 'number',
      description: 'Total points available for this customer',
      validation: (Rule) => Rule.min(0).error('Points balance cannot be negative'),
    }),
    defineField({
      name: 'purchaseHistory',
      title: 'Purchase History',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'purchaseHistory' }] }],
      readOnly: true,
      description: 'The purchase history of the customer (readonly)',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      points: 'pointsBalance',
    },
    prepare({ title, subtitle, points }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} | Points: ${points || 0}` : 'No email provided',
      };
    },
  },
});
