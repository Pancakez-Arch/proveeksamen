'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Employee {
  _id: string
  name: string
  position: string
  imageUrl: string
  bio: string
}

export default function EmployeeCarousel({ employees }: { employees: Employee[] }) {
  return (
    <div className="max-w-6xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="py-8"
      >
        {employees.map((employee) => (
          <SwiperSlide key={employee._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="relative h-72">
                <Image
                  src={employee.imageUrl}
                  alt={employee.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{employee.name}</h3>
                <p className="text-gray-600 mb-4">{employee.position}</p>
                <p className="text-gray-700 line-clamp-3">{employee.bio}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}