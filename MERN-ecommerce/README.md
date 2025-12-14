# Fashion Brand - MERN Stack E-Commerce Application

A fully responsive, modern e-commerce platform built with MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

### Frontend (React)
- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- ✅ Product catalog with filtering and sorting
- ✅ Product details page
- ✅ Shopping cart functionality
- ✅ User authentication (Login/Signup)
- ✅ User profile management
- ✅ Search functionality
- ✅ Wishlist management
- ✅ Newsletter subscription
- ✅ Blog and contact pages
- ✅ Tailwind CSS styling
- ✅ Real-time notifications

### Backend (Express & Node.js)
- ✅ RESTful API endpoints
- ✅ MongoDB database integration
- ✅ User authentication with JWT
- ✅ Product management
- ✅ Order management
- ✅ Cart management
- ✅ Payment integration (Stripe ready)
- ✅ Admin controls
- ✅ Error handling middleware
- ✅ Input validation

### Database (MongoDB)
- ✅ User schema with authentication
- ✅ Product schema with reviews
- ✅ Order schema with tracking
- ✅ Cart schema
- ✅ Indexes for optimization

## 📁 Project Structure

```
MERN-ecommerce/
├── server/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   ├── middleware/       # Authentication & validation
│   ├── package.json
│   ├── server.js        # Entry point
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── components/   # Reusable React components
    │   ├── pages/       # Page components
    │   ├── store/       # Zustand store
    │   ├── styles/      # CSS files
    │   ├── utils/       # Helper functions & API
    │   ├── hooks/       # Custom React hooks
    │   ├── App.js       # Main app component
    │   └── index.js     # React entry point
    ├── public/          # Static files
    ├── package.json
    └── tailwind.config.js
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

#### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your MongoDB and other settings in .env
# MONGODB_URI=mongodb://localhost:27017/fashion-brand
# JWT_SECRET=your_secret_key
# PORT=5000

# Start server
npm run dev
```

#### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start React app
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/webhook` - Payment webhook

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and above
- **Tablet**: 768px and above
- **Desktop**: 1024px and above

Built with Tailwind CSS mobile-first approach.

## 🛠️ Tech Stack

### Frontend
- React 18+
- React Router v6
- Axios
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)
- React Icons
- Stripe Integration

### Backend
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs (Password hashing)
- Stripe API
- CORS
- Multer (File upload)

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashion-brand
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 🎨 Customization

### Change Brand Name
1. Update in `client/src/components/Navbar.js`
2. Update in `client/src/components/Footer.js`
3. Update page titles in `client/src/pages/`

### Customize Colors
Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
    }
  }
}
```

### Add Products
Use the `/api/products` POST endpoint or create an admin panel.

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Admin role verification
- CORS enabled
- Input validation and sanitization

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy build folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy to your hosting service
```

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running locally or update MONGODB_URI
- Check if connection string is correct in .env

### CORS Error
- Ensure `CLIENT_URL` is correct in backend .env
- Check CORS middleware configuration

### Port Already in Use
- Change PORT in .env to a different port
- Or kill the process using the port

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Stripe Documentation](https://stripe.com/docs)

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💼 Support

For issues and questions, please contact: support@fashionbrand.com

---

**Ready to launch your fashion e-commerce store? Start building! 🚀**
