import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Svg from "../Svg";
import LoadingSpinner from "../LoadingSpinner";
import { getImageWithFallback } from "../../utils/imageUtils";
import { updateMemberById, deleteMemberById } from "../../../services/allRoutes";
import { toastPromise, showWarningToast } from "../../utils/js/toastUtils";
import { useNavigate } from "react-router-dom";

const MemberProfile = ({ data, status, onRefresh, activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileTabsRef = useRef(null);

  const tabs = ["Profile", "Comments", "Reviews"];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileTabsRef.current &&
        !mobileTabsRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabClick = (tabName) => {
    if (onTabChange) {
      onTabChange(tabName);
    }
    setMobileMenuOpen(false);
  };

  const handleToggleStatus = async () => {
    const newStatus = data.status === "Active" ? "Inactive" : "Active";
    const memberId = data._id || data.member_id;
    
    if (!memberId) {
      showWarningToast("Member ID not found. Cannot update status.");
      return;
    }

    try {
      await toastPromise(
        updateMemberById(memberId, { status: newStatus }),
        "Updating status...",
        `User status updated to ${newStatus}!`,
        "Failed to update status. Please try again."
      );
      onRefresh();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    const memberId = data._id || data.member_id;
    
    if (!memberId) {
      showWarningToast("Member ID not found. Cannot delete.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user "${data.username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await toastPromise(
        deleteMemberById(memberId),
        "Deleting user...",
        "User deleted successfully!",
        "Failed to delete user. Please try again."
      );
      navigate("/users");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="profile__content">
      <div className="profile__user">
        <div className="profile__avatar">
          <img
            src={getImageWithFallback(data.profile_pic, "user")}
            alt={data.username || "User"}
          />
        </div>
        <div
          className={
            data.status === "Inactive"
              ? "profile__meta profile__meta--red"
              : "profile__meta profile__meta--green"
          }
        >
          <h3>
            {data.username} <span>({data.status})</span>
          </h3>
          <span> Punjabi Dub ID: {data._id || data.member_id || "N/A"}</span>
        </div>
      </div>

      <ul
        className="nav nav-tabs profile__tabs"
        id="profile__tabs"
        role="tablist"
      >
        {tabs.map((tab) => (
          <li key={tab} className="nav-item">
            <button
              className={`a-tag nav-link ${(activeTab || "Profile") === tab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
              role="tab"
              aria-controls={`tab-${tabs.indexOf(tab) + 1}`}
              aria-selected={(activeTab || "Profile") === tab}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      <div
        className="profile__mobile-tabs"
        id="profile__mobile-tabs"
        ref={mobileTabsRef}
      >
        <div
          className={`profile__mobile-tabs-btn dropdown-toggle ${
            mobileMenuOpen ? "show" : ""
          }`}
          role="navigation"
          id="mobile-tabs"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-haspopup="true"
          aria-expanded={mobileMenuOpen}
        >
          <input type="button" value={activeTab || "Profile"} readOnly />
          <span></span>
        </div>

        <div
          className={`profile__mobile-tabs-menu dropdown-menu ${
            mobileMenuOpen ? "show" : ""
          }`}
          aria-labelledby="mobile-tabs"
        >
          <ul className="nav nav-tabs" role="tablist">
            {tabs.map((tab) => (
              <li key={tab} className="nav-item">
                <button
                  className={`a-tag nav-link ${
                    (activeTab || "Profile") === tab ? "active" : ""
                  }`}
                  id={`${tabs.indexOf(tab) + 1}-tab`}
                  onClick={() => handleTabClick(tab)}
                  role="tab"
                  aria-controls={`tab-${tabs.indexOf(tab) + 1}`}
                  aria-selected={(activeTab || "Profile") === tab}
                  data-value={tab.toLowerCase()}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="profile__actions">
        {data.status && (
          <>
            {status === "loading" ? (
              <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
            ) : (
              <button
                className="dashbox__refresh refresh-btn"
                type="button"
                onClick={onRefresh}
              >
                <Svg
                  path={
                    "M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z"
                  }
                />
              </button>
            )}
            <button
              type="button"
              onClick={handleToggleStatus}
              className={
                data.status === "Inactive"
                  ? " profile__action profile__action_inactive--banned"
                  : " profile__action profile__action--banned"
              }
              title={data.status === "Active" ? "Ban User" : "Activate User"}
            >
              <Svg
                path={
                  "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                }
              />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="profile__action profile__action--delete open-modal"
              title="Delete User"
            >
              <Svg
                path={
                  "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
                }
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

MemberProfile.propTypes = {
  onRefresh: PropTypes.func,
  status: PropTypes.string,
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
  data: PropTypes.shape({
    profile_pic: PropTypes.string,
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    subscription_plan: PropTypes.string,
    status: PropTypes.string,
    role: PropTypes.string,
    member_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default MemberProfile;
