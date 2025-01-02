const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
    console.log("get('\\recommendedProducts')");
    const products = await Product.find();
    res.render("recommendProducts", { products });
});
router.post("/", async (req, res) => {
    console.log("post('\\recommendedProducts')");
    const { type, answers } = req.body;
    const quiz = new Quiz({ type, answers, result: "Sample Result" });
    await quiz.save();

    // Fetch products based on quiz result
    const recommendedProducts = await Product.find({ category: quiz.result });

    res.render("recommendProducts", { products: recommendedProducts });
});





module.exports = router;
