import { Link } from "react-router-dom";
import Svg from "./Svg";
import PropTypes from "prop-types";
function SubscriptionsMovieTile({ subscription_category_title, img, detail, link }) {
  return (
    <>
      <div className="card">
        <Link to={`/${link}`} className="card__cover">
          <img src={img} alt="asd" />
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1615 8.05308C13.1615 9.79908 11.7455 11.2141 9.9995 11.2141C8.2535 11.2141 6.8385 9.79908 6.8385 8.05308C6.8385 6.30608 8.2535 4.89108 9.9995 4.89108C11.7455 4.89108 13.1615 6.30608 13.1615 8.05308Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.998 15.3549C13.806 15.3549 17.289 12.6169 19.25 8.05289C17.289 3.48888 13.806 0.750885 9.998 0.750885H10.002C6.194 0.750885 2.711 3.48888 0.75 8.05289C2.711 12.6169 6.194 15.3549 10.002 15.3549H9.998Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <button className="card__add" type="button">
          <Svg
            path={
              "M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"
            }
          />
        </button>
        <h3 className="card__title card__title--subs">
          <Link to={`/${link}`}>{subscription_category_title}</Link>
        </h3>
        <ul className="card__list card__list--subs">
          <li>{detail}</li>
        </ul>
      </div>
    </>
  );
}
SubscriptionsMovieTile.propTypes = {
  subscription_category_title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SubscriptionsMovieTile;
