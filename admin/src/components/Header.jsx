import { useSelector } from "react-redux";
import { selectHeaderImage } from "../../redux/slices/headerSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const headerImage = useSelector(selectHeaderImage);
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

export default Header;
