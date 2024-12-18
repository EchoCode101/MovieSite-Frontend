// import PropTypes from "prop-types";
// import Header from "../components/Header";
// import DashboardSideBar from "../components/SideBar/DashboardSideBar";
// import Paginator from "../components/Paginator";
// import { useState } from "react";
// import Table from "../components/Table/Table";
// import TableFilters from "../components/Table/TableFilters";
// import ReusableModal from "../components/ReusableModal";

// const Catalog = ({ headerImage }) => {
//   const tableFiltersData = {
//     title: "Catalog",
//     title_stats: "56,113",
//     searchPlaceholder: "Find movie / tv series..",
//   };
//     const sortByValues = { date: "Date created", rating: "Rating", views:"Views"};

//   const buttonData = [
//     {
//       iconPath:
//         "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z",
//       href: "#modal-status",
//       className: "main__table-btn--banned open-modal",
//     },
//     {
//       iconPath:
//         "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
//       href: "#modal-view",
//       className: "main__table-btn--view open-modal",
//     },
//     {
//       iconPath:
//         "M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1,1,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z",
//       href: "/edit-user",
//       className: "main__table-btn--edit",
//     },
//     {
//       iconPath:
//         "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",
//       href: "#modal-delete",
//       className: "main__table-btn--delete open-modal",
//     },
//   ];

//   const columns = [
//     { label: "ID" },
//     { label: "TITLE" },
//     { label: "RATING" },
//     { label: "CATEGORY" },
//     { label: "VIEWS" },
//     { label: "STATUS" },
//     { label: "CRAETED DATE" },
//     { label: "ACTIONS" },
//   ];
//   const tableData = [
//     {
//       id: 1,
//       title: "I Dream in Another Language",
//       rating: 4.5,
//       category: "Movie",
//       views: 1200,
//       status: "Visible",
//       createdDate: "2024-12-01",
//       catalogTable: true,
//       classValue: "main__table-text--green",
//       thumbnailImg:"/src/assets/img/thumbnail.jpg"
//     },
//     {
//       id: 2,
//       title: "Benched",
//       rating: 3.8,
//       category: "TV Show",
//       views: 900,
//       status: "Hidden",
//       createdDate: "2024-12-02",
//       catalogTable: true,
//       classValue: "main__table-text--red",
//       thumbnailImg:"/src/assets/img/thumbnail.jpg"
//     },
//     {
//       id: 11,
//       title: "I Dream in Another Language",
//       rating: 4.5,
//       category: "Movie",
//       views: 1200,
//       status: "Visible",
//       createdDate: "2024-12-01",
//       catalogTable: true,
//       classValue: "main__table-text--green",
//       thumbnailImg:"/src/assets/img/thumbnail.jpg"
//     },
//     {
//       id: 23,
//       title: "Benched",
//       rating: 3.8,
//       category: "TV Show",
//       views: 900,
//       status: "Hidden",
//       createdDate: "2024-12-02",
//       catalogTable: true,
//       classValue: "main__table-text--red",
//       thumbnailImg:"/src/assets/img/thumbnail.jpg"
//     },
//   ];
//   const totalPages = 5; // Example total pages
//   const [currentPage, setCurrentPage] = useState(1);

//   // Create an array of page numbers
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const handlePageChange = (page) => {
//     console.log(`Switched to page: ${page}`);
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <Header headerImage={headerImage} />

//       <DashboardSideBar
//         headerImage={headerImage}
//         activeLink="sidebar__nav-link--active"
//       />

//       <main className="main">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-12">
//               <TableFilters
//                 data={tableFiltersData}
//                 sortByValues={sortByValues}
//               />
//             </div>

//             <div className="col-12">
//               <div className="main__table-wrap">
//                 <Table
//                   columns={columns}
//                   data={tableData}
//                   buttonData={buttonData}
//                 />
//               </div>
//             </div>

//             <div className="col-12">
//               <Paginator
//                 pages={pages}
//                 currentPage={currentPage}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//       <ReusableModal
//         modalId="modal-view"
//         customClass="modal--view"
//         content={[
//           {
//             type: "image",
//             src: "/src/assets/img/user.svg",
//             name: "John Doe",
//             time: "30.08.2018, 17:53",
//           },
//           {
//             type: "text",
//             text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
//             className: "comments__text",
//           },
//           {
//             type: "actions",
//             ratings: [
//               {
//                 icon: (
//                   <svg
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M11 7.3273V14.6537"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M14.6667 10.9905H7.33333"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ),
//                 text: "12",
//               },
//               {
//                 icon: (
//                   <svg
//                     width="22"
//                     height="22"
//                     viewBox="0 0 22 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M14.6667 10.9905H7.33333"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ),
//                 text: "7",
//               },
//             ],
//           },
//         ]}
//       />
//       <ReusableModal
//         modalId="modal-status"
//         title="Status change"
//         content={[
//           {
//             type: "text",
//             text: "Are you sure about immediately change status?",
//           },
//         ]}
//         buttons={[
//           {
//             className: "modal__btn--apply",
//             text: "Apply",
//             onClick: () => console.log("Apply"),
//           },
//           {
//             className: "modal__btn--dismiss",
//             text: "Dismiss",
//             onClick: () => console.log("Dismiss"),
//           },
//         ]}
//       />
//       <ReusableModal
//         modalId="modal-delete"
//         title="Item delete"
//         content={[
//           {
//             type: "text",
//             text: "Are you sure to permanently delete this item?",
//           },
//         ]}
//         buttons={[
//           {
//             className: "modal__btn--apply",
//             text: "Delete",
//             onClick: () => console.log("Delete"),
//           },
//           {
//             className: "modal__btn--dismiss",
//             text: "Dismiss",
//             onClick: () => console.log("Dismiss"),
//           },
//         ]}
//       />
//     </>
//   );
// };
// Catalog.propTypes = {
//   headerImage: PropTypes.string.isRequired,
// };
// export default Catalog;
// pages/Catalog.jsx
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPaginatedVideos, setSortBy } from "../../redux/catalogSlice";
import Header from "../components/Header";
import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import ReusableModal from "../components/ReusableModal";
import LoadingSpinner from "../components/LoadingSpinner";

const Catalog = ({ headerImage }) => {
  const dispatch = useDispatch();
  const {
    items: videos,
    currentPage,
    totalPages,
    loading,
    sortBy,
    order,
  } = useSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(
      loadPaginatedVideos({
        page: currentPage,
        limit: 10,
        sort: sortBy,
        order: order,
      })
    );
  }, [dispatch, currentPage, sortBy, order]);
  const handleSortChange = (sortValue) => {
    const newOrder = sortValue === sortBy && order === "DESC" ? "ASC" : "DESC";
    dispatch(setSortBy({ sortBy: sortValue, order: newOrder }));
  };

  const buttonData = [
    {
      iconPath:
        "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z",
      href: "#modal-status",
      className: "main__table-btn--banned open-modal",
    },
    {
      iconPath:
        "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
      href: "#modal-view",
      className: "main__table-btn--view open-modal",
    },
    {
      iconPath:
        "M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1,1,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z",
      href: "/edit-user",
      className: "main__table-btn--edit",
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
    { label: "TITLE" },
    { label: "RATING" },
    { label: "CATEGORY" },
    { label: "VIEWS" },
    { label: "STATUS" },
    { label: "CREATED DATE" },
    { label: "ACTIONS" },
  ];

  return (
    <>
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
                data={{
                  title: "Catalog",
                  title_stats: videos?.length ? `${videos.length}` : "0",
                  searchPlaceholder: "Find movie / tv series..",
                }}
                sortByValues={{
                  Date: "last_updated",
                  Rating: "rating",
                  Views: "views",
                }}
                activeSort={sortBy}
                onSortChange={handleSortChange}
              />
            </div>
            <div className="col-12">
              {loading ? (
                <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
              ) : (
                <div className="main__table-wrap">
                  <Table
                    columns={columns}
                    buttonData={buttonData}
                    data={videos || []} // Safe fallback
                    loading={loading}
                  />
                </div>
              )}
            </div>
            <div className="col-12">
              <Paginator
                pages={Array.from({ length: totalPages || 1 }, (_, i) => i + 1)}
                currentPage={currentPage || 1}
                onPageChange={(page) => dispatch(loadPaginatedVideos({ page }))}
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
        modalId="modal-status"
        title="Status change"
        content={[
          {
            type: "text",
            text: "Are you sure about immediately change status?",
          },
        ]}
        buttons={[
          {
            className: "modal__btn--apply",
            text: "Apply",
            onClick: () => console.log("Apply"),
          },
          {
            className: "modal__btn--dismiss",
            text: "Dismiss",
            onClick: () => console.log("Dismiss"),
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
    </>
  );
};
Catalog.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default Catalog;
