import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken, sendRefreshToken, logout } from "../../redux/authSlice";
import LoadingSpinner from "./LoadingSpinner";
import { showErrorToast, toastPromise } from "../utils/js/toastUtils";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token, refreshToken, loading } = useSelector(
    (state) => state.auth
  );
  const toastDisplayed = useRef(false); // Track if toast has been displayed
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        dispatch(logout());
        navigate("/signin", { replace: true });
        return;
      }
      if (!toastDisplayed.current) {
        try {
          // Validate token
          await toastPromise(
            dispatch(validateToken()).unwrap(),
            "Validating token...",
            "Token validated successfully!",
            "Invalid token, logging out."
          );
          if (!isAuthenticated && refreshToken) {
            await toastPromise(
              dispatch(sendRefreshToken()).unwrap(),
              "Refreshing token...",
              "Token refreshed successfully!",
              "Failed to refresh token, logging out."
            );
          }
        } catch (error) {
          showErrorToast(
            "Authentication Error: " + (error.message || "Network Error")
          );
          dispatch(logout());
          navigate("/signin", { replace: true });
        } finally {
          toastDisplayed.current = true; // Ensure this runs only once
        }
      }
    };
    checkAuth();
  }, [token, dispatch, navigate, refreshToken, isAuthenticated]);

  if (loading)
    return (
      <div>
        <LoadingSpinner r={20} w={30} h={"100vh"} />
      </div>
    );

  return isAuthenticated ? children : null;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
