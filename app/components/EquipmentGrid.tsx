'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface Equipment {
  _id: string
  name: string
  category: string
  description: string
  imageUrl: string
  price: number
  specifications: string[]
  available: boolean
  quantity: number
}

export default function EquipmentGrid({ equipment }: { equipment: Equipment[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const categories = ['all', ...new Set(equipment?.map(item => item?.category).filter(Boolean) || [])];

  const filteredEquipment = selectedCategory === 'all'
    ? equipment
    : equipment?.filter(item => item?.category === selectedCategory) || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category && typeof category === 'string'
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : 'Uncategorized'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredEquipment.map((item, index) => (
          <motion.div
            key={item._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-64">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Currently Unavailable</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{item.price} NOK</p>
                  <p className="text-sm text-gray-500">per day</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-2">{item.description}</p>
              {item.specifications && item.specifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Specifications:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {item.specifications.slice(0, 3).map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.available ? `${item.quantity} Available` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}