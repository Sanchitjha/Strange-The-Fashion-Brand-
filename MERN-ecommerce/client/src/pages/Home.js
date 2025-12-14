import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products?limit=8&isFeatured=true');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 md:py-32">
        <div className="container-main text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your Style
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Explore our exclusive collection of premium fashion items
          </p>
          <a href="/shop" className="btn-primary bg-white text-black hover:bg-gray-100 text-lg px-8 py-3 inline-block">
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-main">
          <h2 className="section-title">Featured Products</h2>
          {loading ? (
            <div className="text-center py-12">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Men', 'Women', 'Kids', 'Accessories'].map((category) => (
              <a
                key={category}
                href={`/shop?category=${category}`}
                className="group relative h-64 rounded-lg overflow-hidden"
              >
                <div className="bg-gradient-to-b from-gray-300 to-gray-400 w-full h-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white text-center">{category}</span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-black text-white">
        <div className="container-main">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-300 mb-6">
              Get exclusive offers and latest updates delivered to your inbox
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded text-black focus:outline-none"
              />
              <button className="btn-primary bg-white text-black hover:bg-gray-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
