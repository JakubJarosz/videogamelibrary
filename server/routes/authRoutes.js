const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  fetchGames,
  fetchSingleGame,
  saveTowishList,
} = require("../controllers/fetchgamesController");
const {
  test,
  registerUser,
  loginUser,
  fetchUser,
  logOut,
} = require("../controllers/authController");
const authenticateUser = require("../helpers/authMiddleware");
const changeTheme = require("../controllers/themeController");
const {
  fetchSteamProfile,
  addSteamToDataBase,
  fetchSteamFromDataBase,
} = require("../controllers/fetchsteamdataController");
const fetchSteamAchievements = require("../controllers/fetchAchievements");
const {
  fetchReviews,
  submitReview,
  fetchUserReview
} = require("../controllers/reviewsController");

//middleare
// router.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:3000",
//   })
// );

// test route
router.get("/", test);

// authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
router.get("/profile", authenticateUser, fetchUser);

// theme change
router.post("/theme", authenticateUser, changeTheme);

// RAWG API routes
router.get("/games", authenticateUser, fetchGames);
router.get("/game/:id", authenticateUser, fetchSingleGame);
router.post("/wishlist", authenticateUser, saveTowishList);

// Steam API
router.get("/steamProfile", authenticateUser, fetchSteamProfile);
router.get("/steamData", authenticateUser, fetchSteamFromDataBase);
router.get("/steamAchievements", authenticateUser, fetchSteamAchievements);
router.post("/connect-steam", authenticateUser, addSteamToDataBase);

// Reviews
router.get("/reviews", authenticateUser, fetchReviews);
router.post("/create-review", authenticateUser, submitReview)
router.get("/user-review/:id", authenticateUser, fetchUserReview)

module.exports = router;
