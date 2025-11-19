import PropTypes from 'prop-types';

const Card = ({ image, title }) => {
  return (
    <div className="card">
      <a href="details.html" className="card__cover">
        <img src={image} alt={title} />
      </a>
      <h3 className="card__title">{title}</h3>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
