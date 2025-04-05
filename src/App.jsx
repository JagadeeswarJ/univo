import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; 
import router from "./pages"; 

function App() {
  return (
    <Router>
      <Header />
      <div className="pt-20">
        {" "}
        {/* To avoid overlap due to fixed header */}
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
    </Router>
  );
}

export default App;
