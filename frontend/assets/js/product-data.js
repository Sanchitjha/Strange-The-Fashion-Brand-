// Product data for the e-commerce website
const productData = [
    {
        id: 1,
        name: "Orange Airsuit",
        price: 99.00,
        originalPrice: 132.00,
        image: "assets/img/product-img-1.jpg",
        category: "Fashion Bag",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Orange", "Black", "Blue"],
        stock: 15,
        description: "Stylish and comfortable orange airsuit perfect for casual wear."
    },
    {
        id: 2,
        name: "Blue Summer Dress",
        price: 129.00,
        originalPrice: 152.00,
        image: "assets/img/product-img-2.jpg",
        category: "Summer Collection",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Blue", "White", "Pink"],
        stock: 8,
        description: "Elegant summer dress ideal for warm weather occasions."
    },
    {
        id: 3,
        name: "Classic White Sneakers",
        price: 89.00,
        originalPrice: 110.00,
        image: "assets/img/product-img-3.jpg",
        category: "Footwear",
        sizes: ["6", "7", "8", "9", "10", "11"],
        colors: ["White", "Black", "Gray"],
        stock: 20,
        description: "Comfortable white sneakers for everyday wear."
    },
    {
        id: 4,
        name: "Leather Handbag",
        price: 159.00,
        originalPrice: 199.00,
        image: "assets/img/product-img-4.jpg",
        category: "Accessories",
        sizes: ["One Size"],
        colors: ["Black", "Brown", "Tan"],
        stock: 5,
        description: "Premium leather handbag with elegant design."
    },
    {
        id: 5,
        name: "Casual Denim Jacket",
        price: 79.00,
        originalPrice: 99.00,
        image: "assets/img/product-img-5.jpg",
        category: "Outerwear",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black", "Light Blue"],
        stock: 12,
        description: "Classic denim jacket perfect for layering."
    },
    {
        id: 6,
        name: "Red Evening Dress",
        price: 189.00,
        originalPrice: 245.00,
        image: "assets/img/product-img-6.jpg",
        category: "Evening Wear",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Red", "Black", "Navy"],
        stock: 3,
        description: "Stunning red evening dress for special occasions."
    }
];

// Function to initialize product cards with data
function initializeProductCards() {
    const productCards = document.querySelectorAll('.ul-product');
    
    productCards.forEach((card, index) => {
        if (index < productData.length) {
            const product = productData[index];
            
            // Add data attributes to the card
            card.setAttribute('data-product-id', product.id);
            card.setAttribute('data-product-name', product.name);
            card.setAttribute('data-product-price', product.price);
            card.setAttribute('data-product-image', product.image);
            card.setAttribute('data-product-category', product.category);
            
            // Update the add to cart button
            const addToCartBtn = card.querySelector('button[aria-label="Add to cart"]');
            if (addToCartBtn) {
                addToCartBtn.classList.add('add-to-cart-btn');
                addToCartBtn.setAttribute('data-product-id', product.id);
            }
            
            // Update product title if it exists
            const titleElement = card.querySelector('.ul-product-title a');
            if (titleElement) {
                titleElement.textContent = product.name;
            }
            
            // Update product category if it exists
            const categoryElement = card.querySelector('.ul-product-category a');
            if (categoryElement) {
                categoryElement.textContent = product.category;
            }
            
            // Update price if it exists
            const priceElement = card.querySelector('.ul-product-price');
            if (priceElement) {
                priceElement.textContent = `$${product.price.toFixed(2)}`;
            }
            
            // Update discount tag if it exists
            const discountElement = card.querySelector('.ul-product-discount-tag');
            if (discountElement && product.originalPrice > product.price) {
                const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                discountElement.textContent = `${discountPercent}% Off`;
            }
        }
    });
}

// Function to get product data by ID
function getProductById(id) {
    return productData.find(product => product.id == id);
}

// Export functions for use in other scripts
window.productData = productData;
window.initializeProductCards = initializeProductCards;
window.getProductById = getProductById;