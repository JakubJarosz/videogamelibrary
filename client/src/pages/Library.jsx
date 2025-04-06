import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSteamData } from "../state/steamSlice";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Tooltip,
  Stack,
  Pagination,
  useMediaQuery,
  Button,
} from "@mui/material";

const Library = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const steam = useSelector((state) => state.steam?.user?.games || []);
  const [page, setPage] = useState(1);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 899px
  const isLargeScreen = useMediaQuery(theme.breakpoints.between("md", "lg")); // 900px - 1199px

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

 
  const [achievements, setAchievements] = useState({});
  const steamId = useSelector((state) => state.steam?.user?.steamId || "");

  const fetchSteamAchievements = async (appId) => {
    try {
      await axios.get("/steamAchievements", {
        params: {
          appId: appId,
          steamId: steamId
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ color: "white" }}>
          Owned games:
        </Typography>
      </Grid>
      {steam.slice(startIndex, endIndex).map((game) => (
        <Grid item tem key={game.appid} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              image={game.image}
              alt={game.name}
              height="150"
            />
            <CardContent onClick={() => navigate(`/games/${game.rawgId}`)}>
              <Tooltip title={game.name}>
                <Typography noWrap sx={{ cursor: "pointer" }}>
                  {game.name}
                </Typography>
              </Tooltip>
            </CardContent>
            <CardActions>
              <Button onClick={() =>fetchSteamAchievements(game.appid)}>more</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid container item xs={12} sx={{ justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={maxPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Library;
