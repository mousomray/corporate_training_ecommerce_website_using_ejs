const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: [3, 'Title must be at least 3 characters']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: "Category is Required"
    }, 
    price: {
        type: Number,
        required: "Price is Required"
    },
    image: {
        type: String,
        required: "Enter image it is Required"
    },
    description: {
        type: String,
        required: "Description is Required",
        minlength: [10, 'Description must be at least 10 characters']
    },
    stock:{
        type: Number,
        required: "Stock is Required"
    },
    active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;