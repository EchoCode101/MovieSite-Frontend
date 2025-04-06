import { createSlice } from "@reduxjs/toolkit";
import headerImage from "../../src/assets/img/logo.svg";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    headerImage,
  },
  reducers: {},
});

export const selectHeaderImage = (state) => state.header.headerImage;

export default headerSlice.reducer;
