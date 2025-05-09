'use client'

import { motion } from 'framer-motion'

export default function Works() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4">Business Solutions</h3>
            <p className="text-gray-600">Complete equipment solutions for businesses</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4">Event Equipment</h3>
            <p className="text-gray-600">Professional equipment for events and conferences</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}