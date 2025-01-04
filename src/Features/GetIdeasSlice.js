import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an async thunk for fetching the ideas
export const fetchIdeas = createAsyncThunk(
  "ideas/fetchIdeas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/allideas");
      return response.data; // Return the ideas data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Error fetching ideas" });
    }
  }
);

const ideasSlice = createSlice({
  name: "ideas",
  initialState: {
    ideas: [],
    loading: false,
    error: null,
    selectedIdeaId: null, // Store selected idea ID here
  },
  reducers: {
    setSelectedIdeaId: (state, action) => {
      state.selectedIdeaId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdeas.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchIdeas.fulfilled, (state, action) => {
        state.loading = false;
        state.ideas = action.payload;
      })
      .addCase(fetchIdeas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch ideas";
      });
  },
});

export const { setSelectedIdeaId } = ideasSlice.actions;
export default ideasSlice.reducer;
