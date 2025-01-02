const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Product = require("../models/Product");


router.get("/", (req, res) => {
    console.log("get('\\quiz')");
    res.render("quiz");
});

// router.post("/", async (req, res) => {
//     console.log("post('\\quiz')");

//     const { type, answers } = req.body;
//     const quiz = new Quiz({ type, answers, result: "Sample Result" });
//     await quiz.save();
    
//     // Extract categories and answers from the quiz result
//     const categories = answers.categories || [];
//     const answerKeywords = answers.answers || [];
   
//     console.log(categories);
//     console.log(answerKeywords);   

//     // Fetch products based on both category and matching answers
//     const recommendedProducts = await Product.find({
//         category: type,  // Match category based on quiz type
//         answers: { $in: answerKeywords },  // Match answers array with product answers
//     });

//     console.log(recommendedProducts);
//     console.log(quiz);
//     console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------");
    
//     res.render("recommendProducts", { products: recommendedProducts });
// });

router.post("/", async (req, res) => {
    console.log("post('/quiz')");

    const { type, answers } = req.body;
    const quiz = new Quiz({ type, answers, result: "Sample Result" });
    await quiz.save();

    // Fetch products based on category and matching answers
    const categories = answers.categories || []; // Assume `answers.categories` contains selected categories

    // Find products that match both the category and answers
    const recommendedProducts = await Product.find({
        category: quiz.type,
        $or: [
            { "answers": { $in: categories } },
            { "answers": { $in: Object.values(answers) } }
        ]
    });

    console.log(recommendedProducts);
    console.log(quiz);
    res.render("recommendProducts", { products: recommendedProducts });
});

module.exports = router;
