import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ headerImage }) => {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/dashboard" className="header__logo a-tag">
          <img src={headerImage} alt="logo" />
        </Link>

        <button className="header__btn" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};
Header.propTypes = {
  headerImage: PropTypes.string.isRequired,
};
export default Header;
