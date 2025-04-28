import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Tooltip,
  Stack,
  Pagination,
  Button,
} from "@mui/material";

const LibraryOwnedGames = ({
  steam,
  startIndex,
  endIndex,
  fetchSteamAchievements,
  maxPage,
  handlePagination,
  handleOpenModal,
}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      minHeight: "100vh",
    }}>
    <Grid
      container
      spacing={2}
      sx={{justifyContent:"center"}}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
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
              <Typography variant="">{Math.round(game.playtime_forever/60)} hours in-game</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  handleOpenModal();
                  fetchSteamAchievements(game.appid);
                }}
              >
                achievements
              </Button>
              <Button onClick={() => navigate(`/reviews/${game.appid}`)}>Review</Button>
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
    </Box>
  );
};

export default LibraryOwnedGames;
