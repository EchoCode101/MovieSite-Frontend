// IndexTable.js
import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner";
import Svg from "../components/Svg";
const IndexTable = ({
  title,
  columns,
  data,
  loading,
  onRefresh,
  viewAllLink,
  svgPath,
  svgPath1,
  classvalue,
}) => {
  return (
    <div className="col-12 col-xl-6">
      <div className="dashbox">
        <div className="dashbox__title">
          <h3>
            <Svg path={svgPath} />
            {title}
          </h3>

          <div className="dashbox__wrap">
            {loading ? (
              <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
            ) : (
              <button
                className="dashbox__refresh"
                type="button"
                onClick={onRefresh}
              >
                <Svg
                  path={
                    "M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z"
                  }
                />
              </button>
            )}
            {viewAllLink && (
              <a className="dashbox__more" href={viewAllLink}>
                View All
              </a>
            )}
          </div>
        </div>

        <div
          className="dashbox__table-wrap dashbox__table-wrap--1"
          data-scrollbar="true"
          tabIndex="-1"
          style={{ overflow: "hidden", outline: "none" }}
        >
          <table className="main__table main__table--dash">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.accessor}>{col.header}</th>
                ))}
              </tr>
            </thead>
            {loading ? (
              <></>
            ) : (
              <tbody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td key={col.accessor}>
                          <div className={`main__table-text ${classvalue}`}>
                            {col.accessor === "rating" ? (
                              <>
                                {" "}
                                <Svg path={svgPath1} />
                                {typeof col.render === "function"
                                  ? col.render(row[col.accessor], row)
                                  : row[col.accessor] || "N/A"}
                              </>
                            ) : typeof col.render === "function" ? (
                              col.render(row[col.accessor], row)
                            ) : (
                              row[col.accessor] || "N/A"
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="main__table-text">No Data Found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

IndexTable.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func, // Optional custom render function
    })
  ).isRequired,
  classvalue: PropTypes.string,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  viewAllLink: PropTypes.string,
  svgPath: PropTypes.string,
  svgPath1: PropTypes.string,
};

export default IndexTable;
