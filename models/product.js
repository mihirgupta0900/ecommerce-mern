const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { User, Product, Category } = require('./constants')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            required: true,
            maxlength: 32,
            trim: true,
        },
        category: {
            type: ObjectId, /* Similar to Primary Key in RDBMS */
            ref: Category /* The model name for categorySchema */,
            required: true,
        },
        stock /* Number of tshirts in stock */: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        // size: {
        //     type: String,
        //     uppercase: true,
        //     enum: ['S', 'M', 'L', 'XL', 'XXL']
        // }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
