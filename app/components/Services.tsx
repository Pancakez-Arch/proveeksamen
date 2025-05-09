'use client'

import { motion } from 'framer-motion'

export default function Services() {
  const services = [
    {
      title: 'Laptops',
      description: 'High-performance laptops for business and gaming',
      icon: '💻'
    },
    {
      title: 'Displays',
      description: '4K and curved monitors for professional use',
      icon: '🖥️'
    },
    {
      title: 'Tablets',
      description: 'Latest iOS and Android tablets',
      icon: '📱'
    },
    {
      title: 'Accessories',
      description: 'Professional grade peripherals and accessories',
      icon: '🎧'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}