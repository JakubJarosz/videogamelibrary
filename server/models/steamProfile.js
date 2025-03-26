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
        img_icon_url: String
    }
  ]
});

const SteamProfileModel = mongoose.model("SteamProfile", SteamProfileSchema);

module.exports = SteamProfileModel
