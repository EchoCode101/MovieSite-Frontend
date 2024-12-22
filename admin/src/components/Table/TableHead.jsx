import PropTypes from "prop-types";

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index} className={col.className || ""}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
};

export default TableHead;
