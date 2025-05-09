'use client'

import { motion } from 'framer-motion'

export default function Approach() {
  const approaches = [
    {
      title: 'Quality Equipment',
      description: 'We provide only the latest and best quality equipment'
    },
    {
      title: 'Fast Service',
      description: 'Quick response and delivery to meet your needs'
    },
    {
      title: 'Expert Support',
      description: '24/7 technical support for all rented equipment'
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approaches.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}