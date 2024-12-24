import API from "./api";


export const fetchVideos = () => API.get("/videos");
export const fetchMembers = () => API.get("/members");
export const fetchVideoMetrics = () => API.get("/video_metrics");

export const fetchDashboardStats = () =>
  API.get("/admin/stats").then((response) => response.data);

export const fetchReviewsWithLikesDislikes = () =>
  API.get("/likes-dislikes/reviews-with-likes-dislikes");

// Fetch a single member by ID
export const fetchMemberById = (memberId) =>
  API.get(`/members/${memberId}`).then((response) => response.data);

// Update member details
export const updateMemberById = (memberId, formData) => {
  console.log(`Updating Member ${memberId}:`, formData); // Debugging log
  return API.put(`/members/${memberId}`, formData).then(
    (response) => response.data
  );
};

export const fetchVideosWithLikesDislikesMembers = () =>
  API.get("/videos/likes-dislikes-with-members");

export const fetchReviews = (params) => API.get("/reviews/recent", { params });

export const fetchPaginatedVideos = (
  page = 1,
  limit = 10,
  sort = "updatedAt",
  order = "DESC"
) =>
  API.get(`/videos/paginated`, {
    params: { page, limit, sort, order },
  }).then((response) => response.data);

export const fetchPaginatedUsers = (
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "DESC"
) =>
  API.get(`/members/paginated`, {
    params: { page, limit, sort, order },
  }).then((response) => response.data);

let debounceTimeout;

export const fetchPaginatedComments = (
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "DESC"
) => {
  clearTimeout(debounceTimeout);
  return new Promise((resolve) => {
    debounceTimeout = setTimeout(() => {
      resolve(
        API.get(`/comments/paginated`, {
          params: { page, limit, sort, order },
        }).then((response) => response.data)
      );
    }, 300); // 300ms debounce
  });
};

export const fetchPaginatedReviews = (
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "DESC"
) =>
  API.get(`/reviews/paginated`, {
    params: { page, limit, sort, order },
  }).then((response) => response.data);
