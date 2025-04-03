import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { fetchSteamData } from '../state/steamSlice';
import axios from "axios"
import {Grid} from '@mui/material';

const Library = () => {
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam.user);

  useEffect(() => {
    dispatch(fetchSteamData())
  }, [dispatch])
  return (
   <Grid>
  library
   </Grid>
  )
}

export default Library
