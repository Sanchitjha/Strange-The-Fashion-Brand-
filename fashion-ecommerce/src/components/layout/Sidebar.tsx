'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sidebarProducts = [
    {
      id: 1,
      name: "Orange Airsuit",
      category: "Fashion Bag",
      price: "$99.00",
      discount: "25% Off",
      image: "/images/product-img-1.jpg"
    },
    {
      id: 2, 
      name: "Designer Saree",
      category: "Traditional Wear",
      price: "$149.00",
      discount: "30% Off",
      image: "/images/product-img-2.jpg"
    },
    {
      id: 3,
      name: "Wedding Lehenga",
      category: "Bridal Wear", 
      price: "$299.00",
      discount: "20% Off",
      image: "/images/product-img-3.jpg"
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        shadow-2xl lg:shadow-none
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="block">
              <Image
                src="/images/logo.svg"
                alt="Glamer Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="block lg:hidden p-6 border-b border-gray-100">
          <nav className="space-y-4">
            <Link href="/" className="block text-gray-800 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="block text-gray-800 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="block text-gray-800 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="block text-gray-800 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/cart" className="block text-gray-800 hover:text-primary transition-colors">
              Cart
            </Link>
          </nav>
        </div>

        {/* About Section */}
        <div className="hidden lg:block p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold mb-3 ul-primary">About Glamer</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Discover the finest collection of traditional and contemporary fashion. 
            From elegant sarees to stunning lehengas, we bring you premium quality 
            ethnic wear that celebrates Indian heritage with modern style.
          </p>
        </div>

        {/* Products Slider */}
        <div className="hidden lg:block p-6">
          <h3 className="text-lg font-semibold mb-4 ul-primary">Featured Products</h3>
          <div className="relative">
            {sidebarProducts.map((product, index) => (
              <div
                key={product.id}
                className={`${index === currentSlide ? 'block' : 'hidden'}`}
              >
                <div className="product-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold ul-primary">{product.price}</span>
                    <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                      {product.discount}
                    </span>
                  </div>

                  <div className="relative mb-4 group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={240}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    
                    {/* Product Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center space-x-3">
                      <button className="bg-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19v2m6-2v2" />
                        </svg>
                      </button>
                      <button className="bg-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="bg-white p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">
                      <Link href={`/products/${product.id}`} className="hover:ul-primary transition-colors">
                        {product.name}
                      </Link>
                    </h4>
                    <h5 className="text-sm text-gray-500">
                      <Link href="/products" className="hover:ul-primary transition-colors">
                        {product.category}
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Navigation */}
            <div className="flex justify-center space-x-2 mt-4">
              {sidebarProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}