import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial" }}>

        {/* Navbar */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          background: "#0f172a",
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;