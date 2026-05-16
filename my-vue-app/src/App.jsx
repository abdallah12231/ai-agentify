import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Pay from "./pages/Pay";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ChooseRole from "./pages/ChooseRole";

import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <Router>
      <div>

        {/* 🔥 Navbar */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          background: "#0f172a",
          color: "white"
        }}>
          <h2 style={{ color: "#3b82f6" }}>⚡ AI Agentify</h2>

          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/" style={link}>Home</Link>
            <Link to="/browse" style={link}>Browse</Link>
            <Link to="/upload" style={link}>Sell</Link>
            <Link to="/contact" style={link}>Contact</Link>
            <Link to="/login" style={link}>Login</Link>
          </div>
        </nav>

        {/* 🔥 Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pay" element={<Pay />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/choose-role" element={<ChooseRole />} />

          {/* Admin (مخفي) */}
          <Route path="/admin-orders-secret" element={<AdminOrders />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;

const link = {
  color: "white",
  textDecoration: "none"
};