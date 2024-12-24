import PropTypes from "prop-types";

const Paginator = ({ pages, currentPage, onPageChange }) => {
  // Handle previous and next navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pages.length) {
      onPageChange(page);
    }
  };

  return (
    <div className="paginator">
      <span className="paginator__pages">
        {/* items Showing :&nbsp;
        {itemsPerPage} | */}
        Page {currentPage} of {pages.length}
      </span>
      <ul className="paginator__paginator">
        {/* Previous Button */}
        <li>
          <button
            className="a-tag"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.75 5.36475L13.1992 5.36475"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M5.771 10.1271L0.749878 5.36496L5.771 0.602051"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? "active" : ""}>
            <button
              className="a-tag"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            className="a-tag"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.1992 5.3645L0.75 5.3645"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M8.17822 0.602051L13.1993 5.36417L8.17822 10.1271"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

Paginator.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.number),
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
