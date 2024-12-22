import LoadingSpinner from "../LoadingSpinner";
import TableSortBy from "./TableSortBy";
import Svg from "../../components/Svg";

import PropTypes from "prop-types";
const TableFilters = ({
  data,
  sortByValues,
  loading,
  onSortChange,
  activeSort,
  onRefresh,
}) => {
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
        {loading ? (
          <span className="refresh-btn">
            <LoadingSpinner r={20} w={20} h={20} pt={0} pl={0} />
          </span>
        ) : (
          <button
            className="dashbox__refresh refresh-btn"
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
    title_stats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    searchPlaceholder: PropTypes.string,
  }).isRequired,
  onSortChange: PropTypes.func.isRequired,
  sortByValues: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired,
  activeSort: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TableFilters;
