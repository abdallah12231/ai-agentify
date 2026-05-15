import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// الـ Imports لصفحاتك (اتأكد إن الحروف الكبيرة والصغيرة صحيحة في أسماء الملفات)
import Home from './pages/Home';
import Browse from './pages/Browse';
import Upload from './pages/Upload'; // السيل مربوط بصفحة الـ Upload عندك في الـ sidebar
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* الـ Navbar بتاعك زي ما هو بالظبط */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <h2 style={{
          color: "#3b82f6",
          fontWeight: "bold",
          fontSize: "22px",
          letterSpacing: "1px"
        }}>
          ⚡ AI Agentify
        </h2>

        <div style={{ display: "flex", gap: "15px" }}>
          {[
            { name: "Home", path: "/" },
            { name: "Browse", path: "/browse" },
            { name: "Sell", path: "/upload" },
            { name: "Contact", path: "/contact" }
          ].map((item, i) => (
            <Link key={i} to={item.path} style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: "10px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#3b82f6";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.05)";
                  e.target.style.transform = "scale(1)";
                }}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </nav>

      {/* الـ Routes عشان اللينكات تشتغل لما تضغط عليها وتجيب الصفحات */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;