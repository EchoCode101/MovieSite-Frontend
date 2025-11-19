/**
 * Image utility functions for handling image URLs and placeholders
 */

// Import assets using Vite's import system
import userIcon from "../assets/img/user.svg";
import videoIcon from "../assets/img/video.svg";
import thumbnailImg from "../assets/img/thumbnail.jpg";

/**
 * Get a placeholder image URL
 * @param {string} type - Type of placeholder ('user', 'video', 'thumbnail')
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderImage = (type = "user") => {
  const placeholders = {
    user: userIcon,
    video: videoIcon,
    thumbnail: thumbnailImg,
  };
  return placeholders[type] || placeholders.user;
};

/**
 * Get image URL with fallback to placeholder
 * @param {string} imageUrl - Original image URL
 * @param {string} placeholderType - Type of placeholder to use if imageUrl is invalid
 * @returns {string} Valid image URL or placeholder
 */
export const getImageWithFallback = (imageUrl, placeholderType = "user") => {
  if (
    !imageUrl ||
    imageUrl.trim() === "" ||
    imageUrl.includes("encrypted-tbn")
  ) {
    return getPlaceholderImage(placeholderType);
  }
  return imageUrl;
};
