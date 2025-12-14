const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids', 'Accessories']
    },
    subcategory: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    sizes: [{
        size: String,
        stock: Number
    }],
    colors: [{
        color: String,
        stock: Number
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        userEmail: String,
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    tags: [String],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isNew: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
