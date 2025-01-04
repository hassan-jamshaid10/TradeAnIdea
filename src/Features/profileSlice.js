import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch profile data from API
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Get token from auth slice

    try {
      const response = await axios.get("http://localhost:5000/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token as Bearer
        },
      });
      return response.data; // Return user data
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to fetch profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    email: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
