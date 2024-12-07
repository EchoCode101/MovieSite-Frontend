import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Table from "../components/Table/Table";

import Paginator from "../components/Paginator";
import { useState } from "react";
import TableFilters from "../components/Table/TableFilters";

const Comments = ({ headerImage }) => {
  const tableFiltersData = {
    title: "Comments",
    title_stats: "21,356",
    searchPlaceholder: "Key word...",
  };
  const sortByValues = ["Date created", "Rating"];
  const buttonData = [
    {
      iconPath:
        "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
      href: "#modal-view",
      className: "main__table-btn--view open-modal",
    },

    {
      iconPath:
        "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",
      href: "#modal-delete",
      className: "main__table-btn--delete open-modal",
    },
  ];
  const tableData = [
    {
      id: 23,
      item: "I Dream in Another Language",
      author: "Jonathan Banks",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "12 / 7",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
    {
      id: 24,
      item: "Benched",
      author: "John Doe",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "67 / 22",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
    {
      id: 25,
      item: "Whitney",
      author: "Brian Cranston",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "44 / 5",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
    {
      id: 26,
      item: "Blindspotting",
      author: "Jesse Plemons",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "20 / 6",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
    {
      id: 26,
      item: "Blindspotting",
      author: "Jesse Plemons",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "20 / 6",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
    {
      id: 26,
      item: "Blindspotting",
      author: "Jesse Plemons",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "20 / 6",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
    {
      id: 26,
      item: "Blindspotting",
      author: "Jesse Plemons",
      text: "Lorem Ipsum is simply dummy text...",
      likesDislikes: "20 / 6",
      createdDate: "24 Oct 2021",
      commentTable: true,
    },
  ];
  const columns = [
    { label: "ID" },
    { label: "ITEM" },
    { label: "AUTHOR" },
    { label: "TEXT" },
    { label: "LIKE / DISLIKE" },
    { label: "CREATED DATE" },
    { label: "ACTIONS" },
  ];
  const totalPages = 5; // Example total pages
  const [currentPage, setCurrentPage] = useState(1);

  // Create an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    console.log(`Switched to page: ${page}`);
    setCurrentPage(page);
  };

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
                <TableFilters
                  data={tableFiltersData}
                  sortByValues={sortByValues}
                />
              </div>

              <div className="col-12">
                <div className="main__table-wrap">
                  <Table
                    columns={columns}
                    data={tableData}
                    buttonData={buttonData}
                  />
                </div>
              </div>

              <div className="col-12">
                <Paginator
                  pages={pages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
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
      </body>
    </>
  );
};
Comments.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default Comments;
