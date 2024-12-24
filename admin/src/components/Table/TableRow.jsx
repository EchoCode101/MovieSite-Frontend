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
  id,
  status,
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
              const uniqueId = `${data.id}-${button.id}`;
              const buttonInactiveClass =
                status === "Inactive" && index === 0
                  ? "main__table-btn_inactive--banned"
                  : "";
              // Apply inactive class only to the first button

              // Combine row id and button id for a truly unique ID
              // console.log("Rendering FloatingDiv with uniqueId:", uniqueId); // Debugging log
              // console.log("uniqueId: " + uniqueId); // Debugging log
              return (
                <FloatingDiv
                  id={String(id)} // Convert memberId to a string
                  isVisible={visibleDivId === uniqueId}
                  key={uniqueId} // Use uniqueId as the key
                  iconPath={button.iconPath}
                  className={`${button.className} ${buttonInactiveClass}`}
                  toggle={button.toggle}
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
      className: PropTypes.string,
      iconPath: PropTypes.string.isRequired,
      toggle: PropTypes.bool,
      href: PropTypes.string,
    })
  ),
  onToggle: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
  visibleDivId: PropTypes.string, // Use string instead of number for flexibility
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string,
};

export default TableRow;
