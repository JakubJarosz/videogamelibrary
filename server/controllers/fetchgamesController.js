const axios = require("axios");


const fetchGames = async (req, res) => {
  try {
    const {
      page = 1,
      page_size = 10,
      search = "",
      genres = "",
      ordering = "",
      exclude_additions=true
    } = req.query;

    const genresQuery = Array.isArray(genres) ? genres.join(",") : genres;

    const params = {
      key: process.env.RAWG_API_KEY,
      page,
      page_size,
      search,
      ordering,
      exclude_additions
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



module.exports = fetchGames;
