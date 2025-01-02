require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust path if needed

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Array of products to add
const products = [
        {
        name: "Pigmentation Disorders",
        price: 35,
        description: "Pigmentation Cream gives your skin nightmares, concerning",
        image: "pigmentation.jpg",
        category: "skin",
        answers: ["combination", "pigmentation"],
    }
    //     {
    //     name: "Pigmentation Disorders",
    //     price: 35,
    //     description: "Pigmentation Cream gives your skin nightmares, concerning",
    //     image: "pigmentation.jpg",
    //     category: "skin",
    //     answers: ["combination", "pigmentation"],
    // }
   // {
    //     name: "Moisturizer",
    //     price: 20,
    //     description: "A lightweight, hydrating moisturizer suitable for all skin types.",
    //     image: "moisturizer.jpg",
    //     category: "skin",
    //     answers: ["sensitive", "acne","curly", "hairFall"]
    // },
    // {
    //     name: "Serum",
    //     price: 35,
    //     description: "A powerful serum to reduce wrinkles and even out skin tone. Useful for oily skin",
    //     image: "serum.jpg",
    //     category: "skin",
    //     answers: ["oily", "wrinkles"],
    // }

    // {
    //     name: "Hair Oil",
    //     price: 15,
    //     description: "Nourishing hair oil to reduce hair fall and improve scalp health.",
    //     image: "hair-oil.jpg",
    //     category: "hair",
    //     answers: ["dry", "curly","dryness"],
    // },
];


// Add products to the database
const seedProducts = async () => {
    try {
        await Product.insertMany(products);
        console.log("Products added successfully!");
        mongoose.connection.close(); // Close connection after operation
    } catch (err) {
        console.error("Error adding products:", err);
    }
};

// Run the function
seedProducts();
