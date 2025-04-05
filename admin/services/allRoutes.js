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
  try {
    console.log(`Updating Member ${memberId}:`, formData); // Debugging log
    return API.put(`/members/${memberId}`, formData).then(
      (response) => response.data
    );
  } catch (error) {
    console.error("Error updating member:", error);
    throw error; // Rethrow the error to let the caller handle it
  }
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

export const createMember = async (memberData) => {
  try {
    const response = await API.post("/members", memberData);
    return response.data; // Return the newly created member data
  } catch (error) {
    throw error.response?.data?.message || "Failed to create user.";
  }
};
export const deleteMemberById = async (memberId) => {
  try {
    const response = await API.delete(`/members/${memberId}/destroy`);
    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || "Failed to delete member.";
    throw new Error(errorMessage);
  }
};

// Add Video API
export const createVideo = async (videoData) => {
  const response = await API.post("/videos", videoData);
  return response.data;
};
