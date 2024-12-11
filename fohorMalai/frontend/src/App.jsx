import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Homepage from "./pages/Homepage";
import UserLayout from "./Layout/UserLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<UserLayout />}>
          <Route path="/home" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
