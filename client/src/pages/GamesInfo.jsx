import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip,
  Divider,
  Tooltip,
  CardActions,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const GamesInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/game/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchGame();
  }, [id]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h4">{data.name}</Typography>
          </Grid>
          <Grid item md={7}>
            <Card>
              <CardMedia
                component="img"
                image={
                  data.background_image || "https://via.placeholder.com/150"
                }
              />
              <CardContent>
                <Typography variant="h7">Tags:</Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mt: "10px" }}
                >
                  {data.tags?.length > 0 ? (
                    data.tags.map((tag) => (
                      <Chip label={tag.name} key={tag.id} />
                    ))
                  ) : (
                    <Typography>Don't have tags</Typography>
                  )}
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={5}>
            <Card>
              <CardMedia
                component="img"
                image={
                  data.background_image_additional ||
                  "https://via.placeholder.com/150"
                }
              />
              <CardContent>
                <Tooltip title={data.description_raw} arrow>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Limit to 2 lines
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      cursor: "pointer",
                    }}
                  >
                    {data.description_raw}
                  </Typography>
                </Tooltip>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  sx={{ mt: "5px" }}
                >
                  <Typography>Realsed date:</Typography>
                  <Typography>{data.released}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-evenly">
                  <Typography>User rating:</Typography>
                  <Typography>{data.rating}/5</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-evenly">
                  <Typography>Metacritic:</Typography>
                  <Typography>{data.metacritic}/100</Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  sx={{ mt: "5px" }}
                >
                  <Typography>Publishers</Typography>
                  {data.publishers?.length > 0 ? (
                    data.publishers.map((pub) => (
                      <Chip label={pub.name} key={pub.id} />
                    ))
                  ) : (
                    <></>
                  )}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  sx={{ mt: "5px" }}
                >
                  <Typography>Developers</Typography>
                  {data.developers?.length > 0 ? (
                    data.developers.map((pub) => <Chip label={pub.name} />)
                  ) : (
                    <></>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default GamesInfo;
