import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/modalSlice";
// import FloatingDiv from "../FloatingDiv";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

const TableButton = ({ iconPath, href, className }) => {
  // const handleProceed = async () => {
  // try {
  //   const response = await axios.post("/api/proceed-action", { id: 123 });
  //   toast.success(response.data.message || "Action Proceeded Successfully");
  // } catch (error) {
  //   toast.error(error.response?.data?.message || "An error occurred.");
  // }
  // };

  // const handleDeny = async () => {
  //   try {
  //     const response = await axios.post("/api/deny-action", { id: 123 });
  //     toast.success(response.data.message || "Action Denied Successfully");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "An error occurred.");
  //   }
  // };
  const dispatch = useDispatch();
  const handleClick = () => {
    // e.preventDefault();  // Prevent default behavior of anchor tag
    const modalId = href.replace("#", ""); // Extract modalId from href (e.g., "#modal-view" -> "modal-view")
    dispatch(openModal(modalId)); // Dispatch the action to open the modal
  };
  return (
    <a
      href={href}
      className={`main__table-btn ${className}`}
      onClick={handleClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={iconPath}></path>
      </svg>
      {/* <FloatingDiv
        buttonText="Take Action"
        // onProceed={handleProceed}
        // onDeny={handleDeny}
      /> */}
    </a>
  );
};
TableButton.propTypes = {
  iconPath: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TableButton;
