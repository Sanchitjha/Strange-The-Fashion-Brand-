const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authMiddleware } = require('../middleware/auth');

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create order
router.post('/', authMiddleware, async (req, res) => {
    try {
        const order = await Order.create({
            ...req.body,
            userId: req.user.id,
            orderNumber: 'ORD-' + Date.now()
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get order by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order || order.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
