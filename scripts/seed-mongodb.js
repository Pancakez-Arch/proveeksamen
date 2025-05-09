const { MongoClient } = require('mongodb');
require('dotenv').config();

async function seedMongoDB() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // Sample equipment data
    const equipment = [
      {
        name: 'Excavator CAT 320',
        description: 'Medium-sized excavator perfect for construction projects',
        category: 'Heavy Equipment',
        price: 2500,
        image: '/images/equipment/excavator.jpg',
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bulldozer Komatsu D65',
        description: 'Powerful bulldozer for large earthmoving projects',
        category: 'Heavy Equipment',
        price: 3000,
        image: '/images/equipment/bulldozer.jpg',
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Crane Liebherr LTM 1100',
        description: 'Mobile crane with 100-ton capacity',
        category: 'Lifting Equipment',
        price: 5000,
        image: '/images/equipment/crane.jpg',
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample admin user
    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$10$YourHashedPasswordHere', // You'll need to hash this properly
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert data
    await db.collection('equipment').insertMany(equipment);
    await db.collection('users').insertOne(adminUser);

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
  } finally {
    await client.close();
  }
}

seedMongoDB(); 