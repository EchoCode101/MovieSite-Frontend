import PropTypes from "prop-types";

const Icon = ({ path, width, height, viewBox, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ? width : ""}
    height={height ? height : ""}
    viewBox={viewBox ? viewBox : "0 0 24 24"}
    fill={fill ? fill : ""}
  >
    <path d={path} fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
Icon.propTypes = {
  path: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  viewBox: PropTypes.string,
  fill: PropTypes.string,
};

export default Icon;
