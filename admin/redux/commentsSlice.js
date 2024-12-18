import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaginatedComments } from "../services/api";

export const loadPaginatedComments = createAsyncThunk(
  "comments/loadPaginatedComments",
  async ({ page, limit, sort, order }, thunkAPI) => {
    try {
      const data = await fetchPaginatedComments(page, limit, sort, order);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    totalPages: 1,
    currentPage: 1,
    sortBy: "created_at",
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
      .addCase(loadPaginatedComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPaginatedComments.fulfilled, (state, action) => {
        state.loading = false;

        const comments = action.payload?.comments || [];

        state.items = comments.map((comment) => ({
          ...comment,
          likeCount: comment.likesDislikes.filter((ld) => ld.is_like).length,
          dislikeCount: comment.likesDislikes.filter((ld) => !ld.is_like)
            .length,
          commentTable: true,
        }));

        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
      })
      .addCase(loadPaginatedComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong.";
      });
  },
});

export const { setSortBy, setCurrentPage } = commentsSlice.actions;
export default commentsSlice.reducer;
