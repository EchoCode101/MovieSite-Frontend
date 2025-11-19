import API from "./api";
import { extractErrorMessage } from "../src/utils/errorUtils";

// Helper function to extract response data consistently
const extractResponseData = (response) => {
  // Backend may return { success, message, data } or direct data
  if (response.data?.data !== undefined) {
    return response.data.data;
  }
  return response.data;
};

export const fetchVideos = () =>
  API.get("/videos")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchMembers = () =>
  API.get("/members")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchVideoMetrics = () =>
  API.get("/video_metrics")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchDashboardStats = () =>
  API.get("/admin/stats")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchReviewsWithLikesDislikes = () =>
  API.get("/likes-dislikes/reviews-with-likes-dislikes")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

// Fetch a single member by ID
export const fetchMemberById = (memberId) =>
  API.get(`/members/${memberId}`)
    .then((response) => extractResponseData(response))
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

// Update member details
export const updateMemberById = (memberId, formData) =>
  API.put(`/members/${memberId}`, formData)
    .then((response) => extractResponseData(response))
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchVideosWithLikesDislikesMembers = () =>
  API.get("/videos/likes-dislikes-with-members")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchReviews = (params) =>
  API.get("/reviews/recent", { params })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchPaginatedVideos = (
  page = 1,
  limit = 10,
  sort = "updatedAt",
  order = "DESC"
) =>
  API.get(`/videos/paginated`, {
    params: { page, limit, sort, order },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const fetchPaginatedUsers = (
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "DESC"
) =>
  API.get(`/members/paginated`, {
    params: { page, limit, sort, order },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

let debounceTimeout;

export const fetchPaginatedComments = (
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "DESC"
) => {
  clearTimeout(debounceTimeout);
  return new Promise((resolve, reject) => {
    debounceTimeout = setTimeout(() => {
      API.get(`/comments/paginated`, {
        params: { page, limit, sort, order },
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(new Error(extractErrorMessage(error))));
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
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const createMember = async (memberData) =>
  API.post("/members", memberData)
    .then((response) => extractResponseData(response))
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const deleteMemberById = async (memberId) =>
  API.delete(`/members/${memberId}/destroy`)
    .then((response) => extractResponseData(response))
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

// Add Video API
export const createVideo = async (videoData) =>
  API.post("/videos", videoData)
    .then((response) => extractResponseData(response))
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

// Upload video to Cloudinary
export const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  return API.post("/videos/uploadVideoToCloudinary", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });
};

// Admin Authentication Routes (Public - no token required)
export const adminLogin = async (email, password) =>
  API.post("/admin/login", { email, password }, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const adminSignup = async (signupData) =>
  API.post("/admin/signup", signupData)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const adminForgotPassword = async (email) =>
  API.post("/admin/forgotPassword", { email })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const adminResetPassword = async (token, password) =>
  API.post(`/admin/forgotPassword/reset/${token}`, { password })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });

export const adminLogout = async () =>
  API.post("/admin/logout", {}, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(extractErrorMessage(error));
    });
