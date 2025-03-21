const express = require("express");
const router = express.Router();
const cors = require("cors");
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

router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut)
router.get("/profile", authenticateUser, fetchUser);

module.exports = router;
