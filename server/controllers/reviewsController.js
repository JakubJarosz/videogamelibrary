const axios = require("axios");
const Reviews = require("../models/reviews")

const fetchReviews = async (req,res) => {
    try {
       const reviews = await Reviews.find();
       res.status(200).json(reviews)
    } catch (error) {
       res.status(500).json({error: "failed to fetch reviews"})
    }
}

module.exports = fetchReviews