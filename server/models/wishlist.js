const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    games: [
        {
            appid: Number,
            name: String,
            playtime_forever: Number,
            image: String,
            tags: [String],
            description: String,
            released: String,
            rating: Number,
            metacritic: Number,
            publishers: [String],
            developers: [String],
            rawgId: Number,
            slug: String,
        }
      ]
});


const WishlistModel = mongoose.model("WishList", wishlistSchema);

module.exports = WishlistModel