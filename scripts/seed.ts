import { connectToDatabase } from '@/lib/mongodb';
import { Equipment } from '@/models/Equipment';

const equipmentData = [
  {
    name: 'Professional Camera Kit',
    description: 'High-end DSLR camera with multiple lenses and accessories',
    category: 'Photography',
    image: '/images/camera-kit.jpg',
    price: 150,
    available: true,
  },
  {
    name: 'DJI Drone',
    description: '4K aerial photography drone with controller and extra batteries',
    category: 'Photography',
    image: '/images/drone.jpg',
    price: 200,
    available: true,
  },
  {
    name: 'Professional Lighting Kit',
    description: 'Complete studio lighting setup with stands and modifiers',
    category: 'Lighting',
    image: '/images/lighting-kit.jpg',
    price: 100,
    available: true,
  },
  {
    name: 'Audio Recording Kit',
    description: 'Professional microphone and audio interface for high-quality recording',
    category: 'Audio',
    image: '/images/audio-kit.jpg',
    price: 75,
    available: true,
  },
  {
    name: 'Gimbal Stabilizer',
    description: '3-axis motorized gimbal for smooth video recording',
    category: 'Video',
    image: '/images/gimbal.jpg',
    price: 50,
    available: true,
  },
];

async function seed() {
  try {
    await connectToDatabase();
    
    // Clear existing equipment
    await Equipment.deleteMany({});
    
    // Insert new equipment
    await Equipment.insertMany(equipmentData);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 