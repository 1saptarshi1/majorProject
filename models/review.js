const { number } = require("joi");
const mongoose = require("mongoose"); // import mongoose
const { Schema } = mongoose; // extract Schema

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review", reviewSchema);