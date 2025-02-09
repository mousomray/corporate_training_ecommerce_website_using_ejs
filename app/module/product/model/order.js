const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", // References the User model
            required: [true, "UserId is Required"]
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product", // References the Product model
            required: [true, "ProductId is Required"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is Required"]
        },
        address: {
            type: String,
            required: [true, "Address is Required"]
        },
        payment: {
            type: String,
            required: [true, "Please add payment method"],
            enum: ["Cash", "Card"], // Only Cash on Delivery or Card
        },
        status: {
            type: String,
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
    },
    { timestamps: true } 
);

module.exports = mongoose.model("order", OrderSchema);
