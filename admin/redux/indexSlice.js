import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchVideos,
  fetchMembers,
  fetchReviewsWithLikesDislikes,
} from "../services/allRoutes";

// Fetch unique views
export const fetchUniqueViews = createAsyncThunk(
  "dashboard/fetchUniqueViews",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchVideos(); // Example: Replace with your API logic
      return data.length; // Calculate unique views (adjust logic if needed)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch items added this month
export const fetchItemsAdded = createAsyncThunk(
  "dashboard/fetchItemsAdded",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchVideos();
      return data.filter(
        (item) => new Date(item.createdAt).getMonth() === new Date().getMonth()
      ).length;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch new comments
export const fetchNewComments = createAsyncThunk(
  "dashboard/fetchNewComments",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchReviewsWithLikesDislikes();
      return data.length;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch latest users
export const fetchLatestUsers = createAsyncThunk(
  "dashboard/fetchLatestUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchMembers(); // Fetch members API
      return data.slice(0, 10); // Fetch the 10 most recent members
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const indexSlice = createSlice({
  name: "dashboard",
  initialState: {
    uniqueViews: 0,
    itemsAdded: 0,
    newComments: 0,
    latestUsers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniqueViews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUniqueViews.fulfilled, (state, action) => {
        state.loading = false;
        state.uniqueViews = action.payload;
      })
      .addCase(fetchUniqueViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchItemsAdded.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemsAdded.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsAdded = action.payload;
      })
      .addCase(fetchItemsAdded.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNewComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewComments.fulfilled, (state, action) => {
        state.loading = false;
        state.newComments = action.payload;
      })
      .addCase(fetchNewComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLatestUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.latestUsers = action.payload;
      })
      .addCase(fetchLatestUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default indexSlice.reducer;
