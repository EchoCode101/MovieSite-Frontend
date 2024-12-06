import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:7100/api/admin/forgotPassword",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
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
      setError("Network error. Please try again. " + err.message);
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
