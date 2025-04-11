const axios = require("axios");
const User = require("../models/user");
const WishList = require("../models/wishlist")
const fetchGames = async (req, res) => {
  try {
    const {
      page = 1,
      page_size = 10,
      search = "",
      genres = "",
      ordering = "",
      exclude_additions = true,
    } = req.query;

    const genresQuery = Array.isArray(genres) ? genres.join(",") : genres;

    const params = {
      key: process.env.RAWG_API_KEY,
      page,
      page_size,
      search,
      ordering,
      exclude_additions,
      search_precise: true
    };

    if (genresQuery) {
      params.genres = genresQuery;
    }

    const response = await axios.get("https://api.rawg.io/api/games", {
      params: params,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

const fetchSingleGame = async(req,res) => {
   const {id} = req.params
   try {
      const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
        params: {
          key: process.env.RAWG_API_KEY,
        }
      })
      res.status(200).json(response.data)
   } catch (error){
    res.status(500).json({error: error })
   }
};


const saveTowishList = async(req,res) => {
  const {userId, gameId} = req.body
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
      params: {
        key: process.env.RAWG_API_KEY,
      }
    })
    const wishGame = {
      id: response.data.id,
      name: response.data.name,
      image: response.data.background_image,
    }
   const user =  await User.findById(userId).populate("wishList");

   if(!user.wishList) {
     const newWishList = await WishList.create({games: [wishGame]})
     user.wishList = newWishList._id;
     await user.save();
   } else {
      const alreadyAdded = user.wishList.games.some(game => game.id === wishGame.id);
      if (alreadyAdded) {
        user.wishList.games = user.wishList.games.filter(game => game.id !== wishGame.id);
        await user.wishList.save();
        return res.status(200).json("Game removed from wishlist")
      } else {
        user.wishList.games.push(wishGame);
        await user.wishList.save();
      }
   }
    res.status(200).json("Adding to wishlist successful");
  } catch (error) {
     res.status(500).json("Failed to save game to wishlist")
  }
}

module.exports = { fetchGames, fetchSingleGame, saveTowishList };
