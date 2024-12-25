import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadPaginatedReviews,
  setSortBy,
  setCurrentPage,
} from "../../redux/reviewsSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const Reviews = ({ headerImage }) => {
  const dispatch = useDispatch();
  const {
    items: reviews,
    currentPage,
    totalPages,
    loading,
    sortBy,
    order,
  } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(
      loadPaginatedReviews({
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
  const buttonData = [
    {
      id: 1,
      iconPath:
        "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
      toggle: true,
      className: "main__table-btn--view open-modal",
    },

    {
      id: 2,
      iconPath:
        "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",
      toggle: true,
      className: "main__table-btn--delete open-modal",
    },
  ];
  const columns = [
    { accessor: "review_id", label: "ID" },
    {
      accessor: "video",
      label: "Video Title",
      render: (value) => (
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
                // `${value.thumbnail_url || "N/A"}`
              }
            />
          </div>
          <div className="sidebar__user-title">
            <div className="hover-title-desc">
              <button className="tooltip a-tag">
                {value?.title || "N/A"}
                <span className="tooltiptext">
                  {value?.description || "N/A"}
                </span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessor: "member",
      label: "Author",
      render: (value) =>
        `${value?.first_name || "Unknown"} ${value?.last_name || ""}`.trim(),
    },
    { accessor: "review_content", label: "Text" },
    {
      accessor: "rating",
      label: "Rating",
      render: (value) =>
        value !== "N/A" ? (
          <span
            className={`${
              value >= 10
                ? "main__table-text--green"
                : value < 2
                ? "main__table-text--red"
                : ""
            }`}
          >
            {value.toFixed(1)}
          </span>
        ) : (
          "N/A"
        ),
    },
    {
      label: "Like / Dislike",
      accessor: "likeCount",
      render: (value, row) => (
        <>
          <span
            className={
              row.likeCount > 0
                ? "main__table-text--green"
                : "main__table-text--grey"
            }
          >
            {row.likeCount || 0}
          </span>
          &nbsp;/&nbsp;
          <span
            className={
              row.dislikeCount > 0
                ? "main__table-text--red"
                : "main__table-text--grey"
            }
          >
            {row.dislikeCount || 0}
          </span>
        </>
      ),
    },
    {
      accessor: "createdAt",
      label: "Created Date",
      render: (value) =>
        new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          hour12: true, // e.g., "PM"
          minute: "2-digit",
        }),
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
                  title: "Reviews",
                  title_stats: reviews?.length || "0",
                  searchPlaceholder: "Search reviews...",
                }}
                sortByValues={{
                  ID: "review_id",
                  Date: "createdAt",
                  Rating: "rating",
                  Likes: "likes",
                  Dislikes: "dislikes",
                }}
                activeSort={sortBy}
                onSortChange={handleSortChange}
                loading={loading}
                onRefresh={() =>
                  dispatch(
                    loadPaginatedReviews({
                      page: currentPage,
                      limit: 10,
                      sort: sortBy,
                      order,
                    })
                  )
                }
              />
            </div>
            <div className="col-12">
              {loading ? (
                <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
              ) : (
                <div className="main__table-wrap">
                  <Table
                    columns={columns}
                    data={reviews || []}
                    loading={loading}
                    buttonData={buttonData}
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

Reviews.propTypes = {
  headerImage: PropTypes.string.isRequired,
};

export default Reviews;

{
  /* <ReusableModal
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
      /> */
}
