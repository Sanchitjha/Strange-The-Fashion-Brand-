import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="ul-header">
      {/* Header Top - Moving Marquee */}
      <div className="ul-header-top">
        <div className="ul-header-top-slider">
          <div className="ul-marquee">
            {[...Array(10)].map((_, i) => (
              <p key={i} className="ul-header-top-slider-item">
                <i className="flaticon-sparkle">✨</i> limited time offer
              </p>
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
                <Link to="/" className="d-inline-block">
                  <img 
                    src="https://via.placeholder.com/150x50/EF2853/ffffff?text=GLAMER" 
                    alt="logo" 
                    className="logo"
                  />
                </Link>
              </div>

              {/* Search Form */}
              <div className={`ul-header-search-form-wrapper ${isSearchOpen ? 'active' : ''}`}>
                <form action="#" className="ul-header-search-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="dropdown-wrapper">
                    <select name="search-category" id="ul-header-search-category">
                      <option value="">Select Category</option>
                      <option value="clothing">Clothing</option>
                      <option value="watches">Watches</option>
                      <option value="jewellery">Jewellery</option>
                      <option value="glasses">Glasses</option>
                    </select>
                  </div>
                  <div className="ul-header-search-form-right">
                    <input
                      type="search"
                      name="header-search"
                      id="ul-header-search"
                      placeholder="Search Here"
                    />
                    <button type="submit">
                      <span className="icon">
                        <i className="flaticon-search">🔍</i>
                      </span>
                    </button>
                  </div>
                </form>
                <button 
                  className="ul-header-mobile-search-closer"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <i className="flaticon-close">✕</i>
                </button>
              </div>
            </div>

            {/* Header Nav */}
            <div className="ul-header-nav-wrapper">
              <nav className="ul-header-nav">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/shop">Women</Link>
                <Link to="/shop">Men's</Link>
                <Link to="/shop">Kids</Link>
                <Link to="/blog">Blog</Link>
                
                <div className="has-sub-menu has-mega-menu">
                  <a role="button">Pages</a>
                  
                  <div className="ul-header-submenu ul-header-megamenu">
                    <div className="single-col">
                      <span className="single-col-title">Inner Pages</span>
                      <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/blog">Blogs</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/reviews">Reviews</Link></li>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                      </ul>
                    </div>

                    <div className="single-col">
                      <span className="single-col-title">Shop Pages</span>
                      <ul>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/shop">Shop Full Width</Link></li>
                        <li><Link to="/product">Shop Details</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/checkout">Checkout</Link></li>
                      </ul>
                    </div>

                    <div className="single-col">
                      <span className="single-col-title">Men's</span>
                      <ul>
                        <li><a href="#">Clothing</a></li>
                        <li><a href="#">Footwear</a></li>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Activewear</a></li>
                        <li><a href="#">Grooming</a></li>
                        <li><a href="#">Ethnic Wear</a></li>
                      </ul>
                    </div>

                    <div className="single-col">
                      <span className="single-col-title">Women's</span>
                      <ul>
                        <li><a href="#">Clothing</a></li>
                        <li><a href="#">Footwear</a></li>
                        <li><a href="#">Bags & Accessories</a></li>
                        <li><a href="#">Activewear</a></li>
                        <li><a href="#">Beauty & Grooming</a></li>
                        <li><a href="#">Ethnic Wear</a></li>
                      </ul>
                    </div>

                    <div className="single-col">
                      <span className="single-col-title">Children's</span>
                      <ul>
                        <li><a href="#">Clothing</a></li>
                        <li><a href="#">Footwear</a></li>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Toys & Games</a></li>
                        <li><a href="#">Baby Essentials</a></li>
                      </ul>
                    </div>

                    <div className="single-col">
                      <span className="single-col-title">Jewellery</span>
                      <ul>
                        <li><a href="#">Ethnic & Traditional</a></li>
                        <li><a href="#">Bridal Jewellery</a></li>
                        <li><a href="#">Bracelets</a></li>
                        <li><a href="#">Rings</a></li>
                        <li><a href="#">Earrings</a></li>
                        <li><a href="#">Chains & Pendants</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* Actions */}
            <div className="ul-header-actions">
              <button 
                className="ul-header-mobile-search-opener"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <i className="flaticon-search">🔍</i>
              </button>
              <Link to="/login">
                <i className="flaticon-user">👤</i>
              </Link>
              <Link to="/wishlist">
                <i className="flaticon-heart">❤️</i>
              </Link>
              <Link to="/cart">
                <i className="flaticon-shopping-bag">🛍️</i>
              </Link>
            </div>

            {/* Sidebar Opener */}
            <div className="d-inline-flex">
              <button 
                className="ul-header-sidebar-opener"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <i className="flaticon-hamburger">☰</i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="ul-sidebar-backdrop" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
