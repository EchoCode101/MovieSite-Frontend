import PropTypes from "prop-types";
import TableCell from "./TableCell";
import FloatingDiv from "../FloatingDiv";

const TableRow = ({
  data,
  columns,
  buttonData,
  onToggle,
  onProceed,
  onDeny,
  visibleDivId,
}) => {
  return (
    <tr>
      {columns.map((col, index) => (
        <TableCell key={index} classvalue={col.className}>
          {col.render
            ? col.render(data[col.accessor], data)
            : data[col.accessor] || "N/A"}
        </TableCell>
      ))}
      {buttonData && (
        <td>
          <div className="main__table-btns">
            {buttonData.map((button, index) => {
              const uniqueId = `${data.id}-${button.id}`; // Combine row id and button id for a truly unique ID
              console.log("uniqueId: " + uniqueId); // Debugging log
              return (
                <FloatingDiv
                  isVisible={visibleDivId === uniqueId}
                  key={uniqueId} // Use uniqueId as the key
                  iconPath={button.iconPath}
                  className={button.className}
                  href={button.href}
                  onToggle={() => onToggle(uniqueId)}
                  onProceed={() => onProceed(uniqueId)}
                  onDeny={() => onDeny(uniqueId)}
                />
              );
            })}
          </div>
        </td>
      )}
    </tr>
  );
};
TableRow.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
      className: PropTypes.string,
    })
  ).isRequired,
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      className: PropTypes.string,
      iconPath: PropTypes.string.isRequired,
      href: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    })
  ),
  onToggle: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
  visibleDivId: PropTypes.string, // Use string instead of number for flexibility
};

export default TableRow;
