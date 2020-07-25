const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const { User, Product } = require('./constants')

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: Product,
    },
    count: Number,
})

const orderSchema = new mongoose.Schema(
    {
        products: [ProductCartSchema],
        transaction_id: {},
        isCashOnDelivery: Boolean,
        amount: Number,
        address: String,
        status: {
            type: String,
            default: "Recieved",
            enum: ['Cancelled', 'Delivered', 'Shipped', 'Processing', 'Recieved']
        },
        updated: Date,
        user: {
            type: ObjectId,
            ref: User,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema)
const ProductCart = mongoose.model('ProductCart', ProductCartSchema)

module.exports = { Order, ProductCart }

