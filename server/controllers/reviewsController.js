const axios = require("axios");
const Reviews = require("../models/reviews")

const fetchReviews = async (req,res) => {
    try {

    } catch (error) {
       res.status(500).json({error: "failed to fetch reviews"})
    }
}