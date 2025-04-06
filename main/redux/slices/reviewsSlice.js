import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaginatedReviews } from "../../services/allRoutes"; // Adjust API method

// Async thunk to load paginated reviews
export const loadPaginatedReviews = createAsyncThunk(
  "reviews/loadPaginatedReviews",
  async ({ page, limit, sort, order }, thunkAPI) => {
    try {
      const data = await fetchPaginatedReviews(page, limit, sort, order);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [],
    totalPages: 1,
    currentPage: 1,
    sortBy: "createdAt",
    order: "DESC",
    loading: false,
    error: null,
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.currentPage = 1; // Reset to first page on sort change
    },
    setCurrentPage: (state, action) => {
      if (action.payload <= state.totalPages && action.payload >= 1) {
        state.currentPage = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPaginatedReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPaginatedReviews.fulfilled, (state, action) => {
        state.loading = false;

        const reviews = action.payload?.reviews || [];

        state.items = reviews.map((review) => ({
          ...review,
          likeCount: parseInt(review.likesCount) || 0,
          dislikeCount: parseInt(review.dislikesCount) || 0,
          reviewTable: true,
        }));

        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
      })
      .addCase(loadPaginatedReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong.";
      });
  },
});

export const { setSortBy, setCurrentPage } = reviewsSlice.actions;
export default reviewsSlice.reducer;
