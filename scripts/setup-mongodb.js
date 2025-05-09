const { MongoClient } = require('mongodb');
require('dotenv').config();

async function setupMongoDB() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // Create Users collection
    await db.createCollection('users');
    await db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { role: 1 } }
    ]);

    // Create Equipment collection
    await db.createCollection('equipment');
    await db.collection('equipment').createIndexes([
      { key: { name: 1 } },
      { key: { category: 1 } },
      { key: { availability: 1 } }
    ]);

    // Create RentalRequests collection
    await db.createCollection('rentalRequests');
    await db.collection('rentalRequests').createIndexes([
      { key: { userId: 1 } },
      { key: { equipmentId: 1 } },
      { key: { status: 1 } },
      { key: { startDate: 1 } },
      { key: { endDate: 1 } }
    ]);

    console.log('Collections and indexes created successfully');
  } catch (error) {
    console.error('Error setting up MongoDB:', error);
  } finally {
    await client.close();
  }
}

setupMongoDB(); 