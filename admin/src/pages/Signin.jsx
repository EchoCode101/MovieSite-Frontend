import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on submit
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:7100/api/admin/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // To handle the cookie securely
        }
      );

      if (response.data?.token) {
        // Store token securely
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        navigate("/dashboard"); // Redirect to admin dashboard on successful login
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Signin failed");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
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
                <a href="/signin" className="sign__logo">
                  <img src="/src/assets/img/logo.svg" alt="Logo" />
                </a>
                {errorMessage && (
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
                    {errorMessage}
                  </div>
                )}{" "}
                <div className="sign__group">
                  <input
                    type="email"
                    className="sign__input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="password"
                    className="sign__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="sign__group sign__group--checkbox">
                  <input id="remember" name="remember" type="checkbox" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <button className="sign__btn" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </button>
                <span className="sign__text">
                  Don&apos;t have an account? <a href="/signup">Sign up!</a>
                </span>
                <span className="sign__text">
                  <a href="/forgot">Forgot password?</a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
