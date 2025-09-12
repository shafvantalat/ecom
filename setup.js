const fs = require('fs');
const path = require('path');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
  } else {
    const envContent = `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
WHATSAPP_PHONE=+919746078283
JWT_SECRET=your-jwt-secret-here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with default values');
  }
} else {
  console.log('ℹ️  .env file already exists');
}

console.log('\n🚀 Setup completed! Next steps:');
console.log('1. Update .env file with your MongoDB URI and WhatsApp phone number');
console.log('2. Run: npm run install-all');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');


