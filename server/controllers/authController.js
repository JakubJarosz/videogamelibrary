const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, rest) => {
  rest.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.status(400).json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(409).json({
        error: "Email is taken already",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "No user found",
      });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.log("JWT Sign Error", err);
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Strict",
            })
            .json(user);
        }
      );
    } else {
      res.status(401).json({
        error: "Wrong password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
};

const logOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  test,
  registerUser,
  loginUser,
  fetchUser,
  logOut
};
