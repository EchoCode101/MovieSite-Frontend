import config from "../src/utils/js/config.js";
import axios from "axios";

const apiUrl = config.apiUrl;
const API = axios.create({
  baseURL: apiUrl, // Base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if stored in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchVideos = () => API.get("/videos");
export const fetchMembers = () => API.get("/members");
export const fetchReviews = (params) => API.get("/reviews/recent", { params });
export const fetchPaginatedVideos = (
  page = 1,
  limit = 10,
  sort = "last_updated",
  order = "DESC"
) =>
  API.get(`/videos/paginated`, {
    params: { page, limit, sort, order },
  }).then((response) => response.data); // Return only data
export const fetchPaginatedUsers = (
  page = 1,
  limit = 10,
  sort = "date_of_creation",
  order = "DESC"
) =>
  API.get(`/members/paginated`, {
    params: { page, limit, sort, order },
  }).then((response) => response.data);
export const fetchPaginatedComments = (
  page = 1,
  limit = 10,
  sort = "created_at",
  order = "DESC"
) =>
  API.get(`/comments/paginated`, {
    params: { page, limit, sort, order },
  }).then((response) => response.data);
export default API;
