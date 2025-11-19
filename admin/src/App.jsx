import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./utils/css/modal-overlay.css";
import "./utils/css/smooth-scrollbar.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalManager from "./components/ModalManager";

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
import AddUser from "./pages/AddUser";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardSideBar from "./components/SideBar/DashboardSideBar";
import ErrorBoundary from "./components/ErrorBoundary";

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
              <AddUser />
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
          path="/edit-user"
          element={
            <ProtectedRoute>
              <Navigate to="/users" replace />
            </ProtectedRoute>
          }
        />
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
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          {/* Bootstrap JavaScript removed - using React-based solutions instead */}
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
          <ModalManager />
        </Router>
        <ToastContainer />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
