import Table from "../components/Table/Table";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import { useSelector, useDispatch } from "react-redux";
import {
  loadPaginatedVideos,
  setSortBy,
} from "../../redux/slices/catalogSlice";
import {
  fetchReviews,
  fetchVideoMetrics,
  fetchVideos,
  fetchVideosWithLikesDislikesMembers,
} from "../../services/allRoutes";
import { getImageWithFallback } from "../utils/imageUtils";
import { formatDateTime } from "../utils/dateUtils";
import { getSubscriptionPlanClass } from "../utils/subscriptionUtils";
import { getRatingClass } from "../utils/ratingUtils";
import { formatNumber, formatFileSize } from "../utils/numberUtils";
import { DEFAULT_PAGE_SIZE } from "../constants/pagination";

const Catalog = () => {
  const [loadingItems, setLoadingItems] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const dispatch = useDispatch();
  const {
    items: videos,
    currentPage,
    totalPages,
    loading,
    sortBy,
    order,
  } = useSelector((state) => state.catalog);

  const columns = [
    {
      accessor: "display_id",
      label: "ID",
      render: (value) => value || "N/A",
    },
    {
      accessor: "title",
      label: "Thumbnail  / Title",
      render: (value, row) => (
        <div className="sidebar__user p-0" style={{ borderBottom: 0 }}>
          <div
            className="sidebar__user-img"
            style={{ width: "50px", height: "50px" }}
          >
            <img
              alt="thumbnail"
              src={getImageWithFallback(row.thumbnail_url, "thumbnail")}
            />
          </div>
          <div className="sidebar__user-title">
            <div className="hover-title-desc">
              <button className="tooltip a-tag">
                {value}
                <span className="tooltiptext">{row.description}</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },

    { accessor: "category", label: "Category" },
    {
      label: `Access Level`,
      accessor: "access_level",
      render: (value) => (
        <span className={getSubscriptionPlanClass(value)}>{value}</span>
      ),
    },
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
      accessor: "views_count",
      label: "Views",
      render: (value) => formatNumber(value),
    },
    {
      accessor: "shares_count",
      label: "Shares",
      render: (value) => formatNumber(value),
    },
    {
      label: "File Size",
      accessor: "file_size",
      render: (value) => formatFileSize(value),
    },
    {
      label: "Likes",
      accessor: "likes",
      render: (value) =>
        value?.length > 0 ? (
          <div className="hover-likes-desc">
            <span className="main__table-text--green">{value.length}</span>
            <div className="tooltiptext">
              {value.map((user, index) => (
                <div key={index}>
                  {user.first_name} {user.last_name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span className="main__table-text--grey">0</span>
        ),
    },
    {
      label: "Dislikes",
      accessor: "dislikes",
      render: (value) =>
        value?.length > 0 ? (
          <div className="hover-dislikes-desc">
            <span className="main__table-text--red">{value.length}</span>
            <div className="tooltiptext">
              {value.map((user, index) => (
                <div key={index}>
                  {user.first_name} {user.last_name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span className="main__table-text--grey">0</span>
        ),
    },
    {
      accessor: "createdAt",
      label: "Date & Time",
      render: (value) => formatDateTime(value),
    },
  ];
  const handleSortChange = (sortValue) => {
    const newOrder = sortValue === sortBy && order === "DESC" ? "ASC" : "DESC";
    dispatch(setSortBy({ sortBy: sortValue, order: newOrder }));
  };
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
        "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
      toggle: true,
      className: "main__table-btn--view",
    },
    {
      id: 3,
      iconPath:
        "M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1,1,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z",
      href: "/edit-video",
      toggle: false,
      className: "main__table-btn--edit",
    },
    {
      id: 4,
      iconPath:
        "M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z",
      toggle: true,
      className: "main__table-btn--delete",
    },
  ];
  const fetchDataWithRatingsAndMetrics = useCallback(async () => {
    setLoadingItems(true);
    try {
      // Fetch data concurrently
      // Calculate date range dynamically (last 2 years)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 2);
      const startDateStr = startDate.toISOString().split("T")[0];
      const endDateStr = endDate.toISOString().split("T")[0];

      const [
        videoResponse,
        reviewsResponse,
        metricsResponse,
        videoLikesDislikesResponse,
      ] = await Promise.all([
        fetchVideos(), // Fetch video details
        fetchReviews({ startDate: startDateStr, endDate: endDateStr }),
        fetchVideoMetrics(),
        fetchVideosWithLikesDislikesMembers(), // Fetch likes/dislikes with members
      ]);

      // Extract data from responses - handle both direct arrays and wrapped objects
      const videoList = Array.isArray(videoResponse)
        ? videoResponse
        : videoResponse?.data || [];
      const reviews = Array.isArray(reviewsResponse)
        ? reviewsResponse
        : reviewsResponse?.data || [];
      const metrics = Array.isArray(metricsResponse)
        ? metricsResponse
        : metricsResponse?.data || [];
      const videoLikesDislikes = Array.isArray(videoLikesDislikesResponse)
        ? videoLikesDislikesResponse
        : videoLikesDislikesResponse?.data || [];

      // Enrich video data with reviews, metrics, and likes/dislikes
      const enrichedData = videoList.map((video) => {
        // Normalize _id to video_id for consistency (MongoDB uses _id)
        // Convert ObjectId to string if needed
        const videoId = video._id
          ? typeof video._id === "object" && video._id.toString
            ? video._id.toString()
            : String(video._id)
          : video.video_id
          ? String(video.video_id)
          : null;

        const review = reviews.find((rev) => {
          // Handle populated video_id object (has _id property) or direct video_id string/ObjectId
          let revVideoId = null;
          if (rev.video_id) {
            if (typeof rev.video_id === "object") {
              // If video_id is populated object, get its _id
              if (rev.video_id._id) {
                revVideoId =
                  typeof rev.video_id._id === "object" &&
                  rev.video_id._id.toString
                    ? rev.video_id._id.toString()
                    : String(rev.video_id._id);
              } else {
                // If it's an ObjectId object directly
                revVideoId = rev.video_id.toString
                  ? rev.video_id.toString()
                  : String(rev.video_id);
              }
            } else {
              // If video_id is a string or primitive
              revVideoId = String(rev.video_id);
            }
          }
          return revVideoId === videoId;
        });
        const metric = metrics.find((m) => {
          // Handle populated video_id object (has _id property) or direct video_id string/ObjectId
          let mVideoId = null;
          if (m.video_id) {
            if (typeof m.video_id === "object") {
              // If video_id is populated object, get its _id
              if (m.video_id._id) {
                mVideoId =
                  typeof m.video_id._id === "object" && m.video_id._id.toString
                    ? m.video_id._id.toString()
                    : String(m.video_id._id);
              } else {
                // If it's an ObjectId object directly
                mVideoId = m.video_id.toString
                  ? m.video_id.toString()
                  : String(m.video_id);
              }
            } else {
              // If video_id is a string or primitive
              mVideoId = String(m.video_id);
            }
          }
          return mVideoId === videoId;
        });
        const videoLikesDislikesEntry = videoLikesDislikes.find((ld) => {
          // Handle both _id and video_id fields
          const ldId = ld.video_id
            ? String(ld.video_id)
            : ld._id
            ? typeof ld._id === "object" && ld._id.toString
              ? ld._id.toString()
              : String(ld._id)
            : null;
          return ldId === videoId;
        });

        return {
          ...video,
          video_id: videoId, // Ensure video_id is always present as string (for edit links)
          rating: review?.rating || "N/A",
          views_count: metric?.views_count || 0,
          shares_count: metric?.shares_count || 0,
          favorites_count: metric?.favorites_count || 0,
          report_count: metric?.report_count || 0,
          likes:
            videoLikesDislikesEntry?.likesDislikes
              ?.filter((ld) => ld.is_like)
              ?.map((ld) => ld.user) || [],
          dislikes:
            videoLikesDislikesEntry?.likesDislikes
              ?.filter((ld) => !ld.is_like)
              ?.map((ld) => ld.user) || [],
        };
      });
      // Sort enriched data
      const sortedData = [...enrichedData].sort((a, b) => {
        if (sortBy === "likes.length") {
          const countA = a.likes.length;
          const countB = b.likes.length;
          return order === "ASC" ? countA - countB : countB - countA;
        }
        if (sortBy === "dislikes.length") {
          const countA = a.dislikes.length;
          const countB = b.dislikes.length;
          return order === "ASC" ? countA - countB : countB - countA;
        }
        const keyA = a[sortBy];
        const keyB = b[sortBy];
        if (order === "ASC") return keyA > keyB ? 1 : -1;
        return keyA < keyB ? 1 : -1;
      });

      // Add sequential display_id after sorting to reflect final order
      const dataWithDisplayId = sortedData.map((item, index) => ({
        ...item,
        display_id: index + 1, // Sequential numbering (1, 2, 3...)
      }));

      setVideoData(dataWithDisplayId);
    } catch (error) {
      // Error handling is done by the API layer
    } finally {
      setLoadingItems(false);
    }
  }, [sortBy, order]);

  useEffect(() => {
    fetchDataWithRatingsAndMetrics();
    dispatch(
      loadPaginatedVideos({
        page: currentPage,
        limit: DEFAULT_PAGE_SIZE,
        sort: sortBy,
        order: order,
      })
    );
  }, [dispatch, currentPage, sortBy, order, fetchDataWithRatingsAndMetrics]);
  return (
    <>
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
                  ID: "video_id",
                  Date: "createdAt",
                  Rating: "rating",
                  Views: "views_count",
                  Likes: "likes.length",
                  Dislikes: "dislikes.length",
                }}
                activeSort={sortBy}
                onSortChange={handleSortChange}
                loading={loadingItems}
                onRefresh={fetchDataWithRatingsAndMetrics}
              />
            </div>
            <div className="col-12">
              {loadingItems ? (
                <LoadingSpinner />
              ) : (
                <div className="main__table-wrap">
                  <Table
                    columns={columns}
                    buttonData={buttonData}
                    data={videoData}
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
    </>
  );
};

export default Catalog;
