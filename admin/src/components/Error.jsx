import PropTypes from "prop-types";

const Error = ({ errorMessage }) => {
  return (
    <>
      {errorMessage.errorMessage !== null && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <strong>{errorMessage.errorTitle}</strong> :{" "}
          {errorMessage.errorMessage}
        </div>
      )}
    </>
  );
};

Error.propTypes = {
  errorMessage: PropTypes.shape({
    errorTitle: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
};

export default Error;
