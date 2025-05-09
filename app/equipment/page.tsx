import EquipmentGrid from '../components/EquipmentGrid'
import { getEquipment } from '@/lib/sanity.queries'

export const revalidate = 3600

export default async function EquipmentPage() {
  const equipment = await getEquipment()
  
  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Equipment</h1>
          <p className="text-gray-600">
            Browse our wide selection of professional equipment available for rent
          </p>
        </div>
        <EquipmentGrid equipment={equipment} />
      </div>
    </main>
  )
}