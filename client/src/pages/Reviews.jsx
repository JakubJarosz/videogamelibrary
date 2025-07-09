import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Button,
  Rating,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

const Reviews = () => {
  const { id } = useParams();
  const avatar = useSelector(
    (state) => state.auth.user?.steamProfile?.avatar || ""
  );
  const user = useSelector((state) => state.auth.user?.name);
  const [reviews, setReviews] = useState([]);
  const [userRev, setUserRev] = useState({
    title: "",
    description: "",
    rating: 0,
  });
  const [existRev, setExistRev] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
      setExistRev(true);
      setEditMode(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("All fields are required");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const fetchUserReview = async () => {
    try {
      const { data } = await axios.get(`/user-review/${id}`);
      setUserRev(data.review);
      if (data.review) {
        setExistRev(true);
      }
    } catch (error) {
      console.error("Error fetching user review:", error);
    }
  };
  // console.log(fetchedUserRev);
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
          {existRev && !editMode ? (
            <Box
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            >
              <Card sx={{ p: 2 }}>
                <CardHeader
                  avatar={<Avatar src={avatar} />}
                  title={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user}
                    </Typography>
                  }
                  subheader="Your review for this game"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {userRev.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {userRev.description}
                  </Typography>

                  <Stack spacing={2}>
                    <Rating value={userRev.rating} readOnly />
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ) : (
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
              <Button
                variant="contained"
                sx={{ mt: "15px", mb: "9px" }}
                onClick={handlesubmitReview}
              >
                Submit
              </Button>
            </Box>
          )}
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
