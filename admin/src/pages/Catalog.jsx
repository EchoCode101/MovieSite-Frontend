import Table from "../components/Table/Table";
import Header from "../components/Header";
import PropTypes from "prop-types";
import Paginator from "../components/Paginator";
import TableFilters from "../components/Table/TableFilters";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import { useSelector, useDispatch } from "react-redux";
import { loadPaginatedVideos, setSortBy } from "../../redux/catalogSlice";
import {
  fetchReviews,
  fetchVideoMetrics,
  fetchVideos,
  fetchVideosWithLikesDislikesMembers,
} from "../../services/allRoutes";

const Catalog = ({ headerImage }) => {
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
    { accessor: "video_id", label: "ID" },
    {
      accessor: "title",
      label: "Title",
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
      label: "Access Level",
      accessor: "access_level",
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
            {/* {console.log(value)} */}
          </span>
        ) : (
          "N/A"
        ),
    },
    {
      accessor: "views_count",
      label: "Views",
      render: (value) =>
        `${value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}`,
    },
    {
      accessor: "shares_count",
      label: "Shares",
      render: (value) =>
        `${value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}`,
    },
    {
      label: "File Size",
      accessor: "file_size",
      render: (value) =>
        value ? `${(value / 1024 / 1024).toFixed(2)} MB` : "N/A",
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
      const [
        { data: videoList },
        { data: reviews },
        { data: metrics },
        { data: videoLikesDislikes },
      ] = await Promise.all([
        fetchVideos(), // Fetch video details
        fetchReviews({ startDate: "2024-01-01", endDate: "2024-12-31" }),
        fetchVideoMetrics(),
        fetchVideosWithLikesDislikesMembers(), // Fetch likes/dislikes with members
      ]);

      // Enrich video data with reviews, metrics, and likes/dislikes
      const enrichedData = videoList.map((video) => {
        const review = reviews.find((rev) => rev.video_id === video.video_id);
        const metric = metrics.find((m) => m.video_id === video.video_id);
        const videoLikesDislikesEntry = videoLikesDislikes.find(
          (ld) => ld.video_id === video.video_id
        );

        return {
          ...video,
          rating: review?.rating || "N/A",
          views_count: metric?.views_count || 0,
          shares_count: metric?.shares_count || 0,
          favorites_count: metric?.favorites_count || 0,
          report_count: metric?.report_count || 0,
          likes:
            videoLikesDislikesEntry?.likesDislikes
              .filter((ld) => ld.is_like)
              .map((ld) => ld.user) || [],
          dislikes:
            videoLikesDislikesEntry?.likesDislikes
              .filter((ld) => !ld.is_like)
              .map((ld) => ld.user) || [],
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
      // console.log(JSON.stringify(enrichedData, null, 2));
      // console.log(JSON.stringify(sortedData, null, 2));
      setVideoData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingItems(false);
    }
  }, [sortBy, order]);

  useEffect(() => {
    fetchDataWithRatingsAndMetrics();
    dispatch(
      loadPaginatedVideos({
        page: currentPage,
        limit: 10,
        sort: sortBy,
        order: order,
      })
    );
  }, [dispatch, currentPage, sortBy, order, fetchDataWithRatingsAndMetrics]);
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
                <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
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
Catalog.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default Catalog;
