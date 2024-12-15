import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../src/utils/js/config.js";
// Async thunk for token validation
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const encryptedToken = state.auth.token;
    const apiUrl = config.apiUrl;

    if (!encryptedToken) return rejectWithValue("No token found");

    try {
      const response = await axios.post(
        `${apiUrl}/token/validate`,
        {},
        {
          headers: { authorization: `Bearer ${encryptedToken}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue("Invalid or expired token" + err);
    }
  }
);

export const sendRefreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const encryptedRefreshToken = state.auth.refreshToken;

    if (!encryptedRefreshToken)
      return rejectWithValue("No refresh token found");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/token/refresh`,
        {}, // assuming your backend doesn’t need a request body
        {
          headers: { authorization: `Bearer ${encryptedRefreshToken}` },
        }
      );
      return response.data.token;
    } catch (err) {
      return rejectWithValue("Failed to refresh token: " + err.message);
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
