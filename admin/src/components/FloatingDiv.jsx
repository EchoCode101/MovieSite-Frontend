import PropTypes from "prop-types";
import Svg from "../components/Svg";
import { Link } from "react-router-dom";

const FloatingDiv = ({
  iconPath,
  className,
  onProceed,
  onDeny,
  isVisible,
  toggle,
  onToggle,
  id,
  href,
}) => {
  const handleClick = (e) => {
    if (toggle) {
      e.stopPropagation(); // Prevent the event from propagating further
      onToggle(); // Call the function passed as prop
    }
  };
  return (
    <div
      className={`floating-div-container main__table-btn ${className}`}
      onClick={handleClick} // Use the handler here
    >
      {toggle === false ? (
        <Link className="a-tag" to={`${href}/${id}`}>
          <Svg path={iconPath} />
        </Link>
      ) : (
        <Svg path={iconPath} />
      )}

      {isVisible && (
        <div className="floating-div">
          <p>Are you sure?</p>
          <button className="floating-btn proceed" onClick={onProceed}>
            Proceed
          </button>
          <button className="floating-btn deny" onClick={onDeny}>
            Deny
          </button>
        </div>
      )}
    </div>
  );
};

FloatingDiv.propTypes = {
  onProceed: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
  iconPath: PropTypes.string.isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool,
  href: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default FloatingDiv;
