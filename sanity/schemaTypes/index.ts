import { type SchemaTypeDefinition } from 'sanity'
import employee from './employee'
import equipment from './equipment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [employee, equipment],
}
