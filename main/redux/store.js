import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import authReducer from "./slices/authSlice";
import catalogReducer from "./slices/catalogSlice";
import usersReducer from "./slices/usersSlice";
import commentsReducer from "./slices/commentsSlice";
import reviewsReducer from "./slices/reviewsSlice";
import indexReducer from "./slices/indexSlice";
import memberReducer from "./slices/memberSlice";
import headerReducer from "./slices/headerSlice";

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
    header: headerReducer,
  },
});

export default store;
