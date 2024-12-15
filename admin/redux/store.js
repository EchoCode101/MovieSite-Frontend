import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export default store;
