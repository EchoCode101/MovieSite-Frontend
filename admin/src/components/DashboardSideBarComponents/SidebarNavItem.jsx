import PropTypes from "prop-types";

const SidebarNavItem = ({ href, activeLink, text, svgPath }) => {
  return (
    <li className="sidebar__nav-item">
      <a href={href} className={`sidebar__nav-link ${activeLink || ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d={svgPath} />
        </svg>
        <span>{text}</span>
      </a>
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
