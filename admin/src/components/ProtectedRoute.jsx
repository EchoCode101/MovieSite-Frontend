import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken, sendRefreshToken, logout } from "../../redux/authSlice";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token, refreshToken, loading } = useSelector(
    (state) => state.auth
  );
  const Link = "/signin";
  // const [redirecting, setRedirecting] = useState(false); // Prevent repeated redirects

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        dispatch(logout());
        navigate("/signin", { replace: true });
        // window.location.href = Link;
        return;
      }
      try {
        // Validate the token
        const validation = await dispatch(validateToken()).unwrap();
        if (!validation) {
          // If validation fails and a refresh token exists, try to refresh

          const tokenPattern = /^[a-f0-9]+:[a-f0-9]+$/i;
          if (
            refreshToken &&
            tokenPattern.test(token) &&
            token.length >= 510 &&
            token.length <= 515
          ) {
            const refresh = await dispatch(sendRefreshToken()).unwrap();
            if (!refresh) throw new Error("Token refresh failed");
          } else {
            throw new Error("No valid refresh token");
          }
          //   if (refresh.error) {
          //     // Refresh failed; log out and redirect to sign-in
          //     dispatch(logout());
          //     // navigate("/signin");
          //     window.location.href = Link;
          //   }
          // } else {
          //   // No refresh token; log out and redirect to sign-in
          //   dispatch(logout());
          //   // navigate("/signin");
          //   window.location.href = Link;
          // }
        }
      } catch (error) {
        console.error("Authentication Error:", error.message);
        dispatch(logout());
        navigate("/signin", { replace: true });
      }
    };
    checkAuth();
  }, [token, dispatch, navigate, refreshToken]);

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
