import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaginatedUsers } from "../services/allRoutes";

export const loadPaginatedUsers = createAsyncThunk(
  "users/loadPaginatedUsers",
  async ({ page, limit, sort, order }, thunkAPI) => {
    try {
      const data = await fetchPaginatedUsers(page, limit, sort, order);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const usersSlice = createSlice({
  name: "users",
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
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPaginatedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPaginatedUsers.fulfilled, (state, action) => {
        state.loading = false;

        // Ensure users exist and are an array
        const users = action.payload?.users || [];
        state.items = users.map((user) => ({
          ...user,
          userTable: true, // Ensure required flag
        }));

        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
      })
      .addCase(loadPaginatedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Something went wrong.";
      });
  },
});

export const { setSortBy, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
