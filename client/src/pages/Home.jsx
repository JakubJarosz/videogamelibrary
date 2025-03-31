import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Home = () => {
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  const visibleCards = 6;

  const fetchGames = async (pageNumber) => {
    try {
      const response = await axios.get("/games", {
        params: {
          page: pageNumber,
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGames(page);
  }, [page]);

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2} >
      <Grid item xs={12} align="left">
        <Typography  variant="h5">
          Title
        </Typography>
      </Grid>
      <Grid item>
        <IconButton >
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
     <Grid item xs={10} container spacing={2} wrap="nowrap" overflow="hidden">
        {data.slice(1,5).map((el) => (
          <Grid item  xs={12}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={el.background_image}
              />
              <CardContent>
                <Typography>Game</Typography>
              </CardContent>
              <CardActions>
                <Button>Add to fav</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      <Grid item>
        <IconButton >
          <ArrowForwardIosIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Home;
