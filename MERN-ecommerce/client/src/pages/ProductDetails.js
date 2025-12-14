import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiHeart, FiShare2, FiStar } from 'react-icons/fi';
import api from '../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container-main py-12">Loading...</div>;
  if (!product) return <div className="container-main py-12">Product not found</div>;

  return (
    <div className="container-main py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-96 md:h-full">
          <img
            src={product.image || 'https://via.placeholder.com/500x600'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={20}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
            <span className="ml-3 text-gray-600">({product.rating} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-red-500 font-bold">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Options */}
          <div className="mb-6 space-y-4">
            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block font-semibold mb-2">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`px-4 py-2 border rounded transition ${
                        selectedSize === size.size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block font-semibold mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setSelectedColor(color.color)}
                      className={`px-4 py-2 border rounded transition ${
                        selectedColor === color.color
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {color.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">In Stock ({product.stock} available)</p>
            ) : (
              <p className="text-red-600 font-semibold">Out of Stock</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button
              disabled={product.stock === 0}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button className="btn-secondary p-3">
              <FiHeart size={20} />
            </button>
            <button className="btn-secondary p-3">
              <FiShare2 size={20} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-semibold">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SKU:</span>
              <span className="font-semibold">PROD-{product._id?.slice(-6)}</span>
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tags:</span>
                <span className="font-semibold">{product.tags.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
