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
import Live from "./pages/Live";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import Interview from "./pages/Interview";
import FreeUserVidPlayer from "./pages/FreeUserVidPlayer";
import PaidUserVidPlayer from "./pages/PaidUserVidPlayer";
import PremiumPaidUserVidPlayer from "./pages/PremiumPaidUserVidPlayer";
import CategoryDetailed from "./pages/CategoryDetailed";
import CategorySimple from "./pages/CategorySimple";
import PremiumPaidUserMainPage from "./pages/PremiumPaidUserMainPage";
import PaidUserMainPage from "./pages/PaidUserMainPage";
import FreeUserMainPage from "./pages/FreeUserMainPage";
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
        <UseJQueryReInit
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
        />
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
            path="/FreeUserMainPage"
            element={
              // <ProtectedRoute>
              <FreeUserMainPage headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/PaidUserMainPage"
            element={
              // <ProtectedRoute>
              <PaidUserMainPage headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/PremiumPaidUserMainPage"
            element={
              // <ProtectedRoute>
              <PremiumPaidUserMainPage headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/CategorySimple"
            element={
              // <ProtectedRoute>
              <CategorySimple headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/CategoryDetailed"
            element={
              // <ProtectedRoute>
              <CategoryDetailed headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/PremiumPaidUserVidPlayer"
            element={
              // <ProtectedRoute>
              <PremiumPaidUserVidPlayer headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/PaidUserVidPlayer"
            element={
              // <ProtectedRoute>
              <PaidUserVidPlayer headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/FreeUserVidPlayer"
            element={
              // <ProtectedRoute>
              <FreeUserVidPlayer headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/Interview"
            element={
              // <ProtectedRoute>
              <Interview headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              // <ProtectedRoute>
              <Profile headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/Privacy"
            element={
              // <ProtectedRoute>
              <Privacy headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/Pricing"
            element={
              // <ProtectedRoute>
              <Pricing headerImage={headerImage} />
              //  </ProtectedRoute>
            }
          />
          <Route
            path="/Live"
            element={
              // <ProtectedRoute>
              <Live headerImage={headerImage} />
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
