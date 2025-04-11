import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchUser } from "../state/authSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector(
    (state) => state.auth.user?.wishList?.games || []
  );
  const userId = useSelector((state) => state.auth.user?._id);

  const handleToWishlist = async (gameId) => {
    try {
      await axios.post("/wishlist", { userId, gameId });
      dispatch(fetchUser())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          padding: 2,
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            Wishlist
          </Typography>
        </Grid>
        {wishlist.length === 0 ? (
          <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
            No games on wishlist
          </Typography>
        ) : (
          wishlist.map((el) => (
            <Grid item key={el.id} xs={12} md={6} lg={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={el.image}
                  alt={el.name}
                  height="150"
                />
                <CardContent>
                  <Tooltip title={el.name}>
                    <Typography noWrap sx={{ cursor: "pointer" }} onClick={() => navigate(`/games/${el.id}`)}>
                      {el.name}
                    </Typography>
                  </Tooltip>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleToWishlist(el.id)}>
                    <FavoriteIcon sx={{ color: "red" }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default WishlistPage;
