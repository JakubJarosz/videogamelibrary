const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewsSchema = new Schema({
    reviews: [
        {
            gameId: Number,
            userName: String,
            rating: Number,
            title: String,
            description: String,
            createdAt: Date
        }
      ]
});


const ReviewsModel = mongoose.model("Reviews", reviewsSchema);

module.exports = ReviewsModel