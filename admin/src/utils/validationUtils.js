/**
 * Validation utility functions
 */

/**
 * Validate password according to backend requirements
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long!",
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasDigit) {
    return {
      isValid: false,
      error: "Password must contain uppercase, lowercase, and a digit!",
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  if (!email) return false;
  return email.includes("@") && email.includes(".");
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} Validation result with isValid and error message
 */
export const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return {
      isValid: false,
      error: "Username must be at least 3 characters long!",
    };
  }
  return { isValid: true, error: null };
};
