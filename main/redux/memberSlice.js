import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMemberById, updateMemberById } from "../services/allRoutes";

// Async Thunks
export const fetchMemberData = createAsyncThunk(
  "members/fetchMemberData",
  async (memberId, thunkAPI) => {
    try {
      const response = await fetchMemberById(memberId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Update member data
export const updateMemberData = createAsyncThunk(
  "members/updateMemberData",
  async ({ memberId, formData }, thunkAPI) => {
    try {
      const response = await updateMemberById(memberId, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Slice
const membersSlice = createSlice({
  name: "members",
  initialState: {
    memberData: null,
    memberComments: [],
    memberReviews: [],
    memberReplies: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetMemberState: (state) => {
      state.memberData = null;
      state.memberComments = [];
      state.memberReviews = [];
      state.memberReplies = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMemberData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.memberData = action.payload;
        state.memberComments = action.payload.memberComments || [];
        state.memberReviews = action.payload.memberReviews || [];
        state.memberReplies = action.payload.memberReplies || [];
      })
      .addCase(fetchMemberData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch member data.";
      })
      .addCase(updateMemberData.fulfilled, (state, action) => {
        state.memberData = action.payload; // Update the state with the saved data
      })
      .addCase(updateMemberData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update member data.";
      });
  },
});

// Actions and Reducer Export
export const { resetMemberState } = membersSlice.actions;
export default membersSlice.reducer;
