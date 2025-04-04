const axios = require("axios");
const fuzzysort = require("fuzzysort");
const RawgCache = require("../models/rawgCache");
const SteamProfile = require("../models/steamProfile");
const User = require("../models/user");

const fetchSteamProfile = async (req, res) => {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = req.query.steamId;
  if (!steamId) {
    return res.status(400).json({ error: "steamId is required" });
  }
  try {
    const userResponse = await axios.get(
      "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
      {
        params: { key: apiKey, steamids: steamId },
      }
    );
    const user = userResponse.data.response.players[0];

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch a Steam User", error });
  }
};

const fetchAllSteamInfo = async (steamId) => {
  const apiKey = process.env.STEAM_API_KEY;
  try {
    //fetching user
    const userResponse = await axios.get(
      "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
      {
        params: { key: apiKey, steamids: steamId },
      }
    );
    const user = userResponse.data.response.players[0];

    // fetching user games
    const gamesResponse = await axios.get(
      "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",
      {
        params: { key: apiKey, steamid: steamId, include_appinfo: 1 },
      }
    );
    const games = gamesResponse.data.response.games.map((game) => ({
      appid: game.appid,
      name: game.name,
      playtime_forever: game.playtime_forever,
      img_icon_url: game.img_icon_url,
    }));

    return {
      steamId: user.steamid,
      nickname: user.personaname,
      country: user.loccountrycode,
      avatar: user.avatarfull,
      games,
    };
  } catch (error) {
    console.log("Failed to fetch Steam Data");
  }
};

const enrichSteamGamesWithRawg = async (steamGames = []) => {
  const enrichedGames = [];

  for (const game of steamGames) {
    const normalizedName = game.name.toLowerCase().trim();

    // check local cache RAWG
    let cache = await RawgCache.findOne({ name: normalizedName });

    // check RAWG if there is no local cache
    if (!cache) {
      const searchUrl = `https://api.rawg.io/api/games?search=${encodeURIComponent(
        game.name
      )}&key=${process.env.RAWG_API_KEY}`;
      const rawgRes = await axios.get(searchUrl);
      const rawgResults = rawgRes.data.results || [];

      // Fuzzy match
      const match = fuzzysort.go(game.name, rawgResults, {
        key: "name",
        threshold: -1000,
      })[0];

      const bestMatch = match?.obj || rawgResults[0];

      if (bestMatch) {
        //fetching full data by id (needed for info like desc)
        const detailRes = await axios.get(
          `https://api.rawg.io/api/games/${bestMatch.id}?key=${process.env.RAWG_API_KEY}`
        );
        const fullGame = detailRes.data;
        // to clean russian tags
        const cleanTags = fullGame.tags
          ?.map((tag) => tag.name)
          .filter((name) => /^[\x00-\x7F]+$/.test(name))
          .slice(0, 10);

        cached = new RawgCache({
          name: normalizedName,
          rawgId: fullGame.id,
          slug: fullGame.slug,
          image: fullGame.background_image,
          tags: cleanTags,
          description: fullGame.description_raw || "",
          released: fullGame.released,
          rating: fullGame.rating,
          metacritic: fullGame.metacritic,
          publishers: fullGame.publishers?.map((p) => p.name) || [],
          developers: fullGame.developers?.map((d) => d.name) || [],
        });
        await cached.save();
      }
    }
    enrichedGames.push({
      appid: game.appid,
      name: game.name,
      playtime_forever: game.playtime_forever,
      image: cached?.image || null,
      tags: cached?.tags || [],
      description: cached?.description || "",
      released: cached?.released || "",
      rating: cached?.rating || null,
      metacritic: cached?.metacritic || null,
      publishers: cached?.publishers || [],
      developers: cached?.developers || [],
      rawgId: cached?.rawgId || null,
      slug: cached?.slug || null,
    });
  }
  return enrichedGames;
};

const addSteamToDataBase = async (req, res) => {
  const { userId, steamId } = req.body;
  try {
    const steamData = await fetchAllSteamInfo(steamId);
    if (!steamData)
      return res.status(500).json({ error: "Failed to fetch Steam profile" });

    // enrich steam games
    const enrichedGames = await enrichSteamGamesWithRawg(steamData.games);
    steamData.games = enrichedGames;

    const steamProfile = await SteamProfile.findOneAndUpdate(
      { steamId },
      steamData,
      { upsert: true, new: true }
    );

    await User.findByIdAndUpdate(userId, { steamProfile: steamProfile._id });
    res
      .status(200)
      .json({ message: "Steam account linked successfully", steamProfile });
  } catch (error) {
    console.error("Error enriching and saving Steam data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchSteamFromDataBase = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("steamProfile");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  fetchSteamProfile,
  addSteamToDataBase,
  fetchSteamFromDataBase,
};
