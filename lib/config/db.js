import mongoose from "mongoose";

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://hamzaaftab992:hamzakhan@cluster0.5ha4x.mongodb.net/blog';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default connectDB;
