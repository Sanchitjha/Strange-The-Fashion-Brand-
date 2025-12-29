const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// In-memory storage for demo purposes
let orders = [];
let stockNotifications = [];
let nextOrderId = 1;

// Routes

// Get product stock information
app.get('/api/products/:id/stock', (req, res) => {
    const productId = parseInt(req.params.id);
    
    // Sample stock data (in real app, this would come from database)
    const stockData = {
        1: { stock: 15, sizes: { XS: 2, S: 5, M: 4, L: 3, XL: 1 } },
        2: { stock: 8, sizes: { XS: 1, S: 3, M: 2, L: 2 } },
        3: { stock: 20, sizes: { '6': 3, '7': 4, '8': 5, '9': 4, '10': 3, '11': 1 } },
        4: { stock: 5, sizes: { 'One Size': 5 } },
        5: { stock: 12, sizes: { S: 3, M: 4, L: 3, XL: 2 } },
        6: { stock: 3, sizes: { XS: 1, S: 1, M: 1, L: 0 } }
    };
    
    const stock = stockData[productId];
    if (!stock) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(stock);
});

// Place an order
app.post('/api/orders', (req, res) => {
    try {
        const { items, customerInfo, totalAmount, shippingMethod, promoCode } = req.body;
        
        if (!items || !items.length) {
            return res.status(400).json({ error: 'No items in order' });
        }
        
        if (!customerInfo || !customerInfo.email) {
            return res.status(400).json({ error: 'Customer information required' });
        }
        
        const order = {
            id: nextOrderId++,
            items: items.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
                color: item.color,
                image: item.image
            })),
            customerInfo: {
                email: customerInfo.email,
                name: customerInfo.name || '',
                phone: customerInfo.phone || ''
            },
            totalAmount: parseFloat(totalAmount),
            shippingMethod: shippingMethod || 'standard',
            promoCode: promoCode || null,
            status: 'confirmed',
            orderDate: new Date().toISOString(),
            estimatedDelivery: getEstimatedDelivery(shippingMethod)
        };
        
        orders.push(order);
        
        res.json({
            success: true,
            orderId: order.id,
            message: 'Order placed successfully',
            estimatedDelivery: order.estimatedDelivery
        });
        
    } catch (error) {
        console.error('Order placement error:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Request stock notification
app.post('/api/stock-notifications', (req, res) => {
    try {
        const { productId, productName, size, color, email } = req.body;
        
        if (!productId || !email) {
            return res.status(400).json({ error: 'Product ID and email are required' });
        }
        
        const notification = {
            id: Date.now(),
            productId: parseInt(productId),
            productName,
            size,
            color,
            email,
            requestDate: new Date().toISOString(),
            status: 'active'
        };
        
        stockNotifications.push(notification);
        
        res.json({
            success: true,
            message: 'Stock notification request received. We\'ll notify you when the product is available.'
        });
        
    } catch (error) {
        console.error('Stock notification error:', error);
        res.status(500).json({ error: 'Failed to register stock notification' });
    }
});

// Validate promo code
app.post('/api/promo/validate', (req, res) => {
    const { code } = req.body;
    
    // Sample promo codes (in real app, this would come from database)
    const promoCodes = {
        'SAVE10': { discount: 10, type: 'percentage', minAmount: 50 },
        'WELCOME20': { discount: 20, type: 'percentage', minAmount: 100 },
        'FLAT15': { discount: 15, type: 'fixed', minAmount: 30 },
        'FREESHIP': { discount: 0, type: 'free_shipping', minAmount: 25 }
    };
    
    const promo = promoCodes[code?.toUpperCase()];
    
    if (!promo) {
        return res.status(400).json({ error: 'Invalid promo code' });
    }
    
    res.json({
        valid: true,
        discount: promo.discount,
        type: promo.type,
        minAmount: promo.minAmount,
        message: getPromoMessage(promo)
    });
});

// Get orders (for admin)
app.get('/api/orders', (req, res) => {
    res.json(orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
});

// Get stock notifications (for admin)
app.get('/api/stock-notifications', (req, res) => {
    res.json(stockNotifications.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate)));
});

// Helper functions
function getEstimatedDelivery(shippingMethod) {
    const now = new Date();
    const deliveryDays = {
        'express': 1,
        'standard': 3,
        'economy': 7
    };
    
    const days = deliveryDays[shippingMethod] || 3;
    now.setDate(now.getDate() + days);
    
    return now.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

function getPromoMessage(promo) {
    switch (promo.type) {
        case 'percentage':
            return `${promo.discount}% off on orders above $${promo.minAmount}`;
        case 'fixed':
            return `$${promo.discount} off on orders above $${promo.minAmount}`;
        case 'free_shipping':
            return `Free shipping on orders above $${promo.minAmount}`;
        default:
            return 'Discount applied';
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 E-commerce API server running on http://localhost:${PORT}`);
    console.log(`📁 Serving frontend files from: ${path.join(__dirname, 'frontend')}`);
    console.log('🛍️  Cart API endpoints available:');
    console.log('   - GET  /api/products/:id/stock');
    console.log('   - POST /api/orders');
    console.log('   - POST /api/stock-notifications');
    console.log('   - POST /api/promo/validate');
    console.log('   - GET  /api/orders (admin)');
    console.log('   - GET  /api/stock-notifications (admin)');
});

module.exports = app;