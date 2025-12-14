# MERN Stack Setup Guide

## Step-by-Step Installation & Deployment

### Phase 1: Development Setup

#### 1. Clone/Navigate to Project
```bash
cd MERN-ecommerce
```

#### 2. Backend Setup

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Create .env file with your configurations
# Add:
# - MongoDB connection string
# - JWT secret
# - Stripe API keys
# - Port number

# Start development server
npm run dev
```

#### 3. Frontend Setup (New Terminal)

```bash
# Navigate to client
cd client

# Install dependencies
npm install

# Create .env file if needed
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start React development server
npm start
```

### Phase 2: API Integration

All API calls are configured in `client/src/utils/api.js` and automatically include JWT tokens.

Key store files: `client/src/store/index.js`
- `useAuthStore` - Authentication state
- `useCartStore` - Shopping cart state
- `useProductStore` - Product listing state

### Phase 3: Database Seeding (Optional)

Create a seed script to populate initial products:

```javascript
// server/scripts/seed.js
const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const products = [
  {
    name: 'Premium T-Shirt',
    description: 'High-quality cotton t-shirt',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: 'Men',
    image: 'url-to-image',
    stock: 50
  },
  // Add more products...
];

Product.insertMany(products).then(() => {
  console.log('Products seeded successfully');
  process.exit(0);
});
```

### Phase 4: Stripe Payment Integration

1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add to `.env`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
3. Integrate in checkout component

### Phase 5: Production Deployment

#### Deploy Backend (Heroku Example)

```bash
cd server
heroku login
heroku create your-app-name
git push heroku main
```

#### Deploy Frontend (Vercel Example)

```bash
cd client
npm run build
vercel --prod
```

#### Update Environment Variables
- Update API URL in production
- Update CORS settings for production domain
- Use production MongoDB connection

### Phase 6: Essential Admin Tasks

1. **Create Admin Account**
   - Register as normal user
   - Update role to 'admin' in MongoDB

2. **Add Products**
   ```bash
   POST /api/products
   {
     "name": "Product Name",
     "description": "...",
     "price": 99.99,
     "category": "Men",
     "stock": 100,
     "image": "url"
   }
   ```

3. **Manage Orders**
   - View in admin dashboard
   - Update status
   - Process refunds

## 🔧 Performance Optimization

### Frontend
- Enable image lazy loading
- Code splitting for routes
- Minification in production build

### Backend
- Add database indexes
- Implement caching
- Use pagination for large datasets

## 📱 Mobile Optimization

The site is mobile-first optimized using Tailwind CSS breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## 🚨 Troubleshooting

### Issue: CORS errors
**Solution:** Check backend CORS configuration matches frontend URL

### Issue: MongoDB connection fails
**Solution:** Verify MongoDB service is running and connection string is correct

### Issue: Styling not loading
**Solution:** Rebuild Tailwind CSS and clear browser cache

### Issue: Authentication not working
**Solution:** Verify JWT secret is same in .env and check token storage in localStorage

## 📊 Monitoring & Maintenance

1. Monitor MongoDB performance
2. Check error logs regularly
3. Update dependencies periodically
4. Backup database regularly
5. Monitor API response times

## Next Steps

1. ✅ Setup complete
2. 📝 Customize content and branding
3. 🛍️ Add your products
4. 💳 Integrate payment processing
5. 📧 Setup email notifications
6. 📱 Test on mobile devices
7. 🚀 Deploy to production

---

**Happy building! Your MERN e-commerce store is ready! 🎉**
