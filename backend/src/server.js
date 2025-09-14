const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5002;

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shafvan2:talat@ecom.houahwt.mongodb.net/?retryWrites=true&w=majority&appName=ecom");
    console.log('✅ MongoDB Connected: ecom.houahwt.mongodb.net');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});

