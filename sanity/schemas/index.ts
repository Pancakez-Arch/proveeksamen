import { type SchemaTypeDefinition } from 'sanity'
import equipment from './equipment'
import employee from './employee'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [equipment, employee],
} 