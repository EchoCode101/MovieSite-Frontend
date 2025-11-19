/**
 * Subscription plan utility functions
 */

export const SUBSCRIPTION_PLANS = ["Free", "Basic", "Premium", "Ultimate"];

/**
 * Get CSS class for subscription plan styling
 * @param {string} plan - Subscription plan name
 * @returns {string} CSS class name
 */
export const getSubscriptionPlanClass = (plan) => {
  if (plan === "Free") return "";
  if (plan === "Basic") return "main__table-text--mint";
  if (plan === "Premium") return "main__table-text--pink";
  if (plan === "Ultimate") return "main__table-text--golden";
  return "";
};
