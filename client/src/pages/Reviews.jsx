import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

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
  const rev = reviews.filter((el) => el.gameId === Number(id));
  console.log(rev);
  return (
    <></>
  );
};

export default Reviews;
