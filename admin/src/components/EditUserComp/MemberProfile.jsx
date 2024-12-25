import PropTypes from "prop-types";
import Svg from "../Svg";
import LoadingSpinner from "../LoadingSpinner";

const MemberProfile = ({ data, status, onRefresh }) => {
  return (
    <div className="profile__content">
      <div className="profile__user">
        <div className="profile__avatar">
          <img src="/src/assets/img/user.svg" alt="" />
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
          <span> Punjabi Dub ID: {data.member_id}</span>
        </div>
      </div>

      <ul
        className="nav nav-tabs profile__tabs"
        id="profile__tabs"
        role="tablist"
      >
        <li className="nav-item">
          <button
            className="a-tag nav-link active"
            data-toggle="tab"
            href="#tab-1"
            role="tab"
            aria-controls="tab-1"
            aria-selected="true"
          >
            Profile
          </button>
        </li>

        <li className="nav-item">
          <button
            className="a-tag nav-link"
            data-toggle="tab"
            href="#tab-2"
            role="tab"
            aria-controls="tab-2"
            aria-selected="false"
          >
            Comments
          </button>
        </li>

        <li className="nav-item">
          <button
            className="a-tag nav-link"
            data-toggle="tab"
            href="#tab-3"
            role="tab"
            aria-controls="tab-3"
            aria-selected="false"
          >
            Reviews
          </button>
        </li>
      </ul>

      <div className="profile__mobile-tabs" id="profile__mobile-tabs">
        <div
          className="profile__mobile-tabs-btn dropdown-toggle"
          role="navigation"
          id="mobile-tabs"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <input type="button" value="Profile" />
          <span></span>
        </div>

        <div
          className="profile__mobile-tabs-menu dropdown-menu"
          aria-labelledby="mobile-tabs"
        >
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <button
                className="a-tag nav-link active"
                id="1-tab"
                data-toggle="tab"
                href="#tab-1"
                role="tab"
                aria-controls="tab-1"
                aria-selected="true"
              >
                Profile
              </button>
            </li>

            <li className="nav-item">
              <button
                className="a-tag nav-link"
                id="2-tab"
                data-toggle="tab"
                href="#tab-2"
                role="tab"
                aria-controls="tab-2"
                aria-selected="false"
              >
                Comments
              </button>
            </li>

            <li className="nav-item">
              <button
                className="a-tag nav-link"
                id="3-tab"
                data-toggle="tab"
                href="#tab-3"
                role="tab"
                aria-controls="tab-3"
                aria-selected="false"
              >
                Reviews
              </button>
            </li>
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
              href="#modala-tag -status3"
              className={
                data.status === "Inactive"
                  ? " profile__action profile__action_inactive--banned"
                  : " profile__action profile__action--banned"
              }
            >
              <Svg
                path={
                  "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                }
              />
            </button>
            <button
              href="#modala-tag -delete3"
              className="profile__action profile__action--delete open-modal"
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
