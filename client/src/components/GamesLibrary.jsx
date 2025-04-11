import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import genres from "../data/genres";
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
  Tooltip,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GamesLibrary = ({ title, ordering, showSearch }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?._id);
  const wishlist = useSelector((state) => state.auth.user?.wishList?.games);
  //snackbar
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  //pagination
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  //wishlist
  const [favourite, setFavourite] = useState({});
  //form
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  //theme
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const visibleCards = isSmallScreen ? 1 : isMediumScreen ? 2 : 4;

  useEffect(() => {
    fetchGames(page);
  }, [page]);
  //pagination logic
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

  //WishliSt logic
  const handleToWishlist = async (gameId) => {
    try {
      await axios.post("/wishlist", { userId, gameId });
    } catch (error) {
      console.log(error);
    }
  };

  const isGameInWishlist = (game, wishlist) => {
    return wishlist?.some((wish) => wish.name === game.name);
  };

  const toggleFavourite = (gameId) => {
    setFavourite((prev) => ({
      ...prev,
      [gameId]: !prev[gameId],
    }));
  };

  //Snackbar logic
  const handleClick = (msg) => {
    setSnackMsg(msg);
    setSnackOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackOpen(false);
  };
  // form logic
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleSearch = (e) => {
    const {name, value} = e.target
    setGenre("");
    setSearch(value)
  }
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
          sx={{ mb: "70px" }}
        >
          {showSearch ? (
            <Grid item container xs={12} justifyContent="space-between">
              <Grid item>
              <Typography
                variant="h4"
                sx={{ color: (theme) => theme.palette.text.primary }}
              >
                Browse games
              </Typography>
              </Grid>
              <Grid item>
              <FormControl sx={{mr:"15px" ,width:"100px"}}>
                <InputLabel>Genre</InputLabel>
                <Select value={genre} label="Genre" onChange={handleGenre}>
                  {genres.map((el) => (<MenuItem value={el.id}>{el.slug}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleSearch}/>
              </Grid>
            </Grid>
          ) : (
            <Grid xs={12}>
            <Typography
              variant="h4"
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
              {title}
            </Typography>
            </Grid>
          )}
          <Grid item xs={1}>
            <IconButton disabled={index === 0} onClick={prevBtn}>
              <ArrowBackIosIcon sx={{ color: index === 0 && "gray" }} />
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
                      <Typography noWrap sx={{ cursor: "pointer" }}>
                        {el.name}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={() => navigate(`/games/${el.id}`)}>
                      Details
                    </Button>
                    <IconButton
                      onClick={() => {
                        handleToWishlist(el.id);
                        toggleFavourite(el.id);
                        const message =
                          !favourite[el.id] && !isGameInWishlist(el, wishlist)
                            ? "Added to Wishlist"
                            : "Removed from Wishlist";
                        handleClick(message);
                      }}
                    >
                      <FavoriteIcon
                        sx={{
                          color:
                            isGameInWishlist(el, wishlist) || favourite[el.id]
                              ? "red"
                              : "inherit",
                        }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Snackbar
              open={snackOpen}
              autoHideDuration={2000}
              onClose={handleClose}
              message={snackMsg}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            />
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
