import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadPaginatedUsers,
  setSortBy,
  setCurrentPage,
} from "../../redux/slices/usersSlice";

import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { deleteMemberById } from "../../services/allRoutes";
const Users = () => {
  const dispatch = useDispatch();
  const {
    items: users,
    currentPage,
    totalPages,
    loading,
    sortBy,
    order,
  } = useSelector((state) => state.users);

  // Delete handler for users
  const deleteHandler = async (userId) => {
    try {
      await toast.promise(
        deleteMemberById(userId),
        {
          pending: "Deleting user...",
          success: "User deleted successfully!",
          error: "Failed to delete user.",
        },
        { autoClose: 3000, draggable: true }
      );
      // Reload users after deletion
      dispatch(
        loadPaginatedUsers({
          page: currentPage,
          limit: 10,
          sort: sortBy,
          order,
        })
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
    { accessor: "member_id", label: "ID" },
    {
      accessor: "profile_pic",
      label: "Profile",
      render: (value, row) => (
        <div className="sidebar__user p-0" style={{ borderBottom: 0 }}>
          <div
            className="sidebar__user-img"
            style={{ width: "50px", height: "50px" }}
          >
            <img
              alt="thumbnail"
              src={
                ` https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSLNQ1t4kHMECW1dLM7F3h1l1vWdZzZTHERYJmlg1NC7Ekl7JpWsIDXVw6EKTgiDzhlTA0u9GqgAU0Bl_gTtIy_Q-G0DdRQR4l7GsqKDSrkBA`
                // ||
                // `${row.thumbnail_url}`
              }
            />
          </div>
          <div className="sidebar__user-title">
            <div className="hover-title-desc">
              <button className="tooltip a-tag">
                {row.first_name} {row.last_name}
                <span className="tooltiptext">{row.email}</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    { accessor: "username", label: "Username" },
    {
      accessor: "subscription_plan",
      label: "Plan",
      render: (value) => (
        <span
          className={`${
            value === "Free"
              ? ""
              : value === "Basic"
              ? "main__table-text--mint"
              : value === "Premium"
              ? "main__table-text--pink"
              : "main__table-text--golden"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      accessor: "commentsCount",
      label: "Comments",
      render: (value) => (value?.length > 0 ? value.length : "0"),
    },
    {
      accessor: "reviewsCount",
      label: "Reviews",
      render: (value) => (value?.length > 0 ? value.length : "0"),
    },
    {
      accessor: "commentRepliesCount",
      label: "Replies",
      render: (value) => (value?.length > 0 ? value.length : "0"),
    },
    {
      accessor: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`${
            value === "Active"
              ? "main__table-text--green"
              : "main__table-text--red"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      accessor: "createdAt",
      label: "Created Date",
      render: (value) =>
        new Date(value).toLocaleString("en-US", {
          weekday: "short", // e.g., "Monday"
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // e.g., "PM"
        }),
    },
  ];

  const buttonData = [
    {
      id: 1,
      iconPath:
        "M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z",
      toggle: true,
      className: "main__table-btn--banned",
    },
    {
      id: 2,
      iconPath:
        "M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1,1,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z",
      href: "/edit-user",
      toggle: false,
      className: "main__table-btn--edit",
    },
    {
      id: 3,
      iconPath:
        "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",
      toggle: true,
      className: "main__table-btn--delete",
      onProceed: deleteHandler, // Pass delete handler
    },
  ];

  return (
    <>
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
                  ID: "member_id",
                  Date: "createdAt",
                  Plan: "subscription_plan",
                  Status: "status",
                }}
                activeSort={sortBy}
                onSortChange={handleSortChange}
                onRefresh={() =>
                  dispatch(
                    loadPaginatedUsers({
                      page: currentPage,
                      limit: 10,
                      sort: sortBy,
                      order,
                    })
                  )
                }
                loading={loading}
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

export default Users;
