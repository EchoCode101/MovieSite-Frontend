import TableHead from "./TableHead";
import TableRow from "./TableRow";
import PropTypes from "prop-types";
import { useState } from "react";

const Table = ({ data, columns, buttonData }) => {
  const [visibleDivId, setVisibleDivId] = useState(null);

  const handleToggle = (id) => {
    setVisibleDivId((prevId) => (prevId === id ? null : id));
  };

  const handleProceed = (id) => {
    console.log(`Proceed clicked on div ${id}`);
    setVisibleDivId(null); // Close the floating div
  };

  const handleDeny = (id) => {
    console.log(`Deny clicked on div ${id}`);
    setVisibleDivId(null); // Close the floating div
  };
  return (
    <table className="main__table">
      <TableHead columns={columns} />
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow
              key={item.id || index} // Ensure unique key
              data={{ ...item, id: item.id || index }} // Add unique id if missing
              columns={columns}
              buttonData={buttonData}
              id={
                item.member_id ||
                item.video_id ||
                item.comment_id ||
                item.review_id ||
                item.reply_id
              }
              InactiveClassName={
                item.status == "Inactive"
                  ? "main__table-btn_inactive--banned"
                  : ""
              }
              status={item.status}
              onToggle={handleToggle}
              onProceed={handleProceed}
              onDeny={handleDeny}
              visibleDivId={visibleDivId}
            />
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>
              <div className="main__table-text">No Data Available</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      iconPath: PropTypes.string.isRequired,
      toggle: PropTypes.bool,
      href: PropTypes.string,
      className: PropTypes.string,
      InactiveClassName: PropTypes.string,
    })
  ).isRequired,
};

export default Table;
