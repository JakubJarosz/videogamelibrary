const axios = require("axios");
const Reviews = require("../models/reviews");
const UserReviews = require("../models/userReviews");

const fetchReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch reviews" });
  }
};

const submitReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId, title, description, rating } = req.body;
    if (!gameId || !title || !description || !rating) {
      return res.status(400).json({ error: "All field are required" });
    }
    const existingReview = await UserReviews.findOne({ user: userId, gameId });

    if (existingReview) {
      existingReview.title = title;
      existingReview.description = description;
      existingReview.rating = rating;
      await existingReview.save();
      return res
        .status(200)
        .json({ message: "Review updated.", review: existingReview });
    } else {
      const newReview = new UserReviews({
        user: userId,
        gameId,
        title,
        description,
        rating,
      });
      await newReview.save();

      return res
        .status(200)
        .json({ message: "Review created", review: newReview });
    }
  } catch (error) {
    console.error("Review error:", error);
    return res.status(500).json({ error: "Server error, try again later" });
  }
};

const fetchUserReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId } = req.params;

    const review = await UserReviews.findOne({
      user: userId,
      gameId: Number(gameId),
    });

    if (!review) {
      return res.status(404).json({ message: "No review found" });
    }

    res.status(200).json({ review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = { fetchReviews, submitReview, fetchUserReview };
