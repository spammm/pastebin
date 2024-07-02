import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log('Using cached db connection');
    return cachedConnection;
  }

  if (process.env.NODE_ENV === 'development') {
    if (!(global as any)._mongoClientPromise) {
      (global as any)._mongoClientPromise = mongoose
        .connect(process.env.MONGODB_URI!)
        .then((mongoose) => {
          cachedConnection = mongoose.connection;
          return cachedConnection;
        });
    }
    cachedConnection = await (global as any)._mongoClientPromise;
    console.log('Using cached db connection (development)');
    return cachedConnection;
  }

  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    cachedConnection = cnx.connection;
    console.log('New mongodb connection established');
    return cachedConnection;
  } catch (error) {
    console.log('MongoDB connection error:', error);
    throw error;
  }
}
