import mongoose from 'mongoose';

const connectToDatabase = async () => {
  // Check if the database is already connected to prevent unnecessary reconnections during hot reloading in development
  if (mongoose.connections[0].readyState) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    // Connect to MongoDB using the URI from environment variables
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected:', db.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to the database');
  }
};

export default connectToDatabase;
