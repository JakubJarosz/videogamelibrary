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
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GamesLibrary = ({title, ordering}) => {
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const visibleCards = isSmallScreen ? 1 : isMediumScreen ? 2 : 4;

  useEffect(() => {
    fetchGames(page);
  }, [page]);


  const prevBtn = () => {
    setIndex((prev) => prev - 1)
  }

  const nextBtn = () => {
    if (index + visibleCards >= data.length - 1) {
      setPage((prev) => prev + 1);
    }
    setIndex((prev) => prev + 1)
  }
  const fetchGames = async (pageNumber) => {
    try {
      const response = await axios.get("/games", {
        params: {
          page: pageNumber,
          ordering: ordering
        },
      });
      setData((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={2} sx={{mb:"70px"}}>
      <Grid item xs={12} align="left">
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton disabled={index === 0} onClick={prevBtn}>
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid item xs={10} container spacing={2} wrap="nowrap" overflow="hidden">
        {data.slice(index, index + visibleCards).map((el) => (
          <Grid item xs={12/visibleCards} key={el.id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={el.background_image || "https://via.placeholder.com/150"}
              />
              <CardContent>
                <Typography>{el.name}</Typography>
              </CardContent>
              <CardActions>
                <Button>Add to fav</Button>
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
  );
};

export default GamesLibrary;
