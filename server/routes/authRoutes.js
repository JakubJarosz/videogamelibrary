const express = require("express");
const router = express.Router();
const cors = require("cors");
const fetchGames = require("../controllers/fetchgamesController")
const {
  test,
  registerUser,
  loginUser,
  fetchUser,
  logOut
} = require("../controllers/authController");
const authenticateUser = require("../helpers/authMiddleware");

//middleare
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// test route
router.get("/", test);

// authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut)
router.get("/profile", authenticateUser, fetchUser);

// RAWG API routes
router.get("/games", authenticateUser, fetchGames)

module.exports = router;
