import React from "react";
import { useNavigate } from "react-router-dom";
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
              <Button
                onClick={() => {
                  handleOpenModal();
                  fetchSteamAchievements(game.appid);
                }}
              >
                achievements
              </Button>
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

export default LibraryOwnedGames;
