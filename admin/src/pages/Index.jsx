import DashboardSideBar from "../components/SideBar/DashboardSideBar";
import Header from "../components/Header";
import Stats from "../components/Stats";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import IndexTable from "../components/IndexTable";
import { Link } from "react-router-dom";

import {
  fetchVideos,
  fetchMembers,
  fetchReviews,
  fetchVideoMetrics,
  fetchReviewsWithLikesDislikes,
  fetchDashboardStats,
} from "../../services/allRoutes";

const Index = ({ headerImage }) => {
  const [stats, setStats] = useState({
    uniqueViews: 0,
    itemsAdded: 0,
    newComments: 0,
  });
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [topItems, setTopItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  const [loadingTopItems, setLoadingTopItems] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingLatestItems, setLoadingLatestItems] = useState(false);
  // const statsData = [
  //   {
  //     title: "Unique views this month",
  //     numbers: "5,678",
  //     svg_path:
  //       "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
  //   },
  //   {
  //     title: "Items added this month",
  //     numbers: "172",
  //     svg_path:
  //       "M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z",
  //   },
  //   {
  //     title: "New comments",
  //     numbers: "2,573",
  //     svg_path:
  //       "M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z",
  //   },
  //   {
  //     title: "New Reviews",
  //     numbers: reviews.length.toString(),
  //     svg_path:
  //       "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Z",
  //   },
  // ];

  const refreshTimeDelay = 500;
  const formatNumber = (value) => {
    if (value === undefined || value === null || isNaN(value)) return "N/A";

    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;

    return value.toString(); // Safely returns the number
  };
  // Fetch stats from the API
  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };
  const fetchLatestItemData = async () => {
    try {
      setLoadingLatestItems(true);
      setTimeout(async () => {
        const { data: videos } = await fetchVideos();
        setLatestItems(videos);
        setLoadingLatestItems(false);
      }, refreshTimeDelay);
    } catch (error) {
      setLoadingLatestItems(false);
      console.error("Error fetching videos:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setTimeout(async () => {
        const { data: users } = await fetchMembers();
        setUsers(users);
        setLoadingUsers(false);
      }, refreshTimeDelay);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoadingUsers(false);
    }
  };
  const fetchRecentReviews = async () => {
    try {
      setLoadingReviews(true);
      setTimeout(async () => {
        const { data: reviews } = await fetchReviewsWithLikesDislikes();
        setReviews(reviews);
        setLoadingReviews(false);
      }, refreshTimeDelay);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoadingReviews(false);
    }
  };
  const fetchDataWithRatingsAndMetrics = async () => {
    try {
      setLoadingTopItems(true);
      setTimeout(async () => {
        // Fetch videos, reviews, and metrics simultaneously
        const [{ data: videos }, { data: reviews }, { data: metrics }] =
          await Promise.all([
            fetchVideos(),
            fetchReviews({ startDate: "2024-01-01", endDate: "2024-12-31" }),
            fetchVideoMetrics(),
          ]);

        // Merge reviews and metrics into videos
        const mergedData = videos.map((video) => {
          const review = reviews.find((rev) => rev.video_id === video.video_id);
          const metric = metrics.find((m) => m.video_id === video.video_id);

          return {
            ...video,
            rating: review ? review.rating : "N/A",
            views_count: metric?.views_count || 0,
            shares_count: metric?.shares_count || 0,
            favorites_count: metric?.favorites_count || 0,
            report_count: metric?.report_count || 0,
          };
        });

        setTopItems(mergedData);
        setLoadingTopItems(false);
      }, refreshTimeDelay);
    } catch (error) {
      console.error("Error merging data:", error);
      setLoadingTopItems(false);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchDataWithRatingsAndMetrics();
    fetchLatestItemData();
    fetchUsers();
    fetchRecentReviews();
    fetchStats();
    formatNumber();
  }, []);
  const statsData = [
    {
      title: "Unique views this month",
      numbers: loadingStats ? "Loading..." : stats.uniqueViews.toLocaleString(),
      svg_path:
        "M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z",
    },
    {
      title: "Videos added this month",
      numbers: loadingStats ? "Loading..." : stats.itemsAdded.toLocaleString(),
      svg_path:
        "M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z",
    },
    {
      title: "New comments",
      numbers: loadingStats ? "Loading..." : stats.newComments.toLocaleString(),
      svg_path:
        "M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z",
    },
    {
      title: "New Reviews",
      numbers: loadingStats ? "Loading..." : stats.newReviews.toLocaleString(),
      svg_path:
        "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Z",
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
              <div className="main__title">
                <h2>Dashboard</h2>

                <Link to="/add-item" className="main__title-link a-tag">
                  add item
                </Link>
              </div>
            </div>
            {statsData.map((stat, index) => (
              <Stats
                key={index}
                title={stat.title}
                numbers={stat.numbers}
                svg_path={stat.svg_path}
              />
            ))}
            <IndexTable
              wraprer_number={1}
              title="Top Items"
              svgPath={
                "M12,6a1,1,0,0,0-1,1V17a1,1,0,0,0,2,0V7A1,1,0,0,0,12,6ZM7,12a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V13A1,1,0,0,0,7,12Zm10-2a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V11A1,1,0,0,0,17,10Zm2-8H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2Zm1,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"
              }
              svgPath1={
                "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
              }
              classvalue="main__table-text--rate"
              columns={[
                { header: "ID", accessor: "video_id" },
                { header: "Title", accessor: "title" },
                { header: "Category", accessor: "category" },
                {
                  header: "Rating",
                  accessor: "rating",
                  render: (value) =>
                    value ? (
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
                  header: "Views",
                  accessor: "views_count",
                  render: formatNumber,
                },
                {
                  header: "Shares",
                  accessor: "shares_count",
                  render: formatNumber,
                },
                {
                  header: "Favorites",
                  accessor: "favorites_count",
                  render: formatNumber,
                },
                {
                  header: "Reports",
                  accessor: "report_count",
                  render: formatNumber,
                },
              ]}
              data={topItems}
              loading={loadingTopItems}
              onRefresh={fetchDataWithRatingsAndMetrics}
              viewAllLink="catalog"
            />{" "}
            <IndexTable
              wraprer_number={2}
              title="Latest Items"
              svgPath={
                "M10,13H3a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,20H4V15H9ZM21,2H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,9H15V4h5Zm1,4H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,21,13Zm-1,7H15V15h5ZM10,2H3A1,1,0,0,0,2,3v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,10,2ZM9,9H4V4H9Z"
              }
              columns={[
                { header: "ID", accessor: "video_id" },
                { header: "Title", accessor: "title" },
                { header: "Category", accessor: "category" },
                {
                  header: "Access Level",
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
                  header: "File Size",
                  accessor: "file_size",
                  render: (value) =>
                    value ? `${(value / 1024 / 1024).toFixed(2)} MB` : "N/A",
                },
              ]}
              data={latestItems}
              loading={loadingLatestItems}
              onRefresh={fetchLatestItemData}
              viewAllLink="catalog"
            />
            <IndexTable
              wraprer_number={3}
              title="Latest Users"
              svgPath={
                "M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"
              }
              columns={[
                { header: "ID", accessor: "member_id" },
                {
                  header: "Full Name",
                  accessor: "full_name",
                  render: (_, row) =>
                    `${row.first_name || ""} ${row.last_name || ""}`,
                },
                { header: "Email", accessor: "email" },
                { header: "Username", accessor: "username" },
                {
                  header: "Status",
                  accessor: "status",
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
                  header: "Plan",
                  accessor: "subscription_plan",
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
              ]}
              data={users}
              loading={loadingUsers}
              onRefresh={fetchUsers}
              viewAllLink="users"
            />
            <IndexTable
              wraprer_number={4}
              title="Latest Reviews"
              svgPath={
                "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
              }
              svgPath1={
                "M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
              }
              columns={[
                { header: "ID", accessor: "review_id" },
                {
                  header: "Item",
                  accessor: "review_content",
                  render: (_, row) => row.review_content || "No Title",
                },
                {
                  header: "Author",
                  accessor: "member",
                  render: (_, row) =>
                    `${row.member?.first_name || ""} ${
                      row.member?.last_name || ""
                    }`,
                },
                {
                  header: "Rating",
                  accessor: "rating",
                  render: (value) =>
                    value ? (
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
                  header: "Likes",
                  accessor: "likes",
                  render: (value) =>
                    value ? (
                      <span
                        className={`${
                          value > 0
                            ? "main__table-text--green"
                            : "main__table-text--grey"
                        }`}
                      >
                        {value}
                      </span>
                    ) : (
                      "0"
                    ),
                },
                {
                  header: "Dislikes",
                  accessor: "dislikes",
                  render: (value) =>
                    value ? (
                      <span
                        className={`${
                          value > 0
                            ? "main__table-text--red"
                            : "main__table-text--grey"
                        }`}
                      >
                        {value}
                      </span>
                    ) : (
                      "0"
                    ),
                },
              ]}
              data={reviews}
              loading={loadingReviews}
              onRefresh={fetchRecentReviews}
              viewAllLink="reviews"
            />
          </div>
        </div>
      </main>
    </>
  );
};
Index.propTypes = {
  headerImage: PropTypes.string.isRequired,
};

export default Index;
