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
          color: "white"
        }}>
          <h2 style={{ color: "#3b82f6" }}>⚡ AI Agentify</h2>

          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/">Home</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/upload">Sell</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔐 Admin مخفي */}
          <Route path="/admin-9271-secret" element={<Admin />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;