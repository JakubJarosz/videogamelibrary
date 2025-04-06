import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSteamData } from "../state/steamSlice";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import LibraryOwnedGames from "../components/LibraryOwnedGames";
import AchievementsModal from "../components/AchievementsModal";

const Library = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const steam = useSelector((state) => state.steam?.user?.games || []);
  const [page, setPage] = useState(1);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 899px
  const isLargeScreen = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900px - 1199px
  // modal logic
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const visibleCards = isSmallScreen
    ? 4
    : isMediumScreen
    ? 4
    : isLargeScreen
    ? 6
    : 8;
  const startIndex = (page - 1) * visibleCards;
  const endIndex = startIndex + visibleCards;
  const maxPage = Math.ceil(steam.length / visibleCards);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(fetchSteamData());
  }, [dispatch]);

  const steamId = useSelector((state) => state.steam?.user?.steamId || "");

  const fetchSteamAchievements = async (appId) => {
    try {
      await axios.get("/steamAchievements", {
        params: {
          appId: appId,
          steamId: steamId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LibraryOwnedGames
        steam={steam}
        startIndex={startIndex}
        endIndex={endIndex}
        fetchSteamAchievements={fetchSteamAchievements}
        maxPage={maxPage}
        handlePagination={handlePagination}
        handleOpenModal={handleOpenModal}
      />
      <AchievementsModal 
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Library;
