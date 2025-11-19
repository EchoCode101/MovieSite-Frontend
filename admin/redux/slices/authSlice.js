import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api.js";

// Async thunk for token validation
// Uses API instance so it goes through the interceptor and benefits from automatic token refresh
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      // API instance automatically adds token from localStorage via request interceptor
      // If token is expired, the response interceptor will handle refresh automatically
      const response = await API.post("/token/validate", {});
      return response.data;
    } catch (err) {
      return rejectWithValue("Invalid or expired token: " + (err.message || "Unknown error"));
    }
  }
);

export const sendRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      // Refresh token is sent via cookie (httpOnly), not in header
      // Use API instance to ensure withCredentials is set and interceptors work
      const response = await API.post(
        "/token/refresh",
        {},
        {
          withCredentials: true, // Send cookies
        }
      );
      return response.data.token;
    } catch (err) {
      return rejectWithValue("Failed to refresh token: " + (err.message || "Unknown error"));
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: false,
    user: null,
    loading: false,
    logoutLoading: false, // New state for logout loading
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.logoutLoading = false; // Reset logout loading
    },
    setLogoutLoading: (state, action) => {
      state.logoutLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendRefreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendRefreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true; // Set authenticated after successful refresh
        state.loading = false;
        localStorage.setItem("token", action.payload);
      })
      .addCase(sendRefreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout, setLogoutLoading } = authSlice.actions;
export default authSlice.reducer;
