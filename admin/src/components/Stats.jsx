import PropTypes from "prop-types";

const Stats = ({ title, numbers, svg_path }) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="stats">
        <span>{title}</span>
        <p>{numbers}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d={svg_path} />
        </svg>
      </div>
    </div>
  );
};
Stats.propTypes = {
  title: PropTypes.string.isRequired,
  numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  svg_path: PropTypes.string.isRequired,
};

export default Stats;
