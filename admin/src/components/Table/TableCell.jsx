import PropTypes from "prop-types";

const TableCell = ({ classvalue, children }) => {
  return (
    <td>
      <div
        className={`main__table-text ${classvalue || ""}`}
        style={{ height: "70px" }}
      >
        {children}
      </div>
    </td>
  );
};

TableCell.propTypes = {
  classvalue: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TableCell;
