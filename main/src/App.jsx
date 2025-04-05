import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import headerImage from "./assets/img/logo.svg";

// Import your pages
import store from "../redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Forgot from "./pages/Forgot";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFoundPage";
import UseJQueryReInit from "./components/UseJQueryReInit";
function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Initialize all jQuery files */}
        {/* <UseJQueryReInit
          files={[
            "/src/utils/js/jquery-3.5.1.min.js",
            "/src/utils/js/jquery.magnific-popup.min.js",
            "/src/utils/js/main.js",
            "/src/utils/js/modal.js",
            "/src/utils/js/owl.carousel.min.js",
            "/src/utils/js/plyr.min.js",
            "/src/utils/js/select2.min.js",
            "/src/utils/js/slider-radio.js",
            "/src/utils/js/smooth-scrollbar.js",
            "/src/utils/js/bootstrap.bundle.min.js",
          ]}
        /> */}
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            path="/reset-admin-password/:token"
            element={<ResetPassword />}
          />
          {/* Protected routes */}
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <Index headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/catalog"
            element={
              // <ProtectedRoute>
              <Catalog headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              // <ProtectedRoute>
              <About headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/contactus"
            element={
              // <ProtectedRoute>
              <ContactUs headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />

          {/* Fallback route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
