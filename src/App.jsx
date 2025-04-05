import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ IMPORT NAVBAR
import router from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ ADD THIS LINE */}
      <div className="pt-20">
        {/* To avoid overlap due to sticky navbar */}
        <Routes>
          {router.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
