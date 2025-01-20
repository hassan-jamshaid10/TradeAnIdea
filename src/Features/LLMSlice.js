// llmSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = "https://0913-35-231-254-109.ngrok-free.app/predict";

// Async thunk for API call
export const fetchFeasibility = createAsyncThunk(
  "llm/fetchFeasibility",
  async ({ instruction, project_description }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINT, {
        instruction,
        project_description,
      });
      return response.data.result; // Assuming the response has "result" in its body
    } catch (error) {
      return rejectWithValue("Error processing the request");
    }
  }
);

// Slice definition
const llmSlice = createSlice({
  name: "llm",
  initialState: {
    result: "", // Stores the prediction result ("Repeated" or "Original")
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // To store error messages in case of failure
  },
  reducers: {
    resetResult: (state) => {
      state.result = "";
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeasibility.pending, (state) => {
        state.status = "loading";
        state.error = null; // Reset error when request is pending
      })
      .addCase(fetchFeasibility.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload; // Store the result ("Original" or "Repeated")
      })
      .addCase(fetchFeasibility.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Store error message if the request fails
      });
  },
});

export const { resetResult } = llmSlice.actions;
export default llmSlice.reducer;
