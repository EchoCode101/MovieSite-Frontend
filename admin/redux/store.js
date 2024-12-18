import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";
import catalogReducer from "./catalogSlice";
import usersReducer from "./usersSlice";
import commentsReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    catalog: catalogReducer,
    users: usersReducer, // Correctly linked reducer
    comments: commentsReducer, // Correctly linked reducer
  },
});

export default store;
