import { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const UseJQueryReInit = ({ files }) => {
  const location = useLocation();

  useEffect(() => {
    const scriptElements = [];

    files.forEach((filePath) => {
      const script = document.createElement("script");
      script.src = filePath;
      script.async = true;
      script.onload = () => {
        console.log(`${filePath} loaded successfully`);
      };
      script.onerror = () => {
        console.error(`Failed to load ${filePath}`);
        toast.error(`Failed to load ${filePath}`);
      };
      document.body.appendChild(script);
      scriptElements.push(script);
    });

    // Cleanup scripts on component unmount or route change
    return () => {
      scriptElements.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, [location, files]);

  return null;
};
UseJQueryReInit.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default UseJQueryReInit;
