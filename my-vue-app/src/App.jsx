import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial" }}>

        {/* Navbar */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "rgba(15,23,42,0.8)",
          backdropFilter: "blur(10px)",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}>
          <h2 style={{
            color: "#3b82f6",
            fontWeight: "bold",
            fontSize: "22px"
          }}>
            ⚡ AI Agentify
          </h2>

          <div style={{ display: "flex", gap: "15px" }}>
            {[
              { name: "Home", path: "/" },
              { name: "Browse", path: "/browse" },
              { name: "Sell", path: "/upload" },
              { name: "Contact", path: "/contact" },
              { name: "Admin", path: "/admin" }
            ].map((item, i) => (
              <Link key={i} to={item.path}>
                <button
                  style={{
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#1e293b",
                    color: "white",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#3b82f6";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#1e293b";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {item.name}
                </button>
              </Link>
            ))}
          </div>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;