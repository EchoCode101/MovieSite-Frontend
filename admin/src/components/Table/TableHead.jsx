import PropTypes from "prop-types";

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col.label}</th>
        ))}
      </tr>
    </thead>
  );
};
TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableHead;
