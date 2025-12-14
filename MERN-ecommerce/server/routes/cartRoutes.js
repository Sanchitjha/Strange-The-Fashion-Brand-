const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authMiddleware } = require('../middleware/auth');

// Get cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add to cart
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { productId, quantity, size, color, price, image, productName } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                userId: req.user.id,
                items: [{ productId, quantity, size, color, price, image, productName }]
            });
        } else {
            const existingItem = cart.items.find(item =>
                item.productId.toString() === productId && item.size === size && item.color === color
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, size, color, price, image, productName });
            }
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove from cart
router.post('/remove/:productId', authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Clear cart
router.delete('/', authMiddleware, async (req, res) => {
    try {
        await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
