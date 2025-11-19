import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  loadPaginatedReviews,
  setSortBy,
  setCurrentPage,
} from "../../redux/slices/reviewsSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { getImageWithFallback } from "../utils/imageUtils";
import { formatDateTime } from "../utils/dateUtils";
import { getRatingClass } from "../utils/ratingUtils";
import LikeDislikeCount from "../components/LikeDislikeCount";
import { DEFAULT_PAGE_SIZE } from "../constants/pagination";

const Reviews = () => {
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
        limit: DEFAULT_PAGE_SIZE,
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
    { accessor: "rowNumber", label: "ID" },
    {
      accessor: "video",
      label: "Thumbnail / Video Title",
      render: (value) => (
        <div className="sidebar__user p-0" style={{ borderBottom: 0 }}>
          <div
            className="sidebar__user-img"
            style={{ width: "50px", height: "50px" }}
          >
            <img
              alt="thumbnail"
              src={getImageWithFallback(value?.thumbnail_url, "thumbnail")}
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
          <span className={getRatingClass(value)}>{value.toFixed(1)}</span>
        ) : (
          "N/A"
        ),
    },
    {
      label: "Like / Dislike",
      accessor: "likeCount",
      render: (value, row) => (
        <LikeDislikeCount
          likeCount={row.likeCount}
          dislikeCount={row.dislikeCount}
        />
      ),
    },
    {
      accessor: "createdAt",
      label: "Created Date",
      render: (value) => formatDateTime(value),
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
                      limit: DEFAULT_PAGE_SIZE,
                      sort: sortBy,
                      order,
                    })
                  )
                }
              />
            </div>
            <div className="col-12">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="main__table-wrap">
                  <Table
                    columns={columns}
                    data={
                      reviews?.map((review, index) => ({
                        ...review,
                        rowNumber:
                          (currentPage - 1) * DEFAULT_PAGE_SIZE + index + 1,
                      })) || []
                    }
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

export default Reviews;
