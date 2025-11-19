import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Show error toast
    toast.error("An unexpected error occurred. Please refresh the page.");
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1
            style={{ fontSize: "2rem", marginBottom: "1rem", color: "#e74c3c" }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "2rem",
              color: "#7f8c8d",
            }}
          >
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
                maxWidth: "800px",
                textAlign: "left",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  marginTop: "1rem",
                  overflow: "auto",
                  fontSize: "0.9rem",
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
