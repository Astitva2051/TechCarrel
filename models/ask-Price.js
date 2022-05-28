// Databse model to store ask price of a product.
const mongoose = require('mongoose');

const askpriceSchema = mongoose.Schema({
    user: {
        type:String,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    size:{
        type: Number,
        required: true,
    },
    asked_price:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("askPrice", askpriceSchema);