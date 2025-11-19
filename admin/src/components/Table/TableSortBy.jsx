import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TableSortBy = ({ sortByValues, onSortChange, activeSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    Object.keys(sortByValues).find((key) => sortByValues[key] === activeSort) ||
    "Select Option";

  const handleItemClick = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="filter" id="filter__sort" ref={filterRef}>
      <span className="filter__item-label">Sort by:</span>

      <div
        className={`filter__item-btn dropdown-toggle ${isOpen ? "show" : ""}`}
        role="navigation"
        id="filter-sort"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <input type="button" value={selectedLabel} readOnly />
        <span></span>
      </div>

      <ul
        className={`filter__item-menu dropdown-menu scrollbar-dropdown ${
          isOpen ? "show" : ""
        }`}
        aria-labelledby="filter-sort"
      >
        {Object.entries(sortByValues).map(([label, value]) => (
          <li
            key={value}
            onClick={() => handleItemClick(value)}
            className={`dropdown-item ${activeSort === value ? "active" : ""}`}
            data-value={label.toLowerCase()}
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
