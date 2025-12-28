// Advanced Cart Management System
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
        this.savedForLater = JSON.parse(localStorage.getItem('savedForLater')) || [];
        this.notifications = JSON.parse(localStorage.getItem('cartNotifications')) || [];
        this.apiBase = window.location.hostname === 'localhost' ? 'http://localhost:3001/api' : '/api';
        this.init();
    }

    init() {
        this.updateCartCount();
        this.updateCartUI();
        this.bindEvents();
        this.loadCartFromStorage();
    }

    // Add product to cart with size and color selection
    addToCart(productId, productName, price, image, selectedSize, selectedColor, quantity = 1) {
        const existingItem = this.cart.find(item => 
            item.id === productId && 
            item.size === selectedSize && 
            item.color === selectedColor
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const cartItem = {
                id: productId,
                name: productName,
                price: parseFloat(price),
                image: image,
                size: selectedSize,
                color: selectedColor,
                quantity: quantity,
                addedAt: new Date().toISOString()
            };
            this.cart.push(cartItem);
        }

        this.saveCart();
        this.updateCartCount();
        this.showCartNotification('Product added to cart!', 'success');
        this.animateCartIcon();
        return true;
    }

    // Remove item from cart
    removeFromCart(productId, size, color) {
        this.cart = this.cart.filter(item => 
            !(item.id === productId && item.size === size && item.color === color)
        );
        this.saveCart();
        this.updateCartCount();
        this.updateCartUI();
        this.showCartNotification('Item removed from cart', 'info');
    }

    // Update quantity
    updateQuantity(productId, size, color, newQuantity) {
        const item = this.cart.find(item => 
            item.id === productId && item.size === size && item.color === color
        );
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId, size, color);
            } else {
                item.quantity = parseInt(newQuantity);
                this.saveCart();
                this.updateCartCount();
                this.updateCartUI();
            }
        }
    }

    // Save for later functionality
    saveForLater(productId, size, color) {
        const item = this.cart.find(item => 
            item.id === productId && item.size === size && item.color === color
        );
        
        if (item) {
            // Move from cart to saved for later
            this.savedForLater.push({...item, savedAt: new Date().toISOString()});
            this.removeFromCart(productId, size, color);
            localStorage.setItem('savedForLater', JSON.stringify(this.savedForLater));
            this.showCartNotification('Item saved for later!', 'info');
            this.updateSavedForLaterUI();
        }
    }

    // Move back from saved for later to cart
    moveToCart(productId, size, color) {
        const itemIndex = this.savedForLater.findIndex(item => 
            item.id === productId && item.size === size && item.color === color
        );
        
        if (itemIndex !== -1) {
            const item = this.savedForLater[itemIndex];
            this.addToCart(item.id, item.name, item.price, item.image, item.size, item.color, item.quantity);
            this.savedForLater.splice(itemIndex, 1);
            localStorage.setItem('savedForLater', JSON.stringify(this.savedForLater));
            this.updateSavedForLaterUI();
        }
    }

    // Request notification for out of stock items
    requestStockNotification(productId, productName, size, color, email) {
        const notification = {
            id: Date.now(),
            productId: productId,
            productName: productName,
            size: size,
            color: color,
            email: email,
            requestedAt: new Date().toISOString(),
            status: 'pending'
        };
        
        this.notifications.push(notification);
        localStorage.setItem('cartNotifications', JSON.stringify(this.notifications));
        this.showCartNotification(`We'll notify you when ${productName} (${size}, ${color}) is back in stock!`, 'success');
        
        // Send to backend for processing
        this.sendNotificationRequest(notification);
    }

    // Calculate cart totals
    getCartTotals() {
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18; // 18% GST
        const shipping = subtotal > 1000 ? 0 : 100; // Free shipping above ₹1000
        const total = subtotal + tax + shipping;
        
        return {
            subtotal: subtotal,
            tax: tax,
            shipping: shipping,
            total: total,
            itemCount: this.cart.reduce((count, item) => count + item.quantity, 0)
        };
    }

    // Place order and clear cart
    async placeOrder(customerInfo, paymentMethod, promoCode = null) {
        if (this.cart.length === 0) {
            this.showCartNotification('Your cart is empty!', 'error');
            return false;
        }

        const totals = this.getCartTotals();
        const orderData = {
            items: this.cart,
            customerInfo: customerInfo,
            totalAmount: totals.total,
            shippingMethod: 'standard',
            promoCode: promoCode,
            paymentMethod: paymentMethod
        };

        try {
            // Send order to backend
            const response = await fetch(`${this.apiBase}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Clear cart after successful order
                this.cart = [];
                this.saveCart();
                this.updateCartCount();
                this.updateCartUI();
                
                // Show success message
                this.showCartNotification(`Order #${result.orderId} placed successfully! Thank you for shopping with us.`, 'success');
                
                // Redirect to cart page with success message
                setTimeout(() => {
                    window.location.href = `cart.html?success=true&orderId=${result.orderId}`;
                }, 2000);
                
                return true;
            } else {
                throw new Error(result.error || 'Failed to place order');
            }
        } catch (error) {
            this.showCartNotification('Failed to place order. Please try again.', 'error');
            console.error('Order placement error:', error);
            return false;
        }
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('fashionCart', JSON.stringify(this.cart));
    }

    // Load cart from localStorage
    loadCartFromStorage() {
        const storedCart = localStorage.getItem('fashionCart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    }

    // Update cart count in header
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const itemCount = this.cart.reduce((count, item) => count + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = itemCount;
            element.style.display = itemCount > 0 ? 'block' : 'none';
        });

        // Update cart icon badge
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = itemCount;
            cartBadge.style.display = itemCount > 0 ? 'inline-block' : 'none';
        }
    }

    // Animate cart icon when item is added
    animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.classList.add('cart-bounce');
            setTimeout(() => {
                cartIcon.classList.remove('cart-bounce');
            }, 600);
        }
    }

    // Show cart notifications
    showCartNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `cart-notification cart-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Update cart UI (for cart page)
    updateCartUI() {
        const cartContainer = document.querySelector('.cart-items-container');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="flaticon-shopping-bag empty-cart-icon"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start shopping to add items to your cart</p>
                    <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
        } else {
            cartContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="item-specs">Size: ${item.size} | Color: ${item.color}</p>
                        <p class="item-price">₹${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" onclick="cart.updateQuantity('${item.id}', '${item.size}', '${item.color}', ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="cart.updateQuantity('${item.id}', '${item.size}', '${item.color}', this.value)">
                        <button class="quantity-btn increase" onclick="cart.updateQuantity('${item.id}', '${item.size}', '${item.color}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
                    </div>
                    <div class="cart-item-actions">
                        <button class="save-later-btn" onclick="cart.saveForLater('${item.id}', '${item.size}', '${item.color}')" aria-label="Save for later">
                            <i class="flaticon-heart"></i> Save for Later
                        </button>
                        <button class="remove-btn" onclick="cart.removeFromCart('${item.id}', '${item.size}', '${item.color}')" aria-label="Remove item">
                            <i class="flaticon-close"></i> Remove
                        </button>
                    </div>
                </div>
            `).join('');
        }

        this.updateCartSummary();
    }

    // Update saved for later UI
    updateSavedForLaterUI() {
        const savedContainer = document.querySelector('.saved-for-later-container');
        if (!savedContainer) return;

        if (this.savedForLater.length === 0) {
            savedContainer.innerHTML = '<p>No items saved for later</p>';
        } else {
            savedContainer.innerHTML = this.savedForLater.map(item => `
                <div class="saved-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                    <div class="saved-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="saved-item-details">
                        <h4>${item.name}</h4>
                        <p>Size: ${item.size} | Color: ${item.color}</p>
                        <p>₹${item.price.toFixed(2)}</p>
                    </div>
                    <div class="saved-item-actions">
                        <button class="move-to-cart-btn" onclick="cart.moveToCart('${item.id}', '${item.size}', '${item.color}')" aria-label="Move to cart">Move to Cart</button>
                        <button class="remove-saved-btn" onclick="cart.removeSavedItem('${item.id}', '${item.size}', '${item.color}')" aria-label="Remove from saved">Remove</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Update cart summary
    updateCartSummary() {
        const summaryContainer = document.querySelector('.cart-summary');
        if (!summaryContainer) return;

        const totals = this.getCartTotals();
        summaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-line">
                <span>Subtotal (${totals.itemCount} items):</span>
                <span>₹${totals.subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-line">
                <span>Tax (18% GST):</span>
                <span>₹${totals.tax.toFixed(2)}</span>
            </div>
            <div class="summary-line">
                <span>Shipping:</span>
                <span>${totals.shipping === 0 ? 'FREE' : '₹' + totals.shipping.toFixed(2)}</span>
            </div>
            <div class="summary-line total">
                <span>Total:</span>
                <span>₹${totals.total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="window.location.href='checkout.html'" ${this.cart.length === 0 ? 'disabled' : ''}>
                Proceed to Checkout
            </button>
        `;
    }

    // Remove saved item
    removeSavedItem(productId, size, color) {
        this.savedForLater = this.savedForLater.filter(item => 
            !(item.id === productId && item.size === size && item.color === color)
        );
        localStorage.setItem('savedForLater', JSON.stringify(this.savedForLater));
        this.updateSavedForLaterUI();
        this.showCartNotification('Item removed from saved for later', 'info');
    }

    // Send notification request to backend
    async sendNotificationRequest(notification) {
        try {
            const response = await fetch(`${this.apiBase}/stock-notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notification)
            });
            
            const result = await response.json();
            if (response.ok && result.success) {
                console.log('Stock notification request sent successfully');
            } else {
                console.error('Failed to send notification request:', result.error);
            }
        } catch (error) {
            console.error('Failed to send notification request:', error);
        }
    }

    // Bind event listeners
    bindEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart, .add-to-bag') || e.target.closest('.add-to-cart, .add-to-bag')) {
                e.preventDefault();
                this.handleAddToCart(e);
            }
        });

        // Quick add to cart from product cards
        document.addEventListener('click', (e) => {
            if (e.target.matches('.quick-add-cart') || e.target.closest('.quick-add-cart')) {
                e.preventDefault();
                this.handleQuickAddToCart(e);
            }
        });
    }

    // Handle add to cart button click
    handleAddToCart(e) {
        const button = e.target.closest('.add-to-cart, .add-to-bag');
        const productCard = button.closest('.product-card, .product-details, .ul-product-item');
        
        if (!productCard) return;

        // Get product details
        const productId = productCard.dataset.productId || button.dataset.productId || Math.random().toString(36).substr(2, 9);
        const productName = productCard.querySelector('.product-title, .product-name, h3, h4')?.textContent?.trim();
        const priceElement = productCard.querySelector('.price, .product-price');
        const price = priceElement ? priceElement.textContent.replace(/[₹$,]/g, '').trim() : '99.00';
        const image = productCard.querySelector('img')?.src || '';

        // Get selected size and color
        const selectedSize = this.getSelectedSize(productCard);
        const selectedColor = this.getSelectedColor(productCard);
        const quantity = this.getSelectedQuantity(productCard);

        // Validate selections
        if (!selectedSize) {
            this.showSizeSelectionModal(productId, productName, price, image);
            return;
        }

        // Check stock availability
        if (this.isOutOfStock(productId, selectedSize, selectedColor)) {
            this.showStockNotificationModal(productId, productName, selectedSize, selectedColor);
            return;
        }

        // Add to cart
        this.addToCart(productId, productName, price, image, selectedSize, selectedColor, quantity);
    }

    // Handle quick add to cart
    handleQuickAddToCart(e) {
        const button = e.target.closest('.quick-add-cart');
        const productCard = button.closest('.product-card, .ul-product-item');
        
        if (!productCard) return;

        const productId = productCard.dataset.productId || Math.random().toString(36).substr(2, 9);
        const productName = productCard.querySelector('.product-title, h3, h4')?.textContent?.trim();
        const price = productCard.querySelector('.price')?.textContent.replace(/[₹$,]/g, '').trim() || '99.00';
        const image = productCard.querySelector('img')?.src || '';

        // Use default values for quick add
        this.addToCart(productId, productName, price, image, 'M', 'Default', 1);
    }

    // Get selected size
    getSelectedSize(container) {
        const sizeSelector = container.querySelector('input[name="size"]:checked, select[name="size"], .size-selector .active');
        return sizeSelector ? (sizeSelector.value || sizeSelector.textContent.trim()) : 'M';
    }

    // Get selected color
    getSelectedColor(container) {
        const colorSelector = container.querySelector('input[name="color"]:checked, select[name="color"], .color-selector .active');
        return colorSelector ? (colorSelector.value || colorSelector.textContent.trim()) : 'Default';
    }

    // Get selected quantity
    getSelectedQuantity(container) {
        const quantityInput = container.querySelector('input[type="number"], .quantity-input');
        return quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    }

    // Check if product is out of stock
    isOutOfStock(productId, size, color) {
        // This would normally check against real inventory
        // For demo purposes, randomly return out of stock for some combinations
        return Math.random() < 0.1; // 10% chance of being out of stock
    }

    // Show size selection modal
    showSizeSelectionModal(productId, productName, price, image) {
        const modal = document.createElement('div');
        modal.className = 'cart-modal-overlay';
        modal.innerHTML = `
            <div class="cart-modal">
                <div class="modal-header">
                    <h3>Select Size</h3>
                    <button class="modal-close" onclick="this.closest('.cart-modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="product-info">
                        <img src="${image}" alt="${productName}" class="product-image">
                        <h4>${productName}</h4>
                        <p>₹${price}</p>
                    </div>
                    <div class="size-selection">
                        <h5>Select Size:</h5>
                        <div class="size-options">
                            <button class="size-option" data-size="XS">XS</button>
                            <button class="size-option" data-size="S">S</button>
                            <button class="size-option" data-size="M">M</button>
                            <button class="size-option" data-size="L">L</button>
                            <button class="size-option" data-size="XL">XL</button>
                        </div>
                    </div>
                    <div class="color-selection">
                        <h5>Select Color:</h5>
                        <div class="color-options">
                            <button class="color-option" data-color="Black" style="background-color: black;"></button>
                            <button class="color-option" data-color="White" style="background-color: white; border: 1px solid #ccc;"></button>
                            <button class="color-option" data-color="Blue" style="background-color: blue;"></button>
                            <button class="color-option" data-color="Red" style="background-color: red;"></button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="add-to-cart-modal" onclick="cart.addFromModal('${productId}', '${productName}', '${price}', '${image}', this.closest('.cart-modal'))">Add to Cart</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle size/color selection
        modal.addEventListener('click', (e) => {
            if (e.target.matches('.size-option')) {
                modal.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
                e.target.classList.add('selected');
            }
            if (e.target.matches('.color-option')) {
                modal.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
                e.target.classList.add('selected');
            }
        });
    }

    // Add from modal
    addFromModal(productId, productName, price, image, modal) {
        const selectedSize = modal.querySelector('.size-option.selected')?.dataset.size;
        const selectedColor = modal.querySelector('.color-option.selected')?.dataset.color;

        if (!selectedSize) {
            this.showCartNotification('Please select a size', 'error');
            return;
        }

        const color = selectedColor || 'Default';
        this.addToCart(productId, productName, price, image, selectedSize, color, 1);
        modal.remove();
    }

    // Show stock notification modal
    showStockNotificationModal(productId, productName, size, color) {
        const modal = document.createElement('div');
        modal.className = 'cart-modal-overlay';
        modal.innerHTML = `
            <div class="cart-modal">
                <div class="modal-header">
                    <h3>Out of Stock</h3>
                    <button class="modal-close" onclick="this.closest('.cart-modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <p>${productName} in size ${size} and color ${color} is currently out of stock.</p>
                    <p>Would you like to be notified when it becomes available?</p>
                    <div class="notification-form">
                        <input type="email" placeholder="Enter your email" class="email-input" required>
                        <button class="notify-btn" onclick="cart.requestNotificationFromModal('${productId}', '${productName}', '${size}', '${color}', this.closest('.cart-modal'))">Notify Me</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Request notification from modal
    requestNotificationFromModal(productId, productName, size, color, modal) {
        const email = modal.querySelector('.email-input').value;
        if (!email || !email.includes('@')) {
            this.showCartNotification('Please enter a valid email address', 'error');
            return;
        }

        this.requestStockNotification(productId, productName, size, color, email);
        modal.remove();
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}