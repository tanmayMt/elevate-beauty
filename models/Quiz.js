const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    type: String,
    answers: Object,// Store answers as an object
    result: String,
});

module.exports = mongoose.model("Quiz", QuizSchema);
