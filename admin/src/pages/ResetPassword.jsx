import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:7100/api/admin/forgotPassword/reset/${token}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if status is in the success range (200-299)
      if (response.status >= 200 && response.status < 300) {
        setSuccess(
          response.data.message || "Password has been successfully reset."
        );
        setTimeout(() => navigate("/signin"), 3000); // Redirect to sign-in page after 3 seconds
      } else {
        setError(
          response.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      // Handle Axios errors and display error message
      if (err.response) {
        // If there is a response object, handle the error based on the response
        setError(
          err.response.data.message || "Something went wrong. Please try again."
        );
      } else {
        // If there is no response object, it's a network error
        setError("Network error. Please try again. " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign section--bg" data-bg="/src/assets/img/bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form className="sign__form" onSubmit={handleSubmit}>
                <a href="#" className="sign__logo">
                  <img src="/src/assets/img/logo.svg" alt="Logo" />
                </a>
                {error && (
                  <div
                    className="sign__group"
                    style={{
                      color: "rgb(255, 255, 255)",
                      backgroundColor: "rgb(235, 56, 24)",
                      padding: "10px",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </div>
                )}
                <div className="sign__group">
                  <input
                    type="password"
                    className="sign__input"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {success && (
                  <div
                    className="sign__group success"
                    style={{
                      color: "rgb(255, 255, 255)",
                      backgroundColor: "rgb(37, 51, 35)",
                      padding: "10px",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    {success}
                  </div>
                )}
                <button className="sign__btn" type="submit" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
                <span className="sign__text">
                  Please enter a strong password of at least 6 characters.
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
