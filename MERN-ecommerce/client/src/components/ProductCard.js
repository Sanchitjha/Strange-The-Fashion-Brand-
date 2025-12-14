import React from 'react';
import { FiStar, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-200 h-64 md:h-72">
        <img
          src={product.image || 'https://via.placeholder.com/300x400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-gray-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-3">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-black">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 btn-primary flex items-center justify-center gap-2">
            <FiShoppingBag size={18} />
            <span className="hidden sm:inline">Add</span>
          </button>
          <button className="btn-secondary">
            <FiHeart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
