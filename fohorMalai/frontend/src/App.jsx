// see the / path and the /home path
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Homepage from "./pages/Homepage";
import UserLayout from "./Layout/UserLayout";
import NotFoundPage from "./components/404NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage";
import RequestPage from "./components/RequestPage";
import Profile from "./components/Profile";
import CollectorDashboard from "./components/CollectorDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collector/dashboard" element={<CollectorDashboard />}></Route>
          <Route path="/" element={<LandingPage />}>
            <Route path="/home/:username" element={<Homepage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
