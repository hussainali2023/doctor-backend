const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
    {
        category: {
            type:String,
            required:true,
        },
        name: {
            type:String,
            required:true,
        },
        seller: {
            type:String,
            required:true,
        },
        price: {
            type:Number,
            required:true,
        },
        stock: {
            type:Number,
            required:true,
        },
        rating: {
            type:Number,
            required:true,
        },
        ratingCount: {
            type:Number,
            required:true,
        },
        img: {
            type:String,
            required:true,
        },
        shipping: {
            type:Number,
            required:true,
        },
        quantity: {
            type:Number,
            required:true,
        },
    }
);


module.exports = mongoose.model("Product", ProductsSchema)
