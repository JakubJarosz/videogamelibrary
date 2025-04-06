const axios = require("axios");
const User = require("../models/user");

const fetchSteamAchievements = async (req, res) => {
  const steamKey = process.env.STEAM_API_KEY;
  const { appId, steamId } = req.query;

  try {
    // Making requests
    const playerAchievementsUrl = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${steamKey}&steamid=${steamId}`;
    const globalProcAchievementsUrl = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appId}`;
    const achievementsDescUrl = `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${steamKey}&appid=${appId}`;

    // Fetch all data concurrently using Promise.all
    const [
      playerAchievementsRes,
      globalProcAchievementsRes,
      achievementsDescRes,
    ] = await Promise.all([
      axios.get(playerAchievementsUrl).catch((error) => error),
      axios.get(globalProcAchievementsUrl).catch((error) => error),
      axios.get(achievementsDescUrl).catch((error) => error),
    ]);

    if (
      playerAchievementsRes instanceof Error ||
      globalProcAchievementsRes instanceof Error ||
      achievementsDescRes instanceof Error
    ) {
      throw new Error("One of the requests failed.");
    }

    const slicedAchievementsDesc =
      achievementsDescRes.data.game.availableGameStats.achievements.map(
        (item) => ({
          name: item.name,
          description: item.description,
          displayName: item.displayName,
          icon: item.icon,
          icongray: item.icongray,
        })
      );
    const slicedAchievements =
      playerAchievementsRes.data.playerstats.achievements.map((item) => ({
        name: item.apiname,
        achieved: item.achieved,
        unlocktime: item.unlocktime,
      }));

    const slicedGlobalProcAchievements =
      globalProcAchievementsRes.data.achievementpercentages.achievements;

    const all = [
      ...slicedAchievements,
      ...slicedAchievementsDesc,
      ...slicedGlobalProcAchievements,
    ];

    const merged = Object.values(
      all.reduce((acc, item) => {
        const {name} = item;
        if(!acc[name]) acc[name] = {name};
        Object.assign(acc[name], item);
        return acc
      }, {})
    )
    return res.status(200).json(merged);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching achievements or other data.",
      error: error.message,
    });
  }
};

module.exports = fetchSteamAchievements;
module.exports = fetchSteamAchievements;
