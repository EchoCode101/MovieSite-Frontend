import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../utils/js/config.js";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = config.apiUrl;

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
      const response = await axios.post(
        `${apiUrl}/admin/forgotPassword`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 299) {
        setSuccess(
          response.data.message ||
            "Please check your inbox, a password reset link has been sent!"
        );
      } else {
        setError(
          response.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      if (err.response) {
        // Server responded with an error status code
        if (err.response.status === 404) {
          setError("Email not found. Please try again.");
        } else {
          setError(
            err.response.data.message ||
              "Something went wrong. Please try again."
          );
        }
      } else {
        // No response from server or network error
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sign section--bg"
      style={{ backgroundImage: "url('/src/assets/img/bg.jpg')" }}
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
