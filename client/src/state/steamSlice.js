import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchSteamData = createAsyncThunk(
    "steam/fetchSteamData",
    async (_, {rejectWithValue}) => {
        try {
           const {data} = await axios.get("/steamData");
           return data.steamProfile
        } catch (error) {
            return rejectWithValue("Unauthorized");
        }
    }
);

const steamSlice = createSlice({
    name: "steam",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSteamData.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchSteamData.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
        })
        .addCase(fetchSteamData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default steamSlice.reducer