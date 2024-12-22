import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaginatedVideos } from "../services/api";

export const loadPaginatedVideos = createAsyncThunk(
  "catalog/loadPaginatedVideos",
  async ({ page, limit, sort, order }, thunkAPI) => {
    try {
      const data = await fetchPaginatedVideos(page, limit, sort, order);
      return data; // Correct payload without Axios headers
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    items: [],
    totalPages: 1,
    currentPage: 1,
    sortBy: "updatedAt",
    order: "DESC",
    loading: false,
    error: null,
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPaginatedVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPaginatedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.videos.map((video) => ({
          ...video,
          catalogTable: true, // Ensure the required flag exists
        }));
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(loadPaginatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});
export const { setSortBy, setCurrentPage } = catalogSlice.actions;

export default catalogSlice.reducer;
