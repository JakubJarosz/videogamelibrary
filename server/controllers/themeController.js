const User = require("../models/user");

const changeTheme = async(req, res) => {
   const userId = req.user.id;
   const {theme} = req.body
   await User.findByIdAndUpdate(userId, {theme});

   res.status(200).json({message: `Theme changed to ${{theme}}`})
}

module.exports = changeTheme