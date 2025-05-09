'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Best Equipment Rental Management
          </h1>
          <p className="text-gray-600 mb-8">
            Professional equipment rental services for your business needs
          </p>
          <div className="flex gap-4">
            <Link 
              href="/equipment"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              View Equipment
            </Link>
            <Link 
              href="/about"
              className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="relative h-[500px] rounded-2xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="/hero-image.jpg"
            alt="Equipment rental"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}