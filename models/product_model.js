const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter the product name']
        },
        quantity: {
            type: Number,
            required: [true, 'Please enter the product quantity'],
            default: 0
        },
        price: {
            type: Number,
            required: [true, 'Please enter the product price']
        },
        image: {
            type: String,
            required: [true, 'Please provide the product image URL']
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
