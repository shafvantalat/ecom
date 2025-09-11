@echo off
set MONGODB_URI=mongodb+srv://shafvan:talat@ecom.houahwt.mongodb.net/?retryWrites=true&w=majority&appName=ecom
set WHATSAPP_PHONE=+1234567890
set JWT_SECRET=your-jwt-secret-here
set PORT=5002
set NODE_ENV=development
set FRONTEND_URL=http://localhost:3001

cd backend
node src/server.js

