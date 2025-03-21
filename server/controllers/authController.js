const User = require("../models/user");

const test = (req, rest) => {
  rest.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
};
