import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/screens/Home";
import Login from "./pages/auth/Login";
import NotFound from "./pages/404/NotFound";

function App() {
  // sidebar toggled
  const [sidebarToggled, setSidebarToggled] = useState(false);

  // toggle sidebar when screen reaches 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setSidebarToggled(true);
      } else {
        setSidebarToggled(false);
      }
    };
    // initial call
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebarToggled={sidebarToggled}
              setSidebarToggled={setSidebarToggled}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
