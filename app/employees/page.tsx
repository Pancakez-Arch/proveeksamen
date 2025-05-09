'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getEmployees } from '@/lib/sanity.queries';

interface Employee {
  _id: string;
  name: string;
  position: string;
  image: {
    asset: {
      url: string;
    };
  };
  bio: string;
  email: string;
  phone: string;
  expertise: string[];
}

export default function EmployeesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Fetch employees when component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === employees.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? employees.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Vårt Team
        </h1>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {employees.map((employee) => (
                <div 
                  key={employee._id}
                  className="w-full flex-shrink-0 cursor-pointer"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="relative h-[400px]">
                    <Image
                      src={employee.image.asset.url}
                      alt={employee.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
                      <p className="text-gray-200">{employee.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Employee Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-1/3 h-64">
                  <Image
                    src={selectedEmployee.image.asset.url}
                    alt={selectedEmployee.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedEmployee.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {selectedEmployee.position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedEmployee.bio}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">E-post:</span> {selectedEmployee.email}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Telefon:</span> {selectedEmployee.phone}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Ekspertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}