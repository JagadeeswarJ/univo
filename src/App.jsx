import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import router from "./pages";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import OrganizerDashboard from "./pages/OrganizerDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        {" "}
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
