import TableSortBy from "./TableSortBy";
import PropTypes from "prop-types";
const TableFilters = ({ data, sortByValues, onSortChange, activeSort }) => {
  return (
    <div className="main__title">
      <h2>{data.title}</h2>

      <span className="main__title-stat">{data.title_stats} total</span>

      <div className="main__title-wrap">
        <TableSortBy
          activeSort={activeSort}
          sortByValues={sortByValues}
          onSortChange={onSortChange}
        />

        <form action="#" className="main__title-form">
          <input type="text" placeholder={data.searchPlaceholder} />
          <button type="button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8.25998"
                cy="8.25995"
                r="7.48191"
                stroke="#2F80ED"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
              <path
                d="M13.4637 13.8523L16.3971 16.778"
                stroke="#2F80ED"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
TableFilters.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    title_stats: PropTypes.string,
    searchPlaceholder: PropTypes.string,
  }).isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortByValues: PropTypes.object.isRequired,
  activeSort: PropTypes.string,
};

export default TableFilters;
