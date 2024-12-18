import PropTypes from "prop-types";

const TableSortBy = ({ sortByValues, onSortChange, activeSort }) => {
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
        <input
          type="button"
          value={
            Object.keys(sortByValues).find(
              (key) => sortByValues[key] === activeSort
            ) || "Select Option"
          }
          readOnly
        />
        <span></span>
      </div>

      <ul
        className="filter__item-menu dropdown-menu scrollbar-dropdown"
        aria-labelledby="filter-sort"
      >
        {Object.entries(sortByValues).map(([label, value]) => (
          <li
            key={value}
            onClick={() => onSortChange(value)}
            className={`dropdown-item ${activeSort === value ? "active" : ""}`}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

TableSortBy.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sortByValues: PropTypes.object.isRequired,
  activeSort: PropTypes.string,
};

export default TableSortBy;
