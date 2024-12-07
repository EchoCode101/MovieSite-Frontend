import PropTypes from "prop-types";

const TableSortBy = ({ sortByValues }) => {
  return (
    <div className="filter" id="filter__sort">
      <span className="filter__item-label">Sort by:</span>

      <div
        className="filter__item-btn dropdown-toggle"
        role="navigation"
        id="filter-sort"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <input type="button" value="Date created" />
        <span></span>
      </div>

      <ul
        className="filter__item-menu dropdown-menu scrollbar-dropdown"
        aria-labelledby="filter-sort"
      >
        {Object.values(sortByValues).map((sortByValue) => {
          return <li key={sortByValue}>{sortByValue}</li>;
        })}
      </ul>
    </div>
  );
};
TableSortBy.propTypes = {
  sortByValues: PropTypes.shape({
    createdDate: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableSortBy;
