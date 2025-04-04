const mongoose = require("mongoose");
const { Schema } = mongoose;

const SteamProfileSchema = new Schema({
  steamId: {type: String, unique: true, required: true},
  nickname: String,
  country: String,
  avatar: String,
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

const SteamProfileModel = mongoose.model("SteamProfile", SteamProfileSchema);

module.exports = SteamProfileModel
