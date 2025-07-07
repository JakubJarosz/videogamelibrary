import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Stack,
  Button,
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
  const [userRev, setUserRev] = useState({ title: "", description: "", rating: 0 });
  useEffect(() => {
    fetchReviews();
    fetchUserReview();
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

  const handlesubmitReview = async () => {
    try {
      await axios.post("/create-review", {
        gameId: Number(id),
        title: userRev.title,
        description: userRev.description,
        rating: userRev.rating,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const fetchUserReview = async () => {
    try {
      const { data } = await axios.get(`/user-review/${id}`);
      console.log(data)
    } catch (error) {
      console.error("Error fetching user review:", error);
    }
  };
  // console.log(userRev);
  return (
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        textAlign={{ xs: "center" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 1,
              p: 1,
            }}
          >
            <Stack spacing={3}>
              <TextField
                label="Title..."
                fullWidth
                value={userRev.title}
                onChange={(e) =>
                  setUserRev({ ...userRev, title: e.target.value })
                }
              />
              <TextField
                label="Review..."
                multiline
                minRows={18}
                fullWidth
                value={userRev.description}
                onChange={(e) =>
                  setUserRev({ ...userRev, description: e.target.value })
                }
              />
              <Rating
                value={userRev.rating}
                onChange={(_, newValue) => {
                  setUserRev({ ...userRev, rating: newValue || 0 });
                }}
              />
            </Stack>
            <Button variant="contained" sx={{ mt: "15px", mb: "9px" }} onClick={handlesubmitReview}>
              Submit
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
              borderRadius: 2,
              boxShadow: 1,
              p: 1,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: (theme) => theme.palette.text.primary }}
            >
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
                            maxWidth: "340px",
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
