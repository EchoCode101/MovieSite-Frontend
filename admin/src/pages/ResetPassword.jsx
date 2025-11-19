import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminResetPassword } from "../../services/allRoutes";
import { toast } from "react-toastify";
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
      const data = await adminResetPassword(token, password);
      setSuccess(data.message || "Password has been successfully reset.");
      toast.success(data.message || "Password reset successfully!");
      setTimeout(() => navigate("/signin"), 3000); // Redirect to sign-in page after 3 seconds
    } catch (err) {
      const errorMessage =
        err.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sign section--bg"
      style={{
        background:
          "url('/src/assets/img/bg.jpg') center center / cover no-repeat",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form className="sign__form" onSubmit={handleSubmit}>
                <button className="sign__logo a-tag">
                  <img src="/src/assets/img/logo.svg" alt="Logo" />
                </button>
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
