require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// Middleware
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use("/quiz", require("./routes/quiz"));
app.use("/products", require("./routes/products"));
app.use("/recommendProducts", require("./routes/recommendProducts"));
app.use("/payment", require("./routes/payment"));

// Homepage
app.get("/", (req, res) => {
    res.render("index");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server running on port http://localhost:${PORT}`);
});
