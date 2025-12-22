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

// Simple Card Components
const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-4">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    variant === 'destructive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
  }`}>
    {children}
  </span>
);

const Button = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <button className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all ${className}`}>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fashion Brand Admin</h1>
          <p className="text-gray-600">Welcome to your clothing brand dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Total Products</CardTitle>
                <Package className="h-8 w-8 text-pink-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500">Active products in store</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Total Orders</CardTitle>
                <ShoppingBag className="h-8 w-8 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Total Revenue</CardTitle>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Total sales revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Low Stock</CardTitle>
                <Package className="h-8 w-8 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.lowStockItems}</div>
              <p className="text-xs text-gray-500">Items below 10 units</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Orders</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{order.orderNumber}</td>
                      <td className="py-3 px-4">{order.customerInfo.name}</td>
                      <td className="py-3 px-4">₹{order.total.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={order.status === 'delivered' ? 'default' : 'secondary'}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Manage Inventory
              </Button>
              <Button className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                View Customers
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <Badge>Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Payment Gateway</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Service</span>
                <Badge>Running</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">New Orders</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Revenue</span>
                  <span className="font-semibold">₹45,230</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Visitors</span>
                  <span className="font-semibold">1,247</span>
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