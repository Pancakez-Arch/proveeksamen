import  from '';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface Cached {
  conn: typeof  | null;
  promise: Promise<typeof > | null;
}

let cached: Cached = (global as any).;

if (!cached) {
  cached = (global as any). = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('Connecting to MongoDB...');
    cached.promise = .connect(MONGODB_URI, opts)
      .then(() => {
        console.log('Successfully connected to MongoDB');
        return ;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    throw e;
  }

  return cached.conn;
} 