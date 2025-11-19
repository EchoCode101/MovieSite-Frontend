/**
 * Number utility functions for formatting
 */

/**
 * Format a number with k/M suffix for thousands/millions
 * @param {number} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (value === undefined || value === null || isNaN(value)) return "N/A";
  if (typeof value !== "number") {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) return "N/A";
    value = parsed;
  }
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return value.toString();
};

/**
 * Format file size in bytes to MB
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes) => {
  if (!bytes || typeof bytes !== "number" || isNaN(bytes)) return "N/A";
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};
