require('dotenv').config();
const mongoose = require('mongoose');
const { seedDatabase } = require('../utils/seedData');

const MONGODB_URI = 'mongodb+srv://shafvan2:talat@ecom.houahwt.mongodb.net/?retryWrites=true&w=majority&appName=ecom';

const runSeed = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database directly
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Seed the database
    await seedDatabase();
    
    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();


