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
    // console.log(`Proceed clicked on div ${id}`);
    setVisibleDivId(null); // Close the floating div
  };

  const handleDeny = (id) => {
    // console.log(`Deny clicked on div ${id}`);
    setVisibleDivId(null); // Close the floating div
  };
  // Convert Mongoose documents to plain objects
  const plainData = data.map((item) => {
    if (!item) return item;
    
    // Check if it's a Mongoose document (has $__ or _doc)
    if (item.$__ || item._doc) {
      // Extract the actual data from _doc
      const docData = item._doc || {};
      // Get top-level properties that were added (like likes, dislikes)
      const topLevelProps = {};
      Object.keys(item).forEach(key => {
        // Skip Mongoose internal properties
        if (!key.startsWith('$') && key !== '_doc' && key !== 'isNew') {
          topLevelProps[key] = item[key];
        }
      });
      // Merge _doc data with top-level properties
      return { ...docData, ...topLevelProps };
    }
    
    // If it has toObject method, use it
    if (typeof item.toObject === 'function') {
      return item.toObject();
    }
    
    return item;
  });

  // Debug: Log first item to see structure
  // if (plainData.length > 0) {
  //   console.log("Table - First plain data item:", plainData[0]);
  //   console.log("Table - Columns:", columns);
  // }

  return (
    <table className="main__table">
      <TableHead columns={columns} />
      <tbody>
        {plainData.length > 0 ? (
          plainData.map((item, index) => {
            const plainItem = item;
            
            const rowId =
              plainItem.member_id ||
              plainItem.video_id ||
              plainItem.comment_id ||
              plainItem.review_id ||
              plainItem.reply_id ||
              plainItem.id ||
              (plainItem._id
                ? typeof plainItem._id === "object" && plainItem._id.toString
                  ? plainItem._id.toString()
                  : String(plainItem._id)
                : null) ||
              index;
            return (
              <TableRow
                key={rowId} // Ensure unique key
                data={{ ...plainItem, id: rowId }} // Add unique id if missing
                columns={columns}
                buttonData={buttonData}
                id={rowId}
                rowIndex={index} // Pass index for sequential numbering
                InactiveClassName={
                  plainItem.status == "Inactive"
                    ? "main__table-btn_inactive--banned"
                    : ""
                }
                status={plainItem.status}
                onToggle={handleToggle}
                onProceed={handleProceed}
                onDeny={handleDeny}
                visibleDivId={visibleDivId}
              />
            );
          })
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
