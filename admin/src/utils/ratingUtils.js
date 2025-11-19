/**
 * Rating utility functions
 */

/**
 * Get CSS class for rating based on value
 * @param {number} rating - Rating value
 * @returns {string} CSS class name
 */
export const getRatingClass = (rating) => {
  if (rating >= 10) return "main__table-text--green";
  if (rating < 2) return "main__table-text--red";
  return "";
};
