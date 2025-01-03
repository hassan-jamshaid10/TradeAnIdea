import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api/auth'; // Update with your backend URL

// Async Thunks
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Error during signup' });
    }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData);
        return response.data; // Contains token and message
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Error during login' });
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
    try {
        // The email is sent in the correct format: { email }
        const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
        console.log(response.data);
        return response.data; // Contains the success message
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Error during password reset request' });
    }
});


export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (passwordData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/reset-password`, 
          passwordData, // Send the payload as it is
          {
            headers: {
              'Content-Type': 'application/json', // Ensure we are sending JSON data
            },
          }
        );
        return response.data; // Contains success message
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Error during password reset' });
      }
    }
  );

// Updated validateOTP Async Thunk
export const validateOTP = createAsyncThunk('auth/validateOTP', async (otpData, { rejectWithValue, getState }) => {
    try {
        const token = getState().auth.token; // Access token from Redux store

        const payload = {
            otp: otpData.otp, // OTP entered by the user
        };

        // Send the request with Authorization header
        const response = await axios.post(`${API_BASE_URL}/validate-otp`, payload, {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in the header
            },
        });
     console.log(response.data);
        return response.data; // Contains token and OTP validation message
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Error during OTP validation' });
    }
});

// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        email: null, // Store email
        otpExpiration: null, // Store OTP expiration time
        isAuthenticated: false,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.email = null;
            state.otpExpiration = null; // Clear OTP expiration
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        // Signup
        builder.addCase(signup.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.user;
            state.token = action.payload.token; // Store token on successful signup
           // state.email = action.payload.user.email; // Store email after signup
            state.isAuthenticated = true;
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        });

        // Login
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token; // Store token after login 
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message || "Login failed";
        });

        // Forgot Password
        builder.addCase(forgotPassword.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.status = 'succeeded';
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        });

        // Reset Password
        builder.addCase(resetPassword.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.status = 'succeeded';
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        });

        // Validate OTP
        builder.addCase(validateOTP.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(validateOTP.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token; // Store new token from OTP validation response
            state.isAuthenticated = true;
            state.otpExpiration = action.payload.otpExpiration; // Store OTP expiration time after validation
        });
        builder.addCase(validateOTP.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
