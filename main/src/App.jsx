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
import store from "../redux/store";

// Import your pages
import Index from "./pages/Index";
import AddVideo from "./pages/AddVideo";
import Catalog from "./pages/Catalog";
import Comments from "./pages/Comments";
import EditUser from "./pages/EditUser";
import EditVideo from "./pages/EditVideo";
import EditComment from "./pages/EditComment";
import EditReview from "./pages/EditReview";
import Forgot from "./pages/Forgot";
import Reviews from "./pages/Reviews";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UseJQueryReInit from "./components/UseJQueryReInit";
import AddUserForm from "./pages/CreateMember";
import VideoUpload from "./pages/VideoUpload";
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
                <Index headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <Catalog headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-video"
            element={
              <ProtectedRoute>
                <AddVideo headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-video"
            element={
              <ProtectedRoute>
                <VideoUpload headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-user"
            element={
              <ProtectedRoute>
                <AddUserForm headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comments"
            element={
              <ProtectedRoute>
                <Comments headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Reviews headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users headerImage={headerImage} />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="/edit-user/:memberId"
            element={
              <ProtectedRoute>
                <EditUser headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-video/:videoId"
            element={
              <ProtectedRoute>
                <EditVideo headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-comment/:commentId"
            element={
              <ProtectedRoute>
                <EditComment headerImage={headerImage} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-review/:reviewId"
            element={
              <ProtectedRoute>
                <EditReview headerImage={headerImage} />
              </ProtectedRoute>
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
