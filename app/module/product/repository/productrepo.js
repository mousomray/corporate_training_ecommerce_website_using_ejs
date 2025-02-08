const ProductModel = require('../model/product');
const mongoose = require('mongoose');

class ProductRepo {

    // Add product function
    async createProduct(productData) {
        return ProductModel.create(productData)
    }

    // All products function for admin pannel
    async allProducts() {
        return await ProductModel.find();
    }

    // Get search product with query parameter
    async getSearchProduct(filter) {
        return await ProductModel.find({ active: true, ...filter })
    }

    // Fetch single product
    async oneProduct(id) {
        return await ProductModel.findById(id);
    }

    // Update product 
    async updateproduct(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData)
    }

    // Delete product 
    async deleteproduct(id) {
        return await ProductModel.findByIdAndDelete(id);
    }

    // Price wise product 
    async priceWiseProduct(minPrice, maxPrice) {
        return await ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } })
    }

    // Search product 
    async searchProduct(title) {
        return await ProductModel.aggregate([
            {
                $match: { title: { $regex: new RegExp(title, "i")}}
            },
        ]);
    }

}

module.exports = new ProductRepo(); 
