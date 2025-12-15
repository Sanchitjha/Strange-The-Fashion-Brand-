'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo for mobile */}
          <div className="lg:hidden">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Glamer"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-800 hover:text-primary transition-colors font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Search dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-4 z-50">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                    autoFocus
                  />
                  <div className="mt-3 text-sm text-gray-500">
                    Popular searches: Sarees, Lehengas, Suits, Kurtis
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19v2m6-2v2" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* User Account */}
            <div className="relative group">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* User dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  My Account
                </Link>
                <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  My Orders
                </Link>
                <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  Wishlist
                </Link>
                <hr className="my-2" />
                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay for mobile */}
      {isSearchOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white border-b border-gray-100 p-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}