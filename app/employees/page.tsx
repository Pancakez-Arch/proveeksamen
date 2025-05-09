import { getEmployees } from '@/lib/sanity.queries'
import EmployeeCarousel from '@/app/components/EmployeeCarousel'

export const revalidate = 3600

export default async function EmployeesPage() {
  const employees = await getEmployees()

  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-gray-600">
            Meet our dedicated professionals who make equipment rental management seamless and efficient
          </p>
        </div>
        <EmployeeCarousel employees={employees} />
      </div>
    </main>
  )
}