// see the / path and the /home path
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Homepage from "./pages/Homepage";
import UserLayout from "./Layout/UserLayout";
import NotFoundPage from "./components/404NotFound";
import RequestPage from "./components/RequestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/request" element={<RequestPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
