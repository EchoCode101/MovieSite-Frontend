import PropTypes from 'prop-types';

const FeatureCard = ({ iconPath, title, text }) => {
  return (
    <div className="feature">
      <span className="feature__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d={iconPath} />
        </svg>
      </span>
      <h3 className="feature__title">{title}</h3>
      <p className="feature__text">{text}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  iconPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FeatureCard;
