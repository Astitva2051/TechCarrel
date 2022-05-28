// Databse model to store details of a product.
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    image:{
        type: String,
        required: true,
    },
    size:{
        type: Array,
    },
    price:{
        type: Array,
    },
})

module.exports = mongoose.model("product", productSchema);