import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import { useState } from "react";
import TableFilters from "../components/Table/TableFilters";
import ReusableModal from "../components/ReusableModal";
const Reviews = ({ headerImage }) => {
  const tableFiltersData = {
    title: "Reviews",
    title_stats: "9,071",
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
  const columns = [
    { label: "ID" },
    { label: "ITEM" },
    { label: "AUTHOR" },
    { label: "TEXT" },
    { label: "RATING" },
    { label: "LIKE / DISLIKE" },
    { label: "CREATED DATE" },
    { label: "ACTIONS" },
  ];
  const tableData = [
    {
      id: 23,
      item: "I Dream in Another Language",
      author: "John Doe",
      text: "Lorem Ipsum is simply dummy text...",
      rating: 7.9,
      likes: 12,
      dislikes: 7,
      createdDate: "24 Oct 2021",
      reviewTable: true,
    },
    {
      id: 24,
      item: "Benched",
      author: "John Doe",
      text: "Lorem Ipsum is simply dummy text...",
      rating: 8.6,
      likes: 67,
      dislikes: 22,
      createdDate: "24 Oct 2021",
      reviewTable: true,
    },
    {
      id: 24,
      item: "Benched",
      author: "John Doe",
      text: "Lorem Ipsum is simply dummy text...",
      rating: 8.6,
      likes: 67,
      dislikes: 22,
      createdDate: "24 Oct 2021",
      reviewTable: true,
    },
    {
      id: 24,
      item: "Benched",
      author: "John Doe",
      text: "Lorem Ipsum is simply dummy text...",
      rating: 8.6,
      likes: 67,
      dislikes: 22,
      createdDate: "24 Oct 2021",
      reviewTable: true,
    },
    // Add more rows as needed
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

        <ReusableModal
          modalId="modal-view"
          customClass="modal--view"
          content={[
            {
              type: "image",
              src: "/src/assets/img/user.svg",
              name: "John Doe",
              time: "30.08.2018, 17:53",
            },
            {
              type: "text",
              text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
              className: "comments__text",
            },
            {
              type: "actions",
              ratings: [
                {
                  icon: (
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
                  ),
                  text: "12",
                },
                {
                  icon: (
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
                  ),
                  text: "7",
                },
              ],
            },
          ]}
        />
        <ReusableModal
          modalId="modal-delete"
          title="Item delete"
          content={[
            {
              type: "text",
              text: "Are you sure to permanently delete this item?",
            },
          ]}
          buttons={[
            {
              className: "modal__btn--apply",
              text: "Delete",
              onClick: () => console.log("Delete"),
            },
            {
              className: "modal__btn--dismiss",
              text: "Dismiss",
              onClick: () => console.log("Dismiss"),
            },
          ]}
        />
      </body>
    </>
  );
};
Reviews.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default Reviews;
