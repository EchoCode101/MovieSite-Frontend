import PropTypes from "prop-types";

const TableButton = ({ iconPath, href, className }) => {
  return (
        <a href={href} className={`main__table-btn ${className}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d={iconPath}></path>
          </svg>
        </a>
  );
};
TableButton.propTypes = {
  iconPath: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TableButton;
