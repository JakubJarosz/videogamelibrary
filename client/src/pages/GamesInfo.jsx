import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@mui/material";

const GamesInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchGame = async () => {
        try {
          const response = await axios.get(`/game/${id}`);
          setData(response.data)
        } catch (error) {
          console.log(error);
        }
      };
      fetchGame()
  }, [id])

 
  return (
    <div>
      <Typography>HIII</Typography>
      <Button onClick={(() => console.log(data))}>
     sss
      </Button>
    </div>
  );
};

export default GamesInfo;
