import { defineField, defineType } from 'sanity';

const RentalRequestSchema = defineType({
  name: 'rentalRequest',
  type: 'document',
  fields: [
    defineField({
      name: 'equipmentId',
      type: 'reference',
      to: [{ type: 'equipment' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'startDate',
      type: 'datetime',
      title: 'Start Date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      title: 'End Date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerName',
      type: 'string',
      title: 'Customer Name',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerEmail',
      type: 'string',
      title: 'Customer Email',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerPhone',
      type: 'string',
      title: 'Customer Phone',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Denied', value: 'denied' }
        ]
      },
      initialValue: 'pending'
    })
  ],
  options: {
    timestamps: true
  }
});

export default RentalRequestSchema;