// Admin Dashboard
'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Upload,
  Settings,
  BarChart3,
  Camera,
  DollarSign,
  Star,
  Filter,
  Download,
  Bell,
  RefreshCw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Zap,
  Heart,
  Award
} from 'lucide-react';

// Enhanced UI Components with Better Contrast
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-xl font-bold text-gray-900 tracking-tight ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-2 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: string }) => {
  const styles = {
    default: 'bg-blue-100 text-blue-900 border border-blue-200',
    success: 'bg-green-100 text-green-900 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-900 border border-yellow-200',
    danger: 'bg-red-100 text-red-900 border border-red-200',
    secondary: 'bg-gray-100 text-gray-900 border border-gray-200'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[variant as keyof typeof styles] || styles.default}`}>
      {children}
    </span>
  );
};

const Button = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <button className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${className}`}>
    {children}
  </button>
);

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  featured: boolean;
  discount: number;
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  status: string;
}

interface Analytics {
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  newCustomers: number;
  conversionRate: number;
  averageOrderValue: number;
  topSellingCategory: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerInfo: {
    name: string;
    email: string;
  };
  total: number;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 156,
    totalOrders: 89,
    totalRevenue: 245000,
    lowStockItems: 12
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      _id: '1',
      orderNumber: 'ORD1001',
      customerInfo: { name: 'Priya Sharma', email: 'priya@example.com' },
      total: 2500,
      status: 'delivered',
      createdAt: '2024-12-20T10:30:00Z'
    },
    {
      _id: '2',
      orderNumber: 'ORD1002',
      customerInfo: { name: 'Rahul Kumar', email: 'rahul@example.com' },
      total: 3500,
      status: 'shipped',
      createdAt: '2024-12-19T14:22:00Z'
    },
    {
      _id: '3',
      orderNumber: 'ORD1003',
      customerInfo: { name: 'Ananya Singh', email: 'ananya@example.com' },
      total: 1800,
      status: 'processing',
      createdAt: '2024-12-18T09:15:00Z'
    }
  ];

  const products = [
    {
      _id: '1',
      name: 'Orange Airsuit',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Fashion Bag',
      stock: 25,
      isActive: true,
      images: ['/api/frontend-img/product-img-1.jpg', '/api/frontend-img/product-img-sm-1.jpg'],
      description: 'Stylish orange airsuit perfect for modern fashion enthusiasts. Made with premium materials.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Orange', 'Red', 'Yellow'],
      rating: 4.5,
      reviews: 23,
      featured: true,
      discount: 25,
      sku: 'ORG-AIR-001'
    },
    {
      _id: '2',
      name: 'Premium Fashion Bag',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Fashion Bag',
      stock: 15,
      isActive: true,
      images: ['/api/frontend-img/product-img-2.jpg', '/api/frontend-img/product-img-sm-2.jpg'],
      description: 'Elegant fashion bag designed for daily use and special occasions.',
      sizes: ['One Size'],
      colors: ['Black', 'Brown', 'Tan'],
      rating: 4.2,
      reviews: 18,
      featured: true,
      discount: 25,
      sku: 'BAG-PREM-002'
    },
    {
      _id: '3',
      name: 'Casual Style Outfit',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Casual Wear',
      stock: 8,
      isActive: true,
      images: ['/api/frontend-img/product-img-3.jpg', '/api/frontend-img/product-img-sm-3.jpg'],
      description: 'Comfortable casual outfit perfect for everyday wear and weekend activities.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Blue', 'White', 'Grey'],
      rating: 4.7,
      reviews: 31,
      featured: false,
      discount: 25,
      sku: 'CAS-STY-003'
    },
    {
      _id: '4',
      name: 'Designer Collection',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Designer Wear',
      stock: 12,
      isActive: true,
      images: ['/api/frontend-img/product-img-4.jpg', '/api/frontend-img/product-img-sm-4.jpg'],
      description: 'Exclusive designer collection featuring contemporary styles and premium quality.',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'White', 'Navy'],
      rating: 4.8,
      reviews: 45,
      featured: true,
      discount: 25,
      sku: 'DES-COL-004'
    },
    {
      _id: '5',
      name: 'Elegant Evening Wear',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Evening Wear',
      stock: 6,
      isActive: true,
      images: ['/api/frontend-img/product-img-5.jpg', '/api/frontend-img/product-img-sm-5.jpg'],
      description: 'Sophisticated evening wear perfect for special occasions and formal events.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Burgundy', 'Navy', 'Black'],
      rating: 4.9,
      reviews: 52,
      featured: true,
      discount: 25,
      sku: 'EVE-ELE-005'
    },
    {
      _id: '6',
      name: 'Modern Fashion Statement',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Modern Wear',
      stock: 20,
      isActive: true,
      images: ['/api/frontend-img/product-img-6.jpg', '/api/frontend-img/product-img-sm-6.jpg'],
      description: 'Bold modern fashion statement piece that showcases contemporary design trends.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Purple', 'Pink', 'Blue'],
      rating: 4.3,
      reviews: 27,
      featured: false,
      discount: 25,
      sku: 'MOD-FAS-006'
    },
    {
      _id: '7',
      name: 'Summer Collection',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Summer Wear',
      stock: 30,
      isActive: true,
      images: ['/api/frontend-img/product-img-sm-7.jpg', '/api/frontend-img/product-img-sm-8.jpg'],
      description: 'Light and breezy summer collection perfect for hot weather and vacation.',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Light Blue', 'White', 'Mint'],
      rating: 4.4,
      reviews: 38,
      featured: false,
      discount: 25,
      sku: 'SUM-COL-007'
    },
    {
      _id: '8',
      name: 'Professional Business Attire',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Business Wear',
      stock: 18,
      isActive: true,
      images: ['/api/frontend-img/product-img-sm-9.jpg', '/api/frontend-img/product-img-sm-10.jpg'],
      description: 'Professional business attire designed for the modern workplace and corporate meetings.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Charcoal', 'Navy', 'Black'],
      rating: 4.6,
      reviews: 41,
      featured: true,
      discount: 25,
      sku: 'BUS-PRO-008'
    },
    {
      _id: '9',
      name: 'Luxury Fashion Ensemble',
      price: 99.00,
      originalPrice: 132.00,
      category: 'Luxury Wear',
      stock: 5,
      isActive: true,
      images: ['/api/frontend-img/product-img-sm-11.jpg', '/api/frontend-img/product-img-sm-12.jpg'],
      description: 'Exclusive luxury fashion ensemble crafted with the finest materials and attention to detail.',
      sizes: ['XS', 'S', 'M'],
      colors: ['Gold', 'Silver', 'Bronze'],
      rating: 5.0,
      reviews: 15,
      featured: true,
      discount: 25,
      sku: 'LUX-ENS-009'
    }
  ];

  const bannerImages = [
    {
      _id: 'banner1',
      name: 'Main Banner Slide 1',
      image: '/api/frontend-img/banner-slide-1.jpg',
      title: 'Summer Collection 2025',
      subtitle: 'Discover the latest trends',
      isActive: true
    },
    {
      _id: 'banner2', 
      name: 'Main Banner Slide 2',
      image: '/api/frontend-img/banner-slide-2.jpg',
      title: 'Fashion Forward',
      subtitle: 'Style that speaks to you',
      isActive: true
    },
    {
      _id: 'banner3',
      name: 'Main Banner Slide 3', 
      image: '/api/frontend-img/banner-slide-3.jpg',
      title: 'Elegant Designs',
      subtitle: 'Premium quality fashion',
      isActive: true
    }
  ];

  const categoryImages = [
    { _id: 'cat1', name: 'Women\'s Fashion', image: '/api/frontend-img/category-1.jpg', isActive: true },
    { _id: 'cat2', name: 'Men\'s Collection', image: '/api/frontend-img/category-2.jpg', isActive: true },
    { _id: 'cat3', name: 'Accessories', image: '/api/frontend-img/category-3.jpg', isActive: true },
    { _id: 'cat4', name: 'Summer Wear', image: '/api/frontend-img/category-4.jpg', isActive: true },
    { _id: 'cat5', name: 'Evening Wear', image: '/api/frontend-img/category-5.jpg', isActive: true },
    { _id: 'cat6', name: 'Casual Wear', image: '/api/frontend-img/category-6.jpg', isActive: true },
    { _id: 'cat7', name: 'Business Attire', image: '/api/frontend-img/category-7.jpg', isActive: true }
  ];

  const galleryImages = [
    { _id: 'gal1', name: 'Gallery Image 1', image: '/api/frontend-img/gallery-item-1.jpg', isActive: true },
    { _id: 'gal2', name: 'Gallery Image 2', image: '/api/frontend-img/gallery-item-2.jpg', isActive: true },
    { _id: 'gal3', name: 'Gallery Image 3', image: '/api/frontend-img/gallery-item-3.jpg', isActive: true },
    { _id: 'gal4', name: 'Gallery Image 4', image: '/api/frontend-img/gallery-item-4.jpg', isActive: true },
    { _id: 'gal5', name: 'Gallery Image 5', image: '/api/frontend-img/gallery-item-5.jpg', isActive: true },
    { _id: 'gal6', name: 'Gallery Image 6', image: '/api/frontend-img/gallery-item-6.jpg', isActive: true }
  ];

  const customers = [
    {
      _id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      totalOrders: 12,
      totalSpent: 45000,
      joinedDate: '2024-01-15',
      status: 'Premium'
    },
    {
      _id: '2',
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      phone: '+91 87654 32109',
      address: 'Delhi, India',
      totalOrders: 8,
      totalSpent: 28000,
      joinedDate: '2024-03-20',
      status: 'Regular'
    }
  ];

  const analytics = {
    dailyRevenue: 12500,
    weeklyRevenue: 87500,
    monthlyRevenue: 245000,
    totalCustomers: 1247,
    newCustomers: 89,
    conversionRate: 3.2,
    averageOrderValue: 2750,
    topSellingCategory: 'Traditional Wear'
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }: any) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-8xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white shadow-lg border-b border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Fashion Brand Admin</h1>
              <p className="text-lg font-medium text-gray-700">Complete e-commerce management dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <TabButton id="dashboard" label="Dashboard" icon={BarChart3} isActive={activeTab === 'dashboard'} onClick={setActiveTab} />
            <TabButton id="products" label="Products" icon={Package} isActive={activeTab === 'products'} onClick={setActiveTab} />
            <TabButton id="images" label="Images" icon={Camera} isActive={activeTab === 'images'} onClick={setActiveTab} />
            <TabButton id="banners" label="Banners" icon={Star} isActive={activeTab === 'banners'} onClick={setActiveTab} />
            <TabButton id="categories" label="Categories" icon={Filter} isActive={activeTab === 'categories'} onClick={setActiveTab} />
            <TabButton id="gallery" label="Gallery" icon={Eye} isActive={activeTab === 'gallery'} onClick={setActiveTab} />
            <TabButton id="orders" label="Orders" icon={ShoppingBag} isActive={activeTab === 'orders'} onClick={setActiveTab} />
            <TabButton id="customers" label="Customers" icon={Users} isActive={activeTab === 'customers'} onClick={setActiveTab} />
            <TabButton id="inventory" label="Inventory" icon={RefreshCw} isActive={activeTab === 'inventory'} onClick={setActiveTab} />
            <TabButton id="analytics" label="Analytics" icon={TrendingUp} isActive={activeTab === 'analytics'} onClick={setActiveTab} />
          </div>
        </div>

        <div className="px-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <>
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                <Card className="transform hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-800">Total Products</CardTitle>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-1">{stats.totalProducts}</div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active products in store</p>
                  </CardContent>
                </Card>

                <Card className="transform hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-800">Total Orders</CardTitle>
                      <div className="p-3 bg-green-100 rounded-full">
                        <ShoppingBag className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-1">{stats.totalOrders}</div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">All time orders</p>
                  </CardContent>
                </Card>

                <Card className="transform hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-800">Total Revenue</CardTitle>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-gray-900 mb-1">₹{stats.totalRevenue.toLocaleString()}</div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total sales revenue</p>
                  </CardContent>
                </Card>

                <Card className="transform hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-gray-800">Low Stock Alert</CardTitle>
                      <div className="p-3 bg-red-100 rounded-full">
                        <Zap className="h-8 w-8 text-red-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-black text-red-600 mb-1">{stats.lowStockItems}</div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Items need restocking</p>
                  </CardContent>
                </Card>
              </div>

        {/* Enhanced Recent Orders */}
        <Card className="mb-10 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-gray-900">Recent Orders</CardTitle>
              <Button className="px-6 py-2">
                <Plus className="h-5 w-5 mr-2" />
                View All Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">Order ID</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {orders.map((order, index) => (
                    <tr key={order._id} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="py-4 px-6 font-bold text-gray-900 text-sm">{order.orderNumber}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800 text-sm">{order.customerInfo.name}</td>
                      <td className="py-4 px-6 font-bold text-gray-900 text-sm">₹{order.total.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <Badge 
                          variant={
                            order.status === 'delivered' ? 'success' : 
                            order.status === 'shipped' ? 'default' : 
                            order.status === 'processing' ? 'warning' : 'secondary'
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
            </>
          )}

          {/* Products Management Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Product Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Upload className="h-5 w-5 mr-2" />
                    Bulk Upload
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Product
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product._id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={`http://localhost:8000/assets/img/${product.images[0].split('/').pop()}`}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = product.images[0];
                        }}
                      />
                      {product.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge variant="warning">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      {product.discount > 0 && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="danger">
                            -{product.discount}% OFF
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 flex space-x-1">
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                          <Camera className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                          <Eye className="h-4 w-4 text-green-600" />
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                        <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-black text-gray-900">${product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-lg font-semibold text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-gray-700">{product.rating} ({product.reviews})</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="text-xs font-bold text-gray-500 uppercase">SKU:</span>
                        <span className="ml-2 text-sm font-semibold text-gray-800">{product.sku}</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div>
                          <span className="text-xs font-bold text-gray-500 uppercase">Sizes:</span>
                          <div className="flex space-x-1 mt-1">
                            {product.sizes.map((size, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-500 uppercase">Colors:</span>
                          <div className="flex space-x-1 mt-1">
                            {product.colors.map((color, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1 text-sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button className="flex-1 text-sm bg-red-600 hover:bg-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Management Tab */}
          {activeTab === 'inventory' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Inventory Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Download className="h-5 w-5 mr-2" />
                    Export Report
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Update Stock
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Product Image</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Product Name</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Category</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Current Stock</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Price</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Status</th>
                          <th className="text-left py-4 px-6 text-sm font-bold text-gray-900 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {products.map((product, index) => (
                          <tr key={product._id} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors`}>
                            <td className="py-4 px-6">
                              <img 
                                src={`http://localhost:8000/assets/img/${product.images[0].split('/').pop()}`} 
                                alt={product.name} 
                                className="w-16 h-16 object-cover rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.src = product.images[0];
                                }}
                              />
                            </td>
                            <td className="py-4 px-6 font-bold text-gray-900">{product.name}</td>
                            <td className="py-4 px-6 font-semibold text-gray-700">{product.category}</td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <input 
                                  type="number" 
                                  value={product.stock} 
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center font-bold"
                                />
                                <span className="text-sm text-gray-500">units</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="space-y-1">
                                <div className="font-bold text-gray-900">${product.price}</div>
                                {product.originalPrice > product.price && (
                                  <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex space-x-2">
                                <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                  <RefreshCw className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Customer Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Download className="h-5 w-5 mr-2" />
                    Export Customers
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Mail className="h-5 w-5 mr-2" />
                    Send Newsletter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {customers.map((customer) => (
                  <Card key={customer._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                          <Badge variant={customer.status === 'Premium' ? 'default' : 'secondary'}>
                            <Award className="h-3 w-3 mr-1" />
                            {customer.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Spent</p>
                          <p className="text-2xl font-black text-green-600">₹{customer.totalSpent.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-700">{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-700">{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-semibold text-gray-700">{customer.address}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Orders</p>
                            <p className="text-lg font-black text-gray-900">{customer.totalOrders}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Member Since</p>
                            <p className="text-sm font-semibold text-gray-700">{new Date(customer.joinedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Advanced Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="text-center">
                    <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700 mb-2">Daily Revenue</h3>
                    <p className="text-2xl font-black text-gray-900">₹{analytics.dailyRevenue.toLocaleString()}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700 mb-2">Conversion Rate</h3>
                    <p className="text-2xl font-black text-gray-900">{analytics.conversionRate}%</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="text-center">
                    <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700 mb-2">New Customers</h3>
                    <p className="text-2xl font-black text-gray-900">{analytics.newCustomers}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="text-center">
                    <ShoppingCart className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-700 mb-2">Avg Order Value</h3>
                    <p className="text-2xl font-black text-gray-900">₹{analytics.averageOrderValue.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Images Management Tab */}
          {activeTab === 'images' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Website Images Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload New Image
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Optimize Images
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.flatMap(product => 
                  product.images.map((image, idx) => (
                    <Card key={`${product._id}-${idx}`} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={`http://localhost:8000/assets/img/${image.split('/').pop()}`}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = image;
                          }}
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white">
                            <Download className="h-4 w-4 text-green-600" />
                          </button>
                          <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Image {idx + 1}</p>
                        <div className="text-xs text-gray-500">
                          <p>Path: {image}</p>
                          <p>Used in: Product Page</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Banner Management Tab */}
          {activeTab === 'banners' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Banner Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Banner
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {bannerImages.map((banner) => (
                  <Card key={banner._id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={`http://localhost:8000/assets/img/${banner.image.split('/').pop()}`}
                        alt={banner.name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = banner.image;
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant={banner.isActive ? 'success' : 'secondary'}>
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white">
                          <Eye className="h-4 w-4 text-green-600" />
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{banner.name}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm font-bold text-gray-700">Title:</label>
                          <input 
                            type="text" 
                            value={banner.title} 
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-bold text-gray-700">Subtitle:</label>
                          <input 
                            type="text" 
                            value={banner.subtitle} 
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button className="flex-1 text-sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                          <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-semibold">
                            {banner.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Category Management Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Category Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Plus className="h-5 w-5 mr-2" />
                    Add Category
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryImages.map((category) => (
                  <Card key={category._id} className="overflow-hidden group">
                    <div className="relative">
                      <img 
                        src={`http://localhost:8000/assets/img/${category.image.split('/').pop()}`}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = category.image;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-2">
                          <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Edit className="h-5 w-5 text-blue-600" />
                          </button>
                          <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Camera className="h-5 w-5 text-green-600" />
                          </button>
                          <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Trash2 className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-900">{category.name}</h3>
                        <Badge variant={category.isActive ? 'success' : 'secondary'}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <input 
                        type="text" 
                        value={category.name} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-semibold text-sm"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Management Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black text-gray-900">Gallery Management</h2>
                <div className="flex space-x-3">
                  <Button>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Images
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Star className="h-5 w-5 mr-2" />
                    Create Slideshow
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((item) => (
                  <Card key={item._id} className="overflow-hidden">
                    <div className="relative group">
                      <img 
                        src={`http://localhost:8000/assets/img/${item.image.split('/').pop()}`}
                        alt={item.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = item.image;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex justify-between items-end">
                            <div className="text-white">
                              <h4 className="font-bold text-lg">{item.name}</h4>
                              <Badge variant={item.isActive ? 'success' : 'secondary'} className="mt-2">
                                {item.isActive ? 'Published' : 'Hidden'}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30">
                                <Heart className="h-4 w-4" />
                              </button>
                              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          value={item.name} 
                          className="flex-1 mr-3 px-3 py-2 border border-gray-300 rounded-md font-semibold text-sm"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
                          Save
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;