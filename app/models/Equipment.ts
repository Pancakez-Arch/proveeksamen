import { defineField, defineType } from 'sanity';

const EquipmentSchema = defineType({
  name: 'equipment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'imageUrl',
      type: 'url',
      title: 'Image URL'
    })
  ],
  options: {
    timestamps: true
  }
});

export default EquipmentSchema;