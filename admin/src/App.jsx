import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import React Router components
// import { useEffect } from "react";
import "./App.css";
import headerImage from "./assets/img/logo.svg";

// Import your pages
import Index from "./pages/Index";
import AddItem from "./pages/AddItem";
import Catalog from "./pages/Catalog";
import Comments from "./pages/Comments";
import EditUser from "./pages/EditUser";
import Forgot from "./pages/Forgot";
import Reviews from "./pages/Reviews";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFoundPage"; // For 404 page
import { useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // useEffect(() => {
  //   console.log("Admin dashboard loaded"); // Debugging purpose
  // }, []);

  const isAuthenticated = useCallback(() => {
    // Add logic to check if the user is authenticated
    const token = localStorage.getItem("token");
    return !!token;
  }, []);

  useEffect(() => {}, [isAuthenticated]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            path="/reset-admin-password/:token"
            element={<ResetPassword />}
          />

          {/* Protected routes */}
          {isAuthenticated() ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Index headerImage={headerImage} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/catalog"
                element={<Catalog headerImage={headerImage} />}
              />
              <Route
                path="/add-item"
                element={<AddItem headerImage={headerImage} />}
              />
              <Route
                path="/comments"
                element={<Comments headerImage={headerImage} />}
              />
              <Route
                path="/edit-user"
                element={<EditUser headerImage={headerImage} />}
              />
              <Route
                path="/reviews"
                element={<Reviews headerImage={headerImage} />}
              />
              <Route
                path="/users"
                element={<Users headerImage={headerImage} />}
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signin" replace />} />
          )}

          {/* Fallback route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
