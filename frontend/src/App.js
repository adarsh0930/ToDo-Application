import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState("");

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken("");
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {token ? (
          <Route
            path="/dashboard"
            element={<Dashboard token={token} onLogout={handleLogout} />}
          />
        ) : (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
        <Route path="*" element={<div>404 Not Found</div>} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
