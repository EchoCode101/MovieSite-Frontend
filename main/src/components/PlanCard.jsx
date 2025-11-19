import PropTypes from "prop-types";

const PlanCard = ({ title, price, features }) => {
  return (
    <div className="plan">
      <h3 className="plan__title">{title}</h3>
      <ul className="plan__list">
        {features.map((feature, index) => (
          <li key={index} className={feature.isAvailable ? "green" : "red"}>
            <svg
              width="19"
              height={feature.isAvailable ? "14" : "19"}
              viewBox={`0 0 19 ${feature.isAvailable ? "14" : "19"}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={
                  feature.isAvailable
                    ? "M1.43994 6.95981L6.77477 12.2924L17.4399 1.62723"
                    : "M17.596 1.59982L1.60938 17.5865 M17.601 17.5961L1.60101 1.5928"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature.text}
          </li>
        ))}
      </ul>
      <span className="plan__price">
        {price}
        <span>/month</span>
      </span>
      <button className="plan__btn" type="button">
        Select plan
      </button>
    </div>
  );
};
PlanCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      isAvailable: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PlanCard;
