import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken, sendRefreshToken, logout } from "../../redux/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token, refreshToken, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        navigate("/signin");
        return;
      }

      // Validate the token
      const validation = await dispatch(validateToken());
      if (validation.error) {
        // If validation fails and a refresh token exists, try to refresh

        const tokenPattern = /^[a-f0-9]+:[a-f0-9]+$/i;
        if (
          refreshToken &&
          tokenPattern.test(token) &&
          token.length >= 510 &&
          token.length <= 515
        ) {
          const refresh = await dispatch(sendRefreshToken());
          if (refresh.error) {
            // Refresh failed; log out and redirect to sign-in
            dispatch(logout());
            navigate("/signin");
          }
        } else {
          // No refresh token; log out and redirect to sign-in
          dispatch(logout());
          navigate("/signin");
        }
      }
    };

    checkAuth();
  }, [token, dispatch, navigate, refreshToken]);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : null;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
