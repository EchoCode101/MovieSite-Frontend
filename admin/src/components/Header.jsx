import { useState } from "react";
import { useSelector } from "react-redux";
import { selectHeaderImage } from "../../redux/slices/headerSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const headerImage = useSelector(selectHeaderImage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Toggle classes on header and sidebar elements
    const header = document.querySelector(".header");
    const sidebar = document.querySelector(".sidebar");

    if (header) {
      header.classList.toggle("header--active");
    }
    if (sidebar) {
      sidebar.classList.toggle("sidebar--active");
    }
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/dashboard" className="header__logo a-tag">
          <img src={headerImage} alt="logo" />
        </Link>

        <button
          className={`header__btn ${sidebarOpen ? "header__btn--active" : ""}`}
          type="button"
          onClick={toggleSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
