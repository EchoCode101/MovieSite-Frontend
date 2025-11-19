import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";

const ModalManager = () => {
  const { isModalOpen, modalId } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen && modalId) {
      // Find the modal element by ID
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        // Remove mfp-hide class and add show class
        modalElement.classList.remove("mfp-hide");
        modalElement.classList.add("mfp-show");

        // Add overlay
        const overlay = document.createElement("div");
        overlay.className = "mfp-overlay";
        overlay.id = "mfp-overlay";
        overlay.onclick = () => dispatch(closeModal());
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
      }
    } else {
      // Close all modals
      const modals = document.querySelectorAll(".zoom-anim-dialog");
      modals.forEach((modal) => {
        modal.classList.add("mfp-hide");
        modal.classList.remove("mfp-show");
      });

      // Remove overlay
      const overlay = document.getElementById("mfp-overlay");
      if (overlay) {
        overlay.remove();
      }
      document.body.style.overflow = "";
    }

    // Handle dismiss buttons
    const handleDismiss = (e) => {
      if (e.target.classList.contains("modal__btn--dismiss")) {
        dispatch(closeModal());
      }
    };

    document.addEventListener("click", handleDismiss);
    return () => {
      document.removeEventListener("click", handleDismiss);
    };
  }, [isModalOpen, modalId, dispatch]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        dispatch(closeModal());
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen, dispatch]);

  return null;
};

export default ModalManager;
