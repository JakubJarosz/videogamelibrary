const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    games: [
        {
            id: Number,
            name: String,
            image: String,
        }
      ]
});


const WishlistModel = mongoose.model("WishList", wishlistSchema);

module.exports = WishlistModel