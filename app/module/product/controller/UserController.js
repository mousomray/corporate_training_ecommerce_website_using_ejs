const ProductRepo = require('../repository/productrepo')
const OrderRepo = require('../repository/orderrepo')
const CategortRepo = require('../../category/repository/CategoryRepo')
const path = require('path');
const fs = require('fs');

class UserController {

    // Get product list 
    async showproduct(req, res) {
        try {
            const products = await ProductRepo.allProducts();
            const categories = await CategortRepo.pCountCat();
            console.log("My cattt", categories)
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
            const categories = await CategortRepo.pCountCat();
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.render('user/product/productdetails', { categories, product, user: req.user });
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

    // Order post form
    async PostOrderGet(req, res) {
        const id = req.params.id;
        const product = await ProductRepo.oneProduct(id);
        return res.render('user/product/postorder', { product, user: req.user })
    }

    // Order post
    async PostOrderPost(req, res) {
        try {
            const userId = req.user._id
            const id = req.params.id
            const { quantity, address, payment } = req.body;
            console.log("amar body...", req.user)
            if (!quantity || !address || !payment || !userId || !id) {
                req.flash('err', 'All fields are required')
                return res.redirect(generateUrl('postorder', { id }));
            }
            // Check if user has already ordered this job
            const existingOrder = await OrderRepo.findOrderByUserAndproduct(userId, id)
            if (existingOrder.length > 0) {
                req.flash('err', 'You already ordered this product')
                return res.redirect(generateUrl('postorder', { id }))
            }
            const orderData = {
                userId: userId.trim(),
                productId: id,
                quantity: quantity,
                address: address.trim(),
                payment: payment.trim(),
            };
            const response = await OrderRepo.createOrder(orderData)
            console.log("My data...", response);
            req.flash('sucess', 'Your order is sucessfully')
            return res.redirect(generateUrl('orderlist'));
        } catch (error) {
            console.error('Error saving order:', error);
            req.flash('err', 'Error posting product')
        }
    }

    // Order list
    async OrderList(req, res) {
        const userId = req.user._id;
        const orders = await OrderRepo.userOrders(userId)
        console.log("Order data...", orders)
        return res.render('user/product/orderlist', { orders, user: req.user })
    }

}

module.exports = new UserController();