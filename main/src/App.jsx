import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

// Import your pages
import store from "../redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
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
import Header from "./components/Header";
import Footer from "./components/Footer";

function AppContent() {
  const location = useLocation();

  // Define routes where Header and Footer should not be displayed
  const noHeaderFooterRoutes = [
    "/signin",
    "/signup",
    "/forgot",
    "/reset-admin-password/:token",
    "*",
  ];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
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
        <Route
          path="/"
          element={
            // <ProtectedRoute>
            <FreeUserMainPage />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/PaidUserMainPage"
          element={
            // <ProtectedRoute>
            <PaidUserMainPage />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/PremiumPaidUserMainPage"
          element={
            // <ProtectedRoute>
            <PremiumPaidUserMainPage />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/CategorySimple"
          element={
            // <ProtectedRoute>
            <CategorySimple />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/CategoryDetailed"
          element={
            // <ProtectedRoute>
            <CategoryDetailed />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/PremiumPaidUserVidPlayer"
          element={
            // <ProtectedRoute>
            <PremiumPaidUserVidPlayer />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/PaidUserVidPlayer"
          element={
            // <ProtectedRoute>
            <PaidUserVidPlayer />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/FreeUserVidPlayer"
          element={
            // <ProtectedRoute>
            <FreeUserVidPlayer />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/Interview"
          element={
            // <ProtectedRoute>
            <Interview />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            // <ProtectedRoute>
            <Profile />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/Privacy"
          element={
            // <ProtectedRoute>
            <Privacy />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/Pricing"
          element={
            // <ProtectedRoute>
            <Pricing />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/Live"
          element={
            // <ProtectedRoute>
            <Live />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            // <ProtectedRoute>
            <Catalog />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            // <ProtectedRoute>
            <About />
            //  </ProtectedRoute>
          }
        />
        <Route
          path="/contactus"
          element={
            // <ProtectedRoute>
            <ContactUs />
            //  </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

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
        <AppContent />
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
