import userSvg from "../../assets/img/user.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setLogoutLoading } from "../../../redux/slices/authSlice";
import { adminLogout } from "../../../services/allRoutes";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

const SidebarUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutLoading = useSelector((state) => state.auth.logoutLoading);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(setLogoutLoading(true)); // Start loading
    try {
      await adminLogout();
      dispatch(logout());
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/signin", { replace: true });
      }, 500);
    } catch (error) {
      // Even if API call fails, clear local state
      dispatch(logout());
      toast.error(
        error.message || "Logout failed, but session cleared locally"
      );
      setTimeout(() => {
        navigate("/signin", { replace: true });
      }, 500);
    } finally {
      dispatch(setLogoutLoading(false));
    }
  };
  return (
    <div className="sidebar__user">
      <div className="sidebar__user-img">
        <img src={user?.profileImage || userSvg} alt="User Svg" />
      </div>

      <div className="sidebar__user-title">
        <span>
          {user?.role
            ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
            : "Admin"}
        </span>
        <p>
          {user?.first_name
            ? user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
            : ""}{" "}
          {user?.last_name
            ? user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)
            : ""}
          {!user?.first_name && !user?.last_name && user?.username
            ? user.username
            : ""}
        </p>
      </div>
      <button
        className="sidebar__user-btn open-modal"
        type="button"
        onClick={handleLogout} // Opens the modal
      >
        {" "}
        {logoutLoading ? (
          <LoadingSpinner r={20} w={30} h={30} pt={10} pl={10} />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SidebarUser;
