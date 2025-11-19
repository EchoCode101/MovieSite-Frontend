import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  validateToken,
  sendRefreshToken,
  logout,
} from "../../redux/slices/authSlice";
import LoadingSpinner from "./LoadingSpinner";
import { showErrorToast, toastPromise } from "../utils/js/toastUtils";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token, refreshToken, loading } = useSelector(
    (state) => state.auth
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const toastDisplayed = useRef(false); // Track if toast has been displayed

  useEffect(() => {
    const checkAuth = async () => {
      // Check if token exists in localStorage (might not be in Redux yet)
      const localToken = localStorage.getItem("token");

      if (!token && !localToken) {
        dispatch(logout());
        navigate("/signin", { replace: true });
        setIsCheckingAuth(false);
        return;
      }

      if (!toastDisplayed.current) {
        try {
          // Validate token
          await dispatch(validateToken()).unwrap();
        } catch (error) {
          // If validation fails, try refresh token
          const localRefreshToken = localStorage.getItem("refreshToken");
          if (localRefreshToken || refreshToken) {
            try {
              await dispatch(sendRefreshToken()).unwrap();
              // After refresh, validate again
              await dispatch(validateToken()).unwrap();
            } catch (refreshError) {
              showErrorToast("Session expired. Please log in again.");
              dispatch(logout());
              navigate("/signin", { replace: true });
              setIsCheckingAuth(false);
              return;
            }
          } else {
            showErrorToast(
              "Authentication Error: " + (error.message || "Network Error")
            );
            dispatch(logout());
            navigate("/signin", { replace: true });
            setIsCheckingAuth(false);
            return;
          }
        } finally {
          toastDisplayed.current = true; // Ensure this runs only once
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [token, dispatch, navigate, refreshToken]);

  // Show loading while checking authentication or if Redux is loading
  if (loading || isCheckingAuth) {
    return (
      <div>
        <LoadingSpinner r={20} w={30} h={"100vh"} />
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
