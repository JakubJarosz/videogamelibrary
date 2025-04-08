const axios = require("axios");

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
  const {id} = req.query
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: process.env.RAWG_API_KEY,
      }
    })
    console.log(response.data)
  } catch (error) {
     res.status(500).json("Failed to save game to wishlist", error)
  }
}

module.exports = { fetchGames, fetchSingleGame, saveTowishList };
