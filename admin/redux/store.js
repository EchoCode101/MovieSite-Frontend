import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";
import catalogReducer from "./catalogSlice";
import usersReducer from "./usersSlice";
import commentsReducer from "./commentsSlice";
import reviewsReducer from "./reviewsSlice";
import indexReducer from "./indexSlice";
import memberReducer from "./memberSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    catalog: catalogReducer,
    users: usersReducer, // Correctly linked reducer
    comments: commentsReducer, // Correctly linked reducer
    reviews: reviewsReducer, // Correctly linked reducer
    dashboard: indexReducer,
    member: memberReducer, // Ensure this is correct
  },
});

export default store;
