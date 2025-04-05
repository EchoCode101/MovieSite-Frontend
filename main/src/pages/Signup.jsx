import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../utils/js/config.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const apiUrl = config.apiUrl;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic client-side validation
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long.");
      setLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, redirect to login or home page
        navigate("/signin"); // Redirect to the login page
      } else {
        // On failure, show error message
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="sign section--bg"
        style={{ backgroundImage: "url('/src/assets/img/bg.jpg')" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sign__content">
                <form
                  id="signupForm"
                  className="sign__form"
                  onSubmit={handleSubmit}
                >
                  <button className="sign__logo a-tag">
                    <img src="/src/assets/img/logo.svg" alt="" />
                  </button>
                  <div className="sign__group">
                    <input
                      type="text"
                      className="sign__input"
                      id="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      autoComplete="on"
                      minLength="3"
                    />
                  </div>
                  <div className="sign__group">
                    <input
                      type="email"
                      className="sign__input"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="on"
                      required
                    />
                  </div>
                  <div className="sign__group">
                    <input
                      type="password"
                      className="sign__input"
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="on"
                      minLength="6"
                    />
                  </div>
                  <button
                    className="sign__btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Sign up"}
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
                  <span className="sign__text">
                    Already have an account?
                    <Link className=" a-tag" to="/signin">
                      Sign in!
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
