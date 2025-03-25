import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      toast.error("Login failed");
      return rejectWithValue("Login failed");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/profile");

      if (data.error) {
        toast.error(data.error);
        return rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      toast.error("Unauthorized");
      return rejectWithValue("Unauthorized");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const { data } = await axios.get("/logout");
  toast.success(data.message);
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
