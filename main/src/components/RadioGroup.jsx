import PropTypes from 'prop-types';

const RadioGroup = ({ name, options }) => {
  return (
    <div className="slider-radio">
      {options.map((option) => (
        <div key={option.id}>
          <input
            type="radio"
            name={name}
            id={option.id}
            defaultChecked={option.checked}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      checked: PropTypes.bool,
    })
  ).isRequired,
};

export default RadioGroup;
