import TableHead from "./TableHead";
import TableRow from "./TableRow";
import PropTypes from "prop-types";

const Table = ({ data, columns, buttonData }) => {
  return (
    <table className="main__table">
      <TableHead columns={columns} />

      <tbody>
        {data.map((item, index) => (
          <TableRow
            buttonData={buttonData}
            key={item.id || index}
            data={item}
          />
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  buttonData: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(PropTypes.object), // Optional
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
};

export default Table;
