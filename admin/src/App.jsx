import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseJQueryReInit from "./components/UseJQueryReInit";

// Import your pages
import Index from "./pages/Index";
import Users from "./pages/Users";
import Forgot from "./pages/Forgot";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Reviews from "./pages/Reviews";
import Catalog from "./pages/Catalog";
import Comments from "./pages/Comments";
import EditUser from "./pages/EditUser";
import AddVideo from "./pages/AddVideo";
import Header from "./components/Header";
import EditVideo from "./pages/EditVideo";
import NotFound from "./pages/NotFoundPage";
import EditReview from "./pages/EditReview";
import VideoUpload from "./pages/VideoUpload";
import EditComment from "./pages/EditComment";
import AddUserForm from "./pages/CreateMember";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardSideBar from "./components/SideBar/DashboardSideBar";

function AppContent() {
  const location = useLocation();

  // Define routes where Header should NOT be displayed
  const noHeaderSideBarRoutes = [
    "/signin",
    "/signup",
    "/forgot",
    "/reset-admin-password/:token",
    "/upload-video",
    "*",
  ];

  const shouldShowHeaderFooter = !noHeaderSideBarRoutes.includes(
    location.pathname
  );
  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      {shouldShowHeaderFooter && (
        <DashboardSideBar activeLink="sidebar__nav-link--active" />
      )}

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
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-video"
          element={
            <ProtectedRoute>
              <AddVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-video"
          element={
            <ProtectedRoute>
              <VideoUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute>
              <AddUserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comments"
          element={
            <ProtectedRoute>
              <Comments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/edit-user/:memberId"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-video/:videoId"
          element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-comment/:commentId"
          element={
            <ProtectedRoute>
              <EditComment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-review/:reviewId"
          element={
            <ProtectedRoute>
              <EditReview />
            </ProtectedRoute>
          }
        />
        {/* Fallback route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
            "/src/utils/js/admin.js",
            "/src/utils/js/bootstrap.bundle.min.js",
            "/src/utils/js/jquery-3.5.1.min.js",
            "/src/utils/js/jquery.magnific-popup.min.js",
            "/src/utils/js/modal.js",
            "/src/utils/js/select2.min.js",
            "/src/utils/js/smooth-scrollbar.js",
          ]}
        />
        <AppContent />
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
