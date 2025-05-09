'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface Equipment {
  category: string
  id: string
  name: string
  description: string
  imageUrl: string
}

interface EquipmentGridProps {
  equipment: Equipment[]
}

export default function EquipmentGrid({ equipment }: EquipmentGridProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = ['all', ...new Set(equipment?.map(item => item?.category).filter(Boolean) || [])];
  const [rentingItem, setRentingItem] = useState<string | null>(null);

  const filteredEquipment = selectedCategory === 'all'
    ? equipment
    : equipment?.filter(item => item?.category === selectedCategory) || [];

  const handleRent = (itemId: string) => {
    router.push(`/rent/${itemId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {equipment.map((item) => (
          <div
            key={item.id || item.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-48 w-full">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">No image available</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <button
                onClick={() => handleRent(item.id)}
                disabled={rentingItem === item.id}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rentingItem === item.id ? 'Processing...' : 'Rent Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}