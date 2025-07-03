import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Card,
  Stack,
  Button,
  CardHeader,
  CardContent,
  Rating,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [userRev, setUserRev] = useState({title: "", review: "", rating: 0});
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
  const rev = reviews.filter((el) => el.gameId === Number(id));
  console.log(rating);
  return (
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        textAlign={{ xs: "center"}}
      >
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 1,
              p: 1,
            }}
          >
            <Stack spacing={3}>
              <TextField label="Title..." fullWidth />
              <TextField label="Review..." multiline minRows={18} fullWidth />
              <Rating
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue);
                }}
              />
            </Stack>
            <Button variant="contained" sx={{ mt: "15px", mb: "9px" }}>
              Submit
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
              borderRadius: 2,
              boxShadow: 1,
              p: 1,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: (theme) => theme.palette.text.primary }}> 
              Users Reviews
            </Typography>
            <List>
              {rev.map((el, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={el.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                  sx={{ color: (theme) => theme.palette.text.primary }}
                    primary={el.userName}
                    secondary={
                      <Tooltip
                        title={el.description}
                        arrow
                        placement="top-start"
                      >
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                            cursor: "default",
                          }}
                        >
                          {el.description}
                        </Typography>
                      </Tooltip>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reviews;
