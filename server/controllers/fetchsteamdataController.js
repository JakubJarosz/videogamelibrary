const axios = require("axios");
const SteamProfile = require("../models/steamProfile");
const User = require("../models/user")

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

const addSteamToDataBase = async (req, res) => {
  const { userId, steamId } = req.body;
  try {
    const steamData = await fetchAllSteamInfo(steamId);
    if (!steamData)
      return res.status(500).json({ error: "Failed to fetch Steam profile" });
    const steamProfile = await SteamProfile.findOneAndUpdate(
      { steamId },
      steamData,
      { upsert: true, new: true }
    );
 
    await User.findByIdAndUpdate(userId, {steamProfile: steamProfile._id})
    res.status(200).json({message: "Steam account linked successfully", steamProfile})
  } catch (error) {}
};

module.exports = { fetchSteamProfile, addSteamToDataBase };
