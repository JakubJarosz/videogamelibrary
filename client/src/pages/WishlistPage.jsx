import React from "react";
import { useSelector } from "react-redux";
import {
    Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
const WishlistPage = () => {
  const wishlist = useSelector(
    (state) => state.auth.user?.wishList?.games || []
  );

  return (
    <Box sx={{ minHeight: "100vh"}}>
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
      <Grid item key={el.id}>
        <Card>
          <CardMedia component="img" image={el.image} height="150" />
          <CardContent>
            <Typography>{el.name}</Typography>
          </CardContent>
          <CardActions>
            <IconButton>
              <FavoriteIcon />
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
