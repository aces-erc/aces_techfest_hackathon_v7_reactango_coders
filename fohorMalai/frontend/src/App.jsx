import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Homepage from "./pages/Homepage";
import UserLayout from "./Layout/UserLayout";
import NotFoundPage from "./components/404NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/ProfilePage";
import RedirectIfAuthenticated from "./protected/AuthenticatedUser";
import ProtectedUser from "./protected/ProtectedUser";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <LandingPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />

        <Route
          element={
            <ProtectedUser>
              <UserLayout />
            </ProtectedUser>
          }
        >
          <Route
            path="/home/:username"
            element={
              <ProtectedUser>
                <Homepage />
              </ProtectedUser>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <ProtectedUser>
                <ProfilePage />
              </ProtectedUser>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
