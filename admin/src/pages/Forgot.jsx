import { useState } from "react";
import { Link } from "react-router-dom";
import { adminForgotPassword } from "../../services/allRoutes";
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const data = await adminForgotPassword(email);
      setSuccess(
        data.message ||
          "Please check your inbox, a password reset link has been sent!"
      );
      toast.success(data.message || "Password reset link sent!");
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
                )}{" "}
                <div className="sign__group">
                  <input
                    type="email"
                    className="sign__input"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                )}{" "}
                <button className="sign__btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <span className="sign__text">
                  We will send a password reset link to your email.
                </span>
                <span className="sign__text">
                  Go back to{" "}
                  <Link className=" a-tag" to="/signin">
                    Signin Page
                  </Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
