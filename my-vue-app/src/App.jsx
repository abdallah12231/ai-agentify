import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Pay from "./pages/Pay";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ChooseRole from "./pages/ChooseRole";

import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <div>

        {/* 🔥 Navbar */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 40px",
          background: "#0f172a",
          color: "white"
        }}>
          <h2 style={{ color: "#3b82f6" }}>⚡ AI Agentify</h2>

          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/" style={link}>Home</Link>
            <Link to="/browse" style={link}>Browse</Link>

            {/* يظهر للبائع فقط */}
            {role === "seller" && (
              <Link to="/upload" style={link}>Sell</Link>
            )}

            <Link to="/contact" style={link}>Contact</Link>
            <Link to="/my-orders" style={link}>My Orders</Link>
            <Link to="/login" style={link}>Login</Link>
          </div>
        </nav>

        {/* 🔥 Routes */}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔐 Protected */}
          <Route path="/upload" element={
            <ProtectedRoute roleRequired="seller">
              <Upload />
            </ProtectedRoute>
          } />

          <Route path="/pay" element={
            <ProtectedRoute>
              <Pay />
            </ProtectedRoute>
          } />

          <Route path="/my-orders" element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/choose-role" element={<ChooseRole />} />

          {/* Admin */}
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