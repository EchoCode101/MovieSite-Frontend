import PropTypes from "prop-types";

const InputField = ({
  htmlFor_id,
  type,
  name,
  placeholder,
  onChange,
  value,
  inputTitle,
  disabled,
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-12 col-xl-6">
      <div className="sign__group">
        <label className="sign__label" htmlFor={htmlFor_id}>
          {inputTitle}
        </label>
        <input
          id={htmlFor_id}
          type={type}
          name={name}
          className="sign__input"
          placeholder={placeholder}
          onChange={onChange} // Pass the onChange handler
          value={value}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
InputField.propTypes = {
  htmlFor_id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string, // Mark as required
  onChange: PropTypes.func, // Mark as required
  inputTitle: PropTypes.string,
  disabled: PropTypes.bool,
};
export default InputField;
