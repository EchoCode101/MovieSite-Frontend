// import PropTypes from "prop-types";
// import { useSelector, useDispatch } from "react-redux";
// import { closeModal } from "../../redux/modalSlice";
// const ReusableModal = ({ modalId, title, content, buttons, customClass }) => {
//   const isModalOpen = useSelector((state) => state.modal.isModalOpen);
//   const dispatch = useDispatch();
//   const handleCloseModal = () => {
//     dispatch(closeModal()); // Close the modal by dispatching action
//   };
//   return (
//     <div
//       id={modalId}
//       className={`zoom-anim-dialog mfp-hide modal ${customClass} ${
//         isModalOpen ? "modal--visible" : ""
//       }`}
//     >
//       {/* Title */}
//       {title && <h6 className="modal__title">{title}</h6>}

//       {/* Content */}
//       {content.map((item, index) => {
//         if (item.type === "text") {
//           return (
//             <p key={index} className={item.className || "modal__text"}>
//               {item.text}
//             </p>
//           );
//         } else if (item.type === "image") {
//           return (
//             <div key={index} className={item.className || "comments__autor"}>
//               <img
//                 className="comments__avatar"
//                 src={item.src}
//                 alt={item.alt || ""}
//               />
//               <span className="comments__name">{item.name}</span>
//               <span className="comments__time">{item.time}</span>
//             </div>
//           );
//         } else if (item.type === "actions") {
//           return (
//             <div key={index} className={item.className || "comments__actions"}>
//               <div className="comments__rate">
//                 {item.ratings.map((rating, i) => (
//                   <span key={i}>
//                     {rating.icon}
//                     {rating.text}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           );
//         }
//         return null;
//       })}

//       {/* Buttons */}
//       {isModalOpen && buttons && buttons.length > 0 && (
//         <div className="modal__btns">
//           {buttons.map((button, index) => (
//             <button
//               key={index}
//               className={`modal__btn ${button.className}`}
//               type="button"
//               onClick={() => {
//                 console.log(`Button clicked: ${button.text}`); // Debug log
//                 if (typeof button.onClick === "function") {
//                   button.onClick(); // Call the function if it's defined
//                 }

//                 if (button.text === "Dismiss") {
//                   handleCloseModal(); // Close modal when dismiss is clicked
//                 }
//               }}
//             >
//               {button.text}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// ReusableModal.propTypes = {
//   isModalOpen: PropTypes.bool,
//   modalId: PropTypes.string.isRequired,
//   title: PropTypes.string,
//   content: PropTypes.arrayOf(
//     PropTypes.shape({
//       type: PropTypes.string.isRequired, // 'text', 'image', 'actions', etc.
//       text: PropTypes.string,
//       className: PropTypes.string,
//       src: PropTypes.string,
//       alt: PropTypes.string,
//       name: PropTypes.string,
//       time: PropTypes.string,
//       ratings: PropTypes.arrayOf(
//         PropTypes.shape({
//           icon: PropTypes.node,
//           text: PropTypes.string,
//         })
//       ),
//     })
//   ).isRequired,
//   buttons: PropTypes.arrayOf(
//     PropTypes.shape({
//       className: PropTypes.string,
//       text: PropTypes.string.isRequired,
//       onClick: PropTypes.func,
//     })
//   ),
//   customClass: PropTypes.string,
// };

// ReusableModal.defaultProps = {
//   title: "",
//   buttons: [],
//   customClass: "",
// };
// export default ReusableModal;
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";

const ReusableModal = ({ modalId, title, content, buttons, customClass }) => {
  const { isModalOpen, modalId: activeModalId } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal()); // Dispatch action to close the modal
  };

  return (
    <div
      id={modalId}
      className={`zoom-anim-dialog mfp-hide modal ${customClass} ${
        isModalOpen && activeModalId === modalId ? "modal--visible" : ""
      }`}
    >
      {/* Title */}
      {title && <h6 className="modal__title">{title}</h6>}

      {/* Content */}
      {content.map((item, index) => {
        if (item.type === "text") {
          return (
            <p key={index} className={item.className || "modal__text"}>
              {item.text}
            </p>
          );
        } else if (item.type === "image") {
          return (
            <div key={index} className={item.className || "comments__autor"}>
              <img
                className="comments__avatar"
                src={item.src}
                alt={item.alt || ""}
              />
              <span className="comments__name">{item.name}</span>
              <span className="comments__time">{item.time}</span>
            </div>
          );
        } else if (item.type === "actions") {
          return (
            <div key={index} className={item.className || "comments__actions"}>
              <div className="comments__rate">
                {item.ratings.map((rating, i) => (
                  <span key={i}>
                    {rating.icon}
                    {rating.text}
                  </span>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Buttons */}
      {isModalOpen &&
        activeModalId === modalId &&
        buttons &&
        buttons.length > 0 && (
          <div className="modal__btns">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`modal__btn ${button.className}`}
                type="button"
                onClick={() => {
                  if (typeof button.onClick === "function") {
                    button.onClick(); // Call button action
                  }

                  if (button.text === "Dismiss") {
                    handleCloseModal(); // Close modal if dismiss is clicked
                  }
                }}
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
    </div>
  );
};

ReusableModal.propTypes = {
  modalId: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired, // 'text', 'image', 'actions', etc.
      text: PropTypes.string,
      className: PropTypes.string,
      src: PropTypes.string,
      alt: PropTypes.string,
      name: PropTypes.string,
      time: PropTypes.string,
      ratings: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.node,
          text: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  customClass: PropTypes.string,
};

ReusableModal.defaultProps = {
  title: "",
  buttons: [],
  customClass: "",
};

export default ReusableModal;
