// Sample Products Data
// Use this to populate your database

const sampleProducts = [
  {
    name: "Classic Black T-Shirt",
    description: "Premium quality black cotton t-shirt perfect for everyday wear. Comfortable fit with durable fabric.",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    category: "Men",
    subcategory: "T-Shirts",
    image: "https://via.placeholder.com/500x600?text=Black+T-Shirt",
    stock: 150,
    sizes: [
      { size: "XS", stock: 20 },
      { size: "S", stock: 30 },
      { size: "M", stock: 40 },
      { size: "L", stock: 35 },
      { size: "XL", stock: 25 }
    ],
    colors: [
      { color: "Black", stock: 150 },
      { color: "White", stock: 100 },
      { color: "Gray", stock: 80 }
    ],
    rating: 4.5,
    tags: ["casual", "comfortable", "popular"],
    isFeatured: true,
    isNew: true
  },
  {
    name: "Elegant Dress Shirt",
    description: "Professional dress shirt suitable for office or formal occasions. Available in multiple colors.",
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    category: "Men",
    subcategory: "Shirts",
    image: "https://via.placeholder.com/500x600?text=Dress+Shirt",
    stock: 80,
    sizes: [
      { size: "S", stock: 15 },
      { size: "M", stock: 25 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 15 },
      { size: "XXL", stock: 5 }
    ],
    colors: [
      { color: "White", stock: 40 },
      { color: "Light Blue", stock: 25 },
      { color: "Pink", stock: 15 }
    ],
    rating: 4.8,
    tags: ["formal", "professional", "office"],
    isFeatured: true,
    isNew: false
  },
  {
    name: "Women's Casual Jeans",
    description: "Comfortable and stylish jeans perfect for casual outings. High-quality denim with excellent durability.",
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    category: "Women",
    subcategory: "Jeans",
    image: "https://via.placeholder.com/500x600?text=Women+Jeans",
    stock: 120,
    sizes: [
      { size: "24", stock: 15 },
      { size: "26", stock: 25 },
      { size: "28", stock: 30 },
      { size: "30", stock: 25 },
      { size: "32", stock: 25 }
    ],
    colors: [
      { color: "Dark Blue", stock: 70 },
      { color: "Light Blue", stock: 40 },
      { color: "Black", stock: 10 }
    ],
    rating: 4.6,
    tags: ["casual", "durable", "comfortable"],
    isFeatured: true,
    isNew: false
  },
  {
    name: "Summer Floral Dress",
    description: "Beautiful floral print summer dress. Perfect for warm weather and casual gatherings. Lightweight and breathable.",
    price: 39.99,
    originalPrice: 69.99,
    discount: 43,
    category: "Women",
    subcategory: "Dresses",
    image: "https://via.placeholder.com/500x600?text=Floral+Dress",
    stock: 95,
    sizes: [
      { size: "XS", stock: 10 },
      { size: "S", stock: 20 },
      { size: "M", stock: 30 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 15 }
    ],
    colors: [
      { color: "Floral", stock: 95 }
    ],
    rating: 4.7,
    tags: ["summer", "casual", "floral"],
    isFeatured: true,
    isNew: true
  },
  {
    name: "Kids Superhero T-Shirt",
    description: "Fun and colorful superhero themed t-shirt for kids. Made from soft and safe cotton fabric.",
    price: 19.99,
    originalPrice: 34.99,
    discount: 43,
    category: "Kids",
    subcategory: "T-Shirts",
    image: "https://via.placeholder.com/500x600?text=Kids+Superhero",
    stock: 110,
    sizes: [
      { size: "2Y", stock: 15 },
      { size: "4Y", stock: 25 },
      { size: "6Y", stock: 30 },
      { size: "8Y", stock: 25 },
      { size: "10Y", stock: 15 }
    ],
    colors: [
      { color: "Red", stock: 55 },
      { color: "Blue", stock: 55 }
    ],
    rating: 4.8,
    tags: ["kids", "fun", "colorful"],
    isFeatured: false,
    isNew: true
  },
  {
    name: "Premium Leather Belt",
    description: "High-quality genuine leather belt. Durable and stylish, suitable for both casual and formal wear.",
    price: 44.99,
    originalPrice: 74.99,
    discount: 40,
    category: "Accessories",
    subcategory: "Belts",
    image: "https://via.placeholder.com/500x600?text=Leather+Belt",
    stock: 85,
    sizes: [
      { size: "28", stock: 15 },
      { size: "30", stock: 15 },
      { size: "32", stock: 15 },
      { size: "34", stock: 20 },
      { size: "36", stock: 20 }
    ],
    colors: [
      { color: "Black", stock: 50 },
      { color: "Brown", stock: 35 }
    ],
    rating: 4.9,
    tags: ["leather", "accessory", "durable"],
    isFeatured: true,
    isNew: false
  },
  {
    name: "Fashion Sunglasses",
    description: "Trendy sunglasses with UV protection. Perfect for sunny days and adding style to any outfit.",
    price: 34.99,
    originalPrice: 64.99,
    discount: 46,
    category: "Accessories",
    subcategory: "Eyewear",
    image: "https://via.placeholder.com/500x600?text=Sunglasses",
    stock: 140,
    sizes: [],
    colors: [
      { color: "Black", stock: 50 },
      { color: "Brown", stock: 45 },
      { color: "Gold", stock: 45 }
    ],
    rating: 4.4,
    tags: ["accessories", "sunglasses", "uv-protection"],
    isFeatured: true,
    isNew: true
  },
  {
    name: "Cozy Winter Sweater",
    description: "Comfortable knit sweater perfect for cold weather. Soft fabric with a classic design.",
    price: 54.99,
    originalPrice: 89.99,
    discount: 39,
    category: "Women",
    subcategory: "Sweaters",
    image: "https://via.placeholder.com/500x600?text=Winter+Sweater",
    stock: 70,
    sizes: [
      { size: "XS", stock: 8 },
      { size: "S", stock: 15 },
      { size: "M", stock: 20 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 12 }
    ],
    colors: [
      { color: "Cream", stock: 25 },
      { color: "Gray", stock: 25 },
      { color: "Navy", stock: 20 }
    ],
    rating: 4.7,
    tags: ["winter", "cozy", "sweater"],
    isFeatured: true,
    isNew: false
  }
];

// Export for use in seed script
module.exports = sampleProducts;
