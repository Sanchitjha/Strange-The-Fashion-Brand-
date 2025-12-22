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
      total: 3200,
      status: 'shipped',
      createdAt: '2024-12-19T15:45:00Z'
    },
    {
      _id: '3',
      orderNumber: 'ORD1003', 
      customerInfo: { name: 'Anita Singh', email: 'anita@example.com' },
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{stats.lowStockItems}</p>
              </div>
              <Package className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerInfo.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.total.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </button>
              <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 flex items-center justify-center">
                <Package className="h-4 w-4 mr-2" />
                Manage Inventory
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center">
                <Users className="h-4 w-4 mr-2" />
                View Customers
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Designer Kurta</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">3 left</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Silk Saree</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">5 left</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cotton Shirt</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">8 left</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Email Service</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Running</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;