import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      id: 1,
      image: "/images/banner-slide-1.jpg",
      subTitle: "Perfect for Summer Evenings",
      title: "Casual and Stylish for All Seasons",
      price: "$129",
      className: "ul-banner-slide"
    },
    {
      id: 2,
      image: "/images/banner-slide-2.jpg",
      subTitle: "Perfect for Summer Evenings",
      title: "Casual and Stylish for All Seasons",
      price: "$129",
      className: "ul-banner-slide ul-banner-slide--2"
    },
    {
      id: 3,
      image: "/images/banner-slide-3.jpg",
      subTitle: "Perfect for Summer Evenings",
      title: "Casual and Stylish for All Seasons",
      price: "$129",
      className: "ul-banner-slide ul-banner-slide--3"
    }
  ];

  const imageSlides = [
    "/images/banner-img-slide-1.jpg",
    "/images/banner-img-slide-2.jpg",
    "/images/banner-img-slide-3.jpg"
  ];

  const categories = [
    { name: "Men", image: "/images/category-1.jpg" },
    { name: "Kids", image: "/images/category-2.jpg" },
    { name: "Pants", image: "/images/category-3.jpg" },
    { name: "Women", image: "/images/category-4.jpg" },
    { name: "Accessories", image: "/images/category-5.jpg" },
    { name: "Shoes", image: "/images/category-6.jpg" },
    { name: "Bags", image: "/images/category-7.jpg" }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    
    // Auto-slide banner
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products?limit=8&isFeatured=true');
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Mock products for development using available theme images
      setProducts([
        { _id: 1, name: "Orange Airsuit", price: 99, image: "/images/product-img-1.jpg", category: "Fashion Bag", discount: "25% Off" },
        { _id: 2, name: "Blue Jacket", price: 149, image: "/images/product-img-2.jpg", category: "Clothing", discount: "15% Off" },
        { _id: 3, name: "Summer Dress", price: 79, image: "/images/product-img-3.jpg", category: "Dresses", discount: "30% Off" },
        { _id: 4, name: "Black Shoes", price: 199, image: "/images/product-img-4.jpg", category: "Footwear", discount: "20% Off" },
        { _id: 5, name: "Red Handbag", price: 89, image: "/images/product-img-5.jpg", category: "Accessories", discount: "25% Off" },
        { _id: 6, name: "White T-Shirt", price: 29, image: "/images/product-img-6.jpg", category: "Clothing", discount: "10% Off" },
        { _id: 7, name: "Designer Watch", price: 259, image: "/images/product-img-sm-1.jpg", category: "Accessories", discount: "35% Off" },
        { _id: 8, name: "Casual Pants", price: 69, image: "/images/product-img-sm-2.jpg", category: "Clothing", discount: "15% Off" },
        { _id: 9, name: "Sports Jacket", price: 129, image: "/images/product-img-sm-3.jpg", category: "Sportswear", discount: "25% Off" },
        { _id: 10, name: "Evening Gown", price: 189, image: "/images/product-img-sm-4.jpg", category: "Formal Wear", discount: "30% Off" },
        { _id: 11, name: "Leather Boots", price: 159, image: "/images/product-img-sm-5.jpg", category: "Footwear", discount: "20% Off" },
        { _id: 12, name: "Silk Scarf", price: 39, image: "/images/product-img-sm-6.jpg", category: "Accessories", discount: "15% Off" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <main>
      {/* Banner Section */}
      <div className="overflow-hidden">
        <div className="ul-container">
          <section className="ul-banner">
            <div className="ul-banner-slider-wrapper">
              <div className="ul-banner-slider">
                <div className="swiper-wrapper">
                  {bannerSlides.map((slide, index) => (
                    <div 
                      key={slide.id}
                      className={`${slide.className} ${index === currentSlide ? 'block' : 'hidden'}`}
                    >
                      <div className="ul-banner-slide-img">
                        <img src={slide.image} alt="Banner" />
                      </div>
                      <div className="ul-banner-slide-txt">
                        <span className="ul-banner-slide-sub-title">{slide.subTitle}</span>
                        <h1 className="ul-banner-slide-title">{slide.title}</h1>
                        <p className="ul-banner-slide-price">
                          Starting From <span className="price">{slide.price}</span>
                        </p>
                        <a href="/shop" className="ul-btn">
                          SHOP NOW <i className="flaticon-up-right-arrow"></i>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Navigation */}
                <div className="ul-banner-slider-nav-wrapper">
                  <div className="ul-banner-slider-nav">
                    <button className="prev" onClick={prevSlide}>
                      <span className="icon"><i className="flaticon-down"></i></span>
                    </button>
                    <button className="next" onClick={nextSlide}>
                      <span className="icon"><i className="flaticon-down"></i></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ul-banner-img-slider-wrapper">
              <div className="ul-banner-img-slider">
                <img 
                  src={imageSlides[currentSlide]} 
                  alt="Banner" 
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Categories Section */}
      <div className="ul-container">
        <section className="ul-categories">
          <div className="ul-inner-container">
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 row-cols-xxs-1">
              {categories.map((category, index) => (
                <div key={index} className="col">
                  <a className="ul-category" href="/shop">
                    <div className="ul-category-img">
                      <img src={category.image} alt={`${category.name} Category`} />
                    </div>
                    <div className="ul-category-txt">
                      <span>{category.name}</span>
                    </div>
                    <div className="ul-category-btn">
                      <span><i className="flaticon-arrow-point-to-right"></i></span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Featured Products */}
      <div className="ul-container">
        <section className="py-16">
          <div className="ul-inner-container">
            <h2 className="text-center text-4xl font-bold mb-12">Featured Products</h2>
            {loading ? (
              <div className="text-center py-12">
                <p>Loading...</p>
              </div>
            ) : (
              <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2 row-cols-xxs-1">
                {products.slice(0, 12).map((product) => (
                  <div key={product._id} className="col">
                    <div className="ul-product">
                      <div className="ul-product-heading">
                        <span className="ul-product-price">${product.price}</span>
                        <span className="ul-product-discount-tag">{product.discount}</span>
                      </div>

                      <div className="ul-product-img">
                        <img src={product.image} alt={product.name} />
                        
                        <div className="ul-product-actions">
                          <button><i className="flaticon-shopping-bag"></i></button>
                          <a href="#"><i className="flaticon-hide"></i></a>
                          <button><i className="flaticon-heart"></i></button>
                        </div>
                      </div>

                      <div className="ul-product-txt">
                        <h4 className="ul-product-title">
                          <a href="/product-details">{product.name}</a>
                        </h4>
                        <h5 className="ul-product-category">
                          <a href="/shop">{product.category}</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Gallery Section */}
      <div className="ul-container">
        <section className="py-16">
          <div className="ul-inner-container">
            <h2 className="text-center text-4xl font-bold mb-12">Our Gallery</h2>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
              {[
                "/images/gallery-item-1.jpg",
                "/images/gallery-item-2.jpg",
                "/images/gallery-item-3.jpg",
                "/images/gallery-item-4.jpg",
                "/images/gallery-item-5.jpg",
                "/images/gallery-item-6.jpg"
              ].map((image, index) => (
                <div key={index} className="col mb-4">
                  <div className="ul-category" style={{marginBottom: 0}}>
                    <div className="ul-category-img" style={{aspectRatio: '4/3'}}>
                      <img src={image} alt={`Gallery ${index + 1}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Blog Preview Section */}
      <div className="ul-container">
        <section className="py-16 bg-gray-50">
          <div className="ul-inner-container">
            <h2 className="text-center text-4xl font-bold mb-12">Latest Blog Posts</h2>
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
              {[
                { image: "/images/blog-1.jpg", title: "Summer Fashion Trends 2025", excerpt: "Discover the hottest trends for this summer season." },
                { image: "/images/blog-2.jpg", title: "Style Guide for Professionals", excerpt: "Professional attire that makes a statement." },
                { image: "/images/blog-3.jpg", title: "Casual Weekend Looks", excerpt: "Comfortable yet stylish outfits for weekends." }
              ].map((blog, index) => (
                <div key={index} className="col mb-4">
                  <div className="ul-product" style={{textAlign: 'left'}}>
                    <div className="ul-product-img" style={{padding: 0}}>
                      <img src={blog.image} alt={blog.title} style={{borderRadius: '15px 15px 0 0', width: '100%', height: '200px'}} />
                    </div>
                    <div className="ul-product-txt" style={{padding: '20px'}}>
                      <h4 className="ul-product-title" style={{marginBottom: '10px'}}>
                        <a href="/blog">{blog.title}</a>
                      </h4>
                      <p style={{color: '#666', fontSize: '14px', lineHeight: '1.5'}}>{blog.excerpt}</p>
                      <a href="/blog" className="ul-btn" style={{marginTop: '15px', fontSize: '12px', padding: '8px 16px'}}>
                        Read More <i className="flaticon-arrow-point-to-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Reviews Section */}
      <div className="ul-container">
        <section className="py-16">
          <div className="ul-inner-container">
            <h2 className="text-center text-4xl font-bold mb-12">What Our Customers Say</h2>
            <div className="row row-cols-lg-2 row-cols-1">
              {[
                { 
                  image: "/images/reviewer-img-1.png", 
                  name: "Sarah Johnson", 
                  review: "Amazing quality and fast delivery! I love shopping here for trendy fashion items.",
                  rating: 5
                },
                { 
                  image: "/images/reviewer-img-2.png", 
                  name: "Mike Chen", 
                  review: "Great customer service and excellent product selection. Highly recommended!",
                  rating: 5
                }
              ].map((review, index) => (
                <div key={index} className="col mb-4">
                  <div className="ul-product" style={{padding: '30px', textAlign: 'left'}}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        style={{width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px'}} 
                      />
                      <div>
                        <h4 style={{margin: 0, fontSize: '18px', fontWeight: '600'}}>{review.name}</h4>
                        <div style={{color: 'var(--ul-secondary)'}}>
                          {[...Array(review.rating)].map((_, i) => <span key={i}>⭐</span>)}
                        </div>
                      </div>
                    </div>
                    <p style={{color: '#666', lineHeight: '1.6', fontSize: '16px'}}>"{review.review}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Brand Partners Section */}
      <div className="ul-container">
        <section className="py-16">
          <div className="ul-inner-container">
            <h2 className="text-center text-4xl font-bold mb-12">Our Partners</h2>
            <div className="row row-cols-lg-5 row-cols-md-4 row-cols-3 row-cols-2">
              {[
                "/images/logo.png",
                "/images/logo2.png",
                "/images/logo.png",
                "/images/logo2.png",
                "/images/logo.png"
              ].map((logo, index) => (
                <div key={index} className="col mb-4">
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    background: 'white',
                    borderRadius: '15px',
                    border: '1px solid #f0f0f0',
                    transition: 'transform 0.3s ease'
                  }}>
                    <img 
                      src={logo} 
                      alt={`Partner ${index + 1}`} 
                      style={{
                        maxWidth: '100%',
                        height: '60px',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        transition: 'filter 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.filter = 'grayscale(0%)'}
                      onMouseOut={(e) => e.target.style.filter = 'grayscale(100%)'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Newsletter Section */}
      <div style={{background: 'url(/images/nwsltr-subs-bg.jpg) center/cover'}}>
        <div className="ul-container">
          <section className="py-20 text-center text-white">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg mb-8">
                Get exclusive offers and latest updates delivered to your inbox
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none"
                />
                <button className="ul-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>

      {/* Ad Banner Section */}
      <div className="ul-container">
        <section className="py-8">
          <div className="ul-inner-container">
            <div style={{
              background: 'url(/images/ad-banner-bg.jpg) center/cover',
              borderRadius: '30px',
              padding: '60px 40px',
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '30px'
              }}></div>
              <div style={{position: 'relative', zIndex: 1}}>
                <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px'}}>Special Offer!</h2>
                <p style={{fontSize: '1.2rem', marginBottom: '30px'}}>Get up to 50% off on selected items</p>
                <a href="/shop" className="ul-btn" style={{fontSize: '16px', padding: '15px 30px'}}>
                  Shop Now <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
