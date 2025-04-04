import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSteamData } from "../state/steamSlice";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

const Library = () => {
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam?.user?.games || []);

  useEffect(() => {
    dispatch(fetchSteamData());
  }, [dispatch]);
  return (
    <Grid container>
      {steam.map((game) => {
        const imgURL = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
        return (
          <Grid item>
            <Card>
              <CardMedia image={imgURL} />
              <CardContent>
                <Typography>{game.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Library;
