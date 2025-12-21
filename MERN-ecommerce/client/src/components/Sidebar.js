import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&q=80",
      title: "Orange Airsuit",
      category: "Fashion Bag",
      price: "$99.00",
      discount: "25% Off"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      title: "Blue Jacket",
      category: "Clothing",
      price: "$149.00",
      discount: "15% Off"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
      title: "Summer Dress",
      category: "Dresses",
      price: "$79.00",
      discount: "30% Off"
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`ul-sidebar ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="ul-sidebar-header">
          <div className="ul-sidebar-header-logo">
            <Link to="/">
              <img 
                src="https://via.placeholder.com/150x50/EF2853/ffffff?text=GLAMER" 
                alt="logo" 
                className="logo"
              />
            </Link>
          </div>
          <button className="ul-sidebar-closer" onClick={onClose}>
            <i className="flaticon-close">✕</i>
          </button>
        </div>

        <div className="ul-sidebar-header-nav-wrapper d-block d-lg-none">
          <nav className="ul-sidebar-nav">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/shop">Women</Link>
            <Link to="/shop">Men's</Link>
            <Link to="/shop">Kids</Link>
            <Link to="/blog">Blog</Link>
          </nav>
        </div>

        <div className="ul-sidebar-about d-none d-lg-block">
          <span className="title">About glamer</span>
          <p className="mb-0">
            Phasellus eget fermentum mauris. Suspendisse nec dignissim nulla. Integer non quam commodo, 
            scelerisque felis id, eleifend turpis. Phasellus in nulla quis erat tempor tristique eget vel purus. 
            Nulla pharetra pharetra pharetra.
          </p>
        </div>

        {/* Product Slider */}
        <div className="ul-sidebar-products-wrapper d-none d-lg-flex">
          <div className="ul-sidebar-products-slider">
            {products.map((product) => (
              <div key={product.id} className="ul-product">
                <div className="ul-product-heading">
                  <span className="ul-product-price">{product.price}</span>
                  <span className="ul-product-discount-tag">{product.discount}</span>
                </div>

                <div className="ul-product-img">
                  <img src={product.image} alt={product.title} />

                  <div className="ul-product-actions">
                    <button><i className="flaticon-shopping-bag">🛍️</i></button>
                    <a href="#"><i className="flaticon-hide">👁️</i></a>
                    <button><i className="flaticon-heart">❤️</i></button>
                  </div>
                </div>

                <div className="ul-product-txt">
                  <h4 className="ul-product-title">
                    <Link to="/product">{product.title}</Link>
                  </h4>
                  <h5 className="ul-product-category">
                    <Link to="/shop">{product.category}</Link>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ul-sidebar-about d-none d-lg-block">
          <p className="mb-0">
            Phasellus eget fermentum mauris. Suspendisse nec dignissim nulla. Integer non quam commodo, 
            scelerisque felis id, eleifend turpis. Praesent varius eget justo ut lacinia.
          </p>
        </div>

        {/* Sidebar Footer */}
        <div className="ul-sidebar-footer">
          <span className="ul-sidebar-footer-title">Follow us</span>

          <div className="ul-sidebar-footer-social">
            <a href="#"><i className="flaticon-facebook">f</i></a>
            <a href="#"><i className="flaticon-twitter">t</i></a>
            <a href="#"><i className="flaticon-instagram">i</i></a>
            <a href="#"><i className="flaticon-youtube">y</i></a>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="ul-sidebar-backdrop" onClick={onClose} />}
    </>
  );
};

export default Sidebar;
