import PropTypes from "prop-types";

const TableCell = ({classvalue, children }) => {
  return (
    <td>
      <div className={`main__table-text ${classvalue}`}>{children}</div>
    </td>
  );
};
TableCell.propTypes = {
  classvalue: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TableCell;
