import PropTypes from "prop-types";

const Header = ({ headerImage }) => {
  return (
    <header className="header">
      <div className="header__content">
        <a href="/" className="header__logo">
          <img src={headerImage} alt="logo" />
        </a>

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
