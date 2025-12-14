import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiMenu, FiX, FiHeart, FiUser } from 'react-icons/fi';
import { useAuthStore } from '../store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-black">
            Fashion Brand
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black transition">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-black transition">
              Shop
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-black transition">
              Blog
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-black transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-black transition">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded">
              <FiHeart size={20} />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded relative">
              <FiShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <FiUser size={20} />
                </button>
                <div className="hidden group-hover:block absolute right-0 bg-white border border-gray-200 rounded shadow-lg">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm">
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Shop
            </Link>
            <Link
              to="/blog"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
