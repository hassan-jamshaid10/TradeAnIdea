import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an async thunk for fetching the ideas
export const fetchIdeas = createAsyncThunk(
  "ideas/fetchIdeas",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Get the token from the auth slice

    try {
      const response = await axios.get("http://localhost:5000/api/v1/ideas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data; // Return the ideas data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ideasSlice = createSlice({
  name: "ideas",
  initialState: {
    ideas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdeas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIdeas.fulfilled, (state, action) => {
        state.loading = false;
        state.ideas = action.payload;
      })
      .addCase(fetchIdeas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ideasSlice.reducer;
