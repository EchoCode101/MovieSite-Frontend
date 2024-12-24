import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice.js";
import config from "../utils/js/config.js";
// import { useNavigate } from "react-router-dom";
const Signin = () => {
  const Home = "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const apiUrl = config.apiUrl;
  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    setErrorMessage(""); // Reset error message on submit
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/admin/login`,
        { email, password },
        {
          withCredentials: true, // To handle the cookie securely
        }
      );
      const { token, refreshToken } = response.data;
      dispatch(loginSuccess({ token, refreshToken }));
      // localStorage.setItem("token", token);
      // localStorage.setItem("refreshToken", refreshToken);
      window.location.href = Home;

      // navigate(Home);
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
                <Link to="/signin" className="sign__logo a-tag">
                  <img src="/src/assets/img/logo.svg" alt="Logo" />
                </Link>
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
                    autoComplete="on"
                    id="email"
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
                    autoComplete="on"
                    id="password"
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
                  Don&apos;t have an account?{" "}
                  <Link className=" a-tag" to="/signup">
                    Sign up!
                  </Link>
                </span>
                <span className="sign__text">
                  <Link className=" a-tag" to="/forgot">
                    Forgot password?
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

export default Signin;
