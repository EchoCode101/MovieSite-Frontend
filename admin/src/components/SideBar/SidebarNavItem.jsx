import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SidebarNavItem = ({ href, activeLink, text, svgPath }) => {
  return (
    <li className="sidebar__nav-item">
      <Link
        to={`/${href}`}
        className={` a-tag sidebar__nav-link ${activeLink || ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d={svgPath} />
        </svg>
        <span>{text}</span>
      </Link>
    </li>
  );
};

SidebarNavItem.propTypes = {
  href: PropTypes.string.isRequired,
  activeLink: PropTypes.string,
  text: PropTypes.string.isRequired,
  svgPath: PropTypes.string.isRequired,
};

export default SidebarNavItem;
