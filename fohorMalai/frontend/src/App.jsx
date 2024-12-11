import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
