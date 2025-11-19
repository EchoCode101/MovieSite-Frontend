import PropTypes from 'prop-types';

const PartnersCarousel = ({ logos }) => {
  return (
    <div className="partners owl-carousel">
      {logos.map((logo, index) => (
        <a href="#" className="partners__img" key={index}>
          <img src={logo} alt={`Partner ${index + 1}`} />
        </a>
      ))}
    </div>
  );
};

PartnersCarousel.propTypes = {
  logos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PartnersCarousel;
