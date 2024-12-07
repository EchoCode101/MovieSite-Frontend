import PropTypes from "prop-types";

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d={path} />
  </svg>
);
Icon.propTypes = {
  path: PropTypes.string,
};

export default Icon;
