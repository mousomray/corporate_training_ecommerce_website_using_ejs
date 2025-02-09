const OrderModel = require('../model/order');
const mongoose = require('mongoose');

class OrderRepo {

    // Add order function
    async createOrder(orderData) {
        return OrderModel.create(orderData)
    }

    // Handle existing order 
    async findOrderByUserAndproduct(userId, productId) {
        return OrderModel.find({ userId, productId })
    }

    // Show all users orders 
    async userOrders(userId) {
        return OrderModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'orderdetails'
                }
            },
            {
                $unwind: '$orderdetails'
            }
        ])
    }

    // Show all admin orders
    async adminOrders() {
        return OrderModel.aggregate([
            {
                $lookup: {
                    from: 'products', // Reference to the 'products' collection
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'orderdetails'
                }
            },
            {
                $lookup: {
                    from: 'users', // Reference to the 'users' collection
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userdetails'
                }
            },
            {
                $unwind: '$orderdetails' // Unwind the product details
            },
            {
                $unwind: '$userdetails' // Unwind the user details
            },
        ])
    }

    // Change order status 
    async updateStatus(orderId, status) {
        return OrderModel.findByIdAndUpdate(orderId, { status, updatedAt: Date.now() }, { new: true });
    }

}

module.exports = new OrderRepo(); 
