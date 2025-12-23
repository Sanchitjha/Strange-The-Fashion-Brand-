// Admin Dashboard
'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp,
  Plus,
  Search
} from 'lucide-react';

// Enhanced UI Components with Better Contrast
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{children}</h3>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Fashion Brand Admin</h1>
          <p className="text-lg font-medium text-gray-700">Welcome to your clothing brand dashboard</p>
        </div>

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
                <CardTitle className="text-gray-800">Low Stock</CardTitle>
                <div className="p-3 bg-red-100 rounded-full">
                  <Package className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-red-600 mb-1">{stats.lowStockItems}</div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Items below 10 units</p>
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

        {/* Enhanced Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-center text-base font-bold">
                <Plus className="h-5 w-5 mr-2" />
                Add New Product
              </Button>
              <Button className="w-full justify-center text-base font-bold bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                <Package className="h-5 w-5 mr-2" />
                Manage Inventory
              </Button>
              <Button className="w-full justify-center text-base font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Users className="h-5 w-5 mr-2" />
                View Customers
              </Button>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-900">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-bold text-gray-900">Database</span>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-bold text-gray-900">Payment Gateway</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-bold text-gray-900">Email Service</span>
                <Badge variant="success">Running</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-900">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm font-bold text-gray-900">New Orders</span>
                  <span className="text-lg font-black text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm font-bold text-gray-900">Revenue</span>
                  <span className="text-lg font-black text-green-600">₹45,230</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                  <span className="text-sm font-bold text-gray-900">Visitors</span>
                  <span className="text-lg font-black text-purple-600">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;