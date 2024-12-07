import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import PropTypes from "prop-types";

const EditUser = ({ headerImage }) => {
  return (
    <>
      <body>
        <Header headerImage={headerImage} />

        <DashboardSideBar
          headerImage={headerImage}
          activeLink="sidebar__nav-link--active"
        />

        <main className="main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="main__title">
                  <h2>Edit user</h2>
                </div>
              </div>

              <div className="col-12">
                <div className="profile__content">
                  <div className="profile__user">
                    <div className="profile__avatar">
                      <img src="/src/assets/img/user.svg" alt="" />
                    </div>
                    <div className="profile__meta profile__meta--green">
                      <h3>
                        Username <span>(Approved)</span>
                      </h3>
                      <span> Punjabi Dub ID: 23562</span>
                    </div>
                  </div>

                  <ul
                    className="nav nav-tabs profile__tabs"
                    id="profile__tabs"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#tab-1"
                        role="tab"
                        aria-controls="tab-1"
                        aria-selected="true"
                      >
                        Profile
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#tab-2"
                        role="tab"
                        aria-controls="tab-2"
                        aria-selected="false"
                      >
                        Comments
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#tab-3"
                        role="tab"
                        aria-controls="tab-3"
                        aria-selected="false"
                      >
                        Reviews
                      </a>
                    </li>
                  </ul>

                  <div
                    className="profile__mobile-tabs"
                    id="profile__mobile-tabs"
                  >
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
                          <a
                            className="nav-link active"
                            id="1-tab"
                            data-toggle="tab"
                            href="#tab-1"
                            role="tab"
                            aria-controls="tab-1"
                            aria-selected="true"
                          >
                            Profile
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="2-tab"
                            data-toggle="tab"
                            href="#tab-2"
                            role="tab"
                            aria-controls="tab-2"
                            aria-selected="false"
                          >
                            Comments
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="3-tab"
                            data-toggle="tab"
                            href="#tab-3"
                            role="tab"
                            aria-controls="tab-3"
                            aria-selected="false"
                          >
                            Reviews
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="profile__actions">
                    <a
                      href="#modal-status3"
                      className="profile__action profile__action--banned open-modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                      </svg>
                    </a>
                    <a
                      href="#modal-delete3"
                      className="profile__action profile__action--delete open-modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab-1"
                  role="tabpanel"
                  aria-labelledby="1-tab"
                >
                  <div className="col-12">
                    <div className="sign__wrap">
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <form
                            action="#"
                            className="sign__form sign__form--profile sign__form--first"
                          >
                            <div className="row">
                              <div className="col-12">
                                <h4 className="sign__title">Profile details</h4>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="username"
                                  >
                                    Login
                                  </label>
                                  <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    className="sign__input"
                                    placeholder="User123"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="email"
                                  >
                                    Email
                                  </label>
                                  <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="sign__input"
                                    placeholder="email@email.com"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="firstname"
                                  >
                                    First name
                                  </label>
                                  <input
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    className="sign__input"
                                    placeholder="John"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="lastname"
                                  >
                                    Last name
                                  </label>
                                  <input
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    className="sign__input"
                                    placeholder="Doe"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="subscription"
                                  >
                                    Subscription
                                  </label>
                                  <select
                                    className="js-example-basic-single"
                                    id="subscription"
                                  >
                                    <option value="Basic">Basic</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Cinematic">Cinematic</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="rights"
                                  >
                                    Rights
                                  </label>
                                  <select
                                    className="js-example-basic-single"
                                    id="rights"
                                  >
                                    <option value="User">User</option>
                                    <option value="Moderator">Moderator</option>
                                    <option value="Admin">Admin</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-12">
                                <button className="sign__btn" type="button">
                                  Save
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="col-12 col-lg-6">
                          <form
                            action="#"
                            className="sign__form sign__form--profile"
                          >
                            <div className="row">
                              <div className="col-12">
                                <h4 className="sign__title">Change password</h4>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="oldpass"
                                  >
                                    Old password
                                  </label>
                                  <input
                                    id="oldpass"
                                    type="password"
                                    name="oldpass"
                                    className="sign__input"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="newpass"
                                  >
                                    New password
                                  </label>
                                  <input
                                    id="newpass"
                                    type="password"
                                    name="newpass"
                                    className="sign__input"
                                  />
                                </div>
                              </div>

                              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                                <div className="sign__group">
                                  <label
                                    className="sign__label"
                                    htmlFor="confirmpass"
                                  >
                                    Confirm new password
                                  </label>
                                  <input
                                    id="confirmpass"
                                    type="password"
                                    name="confirmpass"
                                    className="sign__input"
                                  />
                                </div>
                              </div>

                              <div className="col-12">
                                <button className="sign__btn" type="button">
                                  Change
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-2"
                  role="tabpanel"
                  aria-labelledby="2-tab"
                >
                  <div className="col-12">
                    <div className="main__table-wrap">
                      <table className="main__table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>ITEM</th>
                            <th>AUTHOR</th>
                            <th>TEXT</th>
                            <th>LIKE / DISLIKE</th>
                            <th>CRAETED DATE</th>
                            <th>ACTIONS</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>
                              <div className="main__table-text">23</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">I Dream in Another Language</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">12 / 7</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">24</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Benched</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">67 / 22</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">25</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Whitney</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">44 / 5</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">26</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Blindspotting</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">20 / 6</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">27</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">I Dream in Another Language</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">8 / 132</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">28</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Benched</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">6 / 1</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">29</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Whitney</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">10 / 0</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">30</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Blindspotting</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">13 / 14</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">31</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">I Dream in Another Language</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">12 / 7</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">32</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Benched</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">67 / 22</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="paginator">
                      <span className="paginator__pages">10 from 38</span>

                      <ul className="paginator__paginator">
                        <li>
                          <a href="#">
                            <svg
                              width="14"
                              height="11"
                              viewBox="0 0 14 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.75 5.36475L13.1992 5.36475"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M5.771 10.1271L0.749878 5.36496L5.771 0.602051"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </li>
                        <li className="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">4</a>
                        </li>
                        <li>
                          <a href="#">
                            <svg
                              width="14"
                              height="11"
                              viewBox="0 0 14 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.1992 5.3645L0.75 5.3645"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M8.17822 0.602051L13.1993 5.36417L8.17822 10.1271"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-3"
                  role="tabpanel"
                  aria-labelledby="3-tab"
                >
                  <div className="col-12">
                    <div className="main__table-wrap">
                      <table className="main__table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>ITEM</th>
                            <th>AUTHOR</th>
                            <th>TEXT</th>
                            <th>RATING</th>
                            <th>LIKE / DISLIKE</th>
                            <th>CRAETED DATE</th>
                            <th>ACTIONS</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>
                              <div className="main__table-text">23</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">I Dream in Another Language</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                7.9
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">12 / 7</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">24</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Benched</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                8.6
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">67 / 22</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">25</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Whitney</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                6.0
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">44 / 5</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">26</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Blindspotting</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                9.1
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">20 / 6</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">27</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">I Dream in Another Language</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                5.5
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">8 / 132</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">28</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Benched</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                7.0
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">6 / 1</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">29</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Whitney</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                9.0
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">10 / 0</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">30</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Blindspotting</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                6.2
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">13 / 14</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">31</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">I Dream in Another Language</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                7.9
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">12 / 7</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="main__table-text">32</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="#">Benched</a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">John Doe</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                Lorem Ipsum is simply dummy text...
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text main__table-text--rate">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
                                </svg>
                                8.6
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">67 / 22</div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                24 Oct 2021
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <a
                                  href="#modal-view2"
                                  className="main__table-btn main__table-btn--view open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                                  </svg>
                                </a>
                                <a
                                  href="#modal-delete2"
                                  className="main__table-btn main__table-btn--delete open-modal"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                                  </svg>
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="paginator">
                      <span className="paginator__pages">10 from 49</span>

                      <ul className="paginator__paginator">
                        <li>
                          <a href="#">
                            <svg
                              width="14"
                              height="11"
                              viewBox="0 0 14 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.75 5.36475L13.1992 5.36475"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M5.771 10.1271L0.749878 5.36496L5.771 0.602051"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </li>
                        <li className="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">4</a>
                        </li>
                        <li>
                          <a href="#">
                            <svg
                              width="14"
                              height="11"
                              viewBox="0 0 14 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.1992 5.3645L0.75 5.3645"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M8.17822 0.602051L13.1993 5.36417L8.17822 10.1271"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div
          id="modal-view"
          className="zoom-anim-dialog mfp-hide modal modal--view"
        >
          <div className="comments__autor">
            <img
              className="comments__avatar"
              src="/src/assets/img/user.svg"
              alt=""
            />
            <span className="comments__name">John Doe</span>
            <span className="comments__time">30.08.2018, 17:53</span>
          </div>
          <p className="comments__text">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn&apos;t anything embarrassing hidden in the
            middle of text.
          </p>
          <div className="comments__actions">
            <div className="comments__rate">
              <span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 7.3273V14.6537"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6667 10.9905H7.33333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                12
              </span>

              <span>
                7
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6667 10.9905H7.33333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div id="modal-delete" className="zoom-anim-dialog mfp-hide modal">
          <h6 className="modal__title">Comment delete</h6>

          <p className="modal__text">
            Are you sure to permanently delete this comment?
          </p>

          <div className="modal__btns">
            <button className="modal__btn modal__btn--apply" type="button">
              Delete
            </button>
            <button className="modal__btn modal__btn--dismiss" type="button">
              Dismiss
            </button>
          </div>
        </div>

        <div
          id="modal-view2"
          className="zoom-anim-dialog mfp-hide modal modal--view"
        >
          <div className="reviews__autor">
            <img
              className="reviews__avatar"
              src="/src/assets/img/user.svg"
              alt=""
            />
            <span className="reviews__name">
              Best Marvel movie in my opinion
            </span>
            <span className="reviews__time">24.08.2018, 17:53 by John Doe</span>

            <span className="reviews__rating">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z" />
              </svg>
              8.4
            </span>
          </div>
          <p className="reviews__text">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn&apos;t anything embarrassing hidden in the
            middle of text.
          </p>
        </div>

        <div id="modal-delete2" className="zoom-anim-dialog mfp-hide modal">
          <h6 className="modal__title">Review delete</h6>

          <p className="modal__text">
            Are you sure to permanently delete this review?
          </p>

          <div className="modal__btns">
            <button className="modal__btn modal__btn--apply" type="button">
              Delete
            </button>
            <button className="modal__btn modal__btn--dismiss" type="button">
              Dismiss
            </button>
          </div>
        </div>

        <div id="modal-status3" className="zoom-anim-dialog mfp-hide modal">
          <h6 className="modal__title">Status change</h6>

          <p className="modal__text">
            Are you sure about immediately change status?
          </p>

          <div className="modal__btns">
            <button className="modal__btn modal__btn--apply" type="button">
              Apply
            </button>
            <button className="modal__btn modal__btn--dismiss" type="button">
              Dismiss
            </button>
          </div>
        </div>

        <div id="modal-delete3" className="zoom-anim-dialog mfp-hide modal">
          <h6 className="modal__title">User delete</h6>

          <p className="modal__text">
            Are you sure to permanently delete this user?
          </p>

          <div className="modal__btns">
            <button className="modal__btn modal__btn--apply" type="button">
              Delete
            </button>
            <button className="modal__btn modal__btn--dismiss" type="button">
              Dismiss
            </button>
          </div>
        </div>
      </body>
    </>
  );
};
EditUser.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default EditUser;
