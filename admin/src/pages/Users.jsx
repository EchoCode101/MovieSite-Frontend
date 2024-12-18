// import Header from "../components/Header";
// import PropTypes from "prop-types";
// import DashboardSideBar from "../components/SideBar/DashboardSideBar";
// import Paginator from "../components/Paginator";
// import { useState } from "react";
// import Table from "../components/Table/Table";
// import TableFilters from "../components/Table/TableFilters";
// import ReusableModal from "../components/ReusableModal";

// const Users = ({ headerImage }) => {
//   const tableFiltersData = {
//     title: "Users",
//     title_stats: "3,702",
//     searchPlaceholder: "Find user..",
//   };
//   const sortByValues = {
//     date: "Date created",
//     plan: "Pricing plan",
//     status: "Status",
//   };

//   const buttonData = [
//     {
//       iconPath:
//         "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z",
//       href: "#modal-status",
//       className: "main__table-btn--banned open-modal",
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
//     { label: "BASIC INFO" },
//     { label: "USERNAME" },
//     { label: "PRICING PLAN" },
//     { label: "COMMENTS" },
//     { label: "REVIEWS" },
//     { label: "STATUS" },
//     { label: "CREATED DATE" },
//     { label: "ACTIONS" },
//   ];
//   const tableData = [
//     {
//       id: 21,
//       avatar: "/src/assets/img/user.svg",
//       name: "John Doe",
//       email: "email@email.com",
//       username: "Username1",
//       pricingPlan: "Premium",
//       comments: 13,
//       reviews: 1,
//       status: "Approved",
//       createdDate: "24 Oct 2021",
//       userTable: true,
//     },
//     {
//       id: 22,
//       avatar: "/src/assets/img/user.svg",
//       name: "John Doe",
//       email: "email@email.com",
//       username: "Username1",
//       pricingPlan: "Premium",
//       comments: 13,
//       reviews: 1,
//       status: "Approved",
//       createdDate: "24 Oct 2021",
//       userTable: true,
//     },
//     {
//       id: 23,
//       avatar: "/src/assets/img/user.svg",
//       name: "John Doe",
//       email: "email@email.com",
//       username: "Username1",
//       pricingPlan: "Premium",
//       comments: 13,
//       reviews: 1,
//       status: "Approved",
//       createdDate: "24 Oct 2021",
//       userTable: true,
//     },
//     {
//       id: 24,
//       avatar: "/src/assets/img/user.svg",
//       name: "Jane Smith",
//       email: "jane@email.com",
//       username: "Username2",
//       pricingPlan: "Free",
//       comments: 1,
//       reviews: 15,
//       status: "Approved",
//       createdDate: "25 Oct 2021",
//       userTable: true,
//     },
//     // Add more rows as needed
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
// Users.propTypes = {
//   headerImage: PropTypes.string.isRequired,
// };
// export default Users;
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPaginatedUsers,
  setSortBy,
  setCurrentPage,
} from "../../redux/usersSlice";

import Header from "../components/Header";
import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import LoadingSpinner from "../components/LoadingSpinner";
// import ReusableModal from "../components/ReusableModal";

const Users = ({ headerImage }) => {
  const dispatch = useDispatch();
  const {
    items: users,
    currentPage,
    totalPages,
    loading,
    sortBy,
    order,
  } = useSelector((state) => state.users); // Correct selector

  useEffect(() => {
    dispatch(
      loadPaginatedUsers({
        page: currentPage,
        limit: 10,
        sort: sortBy,
        order,
      })
    );
  }, [dispatch, currentPage, sortBy, order]);

  const handleSortChange = (sortValue) => {
    const newOrder = sortValue === sortBy && order === "DESC" ? "ASC" : "DESC";
    dispatch(setSortBy({ sortBy: sortValue, order: newOrder }));
  };

  const columns = [
    { label: "ID" },
    { label: "BASIC INFO" },
    { label: "USERNAME" },
    { label: "PRICING PLAN" },
    { label: "COMMENTS" },
    { label: "REVIEWS" },
    { label: "STATUS" },
    { label: "CREATED DATE" },
    { label: "ACTIONS" },
  ];

  const buttonData = [
    {
      iconPath:
        "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z",
      href: "#modal-status",
      className: "main__table-btn--banned open-modal",
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
                  title: "Users",
                  title_stats: users?.length ? `${users.length}` : "0",
                  searchPlaceholder: "Find user..",
                }}
                sortByValues={{
                  Date: "date_of_creation",
                  Plan: "subscription_plan",
                  Status: "status",
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
                    data={users || []}
                    loading={loading}
                  />
                </div>
              )}
            </div>
            <div className="col-12">
              <Paginator
                pages={Array.from({ length: totalPages || 1 }, (_, i) => i + 1)}
                currentPage={currentPage || 1}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Users.propTypes = {
  headerImage: PropTypes.string.isRequired,
};

export default Users;
