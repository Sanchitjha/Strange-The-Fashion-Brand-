import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <header className="ul-header">
      {/* Header Top - Enhanced Marquee */}
      <div className="ul-header-top">
        <div className="ul-header-top-slider">
          <div className="marquee-content">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="ul-header-top-slider-item">
                <i className="flaticon-sparkle">✨</i> limited time offer
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header Bottom */}
      <div className="ul-header-bottom">
        <div className="ul-container">
          <div className="ul-header-bottom-wrapper">
            {/* Header Left */}
            <div className="header-bottom-left">
              <div className="logo-container">
                <Link to="/" className="logo">
                  <img src="/images/logo.svg" alt="Fashion Brand" />
                </Link>
              </div>

              {/* Search Form */}
              <div className="ul-header-search-form-wrapper">
                <form className="ul-header-search-form">
                  <div className="dropdown-wrapper">
                    <select name="search-category">
                      <option value="">Select Category</option>
                      <option value="1">Clothing</option>
                      <option value="2">Watches</option>
                      <option value="3">Jewellery</option>
                      <option value="4">Glasses</option>
                    </select>
                  </div>
                  <div className="ul-header-search-form-right">
                    <input type="search" name="header-search" placeholder="Search Here" />
                    <button type="submit">
                      <span className="icon">
                        <i className="flaticon-search-interface-symbol"></i>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Header Navigation */}
            <div className="ul-header-nav-wrapper">
              <nav className="ul-header-nav">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/shop">Women</Link>
                <Link to="/shop">Men's</Link>
                <Link to="/shop">Kids</Link>
                <Link to="/blog">Blog</Link>
              </nav>
            </div>

            {/* Header Actions */}
            <div className="ul-header-actions">
              {user ? (
                <div className="relative group">
                  <button className="p-2">
                    <i className="flaticon-user"></i>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 bg-white border border-gray-200 rounded shadow-lg z-50">
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
                <Link to="/login">
                  <i className="flaticon-user"></i>
                </Link>
              )}
              <Link to="/cart">
                <i className="flaticon-heart"></i>
              </Link>
              <Link to="/cart">
                <i className="flaticon-shopping-bag"></i>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="d-inline-flex">
              <button 
                className="ul-header-sidebar-opener"
                onClick={() => setIsOpen(!isOpen)}
              >
                <i className="flaticon-hamburger"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-3 mt-4">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:text-red-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-4 py-2 text-gray-700 hover:text-red-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/blog"
                className="block px-4 py-2 text-gray-700 hover:text-red-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-700 hover:text-red-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-700 hover:text-red-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
