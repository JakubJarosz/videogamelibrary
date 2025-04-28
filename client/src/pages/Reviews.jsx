import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, List, ListItem, Rating, TextField, Typography } from "@mui/material";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    fetchReviews();
  }, []);
  const fetchReviews = async () => {
    try {
      const response = await axios.get("/reviews");
      setReviews(response.data.flatMap((item) => item.reviews));
    } catch (error) {
      console.log(error);
    }
  };
  const rev = reviews.filter(el => el.gameId === Number(id))
  console.log(rev);
  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Typography variant="h4" gutterBottom>
            Write your review
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Rating
              size="large"
              value={rating}
              onChange={(_, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField variant="outlined" label="Title" fullWidth />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              label="Your Review"
              fullWidth
              multiline
              minRows={5}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Typography>Users reviews</Typography>
          <Box>
            <List>
            {reviews
              .filter((el) => el.gameId === Number(id))
              .map((el) => (
                <>
                <ListItem><Typography>{el.userName}</Typography></ListItem>
                </>
              ))}
              </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reviews;
