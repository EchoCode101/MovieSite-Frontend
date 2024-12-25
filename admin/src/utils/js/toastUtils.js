import { toast } from "react-toastify";

/**
 * Wrapper for handling toast notifications with promises.
 * @param {Promise} promise - The promise to monitor.
 * @param {string} pendingMessage - Message displayed while pending.
 * @param {string} successMessage - Message displayed on success.
 * @param {string} errorMessage - Message displayed on error.
 * @returns {Promise} - The original promise for chaining.
 */

export const toastPromise = (
  promise,
  pendingMessage,
  successMessage,
  errorMessage,
  options = {} // Additional options for customization
) => {
  return toast.promise(
    promise,
    {
      pending: {
        render: pendingMessage,
        icon: options.pendingIcon || "⏳", // Custom pending icon
        ...options.pendingOptions, // Additional pending options
      },
      success: {
        render: successMessage,
        icon: options.successIcon || "✅", // Custom success icon
        ...options.successOptions, // Additional success options
      },
      error: {
        render: errorMessage,
        icon: options.errorIcon || "❌", // Custom error icon
        ...options.errorOptions, // Additional error options
      },
    },
    {
      position: options.position || "top-right",
      autoClose: options.autoClose || 3000,
      hideProgressBar: options.hideProgressBar || false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  );
};

// Success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: "✅", // Custom icon
  });
};

// Error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: "❌", // Custom icon
  });
};

// Warning toast
export const showWarningToast = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: "⚠️", // Custom icon
  });
};
