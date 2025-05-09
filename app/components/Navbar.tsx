'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-black' : 'text-gray-600 hover:text-black'
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            Equipment Rental
          </Link>
          
          <div className="flex gap-6">
            <Link href="/" className={isActive('/')}>
              Home
            </Link>
            <Link href="/employees" className={isActive('/employees')}>
              Our Team
            </Link>
            <Link href="/equipment" className={isActive('/equipment')}>
              Equipment
            </Link>
            <Link href="/admin" className={isActive('/admin')}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}