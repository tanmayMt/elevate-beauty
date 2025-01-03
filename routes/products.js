const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
    console.log("get('/products')");
    const products = await Product.find();
    res.render("products", { products });
});

module.exports = router;
