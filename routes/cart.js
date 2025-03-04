const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart"); // Assuming you have a Cart model

// // Get Products
// router.get("/", async (req, res) => {
//     try {
//         console.log("GET /");
//         const products = await Product.find();
//         res.render("products", { products });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server Error");
//     }
// });

// Add to Cart
router.post("/cart", async (req, res) => {
    try {
        const { productId } = req.body;

        // Fetch the product to add to the cart
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Assuming you have a user session and a Cart model
        const userId = req.session.userId; // Replace with actual user identification
        let cart = await Cart.findOne({ userId });

        // If no cart exists for the user, create one
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Increase quantity if already in cart
            cart.items[existingItemIndex].quantity += 1;
        } else {
            // Add new product to cart
            cart.items.push({
                product: productId,
                quantity: 1,
            });
        }

        await cart.save();
        console.log("Product added to cart");
        res.redirect("/cart"); // Redirect to the product page or cart page
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
