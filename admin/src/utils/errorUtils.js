/**
 * Error handling utility functions
 */

/**
 * Extract error message from various error formats
 * @param {Error|Object} error - Error object from API or catch block
 * @returns {string} User-friendly error message
 */
export const extractErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred";

  // Handle axios error response
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Handle Error object
  if (error?.message) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred";
};

/**
 * Handle API errors consistently
 * @param {Error} error - Error object
 * @param {Function} showToast - Toast function to show error
 * @param {string} defaultMessage - Default error message if extraction fails
 */
export const handleApiError = (
  error,
  showToast,
  defaultMessage = "Operation failed"
) => {
  const message = extractErrorMessage(error) || defaultMessage;
  if (showToast) {
    showToast(message);
  }
  console.error("API Error:", error);
  return message;
};

/**
 * Check if error is a network error
 * @param {Error} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return (
    !error?.response &&
    (error?.message?.includes("Network Error") ||
      error?.message?.includes("timeout") ||
      error?.code === "ECONNABORTED")
  );
};

/**
 * Check if error is an authentication error
 * @param {Error} error - Error object
 * @returns {boolean} True if authentication error
 */
export const isAuthError = (error) => {
  return error?.response?.status === 401 || error?.response?.status === 403;
};
