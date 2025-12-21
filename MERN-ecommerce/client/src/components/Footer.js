import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="ul-footer">
      <div className="ul-container">
        <div className="ul-footer-top">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="ul-footer-widget">
                <div className="ul-footer-logo">
                  <img 
                    src="https://via.placeholder.com/150x50/EF2853/ffffff?text=GLAMER" 
                    alt="logo"
                  />
                </div>
                <p>Your one-stop destination for fashion and style. Discover the latest trends and exclusive collections.</p>
                <div className="ul-footer-social">
                  <a href="#"><i className="flaticon-facebook">f</i></a>
                  <a href="#"><i className="flaticon-twitter">t</i></a>
                  <a href="#"><i className="flaticon-instagram">i</i></a>
                  <a href="#"><i className="flaticon-youtube">y</i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="ul-footer-widget">
                <h3 className="ul-footer-widget-title">Quick Links</h3>
                <ul className="ul-footer-links">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="ul-footer-widget">
                <h3 className="ul-footer-widget-title">Customer Care</h3>
                <ul className="ul-footer-links">
                  <li><Link to="/account">My Account</Link></li>
                  <li><Link to="/wishlist">Wishlist</Link></li>
                  <li><Link to="/cart">Shopping Cart</Link></li>
                  <li><Link to="/orders">Track Order</Link></li>
                  <li><Link to="/returns">Returns</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="ul-footer-widget">
                <h3 className="ul-footer-widget-title">Categories</h3>
                <ul className="ul-footer-links">
                  <li><Link to="/shop?cat=men">Men's Fashion</Link></li>
                  <li><Link to="/shop?cat=women">Women's Fashion</Link></li>
                  <li><Link to="/shop?cat=kids">Kids Fashion</Link></li>
                  <li><Link to="/shop?cat=accessories">Accessories</Link></li>
                  <li><Link to="/shop?cat=shoes">Footwear</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="ul-footer-widget">
                <h3 className="ul-footer-widget-title">Newsletter</h3>
                <p>Subscribe to get special offers and updates</p>
                <form className="ul-footer-newsletter">
                  <input type="email" placeholder="Your email" />
                  <button type="submit" className="ul-btn">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="ul-footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="ul-footer-copyright">
                © 2025 Glamer. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="ul-footer-payment">
                <img src="https://via.placeholder.com/50x30/cccccc/666?text=VISA" alt="Payment" />
                <img src="https://via.placeholder.com/50x30/cccccc/666?text=MC" alt="Payment" />
                <img src="https://via.placeholder.com/50x30/cccccc/666?text=AMEX" alt="Payment" />
                <img src="https://via.placeholder.com/50x30/cccccc/666?text=PayPal" alt="Payment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
