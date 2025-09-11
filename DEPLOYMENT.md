# Deployment Guide

This guide will help you deploy your WhatsApp E-Commerce app to production.

## Prerequisites

- MongoDB Atlas account
- Vercel account (for frontend)
- Render account (for backend)
- GitHub repository

## Step 1: Database Setup

1. Create a MongoDB Atlas cluster
2. Create a database named `ecommerce`
3. Get your connection string
4. Update the `MONGODB_URI` in your environment variables

## Step 2: Backend Deployment (Render)

1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Create a new Web Service
4. Set the following environment variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   WHATSAPP_PHONE=your-whatsapp-phone-number
   JWT_SECRET=your-jwt-secret
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
5. Deploy

## Step 3: Frontend Deployment (Vercel)

1. Connect your GitHub repo to Vercel
2. Set the following environment variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
3. Deploy

## Step 4: Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
WHATSAPP_PHONE=+1234567890
JWT_SECRET=your-jwt-secret-here
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Step 5: Post-Deployment

1. Seed your production database:
   ```bash
   cd backend
   npm run seed
   ```

2. Test all functionality:
   - Browse products
   - Test filters and search
   - Test WhatsApp integration
   - Test admin dashboard

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in backend
2. **Database Connection**: Verify MongoDB URI and network access
3. **WhatsApp Integration**: Ensure phone number includes country code
4. **Image Loading**: Check if image URLs are accessible

### Performance Optimization

1. Enable MongoDB Atlas indexes
2. Optimize images (use WebP format)
3. Enable CDN for static assets
4. Implement caching strategies

## Monitoring

- Use Render's built-in monitoring
- Set up MongoDB Atlas monitoring
- Monitor API response times
- Track user interactions

## Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable MongoDB authentication
- [ ] Set up proper CORS policies
- [ ] Use HTTPS everywhere
- [ ] Validate all inputs
- [ ] Rate limit API endpoints


