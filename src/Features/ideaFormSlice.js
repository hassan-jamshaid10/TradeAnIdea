import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Async thunk for submitting an idea
export const submitIdea = createAsyncThunk(
    "ideaForm/submitIdea",
    async ({ ideaData, token }, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:5000/api/v1/ideas", ideaData, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "Failed to submit idea" });
      }
    }
  );
const ideaFormSlice = createSlice({
  name: "ideaForm",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetFormState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitIdea.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitIdea.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitIdea.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "An error occurred";
      });
  },
});
export const { resetFormState } = ideaFormSlice.actions;
export default ideaFormSlice.reducer;