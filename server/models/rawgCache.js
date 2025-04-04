const mongoose = require("mongoose");
const { Schema } = mongoose;

const RawgCacheSchema = new Schema({
  name: { type: String, required: true, unique: true },
  rawgId: Number,
  slug: String,
  image: String,
  tags: [String],
  description: String,
  released: String,
  rating: Number,
  metacritic: Number,
  publishers: [String],
  developers: [String],
}, { timestamps: true });

module.exports = mongoose.model("RawgCache", RawgCacheSchema);