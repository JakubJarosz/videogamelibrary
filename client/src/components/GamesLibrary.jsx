import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Tooltip
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GamesLibrary = ({ title, ordering }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const visibleCards = isSmallScreen ? 1 : isMediumScreen ? 2 : 4;

  useEffect(() => {
    fetchGames(page);
  }, [page]);

  const prevBtn = () => {
    setIndex((prev) => prev - 1);
  };

  const nextBtn = () => {
    if (index + visibleCards >= data.length - 1) {
      setPage((prev) => prev + 1);
    }
    setIndex((prev) => prev + 1);
  };
  const fetchGames = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get("/games", {
        params: {
          page: pageNumber,
          ordering: ordering,
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

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
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mb: "70px",
            
          }}
        >
          <Grid item xs={12} align="left">
            <Typography variant="h4" sx={{ color: (theme) => theme.palette.text.primary }}>{title}</Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton disabled={index === 0} onClick={prevBtn}>
              <ArrowBackIosIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={10}
            container
            spacing={2}
            wrap="nowrap"
            overflow="hidden"
          >
            {data.slice(index, index + visibleCards).map((el) => (
              <Grid item xs={12 / visibleCards} key={el.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={
                      el.background_image || "https://via.placeholder.com/150"
                    }
                    sx={{ cursor: "pointer" }}
                  />
                  <CardContent>
                    <Tooltip title={el.name}>
                    <Typography noWrap sx={{cursor: "pointer"}}>{el.name}</Typography>
                    </Tooltip>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={() => navigate(`/games/${el.id}`)}>
                      Details
                    </Button>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={nextBtn}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default GamesLibrary;
