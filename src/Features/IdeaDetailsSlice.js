import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Idea Details by ID
export const fetchIdeaDetails = createAsyncThunk(
  'ideaDetails/fetchIdeaDetails',
  async (ideaId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Get token from Redux state
      const response = await axios.get(`http://localhost:5000/api/v1/ideas/${ideaId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to request header
        },
      });
      return response.data; // Returning the API response which includes the idea and comments
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors
    }
  }
);

// Add Comment to a specific Idea
export const addCommentToIdea = createAsyncThunk(
  'ideaDetails/addCommentToIdea',
  async ({ ideaId, commentText }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Get the token from Redux state
      const response = await axios.post(
        `http://localhost:5000/api/v1/ideas/${ideaId}/comments`,
        { ideaId, comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request header
          },
        }
      );
      return response.data; // The API response containing the updated comments array
    } catch (error) {
      return rejectWithValue(error.response.data); // Handling errors
    }
  }
);

// Redux slice
const ideaDetailsSlice = createSlice({
  name: 'ideaDetails',
  initialState: {
    idea: null,
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Idea Details
    builder
      .addCase(fetchIdeaDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIdeaDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.idea = action.payload.idea; // Set the idea data
        state.comments = action.payload.comments; // Set the comments
      })
      .addCase(fetchIdeaDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Comment to Idea
      .addCase(addCommentToIdea.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCommentToIdea.fulfilled, (state, action) => {
        state.loading = false;
        const { comments } = action.payload; // The updated comments array returned from the API
        state.comments = comments; // Update the comments state
      })
      .addCase(addCommentToIdea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ideaDetailsSlice.reducer;
