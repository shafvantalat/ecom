const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5002;
const MONGODB_URI = 'mongodb+srv://shafvan2:talat@ecom.houahwt.mongodb.net/?retryWrites=true&w=majority&appName=ecom';

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
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

