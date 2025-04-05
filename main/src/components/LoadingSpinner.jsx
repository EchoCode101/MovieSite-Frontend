import PropTypes from "prop-types";
const LoadingSpinner = ({ customClass, r, h, w, pt, pl }) => (
  <div id="wrapper">
    <div
      className="profile-main-loader"
      style={{ paddingTop: pt, paddingLeft: pl }}
    >
      <div className="loader" style={{ width: w, height: h }}>
        <svg className="circular-loader" viewBox="25 25 50 50">
          <circle
            className="loader-path"
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#517cee"
            strokeWidth="8"
          />
        </svg>
      </div>
    </div>
  </div>
);
LoadingSpinner.propTypes = {
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  h: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  w: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customClass: PropTypes.string,
};

export default LoadingSpinner;
