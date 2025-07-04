const mongoose = require("mongoose");
const { Schema } = mongoose;

const userReviewsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gameId: { type: Number, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userReviewsModel = mongoose.model("UserReviews", userReviewsSchema);

module.exports = userReviewsModel;
