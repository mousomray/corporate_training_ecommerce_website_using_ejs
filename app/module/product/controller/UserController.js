const ProductRepo = require('../repository/productrepo')
const CategortRepo = require('../../category/repository/CategoryRepo')
const path = require('path');
const fs = require('fs');

class UserController {

    // Get product list 
    async showproduct(req, res) {
        try {
            const products = await ProductRepo.allProducts();
            const categories = await CategortRepo.pCountCat();
            console.log("My cattt",categories)
            res.render('user/product/product', { categories, products, user: req.user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error retrieving products" });
        }
    }

    // Single product 
    async singleproduct(req, res) {
        const id = req.params.id;
        try {
            const product = await ProductRepo.oneProduct(id);
            const categories = await CategortRepo.allCategories();
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.render('admin/product/editproduct', { categories, product, user: req.user });
        } catch (error) {
            console.error('Error fetching product:', error);
            return res.status(500).send('Error fetching product');
        }
    }

     // Category wise product
     async catwiseproduct(req, res) {
        const categoryId = req.params.id;
        try {
            const mydata = await CategortRepo.catWiseProduct(categoryId)
            console.log("Myyy...", mydata);
            const categories = await CategortRepo.pCountCat()
            res.render('user/product/catwiseproduct', { categories, mydata, user: req.user });
        } catch (error) {
            console.log("Error fetching products...", error);
            res.status(500).json({ error: 'Server error while fetching products' });
        }
    }



    // Filter by price
    async filterByPrice(req, res) {
        try {
            const minPrice = parseInt(req.query.min) || 0;
            const maxPrice = parseInt(req.query.max) || 1000;
            const products = await ProductRepo.priceWiseProduct(minPrice, maxPrice)
            console.log("My filter data...", products)
            const categories = await CategortRepo.pCountCat()
            res.render("user/product/product", { categories, products, user: req.user });
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error });
        }
    }

    // Search product
    async search(req, res) {
        const { title } = req.query;
        try {
            const products = await ProductRepo.searchProduct(title);
            const categories = await CategortRepo.pCountCat();
            res.render("user/product/product", { categories, products, user: req.user })
        } catch (error) {
            console.error("Error retrieving search answers:", error);
            res.status(500).json({ message: "Error retrieving answers" });
        }
    }

}

module.exports = new UserController();