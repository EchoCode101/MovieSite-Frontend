/**
 * Status utility functions
 */

/**
 * Get CSS class for status styling
 * @param {string} status - Status value (e.g., "Active", "Inactive")
 * @returns {string} CSS class name
 */
export const getStatusClass = (status) => {
  if (status === "Active") return "main__table-text--green";
  if (status === "Inactive") return "main__table-text--red";
  return "";
};
