# Mobile-First WhatsApp E-Commerce Website

A fully responsive mobile-first e-commerce website with WhatsApp integration for orders.

## Features

- 📱 Mobile-first responsive design
- 🛍️ Product catalog with filtering and sorting
- 💬 WhatsApp integration for orders
- 👨‍💼 Admin dashboard for product management
- 🎨 Modern UI with TailwindCSS

## Tech Stack

- **Frontend**: React + TailwindCSS + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend) + Render (Backend)

## Quick Start

1. Clone and setup:
```bash
git clone <your-repo-url>
cd ecommerce-whatsapp-app
node setup.js
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:
```bash
# Edit .env file with your MongoDB URI and WhatsApp phone number
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
# WHATSAPP_PHONE=+1234567890
```

4. Seed the database with sample data:
```bash
cd backend
npm run seed
cd ..
```

5. Start development servers:
```bash
npm run dev
```

This will start both frontend (port 3000) and backend (port 5000) servers.

## Project Structure

```
ecommerce-whatsapp-app/
├── frontend/          # React frontend
├── backend/           # Node.js backend
├── .env              # Environment variables
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
WHATSAPP_PHONE=+1234567890
JWT_SECRET=your-jwt-secret
PORT=5000
```

## API Endpoints

- `GET /api/products` - List all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
