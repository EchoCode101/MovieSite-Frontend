const handleError = (setter, message) => {
  setter(message);
  setTimeout(() => setter(null), 5000); // Auto-clear after 5s
};
export default handleError;
