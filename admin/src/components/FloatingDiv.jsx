import PropTypes from "prop-types";

const FloatingDiv = ({
  iconPath,
  href,
  className,
  onProceed,
  onDeny,
  isVisible,
  onToggle,
}) => {
  return (
    <div
      className={`floating-div-container main__table-btn ${className}`}
      {...(typeof href === "string" ? { href } : { onClick: onToggle })}
    >
      {/* Trigger Button */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d={iconPath}></path>
      </svg>

      {/* Conditional Rendering for Floating Div */}
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
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FloatingDiv;
