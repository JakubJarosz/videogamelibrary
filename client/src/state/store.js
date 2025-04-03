import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
import steamReducer from "./steamSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    steam: steamReducer
  },
});

export default store;