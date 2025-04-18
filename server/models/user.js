const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,},
  theme: {type: String, enum: ["dark", "light"], default: "light"},
  steamProfile: {type: Schema.Types.ObjectId, ref: "SteamProfile"},
  wishList: {type: Schema.Types.ObjectId, ref: "WishList"}
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel
