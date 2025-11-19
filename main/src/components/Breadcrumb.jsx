import PropTypes from 'prop-types';

const Breadcrumb = ({ items }) => {
  return (
    <ul className="breadcrumb">
      {items.map((item, index) => (
        <li
          key={index}
          className={`breadcrumb__item ${
            !item.link ? "breadcrumb__item--active" : ""
          }`}
        >
          {item.link ? <a href={item.link}>{item.label}</a> : item.label}
        </li>
      ))}
    </ul>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
